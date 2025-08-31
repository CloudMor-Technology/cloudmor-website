import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OAuthCallbackRequest {
  code: string;
  state: string;
  codeVerifier?: string; // Fallback if not in database
}

serve(async (req) => {
  console.log('Jira OAuth callback function started, method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      return new Response(
        `<html><body><script>window.opener.postMessage({error: '${error}'}, '*'); window.close();</script></body></html>`,
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'text/html' } 
        }
      );
    }

    if (!code || !state) {
      console.error('Missing code or state parameter');
      return new Response(
        `<html><body><script>window.opener.postMessage({error: 'Missing parameters'}, '*'); window.close();</script></body></html>`,
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'text/html' } 
        }
      );
    }

    console.log('Processing OAuth callback with state:', state);

    // Retrieve OAuth session from database
    const { data: oauthSession, error: sessionError } = await supabaseClient
      .from('oauth_sessions')
      .select('*')
      .eq('state', state)
      .not('expires_at', 'lt', new Date().toISOString())
      .single();

    if (sessionError || !oauthSession) {
      console.error('Invalid or expired OAuth session:', sessionError);
      return new Response(
        `<html><body><script>window.opener.postMessage({error: 'Invalid or expired session'}, '*'); window.close();</script></body></html>`,
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'text/html' } 
        }
      );
    }

    // Get OAuth credentials from environment
    const clientId = Deno.env.get('ATLASSIAN_CLIENT_ID');
    const clientSecret = Deno.env.get('ATLASSIAN_CLIENT_SECRET');
    const redirectUri = Deno.env.get('ATLASSIAN_REDIRECT_URI');

    if (!clientId || !clientSecret || !redirectUri) {
      console.error('Missing OAuth credentials');
      return new Response(
        `<html><body><script>window.opener.postMessage({error: 'OAuth credentials not configured'}, '*'); window.close();</script></body></html>`,
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'text/html' } 
        }
      );
    }

    // Exchange authorization code for access token
    console.log('Exchanging code for tokens');
    const tokenResponse = await fetch('https://auth.atlassian.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
        code_verifier: oauthSession.code_verifier,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', errorText);
      return new Response(
        `<html><body><script>window.opener.postMessage({error: 'Token exchange failed'}, '*'); window.close();</script></body></html>`,
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'text/html' } 
        }
      );
    }

    const tokens = await tokenResponse.json();
    console.log('Received tokens:', { ...tokens, access_token: '[HIDDEN]', refresh_token: '[HIDDEN]' });

    // Get accessible resources (Jira instances)
    const resourcesResponse = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
        'Accept': 'application/json',
      },
    });

    if (!resourcesResponse.ok) {
      console.error('Failed to get accessible resources');
      return new Response(
        `<html><body><script>window.opener.postMessage({error: 'Failed to get Jira resources'}, '*'); window.close();</script></body></html>`,
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'text/html' } 
        }
      );
    }

    const resources = await resourcesResponse.json();
    console.log('Accessible resources:', resources);

    if (!resources || resources.length === 0) {
      console.error('No accessible Jira resources found');
      return new Response(
        `<html><body><script>window.opener.postMessage({error: 'No accessible Jira instances found'}, '*'); window.close();</script></body></html>`,
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'text/html' } 
        }
      );
    }

    // Use the first available resource (or you could let user choose)
    const primaryResource = resources[0];
    const jiraBaseUrl = `https://${primaryResource.url}`;
    const jiraCloudId = primaryResource.id;

    console.log('Using Jira resource:', { url: jiraBaseUrl, cloudId: jiraCloudId });

    // Encrypt tokens (simple base64 encoding for now, use proper encryption in production)
    const encryptionKey = Deno.env.get('JIRA_ENCRYPTION_KEY') || 'default-key';
    const encryptedAccessToken = btoa(tokens.access_token + ':' + encryptionKey);
    const encryptedRefreshToken = tokens.refresh_token ? btoa(tokens.refresh_token + ':' + encryptionKey) : null;

    // Calculate token expiration
    const expiresAt = new Date(Date.now() + (tokens.expires_in || 3600) * 1000);

    // Update client record with Jira connection info
    const { error: updateError } = await supabaseClient
      .from('clients')
      .update({
        jira_base_url: jiraBaseUrl,
        jira_cloud_id: jiraCloudId,
        jira_access_token: encryptedAccessToken,
        jira_refresh_token: encryptedRefreshToken,
        jira_connected: true,
        jira_expires_at: expiresAt.toISOString(),
        jira_last_sync: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('contact_email', oauthSession.user_email || '')
      .or(`contact_email.eq.${oauthSession.user_email}`);

    // Also try to find by user ID if email doesn't work
    if (updateError) {
      console.log('Trying to update by user relationship');
      // Get user's profile to find their email
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('email')
        .eq('id', oauthSession.user_id)
        .single();

      if (profile) {
        const { error: updateError2 } = await supabaseClient
          .from('clients')
          .update({
            jira_base_url: jiraBaseUrl,
            jira_cloud_id: jiraCloudId,
            jira_access_token: encryptedAccessToken,
            jira_refresh_token: encryptedRefreshToken,
            jira_connected: true,
            jira_expires_at: expiresAt.toISOString(),
            jira_last_sync: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('contact_email', profile.email);

        if (updateError2) {
          console.error('Error updating client Jira info:', updateError2);
        }
      }
    }

    // Clean up OAuth session
    await supabaseClient
      .from('oauth_sessions')
      .delete()
      .eq('id', oauthSession.id);

    console.log('OAuth flow completed successfully');

    // Return success response that closes the popup
    return new Response(
      `<html>
        <body>
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h2 style="color: green;">✅ Jira Connected Successfully!</h2>
            <p>You can now access your Jira portal seamlessly.</p>
            <p>This window will close automatically...</p>
          </div>
          <script>
            window.opener.postMessage({success: true, message: 'Jira connected successfully'}, '*');
            setTimeout(() => window.close(), 2000);
          </script>
        </body>
      </html>`,
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'text/html' } 
      }
    );

  } catch (error) {
    console.error('Error in Jira OAuth callback function:', error);
    return new Response(
      `<html><body><script>window.opener.postMessage({error: 'Internal server error'}, '*'); window.close();</script></body></html>`,
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'text/html' } 
      }
    );
  }
});