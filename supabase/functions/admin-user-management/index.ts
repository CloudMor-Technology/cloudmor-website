import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const resendApiKey = Deno.env.get('RESEND_API_KEY')!;

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

const welcomeEmailTemplate = (clientName: string, email: string, password: string, companyName: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
    .credentials { background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; color: #64748b; margin-top: 30px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to CloudMor Client Portal</h1>
      <p>Your account has been created successfully</p>
    </div>
    <div class="content">
      <h2>Hello ${clientName},</h2>
      <p>Welcome to the CloudMor Client Portal! We're excited to have ${companyName} as our client.</p>
      
      <p>Your account has been created and you now have access to our comprehensive client portal where you can:</p>
      <ul>
        <li>View your services and account information</li>
        <li>Access billing and payment management</li>
        <li>Submit support tickets and access documentation</li>
        <li>Manage your account settings</li>
      </ul>

      <div class="credentials">
        <h3>Your Login Credentials:</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><em>Please change your password after your first login for security.</em></p>
      </div>

      <a href="https://cloudmor.com/portal" class="button">Access Your Portal</a>

      <p>If you have any questions or need assistance, please don't hesitate to contact our support team:</p>
      <ul>
        <li>Email: support@cloudmor.com</li>
        <li>Phone: (855) 123-4567</li>
        <li>Support Portal: https://support.cloudmor.com</li>
      </ul>

      <div class="footer">
        <p>Best regards,<br>The CloudMor Team</p>
        <p>This email was sent from CloudMor Client Management System</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...data } = await req.json();
    console.log(`Admin operation requested: ${action}`, data);

    switch (action) {
      case 'create_user':
        return await createUserWithEmail(data);
      case 'reset_password':
        return await resetUserPassword(data);
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error: any) {
    console.error('Error in admin-user-management:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});

async function createUserWithEmail(data: any) {
  const { email, password, full_name, company_name } = data;
  
  try {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        company_name
      }
    });

    if (authError) throw authError;

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "CloudMor Support <support@cloudmor.com>",
      to: [email],
      subject: "Welcome to CloudMor Client Portal - Account Created",
      html: welcomeEmailTemplate(full_name || company_name, email, password, company_name),
    });

    console.log('Welcome email sent:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: authData.user,
        email_sent: true 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function resetUserPassword(data: any) {
  const { email, new_password, full_name, company_name } = data;
  
  try {
    // Find user by email
    const { data: users, error: getUserError } = await supabase.auth.admin.listUsers();
    if (getUserError) throw getUserError;
    
    const user = users.users.find((u: any) => u.email === email);
    if (!user) {
      console.log(`User with email ${email} not found in auth system. Available users:`, users.users.map(u => u.email));
      return new Response(
        JSON.stringify({ 
          error: `User account with email "${email}" not found. Please verify the email address or create the user account first.`,
          available_users: users.users.map(u => u.email)
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Update password
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: new_password }
    );

    if (updateError) throw updateError;

    // Send password reset confirmation email
    const emailResponse = await resend.emails.send({
      from: "CloudMor Support <support@cloudmor.com>",
      to: [email],
      subject: "CloudMor Portal - Password Reset Confirmation",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .credentials { background: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Confirmation</h1>
            </div>
            <div class="content">
              <h2>Hello ${full_name || company_name},</h2>
              <p>Your CloudMor Client Portal password has been successfully reset by an administrator.</p>
              
              <div class="credentials">
                <h3>Your New Login Credentials:</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>New Password:</strong> ${new_password}</p>
                <p><em>Please change your password after logging in for security.</em></p>
              </div>

              <a href="https://cloudmor.com/portal" class="button">Access Your Portal</a>

              <p>If you did not request this password reset or have any concerns, please contact our support team immediately.</p>
              
              <p>Best regards,<br>The CloudMor Team</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Password reset email sent:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        email_sent: true 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error resetting password:', error);
    throw error;
  }
}