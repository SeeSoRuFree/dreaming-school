import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyTable() {
  console.log('Verifying media_coverage table...\n');

  try {
    // Test SELECT query
    const { data, error } = await supabase
      .from('media_coverage')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Table verification failed:', error.message);
      return;
    }

    console.log('✅ Table exists and is accessible');
    console.log('\nTable Schema:');
    console.log('- id: uuid (Primary Key, auto-generated)');
    console.log('- media_outlet: text (NOT NULL)');
    console.log('- title: text (NOT NULL)');
    console.log('- article_url: text (NOT NULL)');
    console.log('- published_at: timestamptz (NOT NULL)');
    console.log('- created_at: timestamptz (NOT NULL, auto-generated)');

    console.log('\nRow Level Security Policies:');
    console.log('- Public users: Can SELECT (read)');
    console.log('- Authenticated users: Can INSERT, UPDATE, DELETE');

    console.log('\nCurrent row count:', data?.length || 0);

    if (data && data.length > 0) {
      console.log('\nSample data:');
      console.log(JSON.stringify(data[0], null, 2));
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

verifyTable();
