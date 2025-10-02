# Media Coverage Table Migration

## Overview
This migration creates a `media_coverage` table in the Supabase database to store press and media mentions for the Dreaming School project.

## Table Schema

### media_coverage
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| media_outlet | text | NOT NULL | Name of the media outlet (e.g., "한겨레신문") |
| title | text | NOT NULL | Article title |
| article_url | text | NOT NULL | URL to the article |
| published_at | timestamptz | NOT NULL | Publication date and time |
| created_at | timestamptz | NOT NULL, DEFAULT now() | Record creation timestamp |

## Row Level Security (RLS)

The table has RLS enabled with the following policies:

- **Public Read Access**: Anyone can read media coverage records
- **Authenticated Insert**: Authenticated users can add new records
- **Authenticated Update**: Authenticated users can update existing records
- **Authenticated Delete**: Authenticated users can delete records

## Migration Instructions

### Option 1: Supabase Dashboard (Recommended)

1. Navigate to the Supabase SQL Editor:
   - URL: https://supabase.com/dashboard/project/ogxbygeubwxqkzgvvnhl/editor

2. Create a new query

3. Copy and paste the SQL from `supabase-migration-media-coverage.sql`

4. Click "Run" to execute the migration

### Option 2: Supabase CLI

If you have the Supabase CLI installed and authenticated:

```bash
# Link the project (if not already linked)
supabase link --project-ref ogxbygeubwxqkzgvvnhl

# Execute the migration
supabase db execute -f supabase-migration-media-coverage.sql --linked
```

## Verification

After running the migration, verify the table was created successfully:

```bash
# Using the verification script
node verify-media-coverage-table.mjs
```

Expected output:
```
✅ Table exists and is accessible

Table Schema:
- id: uuid (Primary Key, auto-generated)
- media_outlet: text (NOT NULL)
- title: text (NOT NULL)
- article_url: text (NOT NULL)
- published_at: timestamptz (NOT NULL)
- created_at: timestamptz (NOT NULL, auto-generated)

Row Level Security Policies:
- Public users: Can SELECT (read)
- Authenticated users: Can INSERT, UPDATE, DELETE

Current row count: 0
```

## Usage Example

### Insert a new media coverage record

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseKey);

const { data, error } = await supabase
  .from('media_coverage')
  .insert({
    media_outlet: '한겨레신문',
    title: '꿈을 짓는 학교, 지역사회와 함께하는 교육 혁신',
    article_url: 'https://example.com/article',
    published_at: '2025-10-01T09:00:00Z'
  })
  .select();
```

### Query media coverage records

```javascript
const { data, error } = await supabase
  .from('media_coverage')
  .select('*')
  .order('published_at', { ascending: false });
```

## Files Created

- `supabase-migration-media-coverage.sql` - Migration SQL file
- `verify-media-coverage-table.mjs` - Verification script
- `MEDIA_COVERAGE_MIGRATION.md` - This documentation

## Notes

- The `id` field is automatically generated using UUIDs
- The `created_at` field is automatically set to the current timestamp
- All timestamp fields use `timestamptz` (timezone-aware timestamps)
- RLS policies ensure public read access while restricting write operations to authenticated users
