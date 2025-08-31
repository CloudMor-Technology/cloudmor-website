-- Add Jira SSO columns to clients table
ALTER TABLE public.clients 
ADD COLUMN jira_base_url text,
ADD COLUMN jira_cloud_id text,
ADD COLUMN jira_access_token text,
ADD COLUMN jira_refresh_token text,
ADD COLUMN jira_connected boolean DEFAULT false,
ADD COLUMN jira_expires_at timestamp with time zone,
ADD COLUMN jira_last_sync timestamp with time zone;

-- Add indexes for performance
CREATE INDEX idx_clients_jira_connected ON public.clients(jira_connected);
CREATE INDEX idx_clients_jira_expires_at ON public.clients(jira_expires_at);

-- Update existing CloudMor Test client with Jira base URL
UPDATE public.clients 
SET jira_base_url = 'https://cloudmor.atlassian.net'
WHERE company_name ILIKE '%cloudmor%' OR contact_email ILIKE '%cloudmor%';