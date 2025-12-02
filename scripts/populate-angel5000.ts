import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const SECTORS = [
  'AI/ML',
  'Biotech',
  'FinTech',
  'HealthTech',
  'EdTech',
  'CleanTech',
  'Cybersecurity',
  'Enterprise SaaS',
  'Consumer Apps',
  'Hardware',
  'Quantum Computing',
  'Space Tech'
];

const STATES = [
  'CA', 'NY', 'TX', 'MA', 'WA', 'IL', 'FL', 'CO', 'GA', 'NC'
];

const FOUNDER_FIRST_NAMES = [
  'Sarah', 'Michael', 'Jennifer', 'David', 'Lisa', 'James', 'Maria', 'Robert',
  'Jessica', 'William', 'Emily', 'Christopher', 'Amanda', 'Daniel', 'Michelle',
  'Matthew', 'Ashley', 'Andrew', 'Sophia', 'Joseph', 'Emma', 'Ryan', 'Olivia'
];

const FOUNDER_LAST_NAMES = [
  'Chen', 'Patel', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia',
  'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'
];

const COMPANY_PREFIXES = [
  'Quantum', 'Neural', 'Cyber', 'Cloud', 'Data', 'Smart', 'Bio', 'Nano',
  'Fusion', 'Vertex', 'Apex', 'Nexus', 'Prism', 'Catalyst', 'Vector', 'Matrix'
];

const COMPANY_SUFFIXES = [
  'AI', 'Labs', 'Tech', 'Systems', 'Solutions', 'Dynamics', 'Analytics',
  'Innovations', 'Technologies', 'Intelligence', 'Networks', 'Platforms'
];

function generateEIN(): string {
  const part1 = Math.floor(Math.random() * 90 + 10);
  const part2 = Math.floor(Math.random() * 9000000 + 1000000);
  return `${part1}-${part2}`;
}

function generateCompanyName(): string {
  const prefix = COMPANY_PREFIXES[Math.floor(Math.random() * COMPANY_PREFIXES.length)];
  const suffix = COMPANY_SUFFIXES[Math.floor(Math.random() * COMPANY_SUFFIXES.length)];
  return `${prefix}${suffix}`;
}

function generateFounderName(): string {
  const firstName = FOUNDER_FIRST_NAMES[Math.floor(Math.random() * FOUNDER_FIRST_NAMES.length)];
  const lastName = FOUNDER_LAST_NAMES[Math.floor(Math.random() * FOUNDER_LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
}

function generateWebsite(companyName: string): string {
  return `https://www.${companyName.toLowerCase().replace(/\s+/g, '')}.com`;
}

function generateDescription(companyName: string, sector: string): string {
  const descriptions = [
    `${companyName} is revolutionizing ${sector} with cutting-edge technology and innovative solutions.`,
    `Leading ${sector} company building next-generation platforms for enterprise customers.`,
    `${companyName} develops AI-powered solutions to transform the ${sector} industry.`,
    `Innovative ${sector} startup focused on scalable, cloud-native infrastructure.`,
    `${companyName} provides intelligent automation tools for the ${sector} market.`
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generateFoundedDate(): string {
  const year = 2012 + Math.floor(Math.random() * 13);
  const month = Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0');
  const day = Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function generateCategory(index: number): string {
  if (index < 5) return 'mega-winner';
  if (index < 54) return 'potential-unicorn';
  return 'non-unicorn';
}

async function populateDatabase() {
  console.log('Starting Angel5000 database population...');

  const companies = [];

  for (let i = 0; i < 1000; i++) {
    const companyName = generateCompanyName();
    const sector = SECTORS[Math.floor(Math.random() * SECTORS.length)];

    companies.push({
      company_id: `COMP-${(i + 1).toString().padStart(4, '0')}`,
      company_name: companyName,
      ein: generateEIN(),
      founder_name: generateFounderName(),
      sector: sector,
      state: STATES[Math.floor(Math.random() * STATES.length)],
      date_founded: generateFoundedDate(),
      website: generateWebsite(companyName),
      description: generateDescription(companyName, sector),
      category: generateCategory(i)
    });
  }

  console.log(`Generated ${companies.length} companies`);
  console.log(`- Mega-winners: ${companies.filter(c => c.category === 'mega-winner').length}`);
  console.log(`- Potential unicorns: ${companies.filter(c => c.category === 'potential-unicorn').length}`);
  console.log(`- Non-unicorns: ${companies.filter(c => c.category === 'non-unicorn').length}`);

  const batchSize = 100;
  for (let i = 0; i < companies.length; i += batchSize) {
    const batch = companies.slice(i, i + batchSize);
    const { error } = await supabase
      .from('angel5000_companies')
      .insert(batch);

    if (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      throw error;
    }

    console.log(`Inserted batch ${i / batchSize + 1}/${Math.ceil(companies.length / batchSize)}`);
  }

  console.log('✓ Database population complete!');
}

populateDatabase().catch(console.error);
