import { Microscope, XCircle, Award, DollarSign, TrendingDown, CheckCircle, TrendingUp } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { Chart } from '../components/Chart';
import { useMemo } from 'react';
import { getAllRuns, getQCFailCount, getUniqueReagentKits, getNormalizationSuccessRate, getAvgQCScoreLift, getReagentKitReliability } from '../lib/supabase';

export function RDWastePrevention() {
  useMemo(() => getAllRuns(), []);
  const failedProtocols = useMemo(() => getQCFailCount(), []);
  const reagentKitsTested = useMemo(() => getUniqueReagentKits(), []);
  const normalizationSuccessRate = useMemo(() => getNormalizationSuccessRate(), []);
  const avgQCScoreLift = useMemo(() => getAvgQCScoreLift(), []);
  const reagentReliability = useMemo(() => getReagentKitReliability(), []);

  const avgCostPerFailure = 2300000;

  if (false) {
    const wastePreventionValue = failedProtocols * avgCostPerFailure;
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-slate-50 to-red-50 border border-red-200 p-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Microscope className="w-8 h-8 text-red-600" />
              <h1 className="text-3xl font-light text-gray-900">R&D Waste Prevention</h1>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Insights from failed experiments and protocol optimization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Failed Protocols"
            value={failedProtocols.toLocaleString()}
            subtitle="Documented"
            icon={<XCircle className="w-5 h-5 text-red-600" />}
          />
          <MetricCard
            title="Waste Value"
            value={`$${(wastePreventionValue / 1000000).toFixed(0)}M`}
            subtitle="Prevention opportunity"
            icon={<DollarSign className="w-5 h-5 text-green-600" />}
          />
          <MetricCard
            title="Reagent Kits Tested"
            value={reagentKitsTested.toLocaleString()}
            subtitle="Reliability data"
            icon={<Award className="w-5 h-5 text-blue-600" />}
          />
          <MetricCard
            title="QC Score Lift"
            value={`+${avgQCScoreLift}%`}
            subtitle="After normalization"
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          />
        </div>
      </div>
    );
  }
  const totalWastePrevented = failedProtocols * avgCostPerFailure;

  const costAvoidanceByCategory = [
    { category: 'Redundant Failed\nExperiments', avoided: 2870 },
    { category: 'Kit Validation\nFailures', avoided: 980 },
    { category: 'Protocol Dead-Ends', avoided: 785 },
    { category: 'Hypothesis\nDuplication', avoided: 620 },
  ];


  const failuresByResearchArea = [
    { area: 'Oncology', failures: 387 },
    { area: 'Immunology', failures: 298 },
    { area: 'Neuroscience', failures: 245 },
    { area: 'Metabolic Disease', failures: 189 },
    { area: 'Infectious Disease', failures: 128 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 p-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Microscope className="w-8 h-8 text-rose-600" />
            <h1 className="text-3xl font-light text-gray-900">R&D Waste Prevention</h1>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Structured library of failed protocols, abandoned hypotheses, and reagent reliability scores.
            Avoid re-inventing failed approaches and accelerate R&D by learning from documented dead-ends
            across institutional research programs.
          </p>
          <div className="inline-flex items-center gap-2 bg-rose-100 border border-rose-300 px-4 py-2 text-rose-800 font-medium">
            <TrendingDown className="w-5 h-5" />
            R&D Waste Reduction: $2.87B Prevented
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">R&D Intelligence Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Failed Protocols Documented"
            value={failedProtocols.toLocaleString()}
            subtitle="QC failures with full context"
            icon={XCircle}
            color="red"
          />
          <MetricCard
            title="Reagent Kits Evaluated"
            value={reagentKitsTested.toString()}
            subtitle="Commercial kits with reliability scoring"
            icon={Award}
            color="blue"
          />
          <MetricCard
            title="Normalization Success Rate"
            value={`${normalizationSuccessRate.toFixed(1)}%`}
            subtitle="Successfully mapped and normalized"
            icon={CheckCircle}
            color="green"
          />
          <MetricCard
            title="Avg QC Score Lift"
            value={`+${avgQCScoreLift.toFixed(1)} pts`}
            subtitle="Post-normalization improvement"
            icon={TrendingUp}
            color="orange"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">R&D Waste Prevention</h2>
        <div className="bg-white border border-gray-200 p-6">
          <Chart
            data={costAvoidanceByCategory}
            xKey="category"
            yKey="avoided"
            title="Cost Avoidance by Category ($M)"
            height={300}
          />
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="border-l-4 border-red-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Historical Institutional Waste</p>
              <p className="text-3xl font-light text-gray-900 mb-2">$400M+/year</p>
              <p className="text-sm text-gray-700">
                Without failure intelligence, institutions duplicate expensive dead-ends annually.
                Estimated
                <span className="font-medium text-red-600"> $2.3M per redundant failed experiment</span>
                {' '}across {failedProtocols.toLocaleString()} documented failures.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">With GRAVL Intelligence</p>
              <p className="text-3xl font-light text-gray-900 mb-2">${(totalWastePrevented / 1000000000).toFixed(2)}B saved</p>
              <p className="text-sm text-gray-700">
                Licensees gain access to structured failure library, preventing redundant experiments
                and accelerating time-to-discovery.
                <span className="font-medium text-green-600"> 40-60% R&D efficiency improvement.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-light text-gray-900 mb-4">Reagent Kit Reliability Scores</h2>
          <div className="bg-white border border-gray-200 p-6">
            <div className="space-y-4">
              {reagentReliability.map((kit) => (
                <div key={kit.kit} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">{kit.kit}</span>
                    <span className="text-sm text-gray-600">{kit.runs} institutional runs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 h-2">
                      <div
                        className={`h-2 ${
                          kit.score >= 85 ? 'bg-green-500' :
                          kit.score >= 75 ? 'bg-blue-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${kit.score}%` }}
                      />
                    </div>
                    <span className="text-lg font-light text-gray-900 w-12 text-right">{kit.score}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-2">Reagent Reliability Index</p>
              <p>Like a credit score for lab reagents, this metric evaluates commercial kits based on institutional
              QC outcomes. Scores reflect consistency across multiple runs and facilities, helping procurement teams
              identify high-performing vs. unreliable products.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-light text-gray-900 mb-4">Failures by Research Area</h2>
          <div className="bg-white border border-gray-200 p-6">
            <Chart
              data={failuresByResearchArea}
              xKey="area"
              yKey="failures"
              title="Documented Failed Protocols"
              height={280}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Intelligence Value Drivers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-medium text-gray-900">Failed Protocol Library</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              {failedProtocols.toLocaleString()} documented dead-ends with full experimental context.
              Pharma gains competitive intelligence on what doesn't work—avoiding expensive duplication.
            </p>
            <div className="text-2xl font-light text-gray-900">{failedProtocols.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Failed approaches documented</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">Reagent Credit Scores</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              {reagentKitsTested} commercial kits with institutional QC reliability scoring. Procurement
              teams reduce vendor risk and optimize R&D spend.
            </p>
            <div className="text-2xl font-light text-gray-900">{reagentKitsTested}</div>
            <div className="text-sm text-gray-600">Kits with reliability scores</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-medium text-gray-900">Cost Avoidance</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              ${(totalWastePrevented / 1000000000).toFixed(2)}B institutional waste prevented by avoiding
              redundant failed experiments. Time-to-market acceleration worth 10-20× the data cost.
            </p>
            <div className="text-2xl font-light text-gray-900">${(totalWastePrevented / 1000000000).toFixed(2)}B</div>
            <div className="text-sm text-gray-600">R&D waste prevented</div>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 p-6">
        <div className="flex items-start gap-4">
          <Microscope className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-orange-900 mb-2">Licensing Opportunity: Pharmaceutical & Biotech R&D Teams</h3>
            <p className="text-orange-800 mb-4">
              Pharmaceutical and biotech companies seek to avoid duplicating expensive failed experiments and gain
              intelligence on abandoned research directions. GRAVL provides structured access to failure data,
              reagent reliability scores, and protocol benchmarks. Comparable to Flatiron Health's $2B acquisition
              by Roche for unpublished oncology records.
            </p>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-medium text-orange-900 mb-2">Licensing Model</p>
                <p className="text-orange-800">• Single Dataset: $7.5M (Flatiron comp)</p>
                <p className="text-orange-800">• Research Area Bundle: $15-25M</p>
                <p className="text-orange-800">• Full Intelligence Access: $50M+</p>
              </div>
              <div>
                <p className="font-medium text-orange-900 mb-2">Value Proposition</p>
                <p className="text-orange-800">• 40-60% R&D efficiency improvement</p>
                <p className="text-orange-800">• Competitive IP intelligence</p>
                <p className="text-orange-800">• Time-to-market acceleration (12-18 months)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Comparable Transaction: Flatiron Health</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Acquisition</p>
                <p className="text-2xl font-light text-gray-900 mb-1">$2.0B</p>
                <p className="text-sm text-gray-700">Roche acquired Flatiron (2018)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Data Type</p>
                <p className="text-lg font-medium text-gray-900 mb-1">Unpublished Oncology Records</p>
                <p className="text-sm text-gray-700">Real-world clinical outcomes data</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">GRAVL Advantage</p>
                <p className="text-lg font-medium text-gray-900 mb-1">Cross-Institutional</p>
                <p className="text-sm text-gray-700">Multiple research areas, systematic capture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
