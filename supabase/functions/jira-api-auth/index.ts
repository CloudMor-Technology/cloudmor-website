import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JiraAuthRequest {
  jiraBaseUrl: string;
  jiraEmail: string;
  jiraApiToken: string;
  action: 'test' | 'save';
}

serve(async (req) => {
  console.log('Jira API auth function started, method:', req.method);
  
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

    const { jiraBaseUrl, jiraEmail, jiraApiToken, action }: JiraAuthRequest = await req.json();

    if (!jiraBaseUrl || !jiraEmail || !jiraApiToken) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Test the Jira connection
    const testResult = await testJiraConnection(jiraBaseUrl, jiraEmail, jiraApiToken);
    
    if (!testResult.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: testResult.error,
          details: testResult.details 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // If action is 'save', encrypt and store the token
    if (action === 'save') {
      const encryptedToken = await encryptToken(jiraApiToken);
      
      // Update or insert client record
      const { error: updateError } = await supabaseClient
        .from('clients')
        .upsert([{
          contact_email: user.email,
          company_name: testResult.companyName || 'Unknown',
          jira_base_url: jiraBaseUrl,
          jira_email: jiraEmail,
          jira_api_token: encryptedToken,
          jira_connected: true,
          jira_last_test: new Date().toISOString()
        }], {
          onConflict: 'contact_email'
        });

      if (updateError) {
        console.error('Error saving client data:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to save connection' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        user: testResult.user,
        companyName: testResult.companyName,
        message: action === 'save' ? 'Connection saved successfully' : 'Connection test successful'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in Jira API auth function:', error);
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
      
      if (response.status === 401) {
        return { 
          success: false, 
          error: 'Invalid credentials', 
          details: 'Please check your email and API token' 
        };
      } else if (response.status === 403) {
        return { 
          success: false, 
          error: 'Access denied', 
          details: 'Your account does not have access to this Jira instance' 
        };
      } else {
        return { 
          success: false, 
          error: 'Connection failed', 
          details: `HTTP ${response.status}: ${errorText}` 
        };
      }
    }

    const userData = await response.json();
    console.log('Jira user data:', userData);

    return {
      success: true,
      user: userData,
      companyName: userData.displayName || 'Unknown'
    };

  } catch (error) {
    console.error('Error testing Jira connection:', error);
    return { 
      success: false, 
      error: 'Connection failed', 
      details: error.message 
    };
  }
}

async function encryptToken(token: string): Promise<string> {
  const encryptionKey = Deno.env.get('JIRA_ENCRYPTION_KEY');
  if (!encryptionKey) {
    console.warn('No encryption key found, storing token in plain text');
    return token;
  }

  try {
    // Simple base64 encoding for now - in production use proper encryption
    const encoded = btoa(token);
    return encoded;
  } catch (error) {
    console.error('Error encrypting token:', error);
    return token;
  }
}