import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const facilities = [
  'Genome Center A',
  'Genome Center B',
  'Genome Center C',
  'Genomics Core A',
  'Genomics Core B',
  'Genomics Core C'
];

const instrumentTypes = [
  { type: 'Illumina NovaSeq', model: 'NovaSeq 6000 S4', readLength: 151 },
  { type: 'Illumina NextSeq', model: 'NextSeq 2000 P4', readLength: 151 },
  { type: 'ONT PromethION', model: 'PromethION R10.4', readLength: 400 }
];

const protocols = [
  { name: 'WGS PCR-Free', versions: ['v1.0', 'v2.1', 'v3.3'] },
  { name: 'RNA-Seq PolyA', versions: ['v1.0', 'v2.1', 'v3.3'] },
  { name: 'Targeted Panel v2', versions: ['v1.0', 'v2.1', 'v3.3'] },
  { name: 'Metagenomics Shotgun', versions: ['v1.0', 'v2.1', 'v3.3'] }
];

const reagentKits = [
  'Illumina V3 Kit',
  'Nextera XT',
  'QIAseq FX',
  'Rapid Barcoding 24'
];

const sampleTypes = ['Human', 'Mouse', 'Organoid'];

const fieldSources = ['Core LIMS', 'Sample Form', 'Instrument Log', 'QC Pipeline'];

const validationStatuses = ['Validated', 'In Review', 'Pending'];

const datasetTypes = ['Genomics', 'QC_Logs', 'Protocol_Benchmarks'];

const licensingStatuses = ['Ready', 'Review', 'Pending'];

const fulfillmentStatuses = ['COMPLETED', 'PENDING', 'DRAFT', 'SUBMITTED'];

const normalizationStatuses = ['Mapped', 'Unmapped'];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 1): number {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

function generateRunId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'RUN_';
  for (let i = 0; i < 7; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateOperatorId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'OP_';
  for (let i = 0; i < 4; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateSampleId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'S_';
  for (let i = 0; i < 10; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateHash(): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateMockData() {
  console.log('Generating 1000 mock records...');

  const runs = [];
  const startDate = new Date('2025-01-15');
  const endDate = new Date('2025-08-15');

  for (let i = 0; i < 1000; i++) {
    const facility = randomChoice(facilities);
    const instrument = randomChoice(instrumentTypes);
    const protocol = randomChoice(protocols);
    const protocolVersion = randomChoice(protocol.versions);
    const reagentKit = randomChoice(reagentKits);
    const sampleType = randomChoice(sampleTypes);
    const fieldSource = randomChoice(fieldSources);
    const validationStatus = randomChoice(validationStatuses);
    const datasetType = randomChoice(datasetTypes);
    const licensingStatus = randomChoice(licensingStatuses);
    const fulfillmentStatus = randomChoice(fulfillmentStatuses);

    const qcScorePrenorm = randomFloat(72, 100, 1);
    const qcScorePostnorm = Math.min(100, qcScorePrenorm + randomFloat(0, 8, 1));
    const qcStatus = qcScorePostnorm >= 75 ? (Math.random() > 0.15 ? 'Pass' : 'Fail') : 'Fail';

    const turnaroundTime = randomFloat(0.5, 9, 1);
    const dataVolumeGb = randomFloat(8, 120, 1);
    const dataCompletenessPct = randomInt(86, 100);
    const auditTrailComplete = Math.random() > 0.1;

    const timestampCaptured = randomDate(startDate, endDate);
    const orderDate = new Date(timestampCaptured);
    orderDate.setDate(orderDate.getDate() - randomInt(0, 30));

    const version = randomFloat(1.0, 3.9, 1).toString();

    const valueDollars = randomInt(2000, 9900);

    const read1Length = instrument.readLength;
    const read2Length = instrument.type.includes('ONT') ? 0 : instrument.readLength;
    const indices1Length = randomChoice([8, 10, 12]);
    const indices2Length = instrument.type.includes('ONT') ? 0 : randomChoice([0, 8, 10, 12]);
    const phixPct = randomFloat(0.1, 1.8, 2);

    const totalAmount = randomChoice([1800, 3200, 4200, 6400, 9600, 12800]);

    const primaryDataSizeGb = randomFloat(19, 140, 1);
    const primaryDataHash = generateHash();
    const facilitySlug = facility.toLowerCase().replace(/\s+/g, '-');
    const runId = generateRunId();
    const primaryDataLink = `s3://ga-tech-datasets/${facilitySlug}/${runId}.fastq.gz`;

    const normalizationStatus = Math.random() > 0.15 ? 'Mapped' : 'Unmapped';

    const run = {
      id: `${i + 1}`,
      facility_name: facility,
      instrument_type: instrument.type,
      instrument_model: instrument.model,
      run_id: runId,
      operator_id: generateOperatorId(),
      protocol_name: protocol.name,
      protocol_version: protocolVersion,
      reagent_kit: reagentKit,
      sample_type: sampleType,
      sample_id: generateSampleId(),
      qc_status: qcStatus,
      qc_score_prenorm: qcScorePrenorm,
      qc_score_postnorm: qcScorePostnorm,
      turnaround_time_days: turnaroundTime,
      data_volume_gb: dataVolumeGb,
      data_completeness_pct: dataCompletenessPct,
      audit_trail_complete: auditTrailComplete,
      field_source: fieldSource,
      timestamp_captured: timestampCaptured.toISOString(),
      version: version,
      validation_status: validationStatus,
      dataset_type: datasetType,
      licensing_status: licensingStatus,
      value_dollars: valueDollars,
      read_1_length: read1Length,
      read_2_length: read2Length,
      indices_1_length: indices1Length,
      indices_2_length: indices2Length,
      phix_pct: phixPct,
      order_date: orderDate.toISOString().split('T')[0],
      total_amount: totalAmount,
      fulfillment_status: fulfillmentStatus,
      primary_data_size_gb: primaryDataSizeGb,
      primary_data_hash: primaryDataHash,
      primary_data_link: primaryDataLink,
      normalization_status: normalizationStatus,
      created_at: new Date().toISOString()
    };

    runs.push(run);

    if ((i + 1) % 100 === 0) {
      console.log(`Generated ${i + 1}/1000 records...`);
    }
  }

  const outputPath = path.resolve(__dirname, '../src/data/mockData.json');
  fs.writeFileSync(outputPath, JSON.stringify(runs, null, 2));

  console.log(`Successfully generated ${runs.length} mock records!`);
  console.log(`Saved to: ${outputPath}`);

  console.log('\nSummary:');
  console.log(`- Total runs: ${runs.length}`);
  console.log(`- Passed: ${runs.filter(r => r.qc_status === 'Pass').length}`);
  console.log(`- Failed: ${runs.filter(r => r.qc_status === 'Fail').length}`);
  console.log(`- Facilities: ${new Set(runs.map(r => r.facility_name)).size}`);
  console.log(`- Total value: $${runs.reduce((sum, r) => sum + r.value_dollars, 0).toLocaleString()}`);
}

generateMockData();
