# Angel5000 Data Import Guide

This guide explains how to seed/update the `angel5000_companies` Supabase table with data from the corrected Angel5000 dataset.

## Overview

The import script (`importAngel5000SeedData.ts`) reads the CSV file containing Angel5000 company data and upserts it into the Supabase database. The script uses `company_id` as the unique key for upserts, meaning:
- New companies will be inserted
- Existing companies (matching `company_id`) will be updated with the latest data

## Prerequisites

1. **Environment Variables**: Ensure your `.env` file contains:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. **Database Schema**: The migration to add new classification columns has already been applied. The table now includes:
   - `company_id` (unique key)
   - `company_name`
   - `ein` (EIN)
   - `founder_name`
   - `sector`
   - `state`
   - `date_founded`
   - `website`
   - `description`
   - `category` (index-constituent / observed-growth / historic-outlier)
   - `lifecycle_status` (Active / Exited / Dormant)
   - `index_year` (2023 / 2024 / 2025)
   - `verified_company` (boolean)
   - `verified_founder` (boolean)
   - `eligible_universe` (boolean)
   - `data_completeness` (Full Profile / Partial Profile)

3. **CSV File**: The seed data is located at:
   ```
   public/data/angel5000_index_seed.csv
   ```

## Running the Import

### Method 1: Using npm script (Recommended)
```bash
npm run seed:angel5000
```

### Method 2: Direct execution
```bash
npx tsx scripts/importAngel5000SeedData.ts
```

## What the Script Does

1. **Reads CSV**: Parses the CSV file from `public/data/angel5000_index_seed.csv`
2. **Transforms Data**: Converts CSV rows to database records:
   - Parses booleans from "True"/"False" strings
   - Converts index_year to integer
   - Maps CSV column names to database column names (e.g., `EIN` → `ein`)
3. **Batch Upsert**: Processes records in batches of 100 for efficiency
4. **Upsert Logic**: Uses `company_id` as the conflict key:
   - If a company with the same `company_id` exists, it updates all fields
   - If it doesn't exist, it inserts a new row
5. **Reports Results**: Displays summary of inserted/updated records and any errors

## Expected Output

```
Starting Angel5000 data import...

Parsed 1000 rows from CSV

Processed batch 1: 100 records
Processed batch 2: 100 records
...
Processed batch 10: 100 records

=== Import Summary ===
Total rows processed: 1000
Successfully upserted: 1000
Errors: 0

✅ Import completed successfully!
```

## Data Alignment

The import script ensures:
- ✅ **No Scoring/Prediction**: Only uses neutral classification labels
- ✅ **Category Values**: Maps to `index-constituent`, `observed-growth`, or `historic-outlier`
- ✅ **No Legacy Terms**: No references to "unicorn", "mega-winner", "potential-unicorn"
- ✅ **Dashboard Compatibility**: All labels align with the Company Directory filters

## Troubleshooting

### Error: "Missing environment variables"
- Ensure `.env` file exists and contains both `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

### Error: "CSV file not found"
- Verify the file exists at `public/data/angel5000_index_seed.csv`
- Check file permissions

### Database Errors
- Check Supabase dashboard for connection issues
- Verify the service role key has write permissions
- Review the error message for specific SQL constraint violations

### Import Errors in Batches
- The script will continue processing even if some batches fail
- Check the error messages to identify problematic rows
- Common issues:
  - Invalid date formats
  - Missing required fields
  - Data type mismatches

## Re-running the Import

The import script is **idempotent** - you can run it multiple times safely:
- Existing records will be updated with new data
- No duplicate records will be created
- The `updated_at` timestamp will be refreshed

## Post-Import Verification

After running the import, verify in the Supabase dashboard:

```sql
-- Check total count
SELECT COUNT(*) FROM angel5000_companies;

-- View category distribution
SELECT category, COUNT(*)
FROM angel5000_companies
GROUP BY category;

-- View lifecycle status distribution
SELECT lifecycle_status, COUNT(*)
FROM angel5000_companies
GROUP BY lifecycle_status;

-- View index year distribution
SELECT index_year, COUNT(*)
FROM angel5000_companies
GROUP BY index_year
ORDER BY index_year;
```

## CSV File Format

The expected CSV format:
```csv
company_id,company_name,EIN,founder_name,sector,state,date_founded,website,description,category,lifecycle_status,index_year,verified_company,verified_founder,eligible_universe,data_completeness
C00001,Synergy Solutions,520915442,Kendall Harris,E-commerce,NY,2015-05-28,www.synergysolutions.com,Driving change through advanced technology.,index-constituent,Active,2023,True,True,True,Full Profile
...
```

## Notes

- The script uses the Supabase **service role key** (not the anon key) to bypass RLS policies during import
- All timestamps are automatically set to the current time
- Boolean fields accept "True"/"False" (case-insensitive)
- The import preserves all existing data relationships and constraints
