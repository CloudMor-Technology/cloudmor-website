-- Add start_date field to client_services table
ALTER TABLE public.client_services 
ADD COLUMN start_date DATE DEFAULT CURRENT_DATE;

-- Add comment to explain the field
COMMENT ON COLUMN public.client_services.start_date IS 'The date when the service was started for the client';