-- Add support_options column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN support_options JSONB DEFAULT '{"support_portal": true, "email_support": true, "phone_support": false}'::jsonb;