#!/usr/bin/env node

/**
 * Supabase SQL 실행 스크립트
 * 사용법: node create-news-table.mjs
 */

import fs from 'fs';
import https from 'https';

const SUPABASE_URL = 'https://ogxbygeubwxqkzgvvnhl.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const sqlQuery = `
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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON news;
DROP POLICY IF EXISTS "Allow anon insert" ON news;
DROP POLICY IF EXISTS "Allow anon update" ON news;
DROP POLICY IF EXISTS "Allow anon delete" ON news;

-- Policy: Allow public read access (SELECT)
CREATE POLICY "Allow public read access"
  ON news
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow anon key to insert (for admin operations)
CREATE POLICY "Allow anon insert"
  ON news
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow anon key to update (for admin operations)
CREATE POLICY "Allow anon update"
  ON news
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Policy: Allow anon key to delete (for admin operations)
CREATE POLICY "Allow anon delete"
  ON news
  FOR DELETE
  TO anon
  USING (true);
`;

console.log('Creating news table in Supabase...');
console.log('\n=== SQL Query ===');
console.log(sqlQuery);
console.log('\n=== Instructions ===');
console.log('1. Go to https://supabase.com/dashboard/project/ogxbygeubwxqkzgvvnhl/editor');
console.log('2. Click on "SQL Editor" in the left sidebar');
console.log('3. Click "New Query"');
console.log('4. Copy and paste the SQL query above');
console.log('5. Click "Run" to execute the query');
console.log('\nAlternatively, you can run this directly from the SQL editor in your Supabase dashboard.');
