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

    // Parse request body first
    let requestBody = {};
    try {
      const bodyText = await req.text();
      if (bodyText) {
        requestBody = JSON.parse(bodyText);
        console.log('Request body parsed:', requestBody);
      }
    } catch (e) {
      console.log('No request body or parse error:', e);
    }

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

    // Use anon key for auth operations to avoid JWT issues
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

    // Check if admin is impersonating another user
    const { data: adminProfile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    console.log('Admin profile role:', adminProfile?.role);
    console.log('Request body received:', requestBody);
    console.log('Impersonate email from body:', (requestBody as any).impersonateEmail);
    
    let targetEmail = user.email;
    let isImpersonating = false;

    // If admin, check for impersonation parameter
    if (adminProfile?.role === 'admin') {
      console.log('User is admin, checking for impersonation...');
      if ((requestBody as any).impersonateEmail) {
        targetEmail = (requestBody as any).impersonateEmail;
        isImpersonating = true;
        console.log('IMPERSONATION ACTIVE - Admin impersonating user:', targetEmail);
      } else {
        console.log('No impersonation email found in request body');
      }
    } else {
      console.log('User is not admin, role:', adminProfile?.role);
    }

    console.log('Final target email:', targetEmail, 'Impersonating:', isImpersonating);

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY not found in environment');
      throw new Error("Stripe Secret Key not configured");
    }

    console.log('Initializing Stripe...');
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Get user profile to check for existing customer ID
    console.log('Checking profile for existing customer ID...');
    console.log('User ID:', user.id);
    console.log('Target email:', targetEmail);
    
    let { data: profileData, error: profileError } = await supabaseClient
      .from('profiles')
      .select('stripe_customer_id, email, full_name')
      .eq('id', user.id)
      .single();

    console.log('Profile query completed');
    console.log('Profile error:', profileError);
    console.log('Raw profile data:', profileData);
    
    if (profileError) {
      console.error('Error fetching profile:', profileError);
      // Try alternative lookup by email as fallback
      console.log('Trying fallback lookup by email...');
      const { data: fallbackProfile, error: fallbackError } = await supabaseClient
        .from('profiles')
        .select('stripe_customer_id, email, full_name')
        .eq('email', targetEmail)
        .single();
      
      console.log('Fallback profile data:', fallbackProfile);
      console.log('Fallback error:', fallbackError);
      
      if (fallbackProfile?.stripe_customer_id) {
        console.log('Using fallback profile data');
        profileData = fallbackProfile;
      }
    }

    let customerId = profileData?.stripe_customer_id?.trim();
    
    console.log('Profile customer ID from admin settings:', customerId);
    console.log('Profile data used:', {
      email: profileData?.email,
      hasCustomerId: !!customerId,
      customerIdLength: customerId?.length
    });

    if (!customerId || customerId === '') {
      console.log('No customer ID found in profile for:', targetEmail);
      console.log('Profile lookup details:', {
        userId: user.id,
        targetEmail: targetEmail,
        profileData: profileData,
        hasProfile: !!profileData,
        customerIdRaw: profileData?.stripe_customer_id
      });
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          customer: { email: targetEmail },
          thisMonthTotal: 0,
          totalSpentThisYear: 0,
          totalSpent2024: 0,
          totalSpent2025: 0,
          nextBillingDate: 'No active subscription',
          subscriptions: [],
          paymentMethods: [],
          invoices: [],
          upcomingInvoice: null,
          clientEmail: targetEmail,
          customerId: null,
          isImpersonating,
          adminEmail: user.email,
          targetEmail,
          message: `No Stripe Customer ID configured by admin. Please contact your administrator to set up your Stripe Customer ID. Debug: UserID=${user.id}, Email=${targetEmail}, ProfileFound=${!!profileData}`
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Use ONLY the customer ID from the profile - never create or lookup by email
    let customer;
    try {
      console.log('Attempting to retrieve Stripe customer:', customerId);
      customer = await stripe.customers.retrieve(customerId);
      console.log('Successfully retrieved customer using admin-configured ID:', customerId);
      console.log('Customer object:', JSON.stringify(customer, null, 2));
    } catch (error) {
      console.error('Failed to retrieve customer with admin ID:', customerId, error);
      console.error('Error details:', error.message, error.type, error.code);
      return new Response(JSON.stringify({
        success: true,
        data: {
          customer: { email: targetEmail },
          thisMonthTotal: 0,
          totalSpentThisYear: 0,
          totalSpent2024: 0,
          totalSpent2025: 0,
          nextBillingDate: 'No active subscription',
          subscriptions: [],
          paymentMethods: [],
          invoices: [],
          upcomingInvoice: null,
          clientEmail: targetEmail,
          customerId: customerId,
          isImpersonating,
          adminEmail: user.email,
          targetEmail,
          message: `Invalid Stripe Customer ID (${customerId}) configured by admin. Error: ${error.message}. Please contact your administrator to correct the Stripe Customer ID.`
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    console.log('Using admin-configured customer ID for billing:', customerId);

    console.log('Fetching comprehensive dashboard data for:', customer.id);

    // Fetch all data in parallel with better error handling
    const [customerDetails, subscriptions, invoices, paymentMethods, allInvoices] = await Promise.allSettled([
      stripe.customers.retrieve(customer.id),
      stripe.subscriptions.list({ 
        customer: customer.id, 
        limit: 100,  // Increased limit
        status: 'all', // Get all statuses
        expand: ['data.items.data.price.product']
      }),
      stripe.invoices.list({ 
        customer: customer.id, 
        limit: 100  // Increased for recent invoices
      }),
      stripe.paymentMethods.list({ 
        customer: customer.id
        // Removed type restriction to get all payment methods
      }),
      // Fetch more invoices for yearly calculation
      stripe.invoices.list({ 
        customer: customer.id, 
        limit: 100,
        created: {
          gte: Math.floor(new Date('2024-01-01').getTime() / 1000), // From 2024
        }
      })
    ]);

    console.log('Subscription fetch result:', subscriptions.status);
    if (subscriptions.status === 'fulfilled') {
      console.log('Found subscriptions:', subscriptions.value.data.length);
      console.log('Raw subscription data:', JSON.stringify(subscriptions.value.data, null, 2));
      subscriptions.value.data.forEach(sub => {
        console.log(`Subscription ${sub.id}: status=${sub.status}, amount=${sub.items.data[0]?.price?.unit_amount}`);
      });
    } else {
      console.error('Subscription fetch failed:', subscriptions.reason);
    }

    console.log('Invoice fetch result:', invoices.status);
    if (invoices.status === 'fulfilled') {
      console.log('Found invoices:', invoices.value.data.length);
      console.log('Raw invoice data (first 3):', JSON.stringify(invoices.value.data.slice(0, 3), null, 2));
    } else {
      console.error('Invoice fetch failed:', invoices.reason);
    }

    console.log('Payment methods fetch result:', paymentMethods.status);
    if (paymentMethods.status === 'fulfilled') {
      console.log('Found payment methods:', paymentMethods.value.data.length);
      console.log('Raw payment methods data:', JSON.stringify(paymentMethods.value.data, null, 2));
    } else {
      console.error('Payment methods fetch failed:', paymentMethods.reason);
    }

    console.log('Customer details fetch result:', customerDetails.status);
    if (customerDetails.status === 'fulfilled') {
      console.log('Customer details:', JSON.stringify(customerDetails.value, null, 2));
    } else {
      console.error('Customer details fetch failed:', customerDetails.reason);
    }

    // Try to get upcoming invoice
    let upcomingInvoice = null;
    try {
      upcomingInvoice = await stripe.invoices.retrieveUpcoming({
        customer: customer.id,
      });
      console.log('Upcoming invoice found');
    } catch (e) {
      console.log('No upcoming invoice found (normal)');
      upcomingInvoice = null;
    }

    // Calculate this month's total using recent invoices
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

    // Calculate total spent across 2024 and 2025 using all invoices
    let totalSpentThisYear = 0;
    let totalSpent2024 = 0;
    let totalSpent2025 = 0;
    
    // Use the larger invoice dataset for yearly calculations
    const yearlyInvoices = allInvoices.status === 'fulfilled' ? allInvoices.value : invoices.value;
    
    if (yearlyInvoices && yearlyInvoices.status !== 'rejected') {
      yearlyInvoices.data.forEach(invoice => {
        const invoiceDate = new Date(invoice.created * 1000);
        const invoiceYear = invoiceDate.getFullYear();
        
        if (invoice.status === 'paid') {
          if (invoiceYear === 2024) {
            totalSpent2024 += (invoice.amount_paid || 0);
          } else if (invoiceYear === 2025) {
            totalSpent2025 += (invoice.amount_paid || 0);
          }
          
          // Current year total
          if (invoiceYear === currentYear) {
            totalSpentThisYear += (invoice.amount_paid || 0);
          }
        }
      });
    }

    console.log('Yearly totals calculated:');
    console.log('2024 total:', totalSpent2024);
    console.log('2025 total:', totalSpent2025);
    console.log('This year total:', totalSpentThisYear);

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

    // Process invoices data - use more comprehensive list
    const processedInvoices = invoices.status === 'fulfilled' 
      ? invoices.value.data.map(invoice => ({
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
          }),
          year: new Date(invoice.created * 1000).getFullYear()
        }))
      : [];

    // Process payment methods data - handle all types
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
          // Handle other payment method types
          bank_account: pm.type === 'us_bank_account' ? pm.us_bank_account : null,
          sepa_debit: pm.type === 'sepa_debit' ? pm.sepa_debit : null,
          created: pm.created
        }))
      : [];

    console.log('Dashboard data prepared successfully');
    console.log('Final processed data counts:');
    console.log('Subscriptions:', processedSubscriptions.length);
    console.log('Invoices:', processedInvoices.length);
    console.log('Payment Methods:', processedPaymentMethods.length);

    // Return comprehensive dashboard data
    const dashboardData = {
      customer: customerDetails.status === 'fulfilled' ? {
        id: (customerDetails.value as any).id,
        name: (customerDetails.value as any).name,
        email: (customerDetails.value as any).email,
        balance: (customerDetails.value as any).balance || 0,
        created: (customerDetails.value as any).created,
        currency: (customerDetails.value as any).currency || 'usd'
      } : { email: targetEmail },
      subscriptions: processedSubscriptions,
      invoices: processedInvoices,
      paymentMethods: processedPaymentMethods,
      upcomingInvoice,
      thisMonthTotal,
      totalSpentThisYear,
      totalSpent2024,
      totalSpent2025,
      nextBillingDate,
      clientEmail: targetEmail,
      customerId: customer.id,
      isImpersonating,
      adminEmail: user.email,
      targetEmail
    };

    console.log('Returning dashboard data with clientEmail:', targetEmail, 'isImpersonating:', isImpersonating);

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