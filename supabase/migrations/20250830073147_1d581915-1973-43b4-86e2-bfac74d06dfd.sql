-- Add access_permissions column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN access_permissions JSONB DEFAULT '{"dashboard": true, "billing": false, "support": false, "services": false, "account": true}';