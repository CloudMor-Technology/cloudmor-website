-- Add phone extensions for the CloudMor Test company
INSERT INTO phone_extensions (company_id, extension_number, user_name, voicemail_email, is_active) 
VALUES 
  ((SELECT id FROM companies WHERE primary_contact_email = 'alimrahimi@gmail.com'), '101', 'Ali Rahimi', 'alimrahimi@gmail.com', true),
  ((SELECT id FROM companies WHERE primary_contact_email = 'alimrahimi@gmail.com'), '102', 'Reception', 'reception@cloudmor.com', true),
  ((SELECT id FROM companies WHERE primary_contact_email = 'alimrahimi@gmail.com'), '103', 'Support', 'support@cloudmor.com', true);

-- Create support documents table for admin to manage quick tips
CREATE TABLE IF NOT EXISTS admin_support_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  category TEXT DEFAULT 'quick_tips',
  is_active BOOLEAN DEFAULT true,
  target_audience TEXT DEFAULT 'all_clients', -- 'all_clients' or 'selected_clients'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_support_documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage admin support documents" 
ON admin_support_documents 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
));

CREATE POLICY "All users can view active admin support documents" 
ON admin_support_documents 
FOR SELECT 
USING (is_active = true);

-- Add some sample quick tips
INSERT INTO admin_support_documents (title, description, url, category) VALUES
  ('Phone System Guide', 'Complete guide for using your business phone system', 'https://docs.cloudmor.com/phone-guide', 'quick_tips'),
  ('Security Best Practices', 'Essential cybersecurity tips for your business', 'https://docs.cloudmor.com/security-tips', 'quick_tips'),
  ('Cloud Backup Setup', 'How to configure and monitor your cloud backups', 'https://docs.cloudmor.com/backup-setup', 'quick_tips');