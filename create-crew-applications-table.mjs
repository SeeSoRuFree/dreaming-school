#!/usr/bin/env node

/**
 * Supabase SQL 실행 스크립트
 * 사용법: node create-crew-applications-table.mjs
 */

const sqlQuery = `
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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert" ON crew_applications;
DROP POLICY IF EXISTS "Allow anon read access" ON crew_applications;
DROP POLICY IF EXISTS "Allow anon update" ON crew_applications;
DROP POLICY IF EXISTS "Allow anon delete" ON crew_applications;

-- Policy: Allow public insert (for application form submissions)
CREATE POLICY "Allow public insert"
  ON crew_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow anon read access (for admin operations)
CREATE POLICY "Allow anon read access"
  ON crew_applications
  FOR SELECT
  TO anon
  USING (true);

-- Policy: Allow anon update (for admin operations)
CREATE POLICY "Allow anon update"
  ON crew_applications
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Policy: Allow anon delete (for admin operations)
CREATE POLICY "Allow anon delete"
  ON crew_applications
  FOR DELETE
  TO anon
  USING (true);
`;

console.log('Creating crew_applications table in Supabase...');
console.log('\n=== SQL Query ===');
console.log(sqlQuery);
console.log('\n=== Instructions ===');
console.log('1. Go to https://supabase.com/dashboard/project/ogxbygeubwxqkzgvvnhl/editor');
console.log('2. Click on "SQL Editor" in the left sidebar');
console.log('3. Click "New Query"');
console.log('4. Copy and paste the SQL query above');
console.log('5. Click "Run" to execute the query');
console.log('\nAlternatively, you can run this directly from the SQL editor in your Supabase dashboard.');
