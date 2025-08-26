
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting billing info request...');
    
    // Initialize Supabase with anon key for authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.log('No authorization header');
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    console.log('Getting user from token...');
    
    const { data, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError) {
      console.log('Auth error:', authError);
      throw new Error(`Authentication failed: ${authError.message}`);
    }
    
    const user = data.user;
    if (!user?.email) {
      console.log('No user or email found');
      throw new Error("User not authenticated or email not available");
    }

    console.log('User authenticated:', user.email);

    const stripeKey = Deno.env.get("Stripe API Key");
    if (!stripeKey) {
      console.log('Stripe key not found');
      throw new Error("Stripe API Key not configured");
    }

    console.log('Initializing Stripe...');
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Get customer ID from environment
    const customerId = Deno.env.get("Customer ID");
    if (!customerId) {
      console.log('Customer ID not found');
      throw new Error("Customer ID not configured");
    }

    console.log('Fetching customer data for:', customerId);

    try {
      // Fetch customer data
      const customer = await stripe.customers.retrieve(customerId);
      console.log('Customer retrieved successfully');
      
      // Fetch invoices
      const invoices = await stripe.invoices.list({
        customer: customerId,
        limit: 10
      });
      console.log('Invoices retrieved:', invoices.data.length);

      // Fetch payment methods
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card'
      });
      console.log('Payment methods retrieved:', paymentMethods.data.length);

      // Calculate total spent this year
      const thisYear = new Date().getFullYear();
      const totalSpent = invoices.data
        .filter(invoice => invoice.status === 'paid' && new Date(invoice.created * 1000).getFullYear() === thisYear)
        .reduce((sum, invoice) => sum + (invoice.amount_paid || 0), 0);

      console.log('Total spent calculated:', totalSpent);

      // Get next billing date from active subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
        limit: 1
      });

      const nextBilling = subscriptions.data.length > 0 
        ? new Date(subscriptions.data[0].current_period_end * 1000).toLocaleDateString()
        : 'No active subscription';

      console.log('Next billing date:', nextBilling);

      // Prepare billing data
      const billingData = {
        totalSpent: `$${(totalSpent / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        nextBilling,
        balance: `$${Math.abs((customer as any).balance || 0) / 100}`,
        currentPeriod: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
        paymentMethods: paymentMethods.data.map(pm => ({
          id: pm.id,
          last4: pm.card?.last4,
          exp_month: pm.card?.exp_month,
          exp_year: pm.card?.exp_year,
          brand: pm.card?.brand
        })),
        invoices: invoices.data.slice(0, 5).map(invoice => ({
          id: invoice.number || invoice.id,
          date: new Date(invoice.created * 1000).toLocaleDateString(),
          amount: `$${(invoice.amount_paid || 0) / 100}`,
          status: invoice.status === 'paid' ? 'Paid' : 'Unpaid',
          url: invoice.hosted_invoice_url
        }))
      };

      console.log('Billing data prepared successfully');
      
      return new Response(JSON.stringify(billingData), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } catch (stripeError) {
      console.log('Stripe error:', stripeError);
      throw new Error(`Stripe API error: ${stripeError.message}`);
    }

  } catch (error) {
    console.error('Error in get-billing-info:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check the function logs for more information'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
