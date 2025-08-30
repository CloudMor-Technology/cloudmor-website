-- Update client_services table structure
ALTER TABLE public.client_services 
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS service_provider_id UUID,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create new client_support_documents table (replacing both support_documents and admin_support_documents)
DROP TABLE IF EXISTS public.client_support_documents CASCADE;

CREATE TABLE public.client_support_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  category TEXT DEFAULT 'quick_tips',
  role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'client', 'all')),
  assigned_to_all BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create junction table for client-specific document assignments
CREATE TABLE public.client_support_document_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID NOT NULL REFERENCES public.client_support_documents(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(document_id, client_id)
);

-- Enable RLS for new tables
ALTER TABLE public.client_support_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_support_document_assignments ENABLE ROW LEVEL SECURITY;

-- RLS policies for client_support_documents
CREATE POLICY "Admins can manage all client support documents" 
ON public.client_support_documents 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Clients can view their assigned documents" 
ON public.client_support_documents 
FOR SELECT 
USING (
  is_active = true AND (
    assigned_to_all = true OR 
    id IN (
      SELECT csa.document_id 
      FROM public.client_support_document_assignments csa
      JOIN public.clients c ON c.id = csa.client_id
      WHERE c.contact_email = (
        SELECT email FROM public.profiles WHERE id = auth.uid()
      )
    )
  )
);

-- RLS policies for client_support_document_assignments
CREATE POLICY "Admins can manage document assignments" 
ON public.client_support_document_assignments 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Clients can view their document assignments" 
ON public.client_support_document_assignments 
FOR SELECT 
USING (
  client_id IN (
    SELECT c.id FROM public.clients c
    WHERE c.contact_email = (
      SELECT email FROM public.profiles WHERE id = auth.uid()
    )
  )
);

-- Migrate data from admin_support_documents to client_support_documents
INSERT INTO public.client_support_documents (title, description, url, category, role, assigned_to_all, is_active)
SELECT 
  title, 
  description, 
  url, 
  COALESCE(category, 'quick_tips'), 
  'all',
  true,
  COALESCE(is_active, true)
FROM public.admin_support_documents
WHERE is_active = true;

-- Migrate data from support_documents to client_support_documents
INSERT INTO public.client_support_documents (title, description, url, category, role, assigned_to_all, is_active)
SELECT 
  title, 
  description, 
  url, 
  'client_specific',
  'client',
  false,
  true
FROM public.support_documents;

-- Migrate client-specific document assignments
INSERT INTO public.client_support_document_assignments (document_id, client_id)
SELECT 
  csd.id,
  sd.client_id
FROM public.support_documents sd
JOIN public.client_support_documents csd ON csd.title = sd.title AND csd.description = sd.description;

-- Update trigger for timestamps
CREATE OR REPLACE FUNCTION public.update_client_support_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_client_support_documents_updated_at
BEFORE UPDATE ON public.client_support_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_client_support_documents_updated_at();