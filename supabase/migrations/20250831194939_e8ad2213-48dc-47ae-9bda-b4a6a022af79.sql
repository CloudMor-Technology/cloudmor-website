-- Add user_email column to oauth_sessions table for easier lookup
ALTER TABLE public.oauth_sessions 
ADD COLUMN user_email text;