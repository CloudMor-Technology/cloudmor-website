-- Fix support documents visibility by creating better client lookup
-- Create a function to find client by user email
CREATE OR REPLACE FUNCTION public.get_client_by_user_email(user_email text)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT c.id 
  FROM clients c 
  WHERE c.contact_email = user_email
  LIMIT 1;
$$;

-- Update support documents policy to use the function
DROP POLICY IF EXISTS "Users can view their own support documents" ON public.support_documents;

CREATE POLICY "Users can view their own support documents" 
ON public.support_documents 
FOR SELECT 
USING (
  -- Allow if document is global (no client_id)
  client_id IS NULL 
  OR 
  -- Allow if document belongs to user's client
  client_id = get_client_by_user_email((SELECT email FROM profiles WHERE id = auth.uid()))
);

-- Update client support document assignments policy
DROP POLICY IF EXISTS "Clients can view their document assignments" ON public.client_support_document_assignments;

CREATE POLICY "Clients can view their document assignments" 
ON public.client_support_document_assignments 
FOR SELECT 
USING (
  client_id = get_client_by_user_email((SELECT email FROM profiles WHERE id = auth.uid()))
);