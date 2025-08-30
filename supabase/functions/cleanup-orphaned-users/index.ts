import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting cleanup of orphaned users...');

    // Create Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get all auth users
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (authError) {
      throw new Error(`Failed to fetch auth users: ${authError.message}`);
    }

    console.log(`Found ${authUsers.users.length} auth users`);

    // Get all profiles
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('id');

    if (profilesError) {
      throw new Error(`Failed to fetch profiles: ${profilesError.message}`);
    }

    console.log(`Found ${profiles.length} profiles`);

    const profileIds = new Set(profiles.map(p => p.id));
    const orphanedUsers = authUsers.users.filter(user => !profileIds.has(user.id));

    console.log(`Found ${orphanedUsers.length} orphaned users`);

    const deletionResults = [];

    // Delete orphaned auth users
    for (const user of orphanedUsers) {
      try {
        console.log(`Deleting orphaned user: ${user.email} (${user.id})`);
        
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
        
        if (deleteError) {
          console.error(`Failed to delete user ${user.email}:`, deleteError);
          deletionResults.push({
            email: user.email,
            id: user.id,
            success: false,
            error: deleteError.message
          });
        } else {
          console.log(`Successfully deleted orphaned user: ${user.email}`);
          deletionResults.push({
            email: user.email,
            id: user.id,
            success: true
          });
        }
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
        deletionResults.push({
          email: user.email,
          id: user.id,
          success: false,
          error: error.message
        });
      }
    }

    const successCount = deletionResults.filter(r => r.success).length;
    const failureCount = deletionResults.filter(r => !r.success).length;

    return new Response(JSON.stringify({
      success: true,
      message: `Cleanup completed. ${successCount} users deleted, ${failureCount} failed.`,
      results: deletionResults,
      summary: {
        totalAuthUsers: authUsers.users.length,
        totalProfiles: profiles.length,
        orphanedFound: orphanedUsers.length,
        deleted: successCount,
        failed: failureCount
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error in cleanup-orphaned-users function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);