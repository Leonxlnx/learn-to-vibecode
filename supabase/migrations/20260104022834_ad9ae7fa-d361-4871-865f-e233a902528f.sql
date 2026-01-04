-- Add columns for progress tracking
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS vibe_coins INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS completed_chapters JSONB DEFAULT '{}';

-- completed_chapters will store: {"module_id": ["chapter_id_1", "chapter_id_2", ...]}