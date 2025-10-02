-- Migration: Create crew_applications table
-- Created: 2025-10-02
-- Description: Creates the crew_applications table to store crew volunteer applications

-- Create crew_applications table
CREATE TABLE IF NOT EXISTS crew_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  gender text NOT NULL,
  privacy_consent text NOT NULL CHECK (privacy_consent IN ('동의', '비동의')),
  motivation text NOT NULL,
  questions text,
  status text NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'completed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_crew_applications_status ON crew_applications(status);
CREATE INDEX IF NOT EXISTS idx_crew_applications_created_at ON crew_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crew_applications_email ON crew_applications(email);

-- Enable Row Level Security
ALTER TABLE crew_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public insert (for application form submissions)
CREATE POLICY IF NOT EXISTS "Allow public insert"
  ON crew_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow anon read access (for admin operations)
CREATE POLICY IF NOT EXISTS "Allow anon read access"
  ON crew_applications
  FOR SELECT
  TO anon
  USING (true);

-- Policy: Allow anon update (for admin operations)
CREATE POLICY IF NOT EXISTS "Allow anon update"
  ON crew_applications
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Policy: Allow anon delete (for admin operations)
CREATE POLICY IF NOT EXISTS "Allow anon delete"
  ON crew_applications
  FOR DELETE
  TO anon
  USING (true);

-- Add helpful comments
COMMENT ON TABLE crew_applications IS '크루 봉사자 신청서를 저장하는 테이블';
COMMENT ON COLUMN crew_applications.id IS '고유 식별자';
COMMENT ON COLUMN crew_applications.name IS '신청자 이름';
COMMENT ON COLUMN crew_applications.email IS '신청자 이메일';
COMMENT ON COLUMN crew_applications.phone IS '신청자 연락처';
COMMENT ON COLUMN crew_applications.gender IS '신청자 성별';
COMMENT ON COLUMN crew_applications.privacy_consent IS '개인정보 수집 및 이용 동의 여부 (동의/비동의)';
COMMENT ON COLUMN crew_applications.motivation IS '지원 동기';
COMMENT ON COLUMN crew_applications.questions IS '궁금한 점 (선택사항)';
COMMENT ON COLUMN crew_applications.status IS '처리 상태 (unread: 미확인, completed: 완료)';
COMMENT ON COLUMN crew_applications.created_at IS '신청일';
COMMENT ON COLUMN crew_applications.updated_at IS '수정일';
