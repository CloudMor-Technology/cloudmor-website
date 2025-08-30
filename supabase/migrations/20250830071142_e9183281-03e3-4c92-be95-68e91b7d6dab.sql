-- Add jira_email column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN jira_email TEXT;