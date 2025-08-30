-- Create clients table to replace existing user management
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL UNIQUE,
  stripe_email TEXT, -- Auto-populated from contact_email
  jira_email TEXT, -- Auto-populated from contact_email
  contact_name TEXT,
  phone TEXT,
  address TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create client_services table to link clients with services
CREATE TABLE public.client_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  service_description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create support_documents table for admin-managed client resources
CREATE TABLE public.support_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for clients table
CREATE POLICY "Admins can manage all clients" ON public.clients
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Users can view their own client data" ON public.clients
FOR SELECT USING (
  contact_email = (
    SELECT email FROM public.profiles 
    WHERE id = auth.uid()
  )
);

-- Create policies for client_services table
CREATE POLICY "Admins can manage all client services" ON public.client_services
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Users can view their own client services" ON public.client_services
FOR SELECT USING (
  client_id IN (
    SELECT id FROM public.clients 
    WHERE contact_email = (
      SELECT email FROM public.profiles 
      WHERE id = auth.uid()
    )
  )
);

-- Create policies for support_documents table
CREATE POLICY "Admins can manage all support documents" ON public.support_documents
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Users can view their own support documents" ON public.support_documents
FOR SELECT USING (
  client_id IN (
    SELECT id FROM public.clients 
    WHERE contact_email = (
      SELECT email FROM public.profiles 
      WHERE id = auth.uid()
    )
  )
);

-- Create function to automatically update stripe_email and jira_email
CREATE OR REPLACE FUNCTION public.sync_client_emails()
RETURNS TRIGGER AS $$
BEGIN
  NEW.stripe_email = NEW.contact_email;
  NEW.jira_email = NEW.contact_email;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-sync emails
CREATE TRIGGER sync_client_emails_trigger
  BEFORE INSERT OR UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_client_emails();