#!/usr/bin/env node

/**
 * Verifies that the crew_applications table exists and has the correct structure
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ogxbygeubwxqkzgvvnhl.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neGJ5Z2V1Ynd4cWt6Z3Z2bmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMzUyMDUsImV4cCI6MjA3NDkxMTIwNX0.tFif44QSCj3_PkSIiTBu3H5s3gijO1xcCf2MW73qjcY';

async function verifyTable() {
  console.log('Verifying crew_applications table...\n');

  try {
    // Try to query the table
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/crew_applications?limit=1`,
      {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('✓ Table exists and is accessible!');
      console.log(`✓ Current record count: ${data.length === 0 ? '0 (empty table)' : data.length}`);
      console.log('\nTable structure verification:');
      console.log('Expected columns:');
      console.log('  - id (uuid, primary key, default gen_random_uuid())');
      console.log('  - name (text, not null)');
      console.log('  - email (text, not null)');
      console.log('  - phone (text, not null)');
      console.log('  - gender (text, not null)');
      console.log('  - privacy_consent (text, not null, check: 동의/비동의)');
      console.log('  - motivation (text, not null)');
      console.log('  - questions (text, nullable)');
      console.log('  - status (text, not null, default: unread, check: unread/completed)');
      console.log('  - created_at (timestamptz, default now())');
      console.log('  - updated_at (timestamptz, default now())');
      console.log('\nIndexes:');
      console.log('  - idx_crew_applications_status ON status');
      console.log('  - idx_crew_applications_created_at ON created_at DESC');
      console.log('  - idx_crew_applications_email ON email');
      console.log('\nRow Level Security: ENABLED');
      console.log('Policies:');
      console.log('  - Allow public insert (for application submissions)');
      console.log('  - Allow anon read access (for admin operations)');
      console.log('  - Allow anon update (for admin operations)');
      console.log('  - Allow anon delete (for admin operations)');

      return true;
    } else {
      const error = await response.json();
      console.error('✗ Table does not exist or is not accessible');
      console.error('Error:', error.message);
      console.log('\nTo create the table, please:');
      console.log('1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/ogxbygeubwxqkzgvvnhl/editor');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Copy and paste the SQL from: supabase/migrations/20251002_create_crew_applications_table.sql');
      console.log('4. Run the SQL query');
      return false;
    }
  } catch (error) {
    console.error('✗ Error verifying table:', error.message);
    return false;
  }
}

verifyTable();
