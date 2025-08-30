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
    console.log('Testing Stripe connection...');

    // Test Stripe Secret Key
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Stripe Secret Key not configured");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Test basic Stripe API call
    console.log('Testing Stripe API connection...');
    const account = await stripe.accounts.retrieve();
    console.log('Stripe account info:', account.id, account.display_name);

    // Get user from auth
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseService.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    // Test profile lookup
    console.log('Testing profile lookup...');
    const { data: profileData, error: profileError } = await supabaseService
      .from('profiles')
      .select('stripe_customer_id, email, full_name')
      .eq('id', user.id)
      .single();

    console.log('Profile data:', profileData);
    console.log('Profile error:', profileError);

    if (!profileData?.stripe_customer_id) {
      return new Response(JSON.stringify({
        success: false,
        error: "No Stripe Customer ID found in profile",
        details: {
          userId: user.id,
          email: user.email,
          profileFound: !!profileData,
          profileError: profileError?.message
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Test Stripe customer retrieval
    console.log('Testing Stripe customer retrieval...');
    const customerId = profileData.stripe_customer_id.trim();
    console.log('Testing with customer ID:', customerId);

    try {
      const customer = await stripe.customers.retrieve(customerId);
      console.log('Customer retrieved successfully:', customer.id, customer.email);

      // Test data retrieval
      const [subscriptions, invoices, paymentMethods] = await Promise.allSettled([
        stripe.subscriptions.list({ customer: customerId, limit: 10 }),
        stripe.invoices.list({ customer: customerId, limit: 10 }),
        stripe.paymentMethods.list({ customer: customerId, limit: 10 })
      ]);

      return new Response(JSON.stringify({
        success: true,
        results: {
          stripeAccount: {
            id: account.id,
            displayName: account.display_name,
            country: account.country
          },
          profile: {
            found: true,
            customerId: customerId,
            email: profileData.email
          },
          customer: {
            id: customer.id,
            email: customer.email,
            created: customer.created,
            balance: customer.balance
          },
          data: {
            subscriptions: subscriptions.status === 'fulfilled' ? subscriptions.value.data.length : 0,
            invoices: invoices.status === 'fulfilled' ? invoices.value.data.length : 0,
            paymentMethods: paymentMethods.status === 'fulfilled' ? paymentMethods.value.data.length : 0
          },
          subscriptionDetails: subscriptions.status === 'fulfilled' ? 
            subscriptions.value.data.map(sub => ({
              id: sub.id,
              status: sub.status,
              amount: sub.items.data[0]?.price?.unit_amount,
              interval: sub.items.data[0]?.price?.recurring?.interval
            })) : [],
          invoiceDetails: invoices.status === 'fulfilled' ?
            invoices.value.data.slice(0, 3).map(inv => ({
              id: inv.id,
              status: inv.status,
              amount: inv.amount_paid,
              created: inv.created
            })) : []
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } catch (customerError) {
      console.error('Customer retrieval failed:', customerError);
      return new Response(JSON.stringify({
        success: false,
        error: "Failed to retrieve Stripe customer",
        details: {
          customerId: customerId,
          errorMessage: customerError.message,
          errorType: customerError.type,
          errorCode: customerError.code
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

  } catch (error) {
    console.error('Stripe connection test failed:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});