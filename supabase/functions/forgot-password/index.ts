import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ForgotPasswordRequest {
  email: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Resend inside the handler to catch errors properly
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not set');
      return new Response(JSON.stringify({ 
        error: 'Email service not configured' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendApiKey);
    
    const { email }: ForgotPasswordRequest = await req.json();
    
    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();
    
    console.log('Processing forgot password request for:', normalizedEmail);

    // Look up user by email in profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (profileError) {
      console.error('Error looking up profile:', profileError);
    }

    // Always return success to prevent user enumeration
    if (!profile) {
      console.log('No profile found for email, but returning success');
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate cryptographically secure token
    const tokenBytes = crypto.getRandomValues(new Uint8Array(32));
    const token = Array.from(tokenBytes, byte => byte.toString(16).padStart(2, '0')).join('');
    
    // Hash the token for storage
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const tokenHash = Array.from(new Uint8Array(hashBuffer), byte => 
      byte.toString(16).padStart(2, '0')
    ).join('');

    // Set expiry time (30 minutes from now)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    // Update profile with reset token
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        reset_token_hash: tokenHash,
        reset_token_expires_at: expiresAt.toISOString(),
        reset_token_used_at: null
      })
      .eq('id', profile.id);

    if (updateError) {
      console.error('Error updating profile with reset token:', updateError);
      throw new Error('Failed to generate reset token');
    }

    // Build reset URL
    const baseUrl = Deno.env.get('APP_BASE_URL') || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    // Email template
    const emailHtml = `
<!doctype html>
<html>
  <body style="font-family:Arial,Helvetica,sans-serif;line-height:1.5">
    <p>Hello ${profile.full_name || 'there'},</p>
    <p>We received a request to reset your password for your CloudMor account.</p>
    <p>
      <a href="${resetUrl}" style="display:inline-block;padding:10px 16px;text-decoration:none;background-color:#1f2937;color:white;border-radius:6px">
        Reset your password
      </a>
    </p>
    <p>If the button doesn't work, copy and paste this link into your browser:<br>
      <span style="word-break:break-all">${resetUrl}</span>
    </p>
    <p>This link expires in 30 minutes and can be used once. If you didn't request this, you can ignore this email.</p>
    <p>Thanks,<br/>CloudMor Support</p>
  </body>
</html>`;

    const emailText = `Hello ${profile.full_name || 'there'},

We received a request to reset your password for your CloudMor account.

Reset your password: ${resetUrl}

If the link doesn't work, copy and paste it into your browser.
This link expires in 30 minutes and can be used once.
If you didn't request this, you can ignore this email.

Thanks,
CloudMor Support`;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: 'No Reply <no-reply@updates.cloudmor.com>',
      to: [normalizedEmail],
      subject: 'Reset your CloudMor password',
      html: emailHtml,
      text: emailText,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in forgot-password function:', error);
    
    // Always return success to prevent information leakage
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);