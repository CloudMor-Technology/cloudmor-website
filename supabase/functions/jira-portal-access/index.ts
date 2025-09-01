import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Jira portal access function started, method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify the user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      console.error('Authentication error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('User authenticated:', user.email);

    // Get client record
    const { data: clientData, error: clientError } = await supabaseClient
      .from('clients')
      .select('*')
      .eq('contact_email', user.email)
      .single();

    if (clientError || !clientData) {
      console.error('Error fetching client data:', clientError);
      return new Response(
        JSON.stringify({ error: 'No Jira connection found. Please configure your Jira settings first.' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!clientData.jira_connected || !clientData.jira_api_token) {
      return new Response(
        JSON.stringify({ error: 'Jira not connected. Please configure your Jira settings first.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Decrypt the token
    const decryptedToken = await decryptToken(clientData.jira_api_token);
    
    // Verify the connection is still valid
    const testResult = await testJiraConnection(
      clientData.jira_base_url, 
      clientData.jira_email, 
      decryptedToken
    );

    if (!testResult.success) {
      // Update connection status
      await supabaseClient
        .from('clients')
        .update({ 
          jira_connected: false,
          jira_last_test: new Date().toISOString()
        })
        .eq('contact_email', user.email);

      return new Response(
        JSON.stringify({ 
          error: 'Jira connection expired or invalid. Please reconfigure your settings.',
          details: testResult.error
        }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Update last test timestamp
    await supabaseClient
      .from('clients')
      .update({ 
        jira_last_test: new Date().toISOString()
      })
      .eq('contact_email', user.email);

    // Return the Jira portal URL
    const portalUrl = `${clientData.jira_base_url}/servicedesk/customer/portals`;

    return new Response(
      JSON.stringify({ 
        success: true,
        portalUrl: portalUrl,
        message: 'Connection verified successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in Jira portal access function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function testJiraConnection(baseUrl: string, email: string, apiToken: string) {
  try {
    // Create basic auth header
    const auth = btoa(`${email}:${apiToken}`);
    
    // Test connection by getting user info
    const response = await fetch(`${baseUrl}/rest/api/3/myself`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Jira API error:', response.status, errorText);
      
      return { 
        success: false, 
        error: response.status === 401 ? 'Invalid credentials' : 'Connection failed'
      };
    }

    const userData = await response.json();
    return { success: true, user: userData };

  } catch (error) {
    console.error('Error testing Jira connection:', error);
    return { success: false, error: 'Connection failed' };
  }
}

async function decryptToken(encryptedToken: string): Promise<string> {
  const encryptionKey = Deno.env.get('JIRA_ENCRYPTION_KEY');
  if (!encryptionKey) {
    // If no encryption key, assume it's plain text
    return encryptedToken;
  }

  try {
    // Simple base64 decoding for now - in production use proper decryption
    const decoded = atob(encryptedToken);
    return decoded;
  } catch (error) {
    console.error('Error decrypting token:', error);
    // Fallback to assuming it's plain text
    return encryptedToken;
  }
}