import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Download, Database, FileJson, FileSpreadsheet } from 'lucide-react';

interface SimulationRun {
  id: string;
  run_date: string;
  n_simulations: number;
  n_universe: number;
  years: number;
  alpha: number;
  created_at: string;
}

interface SimulationResult {
  id: string;
  simulation_run_id: string;
  portfolio_size: number;
  simulation_index: number;
  portfolio_multiple: number;
  portfolio_irr: number;
  top_1pct_captured: number;
  top_01pct_captured: number;
  created_at: string;
}

export default function SimulationDataExport() {
  const [runs, setRuns] = useState<SimulationRun[]>([]);
  const [selectedRunId, setSelectedRunId] = useState<string>('');
  const [selectedPortfolioSize, setSelectedPortfolioSize] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [loadingRuns, setLoadingRuns] = useState(false);
  const [recordCount, setRecordCount] = useState<number>(0);

  const loadSimulationRuns = async () => {
    setLoadingRuns(true);
    try {
      const { data, error } = await supabase
        .from('simulation_runs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRuns(data || []);
      if (data && data.length > 0) {
        setSelectedRunId(data[0].id);
        await getRecordCount(data[0].id, 'all');
      }
    } catch (error) {
      console.error('Error loading simulation runs:', error);
      alert('Failed to load simulation runs');
    } finally {
      setLoadingRuns(false);
    }
  };

  const getRecordCount = async (runId: string, portfolioSize: string) => {
    try {
      let query = supabase
        .from('simulation_results')
        .select('*', { count: 'exact', head: true })
        .eq('simulation_run_id', runId);

      if (portfolioSize !== 'all') {
        query = query.eq('portfolio_size', parseInt(portfolioSize));
      }

      const { count, error } = await query;
      if (error) throw error;
      setRecordCount(count || 0);
    } catch (error) {
      console.error('Error getting record count:', error);
    }
  };

  const handleRunChange = async (runId: string) => {
    setSelectedRunId(runId);
    await getRecordCount(runId, selectedPortfolioSize);
  };

  const handlePortfolioSizeChange = async (size: string) => {
    setSelectedPortfolioSize(size);
    await getRecordCount(selectedRunId, size);
  };

  const downloadCSV = async () => {
    if (!selectedRunId) {
      alert('Please select a simulation run');
      return;
    }

    setLoading(true);
    try {
      let query = supabase
        .from('simulation_results')
        .select('*')
        .eq('simulation_run_id', selectedRunId);

      if (selectedPortfolioSize !== 'all') {
        query = query.eq('portfolio_size', parseInt(selectedPortfolioSize));
      }

      const { data, error } = await query.order('portfolio_size').order('simulation_index');

      if (error) throw error;
      if (!data || data.length === 0) {
        alert('No data found');
        return;
      }

      const headers = [
        'simulation_run_id',
        'portfolio_size',
        'simulation_index',
        'portfolio_multiple',
        'portfolio_irr',
        'top_1pct_captured',
        'top_01pct_captured',
        'created_at'
      ];

      const csvContent = [
        headers.join(','),
        ...data.map((row: SimulationResult) =>
          headers.map(header => {
            const value = row[header as keyof SimulationResult];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
          }).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `angel5000-simulation-${selectedRunId.substring(0, 8)}-${selectedPortfolioSize === 'all' ? 'all' : `size${selectedPortfolioSize}`}-${new Date().toISOString().split('T')[0]}.csv`;

      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Failed to download CSV');
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = async () => {
    if (!selectedRunId) {
      alert('Please select a simulation run');
      return;
    }

    setLoading(true);
    try {
      const { data: runData, error: runError } = await supabase
        .from('simulation_runs')
        .select('*')
        .eq('id', selectedRunId)
        .single();

      if (runError) throw runError;

      let query = supabase
        .from('simulation_results')
        .select('*')
        .eq('simulation_run_id', selectedRunId);

      if (selectedPortfolioSize !== 'all') {
        query = query.eq('portfolio_size', parseInt(selectedPortfolioSize));
      }

      const { data: resultsData, error: resultsError } = await query
        .order('portfolio_size')
        .order('simulation_index');

      if (resultsError) throw resultsError;
      if (!resultsData || resultsData.length === 0) {
        alert('No data found');
        return;
      }

      const exportData = {
        simulation_run: runData,
        results: resultsData,
        export_date: new Date().toISOString(),
        record_count: resultsData.length
      };

      const jsonContent = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `angel5000-simulation-${selectedRunId.substring(0, 8)}-${selectedPortfolioSize === 'all' ? 'all' : `size${selectedPortfolioSize}`}-${new Date().toISOString().split('T')[0]}.json`;

      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading JSON:', error);
      alert('Failed to download JSON');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-light text-slate-800">
              Simulation Data Export
            </h1>
          </div>

          <p className="text-slate-600 mb-8">
            Download Monte Carlo simulation results for analysis. Export up to 40,000 simulation records
            in CSV or JSON format.
          </p>

          <div className="space-y-6">
            <div>
              <button
                onClick={loadSimulationRuns}
                disabled={loadingRuns}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Database className="w-5 h-5" />
                {loadingRuns ? 'Loading...' : 'Load Available Simulations'}
              </button>
            </div>

            {runs.length > 0 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Simulation Run
                  </label>
                  <select
                    value={selectedRunId}
                    onChange={(e) => handleRunChange(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-3 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {runs.map((run) => (
                      <option key={run.id} value={run.id}>
                        {new Date(run.created_at).toLocaleString()} - {run.n_simulations.toLocaleString()} runs,
                        Universe: {run.n_universe.toLocaleString()},
                        {run.years} years
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Filter by Portfolio Size
                  </label>
                  <select
                    value={selectedPortfolioSize}
                    onChange={(e) => handlePortfolioSizeChange(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-3 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Portfolio Sizes</option>
                    <option value="20">20 companies</option>
                    <option value="200">200 companies</option>
                    <option value="1000">1,000 companies</option>
                    <option value="5000">5,000 companies</option>
                  </select>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600">
                    <strong>Records to export:</strong> {recordCount.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Each record contains: portfolio_multiple, portfolio_irr, top_1pct_captured,
                    top_01pct_captured, simulation_index
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <button
                    onClick={downloadCSV}
                    disabled={loading || !selectedRunId}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3"
                  >
                    <FileSpreadsheet className="w-5 h-5" />
                    {loading ? 'Exporting...' : 'Download CSV'}
                  </button>

                  <button
                    onClick={downloadJSON}
                    disabled={loading || !selectedRunId}
                    className="bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3"
                  >
                    <FileJson className="w-5 h-5" />
                    {loading ? 'Exporting...' : 'Download JSON'}
                  </button>
                </div>
              </>
            )}

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mt-8">
              <h3 className="font-semibold text-blue-900 mb-3">Export Formats</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <FileSpreadsheet className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>CSV:</strong> Best for Excel, Google Sheets, pandas, R, or statistical analysis tools
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileJson className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>JSON:</strong> Includes simulation metadata, ideal for programmatic analysis and APIs
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 mt-4">
              <h3 className="font-semibold text-slate-800 mb-3">Data Fields</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>simulation_run_id:</strong> UUID linking to simulation parameters</li>
                <li><strong>portfolio_size:</strong> Number of companies (20, 200, 1000, 5000)</li>
                <li><strong>simulation_index:</strong> Iteration number (0-9999)</li>
                <li><strong>portfolio_multiple:</strong> Average return multiple (e.g., 1.5x)</li>
                <li><strong>portfolio_irr:</strong> Internal rate of return</li>
                <li><strong>top_1pct_captured:</strong> Count of top 1% winners in portfolio</li>
                <li><strong>top_01pct_captured:</strong> Count of top 0.1% winners in portfolio</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-slate-400">
          <span className="font-semibold text-slate-500">Angel5000</span>
          <span className="mx-1">•</span>
          <span>Neutral Index for Early-Stage Innovation</span>
          <span className="mx-1">•</span>
          <a
            href="mailto:hello@angel5000.com"
            className="underline underline-offset-2 hover:text-slate-600 transition-colors"
          >
            hello@angel5000.com
          </a>
        </div>
      </div>
    </div>
  );
}
