import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting cleanup of orphaned auth users...');
    
    // Get all auth users
    const { data: allUsers, error: getUsersError } = await supabase.auth.admin.listUsers();
    if (getUsersError) {
      console.error('Error fetching users:', getUsersError);
      throw getUsersError;
    }

    console.log(`Found ${allUsers.users.length} total auth users`);

    // Get current profiles to determine which users should be kept
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('email, role');
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      throw profilesError;
    }

    const keepEmails = new Set(profiles.map(p => p.email));
    console.log('Emails to keep:', Array.from(keepEmails));

    // Find users to delete (not in profiles or not admin)
    const usersToDelete = allUsers.users.filter(user => 
      user.email && !keepEmails.has(user.email)
    );

    console.log(`Found ${usersToDelete.length} users to delete:`, usersToDelete.map(u => u.email));

    let deletedCount = 0;
    const errors: string[] = [];

    // Delete each user
    for (const user of usersToDelete) {
      try {
        console.log(`Deleting user: ${user.email}`);
        const { error } = await supabase.auth.admin.deleteUser(user.id);
        
        if (error) {
          console.error(`Error deleting user ${user.email}:`, error);
          errors.push(`Failed to delete ${user.email}: ${error.message}`);
        } else {
          deletedCount++;
          console.log(`Successfully deleted user: ${user.email}`);
        }
      } catch (err) {
        console.error(`Exception deleting user ${user.email}:`, err);
        errors.push(`Exception deleting ${user.email}: ${err.message}`);
      }
    }

    const result = {
      success: true,
      totalUsersFound: allUsers.users.length,
      usersToDelete: usersToDelete.length,
      deletedCount,
      remainingUsers: allUsers.users.length - deletedCount,
      errors: errors.length > 0 ? errors : null,
      keptEmails: Array.from(keepEmails)
    };

    console.log('Cleanup completed:', result);

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in cleanup-client-users:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});