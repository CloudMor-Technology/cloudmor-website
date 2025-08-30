-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.update_client_support_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix the existing sync_client_emails function as well
CREATE OR REPLACE FUNCTION public.sync_client_emails()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
  NEW.stripe_email = NEW.contact_email;
  NEW.jira_email = NEW.contact_email;
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$