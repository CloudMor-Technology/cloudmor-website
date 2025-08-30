
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log('Customer portal function started, method:', req.method);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting customer portal request...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase configuration missing");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
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

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || Deno.env.get("Stripe Secret Key") || Deno.env.get("Stripe API Key");
    if (!stripeKey) {
      console.error('Stripe Secret Key not found in environment');
      console.log('Available env vars:', Object.keys(Deno.env.toObject()));
      throw new Error("Stripe Secret Key not configured");
    }
    
    console.log('Using Stripe key:', stripeKey.substring(0, 8) + '...');

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Look up customer by email instead of using hardcoded ID
    console.log('Looking up Stripe customer for:', user.email);
    
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1
    });

    if (customers.data.length === 0) {
      throw new Error("No Stripe customer found for this user. Please make a purchase first.");
    }

    const customerId = customers.data[0].id;
    console.log('Found customer ID:', customerId);

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.get("origin")}/portal?tab=billing`,
    });

    console.log('Customer portal session created:', session.id);

    return new Response(JSON.stringify({ url: session.url }), {
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
