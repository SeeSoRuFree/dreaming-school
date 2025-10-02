-- Migration: Create news table
-- Created: 2025-10-02
-- Description: Creates the news table to store news and announcements

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL CHECK (category IN ('news', 'notice')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  featured boolean DEFAULT false
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(featured) WHERE featured = true;

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access (SELECT)
CREATE POLICY IF NOT EXISTS "Allow public read access"
  ON news
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow anon key to insert (for admin operations)
CREATE POLICY IF NOT EXISTS "Allow anon insert"
  ON news
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow anon key to update (for admin operations)
CREATE POLICY IF NOT EXISTS "Allow anon update"
  ON news
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Policy: Allow anon key to delete (for admin operations)
CREATE POLICY IF NOT EXISTS "Allow anon delete"
  ON news
  FOR DELETE
  TO anon
  USING (true);

-- Add helpful comments
COMMENT ON TABLE news IS '소식 및 공지사항을 저장하는 테이블';
COMMENT ON COLUMN news.title IS '제목';
COMMENT ON COLUMN news.content IS 'HTML 형식의 내용 (에디터에서 작성된 이미지 포함)';
COMMENT ON COLUMN news.category IS '카테고리 (news: 소식, notice: 공지사항)';
COMMENT ON COLUMN news.created_at IS '생성일';
COMMENT ON COLUMN news.updated_at IS '수정일';
COMMENT ON COLUMN news.featured IS '중요 표시 여부';
