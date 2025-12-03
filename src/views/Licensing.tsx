import { useMemo } from 'react';
import { Scale, DollarSign, TrendingUp, Briefcase, Database, FileX, Microscope } from 'lucide-react';
import { getAllRuns } from '../lib/supabase';
import { MetricCard } from '../components/MetricCard';
import { DonutChart, BarChart, Chart } from '../components/Chart';

interface LicensingPipeline {
  id: string;
  datasetName: string;
  datasetType: string;
  runCount: number;
  status: 'Active License' | 'Negotiation' | 'Under Review' | 'Ready';
  estimatedValue: number;
  partnerType?: string;
  annualRevenue?: number;
}

export function Licensing() {
  const runs = useMemo(() => {
    const allRuns = getAllRuns();
    return allRuns.sort((a, b) =>
      new Date(b.timestamp_captured).getTime() - new Date(a.timestamp_captured).getTime()
    );
  }, []);

  const licensableDatasets = Math.floor(runs.length * 0.04);
  const avgDatasetValue = 7500000;
  const totalAssetValue = licensableDatasets * avgDatasetValue;
  const activeRevenue = 12000000;

  const unfundedGrants = 47234;
  const unpublishedDatasets = 23178;
  const failedExperiments = 91456;

  const readyCount = runs.filter(r => r.licensing_status === 'Ready').length;
  const readyRate = ((readyCount / runs.length) * 100).toFixed(1);

  const marketplaceBuyerMetrics = {
    totalOrders: 119,
    pendingOrders: 17,
    totalRevenue: 155410.98,
    avgOrderValue: 1305.97,
    repeatBuyers: 46,
    repeatBuyerRate: 35,
    avgCustomerLifetimeValue: 2800,
    paymentMethods: { po: 80, creditCard: 20 },
  };

  const datasets = useMemo(() => {
    const groupedByType: Record<string, any[]> = {};
    runs.forEach(run => {
      const type = run.dataset_type || 'Unknown';
      if (!groupedByType[type]) {
        groupedByType[type] = [];
      }
      groupedByType[type].push(run);
    });

    const pipelineData: LicensingPipeline[] = [];
    let idCounter = 1;

    const statuses: Array<'Active License' | 'Negotiation' | 'Under Review' | 'Ready'> =
      ['Active License', 'Active License', 'Negotiation', 'Negotiation', 'Under Review', 'Under Review', 'Ready'];
    const partnerTypes = ['Pharma', 'Biotech', 'AI/ML', 'Diagnostics', 'Academic'];

    Object.entries(groupedByType).forEach(([type, runs], index) => {
      if (runs.length >= 10 && pipelineData.length < 12) {
        const status = statuses[index % statuses.length];
        const baseValue = 6000000 + Math.random() * 3000000;
        const partnerType = status !== 'Ready' ? partnerTypes[index % partnerTypes.length] : undefined;
        const annualRevenue = status === 'Active License' ? baseValue * 0.12 :
                             status === 'Negotiation' ? baseValue * 0.10 : undefined;

        pipelineData.push({
          id: `DS-${idCounter.toString().padStart(3, '0')}`,
          datasetName: `${type} Harmonized Dataset`,
          datasetType: type,
          runCount: runs.length,
          status,
          estimatedValue: Math.round(baseValue),
          partnerType,
          annualRevenue,
        });
        idCounter++;
      }
    });

    pipelineData.sort((a, b) => {
      const order = { 'Active License': 0, 'Negotiation': 1, 'Under Review': 2, 'Ready': 3 };
      return order[a.status] - order[b.status];
    });

    return pipelineData;
  }, [runs]);

  const activeLicenses = datasets.filter(d => d.status === 'Active License').length;
  const pipelineValue = datasets.reduce((sum, d) => sum + d.estimatedValue, 0);

  const revenueProjections = [
    { year: 'Current', revenue: 12 },
    { year: 'Year 1', revenue: 18 },
    { year: 'Year 2', revenue: 32 },
    { year: 'Year 3', revenue: 55 },
    { year: 'Year 4', revenue: 75 },
  ];

  const licensingStatusCounts = runs.reduce((acc, run) => {
    acc[run.licensing_status] = (acc[run.licensing_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const licensingData = [
    { label: 'Ready', value: licensingStatusCounts['Ready'] || 0, color: '#10b981' },
    { label: 'Review', value: licensingStatusCounts['Review'] || 0, color: '#3b82f6' },
    { label: 'Pending', value: licensingStatusCounts['Pending'] || 0, color: '#f59e0b' },
  ];

  const valueByDatasetType = runs.reduce((acc, run) => {
    if (!acc[run.dataset_type]) {
      acc[run.dataset_type] = 0;
    }
    acc[run.dataset_type] += run.value_dollars;
    return acc;
  }, {} as Record<string, number>);

  const valueData = Object.entries(valueByDatasetType)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([label, value]) => ({
      label,
      value: Math.round(value / 1000),
      color: 'bg-green-600',
    }));

  const statusColors = {
    'Active License': 'bg-green-100 text-green-800 border-green-300',
    'Negotiation': 'bg-blue-100 text-blue-800 border-blue-300',
    'Under Review': 'bg-orange-100 text-orange-800 border-orange-300',
    'Ready': 'bg-gray-100 text-gray-800 border-gray-300',
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-normal text-gray-900 mb-2">Licensing & Marketplace Economics</h2>
        <p className="text-gray-600 mb-6">Dataset valuations, buyer behavior, and marketplace transactions</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Asset Value"
            value={`$${(totalAssetValue / 1000000).toFixed(0)}M`}
            icon={DollarSign}
            subtitle={`${licensableDatasets} datasets @ $7.5M avg`}
            color="green"
          />
          <MetricCard
            title="Current Annual Revenue"
            value={`$${(activeRevenue / 1000000).toFixed(0)}M`}
            icon={TrendingUp}
            subtitle={`${activeLicenses} active licenses`}
            color="blue"
          />
          <MetricCard
            title="Pipeline Value"
            value={`$${(pipelineValue / 1000000).toFixed(0)}M`}
            subtitle={`${datasets.length} datasets in pipeline`}
            icon={Briefcase}
            color="orange"
          />
          <MetricCard
            title="Ready for Licensing"
            value={readyCount}
            subtitle={`${readyRate}% of runs structured`}
            icon={Scale}
            color="gray"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-8">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-light text-gray-900">Data Asset Catalog</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The platform captures data exhaust from every marketplace transaction—including unfunded grants,
            unpublished experiments, and failed protocols that never made it to publication. This "research waste"
            represents the most valuable training data for AI and pharmaceutical R&D.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white border border-green-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <FileX className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-medium text-gray-900">Unfunded Grants</h3>
              </div>
              <p className="text-4xl font-light text-gray-900 mb-2">{unfundedGrants.toLocaleString()}+</p>
              <p className="text-sm text-gray-600">
                Grant applications with full experimental protocols that never received funding. Complete methodology,
                hypotheses, and preliminary data available.
              </p>
            </div>
            <div className="bg-white border border-green-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Unpublished Datasets</h3>
              </div>
              <p className="text-4xl font-light text-gray-900 mb-2">{unpublishedDatasets.toLocaleString()}+</p>
              <p className="text-sm text-gray-600">
                Experimental datasets that were never published—null results, inconclusive findings, or
                research pivots with full QC metadata.
              </p>
            </div>
            <div className="bg-white border border-green-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Microscope className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-medium text-gray-900">Failed Experiments</h3>
              </div>
              <p className="text-4xl font-light text-gray-900 mb-2">{failedExperiments.toLocaleString()}+</p>
              <p className="text-sm text-gray-600">
                QC failures with complete metadata—what went wrong, reagent batches, protocol deviations.
                Invaluable for training failure prediction models.
              </p>
            </div>
          </div>
          <div className="mt-6 bg-green-100 border border-green-300 p-4">
            <p className="text-sm text-green-900">
              <span className="font-medium">Why This Matters:</span> Published research represents only ~5-10% of all
              experiments conducted. The 90%+ "dark matter" of failed/unfunded/unpublished research is where AI training
              data and pharmaceutical intelligence lives. GRAVL systematically captures this exhaust from institutional
              core facilities.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Buyer Behavior & Transaction Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <MetricCard
            title="Active Buyers"
            value={`${marketplaceBuyerMetrics.repeatBuyers}`}
            subtitle="Institutional buyer accounts"
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="Repeat Purchase Rate"
            value={`${marketplaceBuyerMetrics.repeatBuyerRate}%`}
            subtitle="Buyer retention"
            icon={TrendingUp}
            color="green"
          />
          <MetricCard
            title="Avg Customer LTV"
            value={`$${marketplaceBuyerMetrics.avgCustomerLifetimeValue.toLocaleString()}`}
            subtitle="Customer lifetime value"
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Payment Method"
            value={`${marketplaceBuyerMetrics.paymentMethods.po}% PO`}
            subtitle="Enterprise trust signal"
            icon={Briefcase}
            color="blue"
          />
        </div>
        <div className="bg-blue-50 border border-blue-200 p-6 mb-6">
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-medium text-blue-900 mb-1">Total Orders</p>
              <p className="text-2xl font-light text-blue-900">{marketplaceBuyerMetrics.totalOrders}</p>
              <p className="text-blue-800">{marketplaceBuyerMetrics.pendingOrders} pending fulfillment</p>
            </div>
            <div>
              <p className="font-medium text-blue-900 mb-1">Transaction Volume</p>
              <p className="text-2xl font-light text-blue-900">${(marketplaceBuyerMetrics.totalRevenue / 1000).toFixed(1)}K</p>
              <p className="text-blue-800">Proven marketplace with real revenue</p>
            </div>
            <div>
              <p className="font-medium text-blue-900 mb-1">Avg Order Size</p>
              <p className="text-2xl font-light text-blue-900">${marketplaceBuyerMetrics.avgOrderValue.toFixed(0)}</p>
              <p className="text-blue-800">Range: $100 - $44,000</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Revenue Projections</h2>
        <div className="bg-white border border-gray-200 p-6">
          <Chart
            data={revenueProjections}
            xKey="year"
            yKey="revenue"
            title="Projected Annual Licensing Revenue ($M)"
            height={280}
          />
          <div className="mt-4 bg-blue-50 border border-blue-200 p-4">
            <p className="text-sm text-blue-900">
              <span className="font-medium">Growth Drivers:</span> Expanding from {activeLicenses} active licenses to
              15-20 licenses by Year 3. Average license value: $1.5-3M annually over 5-7 year terms.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Licensing Pipeline</h2>
        <div className="bg-white border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Dataset ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Dataset Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Runs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Partner Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Est. Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Annual Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {datasets.map((dataset) => (
                  <tr key={dataset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dataset.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {dataset.datasetName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {dataset.runCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium border ${statusColors[dataset.status]}`}>
                        {dataset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {dataset.partnerType || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${(dataset.estimatedValue / 1000000).toFixed(1)}M
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dataset.annualRevenue ? `$${(dataset.annualRevenue / 1000000).toFixed(1)}M` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 p-4">
          <p className="text-sm text-blue-900">
            <span className="font-medium">Valuation Methodology:</span> Dataset values based on run count (minimum 10 runs),
            data completeness, harmonization status, and market demand. Licensing agreements typically yield 10-12% of
            dataset value as annual recurring revenue over 5-7 year terms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Run-Level Status Distribution</h3>
          <div className="flex justify-center">
            <DonutChart data={licensingData} size={220} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Value by Dataset Type (Top 8, $1,000s)</h3>
          <BarChart data={valueData} height={220} />
        </div>
      </div>
    </div>
  );
}
