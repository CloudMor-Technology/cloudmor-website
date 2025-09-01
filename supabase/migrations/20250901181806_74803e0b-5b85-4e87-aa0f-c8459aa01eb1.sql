-- Remove OAuth-related columns and add API token columns to clients table
ALTER TABLE public.clients 
DROP COLUMN IF EXISTS jira_access_token,
DROP COLUMN IF EXISTS jira_refresh_token,
DROP COLUMN IF EXISTS jira_expires_at,
DROP COLUMN IF EXISTS jira_cloud_id;

-- Add new API token columns to clients table
ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS jira_api_token text,
ADD COLUMN IF NOT EXISTS jira_last_test timestamp with time zone;

-- Ensure we have the base URL column (should already exist)
-- ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS jira_base_url text;
-- ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS jira_email text;
-- ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS jira_connected boolean DEFAULT false;

-- Drop the OAuth sessions table as it's no longer needed
DROP TABLE IF EXISTS public.oauth_sessions CASCADE;

-- Update the sync_client_emails function to handle the new structure
CREATE OR REPLACE FUNCTION public.sync_client_emails()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  NEW.stripe_email = NEW.contact_email;
  NEW.jira_email = NEW.contact_email;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;