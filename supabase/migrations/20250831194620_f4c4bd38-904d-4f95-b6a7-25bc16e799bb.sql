-- Create oauth_sessions table for storing temporary PKCE data
CREATE TABLE public.oauth_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  state text NOT NULL,
  code_verifier text NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.oauth_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own OAuth sessions" 
ON public.oauth_sessions 
FOR ALL 
USING (user_id = auth.uid());

-- Add cleanup trigger to remove expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_oauth_sessions()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  DELETE FROM public.oauth_sessions 
  WHERE expires_at < now();
  RETURN NULL;
END;
$function$;

-- Create trigger to run cleanup periodically
CREATE TRIGGER cleanup_oauth_sessions_trigger
  AFTER INSERT ON public.oauth_sessions
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.cleanup_expired_oauth_sessions();