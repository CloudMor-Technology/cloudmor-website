
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JiraTicketRequest {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    businessName: string;
    businessIndustry: string;
    businessDescription: string;
    productsServices: string;
    targetAudience: string;
    colorPreferences: string[];
    mainGoals: string[];
    biggestChallenge: string;
    hearAboutUs: string;
    additionalInfo: string;
    [key: string]: any;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData }: JiraTicketRequest = await req.json();
    
    // Get Jira credentials from environment variables
    const JIRA_DOMAIN = Deno.env.get('JIRA_DOMAIN'); // e.g., yourcompany.atlassian.net
    const JIRA_EMAIL = Deno.env.get('JIRA_EMAIL');
    const JIRA_API_TOKEN = Deno.env.get('JIRA_API_TOKEN');
    const JIRA_PROJECT_KEY = Deno.env.get('JIRA_PROJECT_KEY'); // e.g., SUPPORT
    
    if (!JIRA_DOMAIN || !JIRA_EMAIL || !JIRA_API_TOKEN || !JIRA_PROJECT_KEY) {
      console.error('Missing Jira configuration');
      return new Response(
        JSON.stringify({ error: 'Jira configuration incomplete' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create the ticket description with all form data
    const description = `
*New Website Design Request*

*Client Information:*
• Name: ${formData.fullName}
• Email: ${formData.email}
• Phone: ${formData.phone}
• Best Time to Contact: ${formData.bestTimeToContact || 'Not specified'}

*Business Information:*
• Business Name: ${formData.businessName}
• Industry: ${formData.businessIndustry}
• Description: ${formData.businessDescription}
• Products/Services: ${formData.productsServices}
• Target Audience: ${formData.targetAudience}

*Design Preferences:*
• Color Preferences: ${formData.colorPreferences.join(', ')}
• Specific Colors: ${formData.specificColors || 'None specified'}

*Website Goals:*
• Main Goals: ${formData.mainGoals.join(', ')}
• Biggest Challenge: ${formData.biggestChallenge || 'Not specified'}

*Additional Information:*
• How they heard about us: ${formData.hearAboutUs}
• Additional Info: ${formData.additionalInfo || 'None provided'}
• Previous Experience: ${formData.previousExperience || 'Not specified'}
• Competitor Websites: ${formData.competitorWebsites || 'None provided'}
• Referral: ${formData.referralName || 'None'}

*Agreement Status:*
• Understands Offer: ${formData.understandsOffer ? 'Yes' : 'No'}
• Agrees to Provide Content: ${formData.agreesToProvideContent ? 'Yes' : 'No'}
• Preferred Contact Method: ${formData.preferredContact}
    `;

    // Prepare Jira ticket data
    const jiraTicketData = {
      fields: {
        project: {
          key: JIRA_PROJECT_KEY
        },
        summary: `Website Design Request - ${formData.businessName}`,
        description: description,
        issuetype: {
          name: "Service Request" // You can change this to "Task" or other issue types
        },
        reporter: {
          emailAddress: JIRA_EMAIL // Use your email as reporter since client might not exist in Jira
        },
        // Add custom fields if needed
        customfield_10000: formData.businessIndustry, // Example custom field
      }
    };

    // Create Basic Auth header
    const auth = btoa(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`);
    
    console.log('Creating Jira ticket for:', formData.businessName);
    
    // Make API call to Jira
    const jiraResponse = await fetch(`https://${JIRA_DOMAIN}/rest/api/2/issue`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(jiraTicketData)
    });

    if (!jiraResponse.ok) {
      const errorText = await jiraResponse.text();
      console.error('Jira API error:', errorText);
      throw new Error(`Jira API error: ${jiraResponse.status} - ${errorText}`);
    }

    const jiraResult = await jiraResponse.json();
    console.log('Jira ticket created successfully:', jiraResult.key);

    return new Response(
      JSON.stringify({ 
        success: true, 
        ticketKey: jiraResult.key,
        ticketId: jiraResult.id,
        ticketUrl: `https://${JIRA_DOMAIN}/browse/${jiraResult.key}`
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error creating Jira ticket:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create Jira ticket',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
};

serve(handler);
