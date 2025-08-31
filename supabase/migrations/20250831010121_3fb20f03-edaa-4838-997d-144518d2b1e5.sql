-- Add reset token fields to profiles table for forgot password functionality
ALTER TABLE public.profiles 
ADD COLUMN reset_token_hash text,
ADD COLUMN reset_token_expires_at timestamp with time zone,
ADD COLUMN reset_token_used_at timestamp with time zone;

-- Create index for efficient token lookups
CREATE INDEX idx_profiles_reset_token_hash ON public.profiles(reset_token_hash) 
WHERE reset_token_hash IS NOT NULL;