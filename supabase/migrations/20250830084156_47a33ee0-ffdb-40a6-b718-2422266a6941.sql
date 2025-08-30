-- Create the missing companies
INSERT INTO public.companies (name) VALUES ('AAN') ON CONFLICT DO NOTHING;
INSERT INTO public.companies (name) VALUES ('CloudMor') ON CONFLICT DO NOTHING;

-- Update Ali Rahimi's profile to be assigned to CloudMor company
UPDATE public.profiles 
SET company_id = (SELECT id FROM public.companies WHERE name = 'CloudMor' LIMIT 1)
WHERE email = 'arahimi@cloudmor.com';

-- Show current company assignments
SELECT p.full_name, p.email, p.role, c.name as company_name 
FROM profiles p 
LEFT JOIN companies c ON p.company_id = c.id 
WHERE p.email IN ('alimrahimi@gmail.com', 'arahimi@cloudmor.com');