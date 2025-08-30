-- Add Business Phone Systems service for the client
INSERT INTO client_services (client_id, service_name, service_description, status)
VALUES (
  '2562288a-2b8c-4634-bddd-69bcef38a17d',
  'Business Phone Systems',
  'VoIP phone system with advanced features for business communications',
  'active'
);

-- Add phone extensions for the client's company
INSERT INTO phone_extensions (company_id, extension_number, user_name, voicemail_email, is_active)
VALUES 
  ('d00f1c22-71df-464f-b979-adbaa7c02ca9', '101', 'Reception', 'reception@cloudmor.com', true),
  ('d00f1c22-71df-464f-b979-adbaa7c02ca9', '102', 'Ladan Hemmati', 'alimrahimi@gmail.com', true),
  ('d00f1c22-71df-464f-b979-adbaa7c02ca9', '103', 'Technical Support', 'support@cloudmor.com', true);