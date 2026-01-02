-- Create early_access table for storing signups
CREATE TABLE public.early_access (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.early_access ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public signup form)
CREATE POLICY "Anyone can sign up for early access" 
ON public.early_access 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading own entry (via email match - for confirmation purposes)
CREATE POLICY "Users cannot read entries" 
ON public.early_access 
FOR SELECT 
USING (false);