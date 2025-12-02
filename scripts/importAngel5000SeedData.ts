import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing environment variables');
  console.error('Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface CSVRow {
  company_id: string;
  company_name: string;
  EIN: string;
  founder_name: string;
  sector: string;
  state: string;
  date_founded: string;
  website: string;
  description: string;
  category: string;
  lifecycle_status: string;
  index_year: string;
  verified_company: string;
  verified_founder: string;
  eligible_universe: string;
  data_completeness: string;
}

function parseCSV(content: string): CSVRow[] {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');

  const rows: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row: any = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    rows.push(row as CSVRow);
  }

  return rows;
}

function parseBooleanString(value: string): boolean {
  return value.toLowerCase() === 'true';
}

async function importData() {
  console.log('Starting Angel5000 data import...\n');

  // Read CSV file
  const csvPath = path.join(process.cwd(), 'public', 'data', 'angel5000_index_seed.csv');

  if (!fs.existsSync(csvPath)) {
    console.error(`Error: CSV file not found at ${csvPath}`);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(csvContent);

  console.log(`Parsed ${rows.length} rows from CSV\n`);

  let insertedCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  // Process in batches of 100
  const batchSize = 100;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    const records = batch.map(row => ({
      company_id: row.company_id,
      company_name: row.company_name,
      ein: row.EIN,
      founder_name: row.founder_name,
      sector: row.sector,
      state: row.state,
      date_founded: row.date_founded,
      website: row.website,
      description: row.description,
      category: row.category,
      lifecycle_status: row.lifecycle_status,
      index_year: parseInt(row.index_year, 10),
      verified_company: parseBooleanString(row.verified_company),
      verified_founder: parseBooleanString(row.verified_founder),
      eligible_universe: parseBooleanString(row.eligible_universe),
      data_completeness: row.data_completeness,
      updated_at: new Date().toISOString()
    }));

    // Upsert using company_id as the unique key
    const { data, error } = await supabase
      .from('angel5000_companies')
      .upsert(records, {
        onConflict: 'company_id',
        ignoreDuplicates: false
      });

    if (error) {
      console.error(`Error in batch ${Math.floor(i / batchSize) + 1}:`, error.message);
      errorCount += batch.length;
    } else {
      const batchCount = batch.length;
      insertedCount += batchCount;
      console.log(`Processed batch ${Math.floor(i / batchSize) + 1}: ${batchCount} records`);
    }
  }

  console.log('\n=== Import Summary ===');
  console.log(`Total rows processed: ${rows.length}`);
  console.log(`Successfully upserted: ${insertedCount}`);
  console.log(`Errors: ${errorCount}`);

  if (errorCount === 0) {
    console.log('\n✅ Import completed successfully!');
  } else {
    console.log('\n⚠️  Import completed with errors');
  }
}

importData().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
