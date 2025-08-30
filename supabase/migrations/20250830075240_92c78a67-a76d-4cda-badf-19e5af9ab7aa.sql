-- Fix security vulnerability: Restrict contact submissions access to admin users only

-- Drop the existing overly permissive policy that allows anyone to read contact submissions
DROP POLICY "Allow reading contact submissions" ON public.contact_submissions;

-- Create a new policy that only allows authenticated admin users to read contact submissions
CREATE POLICY "Admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);