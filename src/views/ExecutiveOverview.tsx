import { TrendingUp, DollarSign, Database, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { Chart } from '../components/Chart';
import { useMemo } from 'react';
import { getAllRuns, getTotalDataVolume, getUniqueFacilities } from '../lib/supabase';

export function ExecutiveOverview() {
  const runs = useMemo(() => getAllRuns(), []);
  const totalDataVolume = useMemo(() => getTotalDataVolume(), []);
  const uniqueFacilities = useMemo(() => getUniqueFacilities(), []);

  const totalRuns = runs.length;
  const licensableDatasets = Math.floor(totalRuns * 0.04);
  const institutionalAssetValue = licensableDatasets * 7500000;
  const captureRate = 12;
  const currentRevenue = 12000000;

  const marketplaceMetrics = {
    totalFacilities: 20,
    activeFacilities: 200,
    totalServices: 248,
    totalOrders: 119,
    pendingOrders: 17,
    totalRevenue: 155410.98,
    avgOrderValue: 1305.97,
    repeatBuyers: 46,
    facilityRevenue: 20000,
  };

  const revenueProjections = [
    { phase: 'Current', revenue: currentRevenue / 1000000 },
    { phase: 'Year 1', revenue: 18 },
    { phase: 'Year 2-3', revenue: 45 },
    { phase: 'Year 3-5', revenue: 85 },
  ];

  const dataCaptureGrowth = [
    { quarter: 'Q1 2024', captured: 3 },
    { quarter: 'Q2 2024', captured: 7 },
    { quarter: 'Q3 2024', captured: 12 },
    { quarter: 'Q4 2024', captured: 20 },
    { quarter: 'Q1 2025', captured: 35 },
    { quarter: 'Q2 2025', captured: 55 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-blue-200 p-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-light text-gray-900">Executive Overview</h1>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            GRAVL captures and structures the 95% of institutional research data that traditionally goes unpublished,
            converting operational exhaust into high-value, licensable datasets.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 px-4 py-2 text-green-800 font-medium">
            <CheckCircle className="w-5 h-5" />
            Revenue Outside Federal 3% Cap
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Strategic Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Institutional Asset Value"
            value={`$${(institutionalAssetValue / 1000000).toFixed(0)}M`}
            subtitle={`${licensableDatasets} licensable datasets @ $7.5M avg`}
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Current Annual Revenue"
            value={`$${(currentRevenue / 1000000).toFixed(0)}M`}
            subtitle="From active licensing agreements"
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="Data Capture Rate"
            value={`${captureRate}%`}
            subtitle="Target: 85% by Year 3"
            icon={Database}
            color="orange"
          />
          <MetricCard
            title="Active Marketplace"
            value={`${marketplaceMetrics.totalFacilities} Facilities`}
            subtitle={`${marketplaceMetrics.totalServices} services, ${marketplaceMetrics.totalOrders} orders`}
            icon={Database}
            color="gray"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Marketplace Economics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Marketplace Revenue"
            value={`$${(marketplaceMetrics.totalRevenue / 1000).toFixed(1)}K`}
            subtitle="119 orders across 20 facilities"
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Average Order Value"
            value={`$${marketplaceMetrics.avgOrderValue.toFixed(0)}`}
            subtitle="Avg transaction size"
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="Service Portfolio"
            value={`${marketplaceMetrics.totalServices} Services`}
            subtitle="Genomics, Proteomics, Transcriptomics, more"
            icon={Database}
            color="orange"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Data Infrastructure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Data Volume"
            value={`${totalDataVolume.toFixed(2)} TB`}
            subtitle="Primary genomics and proteomics data"
            icon={Database}
            color="blue"
          />
          <MetricCard
            title="Institutional Coverage"
            value={`${uniqueFacilities} Core Facilities`}
            subtitle="Cross-institutional data capture"
            icon={Target}
            color="green"
          />
          <MetricCard
            title="Repeat Buyers"
            value={`${marketplaceMetrics.repeatBuyers} Institutions`}
            subtitle="Active institutional buyers"
            icon={CheckCircle}
            color="blue"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Revenue Growth Trajectory</h2>
        <div className="bg-white border border-gray-200 p-6">
          <Chart
            data={revenueProjections}
            xKey="phase"
            yKey="revenue"
            title="Projected Annual Revenue ($M)"
            height={280}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">The "Hidden 95%" Opportunity</h2>
        <div className="bg-white border border-gray-200 p-6">
          <Chart
            data={dataCaptureGrowth}
            xKey="quarter"
            yKey="captured"
            title="Data Capture Rate Growth (%)"
            height={280}
          />
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="border-l-4 border-red-400 pl-4">
              <p className="text-sm text-gray-600 mb-1">Without GRAVL (Historical)</p>
              <p className="text-3xl font-light text-gray-900 mb-2">95%</p>
              <p className="text-sm text-gray-700">
                Of institutional research data goes unpublished and unstructured, representing
                <span className="font-medium text-red-600"> $400M+ in lost value annually.</span>
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">With GRAVL (Current Trajectory)</p>
              <p className="text-3xl font-light text-gray-900 mb-2">12% → 85%</p>
              <p className="text-sm text-gray-700">
                Currently capturing 12% of data exhaust, growing to 85% by Year 3.
                <span className="font-medium text-green-600"> Unlocking $300M+ in institutional asset value.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-amber-900 mb-2">Market Context: The Dataset Cliff</h3>
            <p className="text-amber-800 mb-3">
              Industry analysts project AI training data exhaustion within 24-36 months. Pharma, biotech, and AI companies
              are actively seeking structured genomics and proteomics datasets. First-movers command 3-5× premium valuations.
            </p>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-medium text-amber-900">Partner Interest</p>
                <p className="text-amber-800">5 pharma partners in discussions</p>
                <p className="text-amber-800">3 AI/ML companies under NDA</p>
              </div>
              <div>
                <p className="font-medium text-amber-900">Comparable Valuations</p>
                <p className="text-amber-800">Flatiron Health: $2B (Roche, 2018)</p>
                <p className="text-amber-800">Tempus: $8.1B valuation (2024)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
