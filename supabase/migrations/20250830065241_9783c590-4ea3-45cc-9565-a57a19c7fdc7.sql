-- Fix infinite recursion in RLS policies by removing problematic policies first
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Add stripe_customer_id to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Create simple, non-recursive RLS policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create a secure function to check admin role without recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Create admin policies using the function
CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL
  USING (public.is_admin(auth.uid()));

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON public.profiles(stripe_customer_id);