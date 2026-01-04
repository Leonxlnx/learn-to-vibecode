-- Drop and recreate the view with SECURITY INVOKER (safer)
DROP VIEW IF EXISTS public.leaderboard;

-- Create leaderboard view without security definer
CREATE VIEW public.leaderboard 
WITH (security_invoker = true)
AS
SELECT 
  id,
  name,
  vibe_coins
FROM public.profiles
WHERE name IS NOT NULL
ORDER BY vibe_coins DESC
LIMIT 100;

-- Grant select on the leaderboard view to authenticated users
GRANT SELECT ON public.leaderboard TO authenticated;

-- Add RLS policy so authenticated users can read any profile for leaderboard purposes
CREATE POLICY "Anyone can view leaderboard data" 
ON public.profiles 
FOR SELECT 
USING (true);
