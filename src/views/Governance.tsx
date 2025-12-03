import { useMemo } from 'react';
import { Shield, CheckCircle, AlertTriangle, FileText, Clock, Award, TrendingUp } from 'lucide-react';
import { getAllRuns } from '../lib/supabase';
import { MetricCard } from '../components/MetricCard';
import { DonutChart, BarChart } from '../components/Chart';

export function Governance() {
  const runs = useMemo(() => {
    const allRuns = getAllRuns();
    return allRuns.sort((a, b) =>
      new Date(b.timestamp_captured).getTime() - new Date(a.timestamp_captured).getTime()
    );
  }, []);

  const totalRuns = runs.length;

  const auditCompleteCount = runs.filter(r => r.audit_trail_complete).length;
  const auditCompleteRate = ((auditCompleteCount / totalRuns) * 100).toFixed(1);

  const validatedCount = runs.filter(r => r.validation_status === 'Validated').length;
  const validationRate = ((validatedCount / totalRuns) * 100).toFixed(1);

  const inReviewCount = runs.filter(r => r.validation_status === 'In Review').length;

  const avgDataCompleteness = (runs.reduce((sum, r) => sum + r.data_completeness_pct, 0) / runs.length).toFixed(1);

  const validationStatusCounts = runs.reduce((acc, run) => {
    acc[run.validation_status] = (acc[run.validation_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const validationData = [
    { label: 'Validated', value: validationStatusCounts['Validated'] || 0, color: '#10b981' },
    { label: 'In Review', value: validationStatusCounts['In Review'] || 0, color: '#f59e0b' },
    { label: 'Pending', value: validationStatusCounts['Pending'] || 0, color: '#6b7280' },
  ];

  const auditData = [
    { label: 'Complete', value: auditCompleteCount, color: '#10b981' },
    { label: 'Incomplete', value: totalRuns - auditCompleteCount, color: '#ef4444' },
  ];

  const fieldSourceCounts = runs.reduce((acc, run) => {
    acc[run.field_source] = (acc[run.field_source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const fieldSourceData = Object.entries(fieldSourceCounts).map(([label, value]) => ({
    label,
    value,
    color: 'bg-blue-600',
  }));

  const nihDMSCompliance = 94;
  const fairAlignment = 92;
  const reproducibilityReadiness = 89;
  const datasetsAtRisk = 0;


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-normal text-gray-900 mb-2">Governance Overview</h2>
        <p className="text-gray-600 mb-6">Compliance, validation, and data quality metrics</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Audit Trail Complete"
            value={`${auditCompleteRate}%`}
            icon={Shield}
            subtitle={`${auditCompleteCount} of ${totalRuns}`}
            color="green"
          />
          <MetricCard
            title="Validation Rate"
            value={`${validationRate}%`}
            icon={CheckCircle}
            subtitle={`${validatedCount} validated`}
            color="blue"
          />
          <MetricCard
            title="In Review"
            value={inReviewCount}
            icon={Clock}
            subtitle="Awaiting validation"
            color="orange"
          />
          <MetricCard
            title="Data Completeness"
            value={`${avgDataCompleteness}%`}
            icon={FileText}
            subtitle="Average across runs"
            color="gray"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Federal Compliance & FAIR Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="NIH DMS Compliance"
            value={`${nihDMSCompliance}%`}
            subtitle="Data Management & Sharing Plan alignment"
            icon={Award}
            color="green"
          />
          <MetricCard
            title="FAIR Alignment"
            value={`${fairAlignment}%`}
            subtitle="Findable, Accessible, Interoperable, Reusable"
            icon={Award}
            color="green"
          />
          <MetricCard
            title="Reproducibility Ready"
            value={`${reproducibilityReadiness}%`}
            subtitle="Complete provenance & lineage"
            icon={CheckCircle}
            color="blue"
          />
          <MetricCard
            title="Datasets at Risk"
            value={datasetsAtRisk}
            subtitle="Down from 140,000+ unstructured"
            icon={CheckCircle}
            color="green"
          />
        </div>
        <div className="mt-6 bg-green-50 border border-green-200 p-6">
          <div className="flex items-start gap-4">
            <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-green-900 mb-2">NIH Data Management & Sharing Policy Compliance</h3>
              <p className="text-green-800 mb-3">
                GRAVL ensures institutional compliance with NIH DMS Policy requirements (effective January 2023),
                automatically structuring data according to FAIR principles and maintaining complete audit trails
                for all data sharing activities.
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-green-900">Data Preservation</p>
                  <p className="text-green-800">100% of runs archived with metadata</p>
                  <p className="text-green-800">Average retention: 10+ years</p>
                </div>
                <div>
                  <p className="font-medium text-green-900">Access & Sharing</p>
                  <p className="text-green-800">Controlled access protocols implemented</p>
                  <p className="text-green-800">91% audit trail completion</p>
                </div>
                <div>
                  <p className="font-medium text-green-900">Risk Mitigation</p>
                  <p className="text-green-800">Zero compliance violations</p>
                  <p className="text-green-800">Failed audit risk eliminated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Cross-Core Harmonization Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Schema Coverage</h3>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-4xl font-light text-gray-900 mb-2">78%</p>
            <p className="text-sm text-gray-600">5 of 5 core facilities mapped</p>
            <div className="mt-4 bg-gray-200 h-2 w-full">
              <div className="bg-blue-600 h-2" style={{ width: '78%' }} />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Metadata Standardization</h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-4xl font-light text-gray-900 mb-2">85%</p>
            <p className="text-sm text-gray-600">Common fields harmonized across facilities</p>
            <div className="mt-4 bg-gray-200 h-2 w-full">
              <div className="bg-green-600 h-2" style={{ width: '85%' }} />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">FAIR-Aligned Datasets</h3>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-4xl font-light text-gray-900 mb-2">92%</p>
            <p className="text-sm text-gray-600">Ready for licensing & partnership</p>
            <div className="mt-4 bg-gray-200 h-2 w-full">
              <div className="bg-blue-600 h-2" style={{ width: '92%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Validation Status</h3>
          <div className="flex justify-center">
            <DonutChart data={validationData} size={220} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Audit Trail Completion</h3>
          <div className="flex justify-center">
            <DonutChart data={auditData} size={220} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Data Source Distribution</h3>
        <BarChart data={fieldSourceData} height={300} />
      </div>

      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Compliance Status by Run</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Run ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Facility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Audit Trail</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Validation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Data Completeness</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Field Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {runs.slice(0, 20).map((run) => (
                <tr key={run.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{run.run_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{run.facility_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {run.audit_trail_complete ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs">
                        <CheckCircle className="w-3 h-3" />
                        Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs">
                        <AlertTriangle className="w-3 h-3" />
                        Incomplete
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 py-1 text-xs
                      ${run.validation_status === 'Validated' ? 'bg-green-50 text-green-700' : ''}
                      ${run.validation_status === 'In Review' ? 'bg-orange-50 text-orange-700' : ''}
                      ${run.validation_status === 'Pending' ? 'bg-gray-50 text-gray-700' : ''}
                    `}>
                      {run.validation_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 h-2 w-20">
                        <div
                          className={`h-2 ${run.data_completeness_pct >= 95 ? 'bg-green-600' : run.data_completeness_pct >= 90 ? 'bg-blue-600' : 'bg-orange-600'}`}
                          style={{ width: `${run.data_completeness_pct}%` }}
                        />
                      </div>
                      <span>{run.data_completeness_pct}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{run.field_source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(run.timestamp_captured).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
