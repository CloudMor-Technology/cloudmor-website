
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log('Function started, method:', req.method);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting billing dashboard request...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasAnonKey: !!supabaseAnonKey,
      url: supabaseUrl?.substring(0, 20) + '...'
    });

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase configuration missing");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    // Get and validate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    console.log('Getting user from token...');
    
    const { data, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      console.error('User auth error:', userError);
      throw new Error(`Authentication failed: ${userError.message}`);
    }
    
    const user = data.user;
    if (!user?.email) {
      throw new Error("User not authenticated or missing email");
    }

    console.log('User authenticated:', user.email);

    // Initialize Stripe
    const stripeKey = Deno.env.get("Stripe Secret Key");
    if (!stripeKey) {
      console.error('Stripe Secret Key not found in environment');
      throw new Error("Stripe Secret Key not configured");
    }

    console.log('Initializing Stripe...');
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    const customerId = Deno.env.get("Customer ID");
    if (!customerId) {
      console.error('Customer ID not found in environment');
      throw new Error("Customer ID not configured");
    }

    console.log('Fetching comprehensive dashboard data for:', customerId);

    // Fetch all data in parallel
    const [customer, subscriptions, invoices, paymentMethods] = await Promise.allSettled([
      stripe.customers.retrieve(customerId),
      stripe.subscriptions.list({ 
        customer: customerId, 
        limit: 5,
        expand: ['data.items.data.price.product']
      }),
      stripe.invoices.list({ 
        customer: customerId, 
        limit: 20 
      }),
      stripe.paymentMethods.list({ 
        customer: customerId, 
        type: 'card' 
      })
    ]);

    console.log('All data fetched successfully');

    // Try to get upcoming invoice
    let upcomingInvoice = null;
    try {
      upcomingInvoice = await stripe.invoices.retrieveUpcoming({
        customer: customerId,
      });
      console.log('Upcoming invoice found');
    } catch (e) {
      console.log('No upcoming invoice found (normal)');
      upcomingInvoice = null;
    }

    // Calculate this month's total
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let thisMonthTotal = 0;

    if (invoices.status === 'fulfilled') {
      invoices.value.data.forEach(invoice => {
        const invoiceDate = new Date(invoice.created * 1000);
        if (invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear && invoice.status === 'paid') {
          thisMonthTotal += (invoice.amount_paid || 0);
        }
      });
    }

    console.log('This month total calculated:', thisMonthTotal);

    // Calculate total spent this year
    let totalSpentThisYear = 0;
    if (invoices.status === 'fulfilled') {
      invoices.value.data.forEach(invoice => {
        const invoiceDate = new Date(invoice.created * 1000);
        if (invoiceDate.getFullYear() === currentYear && invoice.status === 'paid') {
          totalSpentThisYear += (invoice.amount_paid || 0);
        }
      });
    }

    console.log('Total spent this year:', totalSpentThisYear);

    // Determine next billing date
    let nextBillingDate = 'No active subscription';
    if (subscriptions.status === 'fulfilled' && subscriptions.value.data.length > 0) {
      const activeSubscription = subscriptions.value.data.find(sub => sub.status === 'active');
      if (activeSubscription) {
        nextBillingDate = new Date(activeSubscription.current_period_end * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }

    console.log('Next billing date determined:', nextBillingDate);

    // Process subscriptions data
    const processedSubscriptions = subscriptions.status === 'fulfilled' 
      ? subscriptions.value.data.map(sub => ({
          id: sub.id,
          status: sub.status,
          current_period_start: sub.current_period_start,
          current_period_end: sub.current_period_end,
          cancel_at_period_end: sub.cancel_at_period_end,
          plan_name: sub.items.data[0]?.price?.nickname || 
                    sub.items.data[0]?.price?.product?.name || 
                    'Unknown Plan',
          amount: sub.items.data[0]?.price?.unit_amount || 0,
          interval: sub.items.data[0]?.price?.recurring?.interval || 'month'
        }))
      : [];

    // Process invoices data
    const processedInvoices = invoices.status === 'fulfilled' 
      ? invoices.value.data.slice(0, 10).map(invoice => ({
          id: invoice.id,
          number: invoice.number,
          status: invoice.status,
          amount_due: invoice.amount_due,
          amount_paid: invoice.amount_paid,
          created: invoice.created,
          period_start: invoice.period_start,
          period_end: invoice.period_end,
          invoice_pdf: invoice.invoice_pdf,
          hosted_invoice_url: invoice.hosted_invoice_url,
          currency: invoice.currency,
          date: new Date(invoice.created * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        }))
      : [];

    // Process payment methods data
    const processedPaymentMethods = paymentMethods.status === 'fulfilled' 
      ? paymentMethods.value.data.map(pm => ({
          id: pm.id,
          type: pm.type,
          card: pm.card ? {
            brand: pm.card.brand,
            last4: pm.card.last4,
            exp_month: pm.card.exp_month,
            exp_year: pm.card.exp_year,
            funding: pm.card.funding
          } : null,
          created: pm.created
        }))
      : [];

    console.log('Dashboard data prepared successfully');

    // Return comprehensive dashboard data
    const dashboardData = {
      customer: customer.status === 'fulfilled' ? {
        id: (customer.value as any).id,
        name: (customer.value as any).name,
        email: (customer.value as any).email,
        balance: (customer.value as any).balance || 0,
        created: (customer.value as any).created,
        currency: (customer.value as any).currency || 'usd'
      } : null,
      subscriptions: processedSubscriptions,
      invoices: processedInvoices,
      paymentMethods: processedPaymentMethods,
      upcomingInvoice,
      thisMonthTotal,
      totalSpentThisYear,
      nextBillingDate,
      clientEmail: user.email,
      customerId
    };

    return new Response(JSON.stringify({
      success: true,
      data: dashboardData
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error in billing dashboard:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
