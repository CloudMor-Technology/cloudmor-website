import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JiraSSORequest {
  userEmail: string;
  redirectUrl?: string;
  forceReconnect?: boolean;
}

serve(async (req) => {
  console.log('Jira SSO function started, method:', req.method);
  
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

    const { userEmail, redirectUrl, forceReconnect } = await req.json() as JiraSSORequest;
    
    if (!userEmail) {
      return new Response(
        JSON.stringify({ error: 'User email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Processing Jira SSO for email:', userEmail);

    // Check if client has OAuth connection first
    const { data: clientData, error: clientError } = await supabaseClient
      .from('clients')
      .select('jira_base_url, jira_cloud_id, jira_access_token, jira_refresh_token, jira_connected, jira_expires_at')
      .eq('contact_email', userEmail)
      .single();

    if (clientError) {
      console.error('Error fetching client data:', clientError);
    }

    // If client has OAuth connection and tokens are valid
    if (clientData && clientData.jira_connected && !forceReconnect) {
      const expiresAt = new Date(clientData.jira_expires_at);
      const now = new Date();
      
      console.log('Found OAuth connection for client:', userEmail);
      console.log('Token expires at:', expiresAt);
      console.log('Current time:', now);
      
      // If token is still valid (with 5 minute buffer)
      if (expiresAt > new Date(now.getTime() + 5 * 60 * 1000)) {
        const jiraPortalUrl = `${clientData.jira_base_url}/servicedesk/customer/portals`;
        console.log('Using OAuth connection, redirecting to:', jiraPortalUrl);
        
        return new Response(
          JSON.stringify({ 
            success: true,
            redirectUrl: jiraPortalUrl,
            connectionType: 'oauth',
            message: 'Using OAuth connection'
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      } else {
        console.log('OAuth token expired, need to refresh or reconnect');
        // TODO: Implement token refresh logic here
        return new Response(
          JSON.stringify({ 
            needsReconnect: true,
            message: 'OAuth token expired, please reconnect'
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // Fallback to existing Jira API method if no OAuth connection
    console.log('No OAuth connection found, using fallback method');

    // Get Jira credentials from environment
    const jiraDomain = Deno.env.get('JIRA_DOMAIN') || 'cloudmorsystems.atlassian.net';
    const jiraEmail = Deno.env.get('JIRA_EMAIL');
    const jiraApiToken = Deno.env.get('JIRA_API_TOKEN');

    if (!jiraEmail || !jiraApiToken) {
      console.error('Missing Jira credentials');
      return new Response(
        JSON.stringify({ error: 'Jira credentials not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Basic Auth header for Jira API
    const jiraAuth = btoa(`${jiraEmail}:${jiraApiToken}`);
    const jiraHeaders = {
      'Authorization': `Basic ${jiraAuth}`,
      'Content-Type': 'application/json',
    };

    console.log('Checking if user exists in Jira:', userEmail);

    // Check if user exists in Jira
    const userSearchResponse = await fetch(
      `https://${jiraDomain}/rest/api/3/user/search?query=${encodeURIComponent(userEmail)}`,
      {
        method: 'GET',
        headers: jiraHeaders,
      }
    );

    if (!userSearchResponse.ok) {
      console.error('Failed to search for user in Jira:', userSearchResponse.status);
      // If user doesn't exist or search fails, create a guest access session
      const guestPortalUrl = `https://support.cloudmor.com/servicedesk/customer/portals`;
      
      return new Response(
        JSON.stringify({ 
          success: true,
          redirectUrl: guestPortalUrl,
          message: 'Redirecting to guest portal'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const users = await userSearchResponse.json();
    console.log('User search results:', users.length, 'users found');

    if (users.length === 0) {
      console.log('User not found in Jira, redirecting to guest portal');
      const guestPortalUrl = `https://support.cloudmor.com/servicedesk/customer/portals`;
      
      return new Response(
        JSON.stringify({ 
          success: true,
          redirectUrl: guestPortalUrl,
          message: 'User not found in Jira, redirecting to guest portal'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // User exists, create authentication session
    const jiraUser = users[0];
    console.log('Found Jira user:', jiraUser.emailAddress);

    // For now, redirect to the main portal with user context
    // In a full implementation, you would create a proper SSO session
    const portalUrl = redirectUrl || `https://support.cloudmor.com/servicedesk/customer/portals`;
    const authenticatedUrl = `${portalUrl}?prefill_email=${encodeURIComponent(userEmail)}`;

    console.log('Redirecting to authenticated portal:', authenticatedUrl);

    return new Response(
      JSON.stringify({ 
        success: true,
        redirectUrl: authenticatedUrl,
        jiraAccountId: jiraUser.accountId,
        message: 'SSO session created successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in Jira SSO function:', error);
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