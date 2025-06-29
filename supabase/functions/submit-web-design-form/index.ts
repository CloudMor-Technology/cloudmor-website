
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData = await req.json()
    
    // Get Airtable credentials from environment variables
    const airtableApiKey = Deno.env.get('AIRTABLE_API_KEY')
    const airtableBaseId = Deno.env.get('AIRTABLE_BASE_ID')
    const airtableTableName = Deno.env.get('AIRTABLE_TABLE_NAME') || 'Web Design Requests'
    
    if (!airtableApiKey || !airtableBaseId) {
      throw new Error('Airtable configuration missing')
    }

    // Prepare data for Airtable
    const airtableData = {
      records: [
        {
          fields: {
            "Business Name": formData.businessName,
            "Contact Name": formData.contactName,
            "Email": formData.email,
            "Phone": formData.phone,
            "Business Type": formData.businessType,
            "Website Goals": formData.websiteGoals,
            "Current Website": formData.currentWebsite || "",
            "Timeline": formData.timeline,
            "Budget": formData.budget,
            "Additional Info": formData.additionalInfo || "",
            "Submitted At": new Date().toISOString(),
            "Status": "New"
          }
        }
      ]
    }

    // Send to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airtableData),
      }
    )

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text()
      console.error('Airtable API error:', errorData)
      throw new Error(`Airtable API error: ${airtableResponse.status}`)
    }

    const result = await airtableResponse.json()
    console.log('Form submitted successfully to Airtable:', result)

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error submitting form:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to submit form' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
