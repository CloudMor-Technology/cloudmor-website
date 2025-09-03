-- Clean up all client data and non-admin user credentials
-- This will preserve only the admin account (arahimi@cloudmor.com)

-- First, let's delete all client-related data in the correct order to avoid foreign key issues

-- Delete client service assignments
DELETE FROM client_services WHERE client_id IN (
  SELECT id FROM clients WHERE contact_email != 'arahimi@cloudmor.com'
);

-- Delete client support document assignments  
DELETE FROM client_support_document_assignments WHERE client_id IN (
  SELECT id FROM clients WHERE contact_email != 'arahimi@cloudmor.com'
);

-- Delete all client records (except admin if there's one)
DELETE FROM clients WHERE contact_email != 'arahimi@cloudmor.com';

-- Delete non-admin profiles (keep only admin profile)
DELETE FROM profiles WHERE email != 'arahimi@cloudmor.com' AND role != 'admin';

-- Now we need to clean up auth users, but we can't directly delete from auth.users
-- Instead, we'll create a function to identify which users should be deleted
-- and handle the cleanup through the admin functions

-- Create a temporary table to track users that should be deleted
CREATE TEMP TABLE users_to_delete AS
SELECT au.id, au.email
FROM auth.users au
WHERE au.email != 'arahimi@cloudmor.com'
  AND au.email NOT IN (
    SELECT email FROM profiles 
    WHERE role = 'admin' OR email = 'arahimi@cloudmor.com'
  );

-- Log the users that would be deleted (for verification)
-- Note: In a real cleanup, you would use the admin-user-management edge function
-- to delete these users from auth.users as that requires admin privileges

-- For now, let's clean up any orphaned profiles that don't have corresponding clients
DELETE FROM profiles 
WHERE role = 'client' 
  AND email NOT IN (SELECT contact_email FROM clients)
  AND email != 'arahimi@cloudmor.com';

-- Clean up any orphaned contact submissions that might be related to deleted clients
-- (Optional - you may want to keep these for records)
-- DELETE FROM contact_submissions WHERE email NOT IN (
--   SELECT contact_email FROM clients
--   UNION 
--   SELECT 'arahimi@cloudmor.com'
-- );

-- Reset any sequences or cleanup any remaining data
-- Clean up any phone extensions that might be orphaned
DELETE FROM phone_extensions WHERE company_id NOT IN (
  SELECT company_id FROM profiles WHERE company_id IS NOT NULL
);

-- Display summary of cleanup
SELECT 
  'Cleanup Summary' as action,
  (SELECT COUNT(*) FROM clients) as remaining_clients,
  (SELECT COUNT(*) FROM profiles WHERE role = 'client') as remaining_client_profiles,
  (SELECT COUNT(*) FROM client_services) as remaining_client_services,
  (SELECT COUNT(*) FROM client_support_document_assignments) as remaining_document_assignments;