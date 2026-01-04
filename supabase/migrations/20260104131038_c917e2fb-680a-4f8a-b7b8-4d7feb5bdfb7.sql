-- Add settings columns to profiles for coins and leaderboard visibility
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS show_coins boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS show_leaderboard boolean NOT NULL DEFAULT true;