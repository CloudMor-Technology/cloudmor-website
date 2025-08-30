-- Update arahimi@cloudmor.com to admin role
UPDATE public.profiles 
SET role = 'admin', updated_at = now()
WHERE email = 'arahimi@cloudmor.com';