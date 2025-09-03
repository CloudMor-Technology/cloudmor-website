import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SYNC-PROFILE-STRIPE] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Initialize Supabase client with service role for secure operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      throw new Error(`Authentication failed: ${userError.message}`);
    }
    
    const user = userData.user;
    if (!user?.email) {
      throw new Error("User not authenticated or missing email");
    }

    logStep("User authenticated", { userId: user.id, email: user.email });

    // Initialize Stripe
    const stripeKey = Deno.env.get("Stripe Secret Key");
    if (!stripeKey) {
      throw new Error("Stripe Secret Key not configured");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Look up Stripe customer by email
    logStep("Looking up Stripe customer by email", { email: user.email });
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1
    });

    if (customers.data.length === 0) {
      // Create new Stripe customer if none exists
      logStep("No Stripe customer found, creating new one", { email: user.email });
      
      const newCustomer = await stripe.customers.create({
        email: user.email,
        name: user.user_metadata?.full_name || user.email,
        metadata: {
          supabase_user_id: user.id
        }
      });
      
      logStep("Created new Stripe customer", { customerId: newCustomer.id });
      
      // Update profile with new Stripe customer ID
      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update({ 
          stripe_customer_id: newCustomer.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        logStep("Profile update error", { error: updateError });
        throw new Error(`Failed to update profile: ${updateError.message}`);
      }

      logStep("Profile updated successfully with new Stripe customer ID");

      // Return new customer data
      const customerData = {
        id: newCustomer.id,
        stripe_customer_id: newCustomer.id,
        name: newCustomer.name || '',
        email: newCustomer.email || '',
        phone: newCustomer.phone || ''
      };

      return new Response(JSON.stringify({ 
        success: true,
        customer: customerData,
        message: "New Stripe customer created and profile synced successfully"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customer = customers.data[0];
    logStep("Found Stripe customer", { customerId: customer.id, name: customer.name });

    // Update profile with Stripe customer ID
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({ 
        stripe_customer_id: customer.id,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      logStep("Profile update error", { error: updateError });
      throw new Error(`Failed to update profile: ${updateError.message}`);
    }

    logStep("Profile updated successfully with Stripe customer ID");

    // Return customer data
    const customerData = {
      id: customer.id,
      stripe_customer_id: customer.id,
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || ''
    };

    return new Response(JSON.stringify({ 
      success: true,
      customer: customerData,
      message: "Profile synced with Stripe successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in sync-profile-stripe", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      customer: null 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});