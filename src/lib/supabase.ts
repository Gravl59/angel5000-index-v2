import { createClient } from '@supabase/supabase-js';
import mockData from '../data/mockData.json';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Run = {
  id: string;
  facility_name: string;
  instrument_type: string;
  instrument_model: string;
  run_id: string;
  operator_id: string;
  protocol_name: string;
  protocol_version: string;
  reagent_kit: string;
  sample_type: string;
  sample_id: string;
  qc_status: string;
  qc_score_prenorm: number;
  qc_score_postnorm: number;
  turnaround_time_days: number;
  data_volume_gb: number;
  data_completeness_pct: number;
  audit_trail_complete: boolean;
  field_source: string;
  timestamp_captured: string;
  version: string;
  validation_status: string;
  dataset_type: string;
  licensing_status: string;
  value_dollars: number;
  read_1_length: number;
  read_2_length: number;
  indices_1_length: number;
  indices_2_length: number;
  phix_pct: number;
  order_date: string;
  total_amount: number;
  fulfillment_status: string;
  primary_data_size_gb: number;
  primary_data_hash: string;
  primary_data_link: string;
  normalization_status: string;
  created_at: string;
};

export const getAllRuns = (): Run[] => {
  return mockData as Run[];
};

export const getTotalDataVolume = (): number => {
  const runs = getAllRuns();
  return runs.reduce((sum, run) => sum + run.primary_data_size_gb, 0) / 1000;
};

export const getUniqueFacilities = (): number => {
  const runs = getAllRuns();
  const facilities = new Set(runs.map(r => r.facility_name));
  return facilities.size;
};

export const getQCFailCount = (): number => {
  const runs = getAllRuns();
  return runs.filter(r => r.qc_status === 'Fail').length;
};

export const getUniqueProtocols = (): number => {
  const runs = getAllRuns();
  const protocols = new Set(runs.map(r => `${r.protocol_name}_${r.protocol_version}`));
  return protocols.size;
};

export const getTotalDatasetValue = (): number => {
  const runs = getAllRuns();
  return runs.reduce((sum, run) => sum + run.value_dollars, 0);
};

export const getTotalTransactionValue = (): number => {
  const runs = getAllRuns();
  return runs.reduce((sum, run) => sum + run.total_amount, 0);
};

export const getCompletedRuns = (): number => {
  const runs = getAllRuns();
  return runs.filter(r => r.fulfillment_status === 'COMPLETED').length;
};

export const getUniqueReagentKits = (): number => {
  const runs = getAllRuns();
  const kits = new Set(runs.map(r => r.reagent_kit));
  return kits.size;
};

export const getNormalizationSuccessRate = (): number => {
  const runs = getAllRuns();
  const mapped = runs.filter(r => r.normalization_status === 'Mapped').length;
  return (mapped / runs.length) * 100;
};

export const getAvgQCScoreLift = (): number => {
  const runs = getAllRuns();
  const totalLift = runs.reduce((sum, run) => sum + (run.qc_score_postnorm - run.qc_score_prenorm), 0);
  return totalLift / runs.length;
};

export const getReagentKitReliability = (): { kit: string; score: number; runs: number }[] => {
  const runs = getAllRuns();
  const kitStats: Record<string, { passCount: number; totalCount: number }> = {};

  runs.forEach(run => {
    if (!kitStats[run.reagent_kit]) {
      kitStats[run.reagent_kit] = { passCount: 0, totalCount: 0 };
    }
    kitStats[run.reagent_kit].totalCount++;
    if (run.qc_status === 'Pass') {
      kitStats[run.reagent_kit].passCount++;
    }
  });

  return Object.entries(kitStats)
    .map(([kit, stats]) => ({
      kit,
      score: Math.round((stats.passCount / stats.totalCount) * 100),
      runs: stats.totalCount
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};

export type Angel5000Company = {
  id: number;
  company_id: string;
  company_name: string;
  ein: string;
  founder_name: string;
  sector: string;
  state: string;
  date_founded: string;
  website: string;
  description: string;
  category: 'mega-winner' | 'potential-unicorn' | 'non-unicorn' | 'index-constituent' | 'observed-growth' | 'historic-outlier';
  lifecycle_status?: string;
  index_year?: number;
  verified_company?: boolean;
  verified_founder?: boolean;
  eligible_universe?: boolean;
  data_completeness?: string;
  created_at: string;
  updated_at: string;
};

export const getAngel5000Companies = async (): Promise<Angel5000Company[]> => {
  const { data, error } = await supabase
    .from('angel5000_companies')
    .select('*')
    .order('category', { ascending: true })
    .order('company_name', { ascending: true });

  if (error) {
    console.error('Error fetching companies:', error);
    return [];
  }

  return data || [];
};

export const getAngel5000Stats = async () => {
  const companies = await getAngel5000Companies();

  const megaWinners = companies.filter(c => c.category === 'mega-winner').length;
  const potentialUnicorns = companies.filter(c => c.category === 'potential-unicorn').length;
  const nonUnicorns = companies.filter(c => c.category === 'non-unicorn').length;

  const sectorBreakdown = companies.reduce((acc, company) => {
    acc[company.sector] = (acc[company.sector] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stateBreakdown = companies.reduce((acc, company) => {
    acc[company.state] = (acc[company.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalCompanies: companies.length,
    megaWinners,
    potentialUnicorns,
    nonUnicorns,
    sectorBreakdown,
    stateBreakdown,
    averageAge: calculateAverageAge(companies),
  };
};

const calculateAverageAge = (companies: Angel5000Company[]): number => {
  const currentYear = new Date().getFullYear();
  const ages = companies.map(c => {
    const foundedYear = new Date(c.date_founded).getFullYear();
    return currentYear - foundedYear;
  });
  return Math.round(ages.reduce((a, b) => a + b, 0) / ages.length);
};
