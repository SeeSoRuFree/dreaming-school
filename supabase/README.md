# Supabase Migrations

This directory contains SQL migration files for the dreaming-school Supabase project.

## Project Information
- **Project URL**: https://ogxbygeubwxqkzgvvnhl.supabase.co
- **Project ID**: ogxbygeubwxqkzgvvnhl

## How to Execute Migrations

### Option 1: Supabase Dashboard (Recommended)
1. Go to [SQL Editor](https://supabase.com/dashboard/project/ogxbygeubwxqkzgvvnhl/sql/new)
2. Copy the contents of the migration file
3. Paste into the SQL Editor
4. Click "Run"

### Option 2: Supabase CLI
```bash
# Link your project (first time only)
npx supabase link --project-ref ogxbygeubwxqkzgvvnhl

# Apply migrations
npx supabase db push
```

### Option 3: psql (if you have database password)
```bash
psql -h db.ogxbygeubwxqkzgvvnhl.supabase.co -U postgres -d postgres -f migrations/20251002_create_media_coverage_table.sql
```

## Migrations

### 20251002_create_media_coverage_table.sql
Creates the `media_coverage` table for storing media articles and press coverage.

**Schema:**
- `id`: uuid (primary key, auto-generated)
- `media_outlet`: text (언론사명, required)
- `title`: text (기사 제목, required)
- `article_url`: text (기사 URL, required)
- `published_at`: timestamptz (발행일, required)
- `created_at`: timestamptz (등록일, auto-generated)

**Security:**
- Row Level Security (RLS) enabled
- Public read access (SELECT)
- Authenticated users can INSERT, UPDATE, DELETE

## Verify Table Creation

After running the migration, verify with:
```sql
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'media_coverage'
ORDER BY ordinal_position;
```

Or simply:
```sql
SELECT * FROM media_coverage LIMIT 1;
```
