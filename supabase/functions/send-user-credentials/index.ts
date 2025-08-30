import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UserCredentialsRequest {
  email: string;
  full_name: string;
  password: string;
  company_name?: string;
  role: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, full_name, password, company_name, role }: UserCredentialsRequest = await req.json();

    console.log('Sending credentials email to:', email);

    const emailResponse = await resend.emails.send({
      from: "CloudMor Portal <noreply@cloudmor.com>",
      to: [email],
      subject: "Your CloudMor Portal Access",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; margin-bottom: 24px;">Welcome to CloudMor Portal!</h1>
          
          <p style="margin-bottom: 16px;">Hello ${full_name},</p>
          
          <p style="margin-bottom: 16px;">Your account has been created for the CloudMor Client Portal. Here are your login credentials:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0 0 8px 0;"><strong>Password:</strong> ${password}</p>
            <p style="margin: 0;"><strong>Role:</strong> ${role}</p>
            ${company_name ? `<p style="margin: 8px 0 0 0;"><strong>Company:</strong> ${company_name}</p>` : ''}
          </div>
          
          <p style="margin-bottom: 16px;">You can access the portal at: <a href="${req.headers.get("origin") || "https://your-portal-url.com"}/portal" style="color: #2563eb;">CloudMor Client Portal</a></p>
          
          <p style="margin-bottom: 16px;"><strong>Important:</strong> Please change your password after your first login for security purposes.</p>
          
          <hr style="border: 1px solid #e5e7eb; margin: 32px 0;">
          
          <p style="color: #6b7280; font-size: 14px;">If you have any questions or need assistance, please contact our support team.</p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
            Best regards,<br>
            The CloudMor Team
          </p>
        </div>
      `,
    });

    console.log("Credentials email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-user-credentials function:", error);
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