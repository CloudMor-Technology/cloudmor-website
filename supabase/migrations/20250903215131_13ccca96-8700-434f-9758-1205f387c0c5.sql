-- Add stripe_portal_url field to clients table
ALTER TABLE public.clients 
ADD COLUMN stripe_portal_url TEXT;