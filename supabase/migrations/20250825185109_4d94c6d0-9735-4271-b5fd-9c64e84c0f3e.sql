
-- Create the contact_submissions table to store form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  form_type TEXT NOT NULL DEFAULT 'contact',
  request_consultation BOOLEAN DEFAULT false,
  subscribe_newsletter BOOLEAN DEFAULT false,
  preferred_date TEXT,
  employee_count TEXT,
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact submissions (public forms)
CREATE POLICY "Anyone can submit contact forms" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading submissions (for admin purposes later)
CREATE POLICY "Allow reading contact submissions" 
  ON public.contact_submissions 
  FOR SELECT 
  USING (true);
