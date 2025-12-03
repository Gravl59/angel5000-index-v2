import { Radio, Zap, Activity, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { Chart } from '../components/Chart';
import { useMemo } from 'react';
import { getAllRuns, getTotalDataVolume, getTotalDatasetValue, getTotalTransactionValue, getCompletedRuns } from '../lib/supabase';

export function InstrumentFirehose() {
  const runs = useMemo(() => getAllRuns(), []);
  const totalDataVolume = useMemo(() => getTotalDataVolume(), []);
  const datasetValue = useMemo(() => getTotalDatasetValue(), []);
  const transactionValue = useMemo(() => getTotalTransactionValue(), []);
  const completedRuns = useMemo(() => getCompletedRuns(), []);

  const totalRuns = runs.length;
  const completedPercentage = ((completedRuns / totalRuns) * 100).toFixed(1);

  if (false) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-slate-50 to-green-50 border border-green-200 p-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-light text-gray-900">Instrument Firehose</h1>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Real-time data capture from lab instruments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Runs"
            value={totalRuns.toLocaleString()}
            subtitle="Captured"
            icon={<Activity className="w-5 h-5 text-blue-600" />}
          />
          <MetricCard
            title="Data Volume"
            value={`${totalDataVolume.toFixed(1)} TB`}
            subtitle="Total captured"
            icon={<Zap className="w-5 h-5 text-green-600" />}
          />
          <MetricCard
            title="Completion Rate"
            value={`${completedPercentage}%`}
            subtitle={`${completedRuns} completed`}
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          />
          <MetricCard
            title="Transaction Value"
            value={`$${(transactionValue / 1000000).toFixed(1)}M`}
            subtitle="Market activity"
            icon={<DollarSign className="w-5 h-5 text-blue-600" />}
          />
        </div>
      </div>
    );
  }
  const qcCheckpoints = Math.floor(totalRuns * 8.2);
  const errorEvents = 127;

  const marketplaceServices = {
    totalServices: 248,
    orbitrapAstralOrders: 80,
    orbitrapAstralPrice: 140,
    novaseqPriceRange: '1000-2000',
    nextseqPrice: 1000,
    chromium10xPrice: 900,
    operatorHourRate: '102-150',
    totalFacilities: 20,
  };

  const realTimeStreamValue = [
    { month: 'Month 1', traces: 4200, qc: 890, errors: 23 },
    { month: 'Month 2', traces: 8100, qc: 1670, errors: 38 },
    { month: 'Month 3', traces: 12400, qc: 2550, errors: 51 },
    { month: 'Month 4', traces: 17200, qc: 3540, errors: 67 },
    { month: 'Month 5', traces: 21100, qc: 4340, errors: 89 },
    { month: 'Month 6', traces: 23400, qc: 4930, errors: 127 },
  ];

  const instrumentTypes = [
    { instrument: 'Next-Gen Sequencing\n(NovaSeq, NextSeq)', traces: 7100 },
    { instrument: 'Proteomics\n(Orbitrap Astral)', traces: 6800 },
    { instrument: 'Single Cell\n(10X Chromium)', traces: 5400 },
    { instrument: 'Flow Cytometry', traces: 3200 },
    { instrument: 'Mass Spectrometry', traces: 2950 },
  ];

  const licensingTiers = [
    { tier: 'API Access\n(Rate Limited)', value: 0.5 },
    { tier: 'Bulk Export\n(Quarterly)', value: 2.8 },
    { tier: 'Real-Time\nFirehose', value: 7.5 },
    { tier: 'Exclusive\nPartnership', value: 10 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 p-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Radio className="w-8 h-8 text-cyan-600" />
            <h1 className="text-3xl font-light text-gray-900">Instrument Exhaust Streams</h1>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Real-time access to raw instrument traces, QC event logs, and error-resolution patterns.
            The "Twitter Firehose" model for scientific instrumentation—licensing governed, millisecond-level
            data streams to instrument makers and AI builders.
          </p>
          <div className="inline-flex items-center gap-2 bg-cyan-100 border border-cyan-300 px-4 py-2 text-cyan-800 font-medium">
            <Zap className="w-5 h-5" />
            Firehose Model: Twitter/Reddit for Science
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Real-Time Exhaust Capture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Data Output"
            value={`${totalDataVolume.toFixed(2)} TB`}
            subtitle="Raw instrument output across facilities"
            icon={Activity}
            color="blue"
          />
          <MetricCard
            title="Dataset Value"
            value={`$${(datasetValue / 1000000).toFixed(1)}M`}
            subtitle="Total licensing value potential"
            icon={DollarSign}
            color="blue"
          />
          <MetricCard
            title="Transaction Value"
            value={`$${(transactionValue / 1000000).toFixed(1)}M`}
            subtitle="Total transaction pipeline value"
            icon={TrendingUp}
            color="green"
          />
          <MetricCard
            title="Completed Runs"
            value={`${completedRuns} (${completedPercentage}%)`}
            subtitle="Real-time data capture completion"
            icon={Clock}
            color="orange"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Cumulative Stream Growth</h2>
        <div className="bg-white border border-gray-200 p-6">
          <Chart
            data={realTimeStreamValue}
            xKey="month"
            yKey="traces"
            title="Instrument Traces Accumulated"
            height={300}
          />
          <div className="mt-6 grid grid-cols-3 gap-6">
            <div className="border-l-4 border-cyan-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Service Portfolio</p>
              <p className="text-3xl font-light text-gray-900 mb-2">{marketplaceServices.totalServices} Services</p>
              <p className="text-sm text-gray-700">
                Across {marketplaceServices.totalFacilities} facilities: NovaSeq X ($1K-2K per flow cell),
                Orbitrap Astral ($140 per run), 10X Chromium ($900 per sample).
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Top Service: Orbitrap Astral</p>
              <p className="text-3xl font-light text-gray-900 mb-2">{marketplaceServices.orbitrapAstralOrders} Orders</p>
              <p className="text-sm text-gray-700">
                Most popular proteomics service at ${marketplaceServices.orbitrapAstralPrice} per run.
                Demonstrates high marketplace demand.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Error Edge Cases</p>
              <p className="text-3xl font-light text-gray-900 mb-2">{errorEvents}</p>
              <p className="text-sm text-gray-700">
                Instrument failures logged with resolution steps—essential for robust model training.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-light text-gray-900 mb-4">Instrument Type Distribution</h2>
          <div className="bg-white border border-gray-200 p-6">
            <Chart
              data={instrumentTypes}
              xKey="instrument"
              yKey="traces"
              title="Traces by Instrument Platform"
              height={280}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-light text-gray-900 mb-4">Licensing Tiers</h2>
          <div className="bg-white border border-gray-200 p-6">
            <Chart
              data={licensingTiers}
              xKey="tier"
              yKey="value"
              title="Annual Licensing Value ($M)"
              height={280}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Firehose Value Drivers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="w-6 h-6 text-cyan-600" />
              <h3 className="text-lg font-medium text-gray-900">Real-Time Access</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Millisecond-level capture eliminates months-to-years publication delay. Fresh training
              data enables continuous model improvement and competitive advantage.
            </p>
            <div className="text-2xl font-light text-gray-900">&lt; 1ms</div>
            <div className="text-sm text-gray-600">Capture latency vs. months delay</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">Unfiltered Signals</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              {marketplaceServices.totalServices} services available across {marketplaceServices.totalFacilities} facilities.
              Raw instrument traces include edge cases, anomalies, and error patterns.
            </p>
            <div className="text-2xl font-light text-gray-900">{marketplaceServices.totalServices}</div>
            <div className="text-sm text-gray-600">Active services in marketplace</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-medium text-gray-900">Ground Truth QC</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              {qcCheckpoints.toLocaleString()} operator-validated QC checkpoints provide labeled
              training data for supervised learning and quality prediction models.
            </p>
            <div className="text-2xl font-light text-gray-900">{qcCheckpoints.toLocaleString()}</div>
            <div className="text-sm text-gray-600">QC decision points logged</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <Radio className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">Licensing Opportunity: Instrument Manufacturers & AI Developers</h3>
            <p className="text-blue-800 mb-4">
              Instrument manufacturers seek real-world utilization data to improve product design and predict
              maintenance needs. AI developers require high-volume, unfiltered signals for multimodal biomedical
              models. GRAVL provides governed access to real-time instrument exhaust streams.
            </p>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-medium text-blue-900 mb-2">Licensing Model</p>
                <p className="text-blue-800">• API Access (Rate Limited): $500K/year</p>
                <p className="text-blue-800">• Bulk Export (Quarterly): $2.8M/year</p>
                <p className="text-blue-800">• Real-Time Firehose: $7.5M/year</p>
                <p className="text-blue-800">• Exclusive Partnership: $10M/year</p>
              </div>
              <div>
                <p className="font-medium text-blue-900 mb-2">Value Proposition</p>
                <p className="text-blue-800">• Cross-institutional exhaust pipeline</p>
                <p className="text-blue-800">• Governed data with explicit permissions</p>
                <p className="text-blue-800">• Real-time vs. retrospective capture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
