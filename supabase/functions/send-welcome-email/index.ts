import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name: string;
  companyName?: string;
  temporaryPassword?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, companyName, temporaryPassword }: WelcomeEmailRequest = await req.json();

    console.log('Sending welcome email to:', email);

    const emailResponse = await resend.emails.send({
      from: "CloudMor Support <welcome@cloudmor.com>",
      to: [email],
      subject: "Welcome to CloudMor Client Portal",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
          <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #1e3a8a, #3b82f6);">
            <img src="https://cloudmor.com/logo.png" alt="CloudMor Logo" style="height: 60px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to CloudMor</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your Client Portal is Ready</p>
          </div>
          
          <div style="padding: 40px 20px; background: white;">
            <h2 style="color: #1e3a8a; margin-bottom: 20px;">Hello ${name}!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Welcome to CloudMor! Your client portal account has been created and is ready to use.
              ${companyName ? `We're excited to work with ${companyName} and provide you with exceptional IT services.` : ''}
            </p>
            
            <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">Portal Access Details:</h3>
              <p style="margin: 10px 0;"><strong>Portal URL:</strong> https://portal.cloudmor.com</p>
              <p style="margin: 10px 0;"><strong>Your Email:</strong> ${email}</p>
              ${temporaryPassword ? `<p style="margin: 10px 0;"><strong>Temporary Password:</strong> ${temporaryPassword}</p>
              <p style="color: #dc2626; font-size: 14px; margin-top: 15px;">⚠️ Please change your password after your first login for security.</p>` : ''}
            </div>
            
            <div style="margin: 30px 0;">
              <h3 style="color: #1e3a8a;">What you can do in your portal:</h3>
              <ul style="line-height: 1.8; color: #4b5563;">
                <li>📋 View your service agreements and billing information</li>
                <li>🎫 Submit support tickets and track their progress</li>
                <li>📊 Access performance reports and analytics</li>
                <li>💬 Communicate directly with your support team</li>
                <li>📄 Download important documents and resources</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://portal.cloudmor.com" 
                 style="background: #f97316; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                Access Your Portal Now
              </a>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 30px; margin-top: 40px;">
              <h3 style="color: #1e3a8a;">Need Help?</h3>
              <p style="line-height: 1.6;">
                If you have any questions or need assistance accessing your portal, our support team is here to help:
              </p>
              <ul style="line-height: 1.8; color: #4b5563;">
                <li>📧 Email: <a href="mailto:support@cloudmor.com" style="color: #3b82f6;">support@cloudmor.com</a></li>
                <li>📞 Phone: (888) 554-6597</li>
                <li>🌐 Support Portal: <a href="https://support.cloudmor.com" style="color: #3b82f6;">support.cloudmor.com</a></li>
              </ul>
            </div>
          </div>
          
          <div style="background: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Thank you for choosing CloudMor for your IT needs!<br>
              We look forward to serving you.
            </p>
            <div style="margin-top: 20px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                CloudMor | Professional IT Services<br>
                This email was sent to ${email}
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);