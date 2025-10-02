-- Migration: Create media_coverage table
-- Created: 2025-10-02
-- Description: Creates the media_coverage table to store media articles and press coverage

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

-- Policy: Allow authenticated users to insert
CREATE POLICY IF NOT EXISTS "Allow authenticated insert"
  ON media_coverage
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update
CREATE POLICY IF NOT EXISTS "Allow authenticated update"
  ON media_coverage
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to delete
CREATE POLICY IF NOT EXISTS "Allow authenticated delete"
  ON media_coverage
  FOR DELETE
  TO authenticated
  USING (true);

-- Add helpful comment
COMMENT ON TABLE media_coverage IS '미디어 보도 자료 및 언론 기사를 저장하는 테이블';
COMMENT ON COLUMN media_coverage.media_outlet IS '언론사명';
COMMENT ON COLUMN media_coverage.title IS '기사 제목';
COMMENT ON COLUMN media_coverage.article_url IS '기사 URL';
COMMENT ON COLUMN media_coverage.published_at IS '기사 발행일';
COMMENT ON COLUMN media_coverage.created_at IS '데이터베이스 등록일';
