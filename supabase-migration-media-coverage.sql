-- Migration: Create media_coverage table
-- Date: 2025-10-02
-- Description: Creates the media_coverage table for storing press and media mentions

-- Create media_coverage table
CREATE TABLE IF NOT EXISTS media_coverage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_outlet text NOT NULL,
  title text NOT NULL,
  article_url text NOT NULL,
  published_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE media_coverage ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access (SELECT)
CREATE POLICY IF NOT EXISTS "Allow public read access"
  ON media_coverage
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow authenticated insert
CREATE POLICY IF NOT EXISTS "Allow authenticated insert"
  ON media_coverage
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated update
CREATE POLICY IF NOT EXISTS "Allow authenticated update"
  ON media_coverage
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated delete
CREATE POLICY IF NOT EXISTS "Allow authenticated delete"
  ON media_coverage
  FOR DELETE
  TO authenticated
  USING (true);

-- Verify table creation
-- Run this to check the table structure:
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'media_coverage'
-- ORDER BY ordinal_position;
