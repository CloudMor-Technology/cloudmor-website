
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
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.email) {
      throw new Error("User not authenticated");
    }

    const stripe = new Stripe(Deno.env.get("Stripe API Key") || "", {
      apiVersion: "2023-10-16",
    });

    // Get customer ID from secrets
    const customerId = Deno.env.get("Customer ID");
    
    if (!customerId) {
      throw new Error("Customer ID not configured");
    }

    // Fetch customer data
    const customer = await stripe.customers.retrieve(customerId);
    
    // Fetch invoices
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 10
    });

    // Fetch payment methods
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card'
    });

    // Calculate total spent this year
    const thisYear = new Date().getFullYear();
    const totalSpent = invoices.data
      .filter(invoice => new Date(invoice.created * 1000).getFullYear() === thisYear)
      .reduce((sum, invoice) => sum + (invoice.amount_paid || 0), 0);

    // Get next billing date from active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1
    });

    const nextBilling = subscriptions.data.length > 0 
      ? new Date(subscriptions.data[0].current_period_end * 1000).toLocaleDateString()
      : 'No active subscription';

    const billingData = {
      totalSpent: `$${(totalSpent / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      nextBilling,
      balance: `$${Math.abs(customer.balance || 0) / 100}`,
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

    return new Response(JSON.stringify(billingData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
