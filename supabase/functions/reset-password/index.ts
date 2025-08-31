import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
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
    const { token, newPassword }: ResetPasswordRequest = await req.json();
    
    console.log('Processing password reset request');

    // Validate password strength
    if (!newPassword || newPassword.length < 8) {
      return new Response(JSON.stringify({ 
        error: 'Password must be at least 8 characters long' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Hash the provided token
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const tokenHash = Array.from(new Uint8Array(hashBuffer), byte => 
      byte.toString(16).padStart(2, '0')
    ).join('');

    // Find user with valid reset token
    const now = new Date().toISOString();
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('reset_token_hash', tokenHash)
      .gt('reset_token_expires_at', now)
      .is('reset_token_used_at', null)
      .maybeSingle();

    if (profileError) {
      console.error('Error looking up profile:', profileError);
      return new Response(JSON.stringify({ 
        error: 'Invalid or expired link. Request a new reset email.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!profile) {
      console.log('No valid reset token found');
      return new Response(JSON.stringify({ 
        error: 'Invalid or expired link. Request a new reset email.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get the auth user by email to update password
    const { data: authUser, error: authUserError } = await supabase.auth.admin.listUsers();
    
    if (authUserError) {
      console.error('Error listing users:', authUserError);
      throw new Error('Failed to update password');
    }

    const user = authUser.users.find(u => u.email === profile.email);
    if (!user) {
      console.error('Auth user not found for email:', profile.email);
      throw new Error('User not found');
    }

    // Update password in Supabase Auth
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Error updating password:', updateError);
      throw new Error('Failed to update password');
    }

    // Mark token as used and clear reset fields
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({
        reset_token_hash: null,
        reset_token_expires_at: null,
        reset_token_used_at: new Date().toISOString()
      })
      .eq('id', profile.id);

    if (profileUpdateError) {
      console.error('Error updating profile after password reset:', profileUpdateError);
    }

    console.log('Password reset successful for user:', profile.email);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in reset-password function:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to reset password. Please try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);