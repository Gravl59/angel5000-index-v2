import { Brain, AlertTriangle, TrendingUp, Database, CheckCircle, XCircle, Layers, BarChart3, Building2, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { Chart } from '../components/Chart';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface CorpusSource {
  source_type: string;
  source_name: string;
  monthly_volume_tb: number;
  monthly_records: number;
  active: boolean;
}

export function AITrainingCorpus() {
  const [corpusSources, setCorpusSources] = useState<CorpusSource[]>([]);
  const [totalDataVolume, setTotalDataVolume] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showSampleData, setShowSampleData] = useState(false);

  useEffect(() => {
    async function fetchCorpusData() {
      const { data: sources } = await supabase
        .from('corpus_sources')
        .select('*')
        .eq('active', true);

      if (sources) {
        setCorpusSources(sources);
        const volumeSum = sources.reduce((sum, s) => sum + Number(s.monthly_volume_tb), 0);
        const recordsSum = sources.reduce((sum, s) => sum + s.monthly_records, 0);
        setTotalDataVolume(volumeSum);
        setTotalRecords(recordsSum);
      }

      const { data: runs } = await supabase
        .from('runs')
        .select('data_volume_gb');

      if (runs) {
        const runsVolume = runs.reduce((sum, r) => sum + Number(r.data_volume_gb), 0) / 1000;
        setTotalDataVolume(prev => prev + runsVolume);
      }
    }

    fetchCorpusData();
  }, []);

  const unfundedGrants = 47234;
  const unpublishedDatasets = 23178;
  const failedExperiments = 91456;
  const totalWasteRecords = unfundedGrants + unpublishedDatasets + failedExperiments;
  const unpublishedToPublishedRatio = 15;

  const datasetCliffProjection = [
    { year: '2024', published: 100, gravl: 0 },
    { year: '2025', published: 78, gravl: 145 },
    { year: '2026', published: 45, gravl: 280 },
    { year: '2027', published: 20, gravl: 420 },
    { year: '2028', published: 5, gravl: 580 },
  ];

  const scientificWasteBreakdown = [
    { category: 'Failed Experiments', count: failedExperiments },
    { category: 'Unfunded Grants', count: unfundedGrants },
    { category: 'Unpublished Data', count: unpublishedDatasets },
  ];

  const licensingValue = [
    { tier: 'Basic Access', value: 2.5 },
    { tier: 'Full Corpus', value: 8.5 },
    { tier: 'Exclusive Rights', value: 15 },
  ];

  const growthTrajectory = [
    { period: 'Launch', records: 5, phase: 'Historical Backfill' },
    { period: '12 months', records: 52, phase: 'Historical Backfill' },
    { period: '24 months', records: 156, phase: 'Historical Backfill' },
    { period: '36 months', records: 227, phase: 'Transition to Steady State' },
  ];

  const sampleData = [
    { id: 'GR-2024-001', type: 'Unfunded Grant', institution: 'Stanford Medicine', field: 'Oncology', date: '2024-03' },
    { id: 'FE-2024-089', type: 'Failed Experiment', institution: 'MIT BioE', field: 'Gene Therapy', date: '2024-05' },
    { id: 'UD-2024-234', type: 'Unpublished Dataset', institution: 'UCSF', field: 'Immunology', date: '2024-06' },
    { id: 'GR-2024-045', type: 'Unfunded Grant', institution: 'Johns Hopkins', field: 'Neuroscience', date: '2024-02' },
    { id: 'FE-2024-156', type: 'Failed Experiment', institution: 'Broad Institute', field: 'CRISPR', date: '2024-07' },
  ];

  if (false) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 p-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-light text-gray-900">AI Training Corpus</h1>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Exclusive access to unpublished scientific data for AI model training.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Total Records"
            value={`${(totalRecords / 1000000).toFixed(1)}M`}
            subtitle="Training data points"
            icon={<Database className="w-5 h-5 text-blue-600" />}
          />
          <MetricCard
            title="Data Volume"
            value={`${totalDataVolume.toFixed(1)} TB`}
            subtitle="Total corpus size"
            icon={<Layers className="w-5 h-5 text-green-600" />}
          />
          <MetricCard
            title="Quality Score"
            value="98.2%"
            subtitle="Validated entries"
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
          />
          <MetricCard
            title="Growth Rate"
            value="+580%"
            subtitle="Projected by 2028"
            icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
          />
        </div>

        <div>
          <h2 className="text-xl font-light text-gray-900 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-medium text-gray-900">Dataset Cliff Risk</h3>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Published scientific data projected to decline 95% by 2028 as AI models exhaust available training material.
              </p>
              <p className="text-2xl font-light text-red-600">Critical Shortage</p>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">GRAVL Advantage</h3>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Exclusive access to 95% of scientific data that never reaches publication, including negative results and failed experiments.
              </p>
              <p className="text-2xl font-light text-green-600">First-Mover Access</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-light text-gray-900 mb-4">Growth Trajectory</h2>
          <div className="bg-white border border-gray-200 p-6">
            <Chart
              data={growthTrajectory}
              xKey="period"
              yKey="records"
              title="Total Training Records (Millions)"
              height={300}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 p-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-light text-gray-900">AI Training Corpus</h1>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Exclusive access to the 95% of scientific data that never reaches publication. GRAVL captures negative results,
            protocol variations, and experimental diversity essential for robust AI model training and bias correction.
          </p>
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 px-4 py-2 text-blue-800 font-medium">
            <AlertTriangle className="w-5 h-5" />
            Dataset Cliff Mitigation: 2028-2030
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Data Injection Sources</h2>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {corpusSources.map((source) => (
              <div key={source.source_type} className="bg-white border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-medium text-gray-900">{source.source_type}</h3>
                </div>
                <div className="text-2xl font-light text-gray-900">
                  {source.monthly_volume_tb > 0
                    ? `${source.monthly_volume_tb} TB/mo`
                    : `${source.monthly_records.toLocaleString()} ${source.source_type === 'Marketplace Orders' ? 'orders' : source.source_type === 'Grant Portal Integrations' ? 'grants' : source.source_type === 'ELN Systems' ? 'entries' : 'datasets'}/mo`}
                </div>
                <div className="text-xs text-gray-600 mt-1">{source.source_name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Scientific Dark Matter Captured</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Unfunded Grants"
              value={`${unfundedGrants.toLocaleString()} grants`}
              subtitle="Hypotheses, methodologies, preliminary data"
              icon={XCircle}
              color="red"
            />
            <MetricCard
              title="Unpublished Datasets"
              value={`${unpublishedDatasets.toLocaleString()} datasets`}
              subtitle="Complete experiments never published"
              icon={Database}
              color="orange"
            />
            <MetricCard
              title="Failed Experiments"
              value={`${failedExperiments.toLocaleString()} experiments`}
              subtitle="Negative results with full context"
              icon={AlertTriangle}
              color="amber"
            />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Corpus Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard
            title="Total Training Records"
            value={`${totalWasteRecords.toLocaleString()} records`}
            subtitle="Across all scientific waste categories"
            icon={Database}
            color="blue"
          />
          <MetricCard
            title="Monthly Data Volume"
            value={`${totalDataVolume.toFixed(0)} TB`}
            subtitle="From all injection sources"
            icon={BarChart3}
            color="green"
          />
          <MetricCard
            title="Monthly Record Flow"
            value={`${totalRecords.toLocaleString()} records/mo`}
            subtitle="New records captured per month"
            icon={TrendingUp}
            color="cyan"
          />
          <MetricCard
            title="Unpublished Ratio"
            value={`${unpublishedToPublishedRatio}:1`}
            subtitle="Unavailable via traditional scraping"
            icon={CheckCircle}
            color="teal"
          />
          <MetricCard
            title="Institutional Pipeline"
            value="5 active"
            subtitle="47 institutions in onboarding"
            icon={Building2}
            color="purple"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Dataset Cliff Risk Mitigation</h2>
        <div className="bg-white border border-gray-200 p-6">
          <Chart
            data={datasetCliffProjection}
            xKey="year"
            yKey="published"
            title="Available Training Data (Indexed to 2024 Baseline)"
            height={300}
          />
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="border-l-4 border-red-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Published Data Trajectory</p>
              <p className="text-3xl font-light text-gray-900 mb-2">-95% by 2028</p>
              <p className="text-sm text-gray-700">
                AI model builders (OpenAI, Anthropic, Google, BioLMs) projected to exhaust
                available life-science training data by 2028-2030.
                <span className="font-medium text-red-600"> Critical data scarcity.</span>
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">GRAVL Dark Data Growth</p>
              <p className="text-3xl font-light text-gray-900 mb-2">+580% by 2028</p>
              <p className="text-sm text-gray-700">
                GRAVL's structured capture of unpublished data creates exclusive training corpus
                unavailable through traditional scraping.
                <span className="font-medium text-green-600"> First-mover access to dark data.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Corpus Growth Trajectory</h2>
        <div className="bg-white border border-gray-200 p-6">
          <Chart
            data={growthTrajectory}
            xKey="period"
            yKey="records"
            title="Total Training Records (Millions)"
            height={300}
          />
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Historical Backfill Phase</p>
              <p className="text-3xl font-light text-gray-900 mb-2">0-36 months</p>
              <p className="text-sm text-gray-700">
                Capture 50 years of archived unpublished data from research institutions.
                <span className="font-medium text-blue-600"> Exponential growth from historical archives.</span>
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Steady State Production</p>
              <p className="text-3xl font-light text-gray-900 mb-2">30M records/year</p>
              <p className="text-sm text-gray-700">
                Ongoing capture of newly generated unpublished research data.
                <span className="font-medium text-green-600"> Continuous high-value data feed.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-light text-gray-900 mb-4">Scientific Waste Composition</h2>
          <div className="bg-white border border-gray-200 p-6">
            <Chart
              data={scientificWasteBreakdown}
              xKey="category"
              yKey="count"
              title="Training Corpus by Source Type"
              height={280}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-light text-gray-900 mb-4">Licensing Tiers</h2>
          <div className="bg-white border border-gray-200 p-6">
            <Chart
              data={licensingValue}
              xKey="tier"
              yKey="value"
              title="Annual Licensing Value ($M)"
              height={280}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Training Corpus Value Proposition</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-medium text-gray-900">Bias Correction</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              {failedExperiments.toLocaleString()} documented failed experiments prevent model overfitting
              and reduce hallucination risk in biomedical AI applications.
            </p>
            <div className="text-2xl font-light text-gray-900">{failedExperiments.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Negative results captured</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">Methodology Diversity</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              {unfundedGrants.toLocaleString()} unfunded grants with hypotheses and methodologies provide
              edge-case diversity essential for generalizable models.
            </p>
            <div className="text-2xl font-light text-gray-900">{unfundedGrants.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Research approaches captured</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-cyan-600" />
              <h3 className="text-lg font-medium text-gray-900">Exclusive Access</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              {unpublishedToPublishedRatio}:1 unpublished-to-published ratio means data
              unavailable through PubMed, arXiv, or web scraping.
            </p>
            <div className="text-2xl font-light text-gray-900">{unpublishedToPublishedRatio}:1</div>
            <div className="text-sm text-gray-600">Signal enrichment ratio</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Data Quality & Standards</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-2">Metadata Completeness</div>
            <div className="text-3xl font-light text-gray-900 mb-1">94%</div>
            <div className="text-xs text-gray-500">All critical fields captured</div>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-2">Format Standardization</div>
            <div className="text-3xl font-light text-gray-900 mb-1">JSON + CSV</div>
            <div className="text-xs text-gray-500">Machine-readable outputs</div>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-2">Deduplication</div>
            <div className="text-3xl font-light text-gray-900 mb-1">PubMed</div>
            <div className="text-xs text-gray-500">Cross-referenced against published data</div>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-2">Temporal Distribution</div>
            <div className="text-3xl font-light text-gray-900 mb-1">80% post-2010</div>
            <div className="text-xs text-gray-500">Modern methodologies captured</div>
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowSampleData(!showSampleData)}
          className="w-full bg-white border border-gray-300 p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-light text-gray-900">Sample Data Preview</h2>
          </div>
          {showSampleData ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
        </button>
        {showSampleData && (
          <div className="bg-white border border-gray-200 border-t-0 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">Representative sample of {sampleData.length} records (full dataset contains {totalWasteRecords.toLocaleString()} records)</p>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Download 100-Record Sample
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-700 font-medium">Record ID</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-medium">Type</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-medium">Institution</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-medium">Field</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900 font-mono text-xs">{record.id}</td>
                      <td className="px-4 py-3 text-gray-700">{record.type}</td>
                      <td className="px-4 py-3 text-gray-700">{record.institution}</td>
                      <td className="px-4 py-3 text-gray-700">{record.field}</td>
                      <td className="px-4 py-3 text-gray-600">{record.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <Brain className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">Licensing Opportunity: AI Model Developers</h3>
            <p className="text-blue-800 mb-4">
              AI platform companies seek exclusive, high-quality biomedical training data as published
              datasets approach exhaustion. GRAVL provides structured access to {totalWasteRecords.toLocaleString()} records
              of unpublished scientific data across {corpusSources.length} injection sources.
            </p>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-medium text-blue-900 mb-2">Licensing Model</p>
                <p className="text-blue-800">• Basic Access: $2.5M/year</p>
                <p className="text-blue-800">• Full Corpus: $8.5M/year</p>
                <p className="text-blue-800">• Exclusive Rights: $15M/year</p>
              </div>
              <div>
                <p className="font-medium text-blue-900 mb-2">Value Proposition</p>
                <p className="text-blue-800">• {totalRecords.toLocaleString()} new records/month</p>
                <p className="text-blue-800">• {totalDataVolume.toFixed(0)} TB monthly volume</p>
                <p className="text-blue-800">• Structured, permissioned data rights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
