-- Create a view for the public leaderboard (only shows name and vibe_coins)
CREATE OR REPLACE VIEW public.leaderboard AS
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

-- Create RLS policy for the view (allow all authenticated users to read)
ALTER VIEW public.leaderboard OWNER TO postgres;
