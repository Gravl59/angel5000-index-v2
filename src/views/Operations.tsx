import { useMemo } from 'react';
import { Activity, Clock, Database, CheckCircle, XCircle, TrendingUp, AlertTriangle, Inbox, Settings, FileCheck } from 'lucide-react';
import { getAllRuns } from '../lib/supabase';
import { MetricCard } from '../components/MetricCard';
import { BarChart } from '../components/Chart';

export function Operations() {
  const runs = useMemo(() => {
    const allRuns = getAllRuns();
    return allRuns.sort((a, b) =>
      new Date(b.timestamp_captured).getTime() - new Date(a.timestamp_captured).getTime()
    );
  }, []);

  const totalRuns = runs.length;
  const passedRuns = runs.filter(r => r.qc_status === 'Pass').length;
  const failedRuns = runs.filter(r => r.qc_status === 'Fail').length;
  const avgTurnaround = (runs.reduce((sum, r) => sum + r.turnaround_time_days, 0) / runs.length).toFixed(1);
  const totalDataVolume = runs.reduce((sum, r) => sum + r.data_volume_gb, 0).toFixed(0);
  const avgQCScore = (runs.reduce((sum, r) => sum + r.qc_score_postnorm, 0) / runs.length).toFixed(1);

  const facilityRunCounts = runs.reduce((acc, run) => {
    acc[run.facility_name] = (acc[run.facility_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const facilityData = Object.entries(facilityRunCounts).map(([label, value]) => ({
    label,
    value,
    color: 'bg-blue-600',
  }));

  const fulfillmentCounts = runs.reduce((acc, run) => {
    acc[run.fulfillment_status] = (acc[run.fulfillment_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const fulfillmentData = Object.entries(fulfillmentCounts).map(([label, value]) => ({
    label,
    value,
    color: label === 'COMPLETED' ? 'bg-green-600' : label === 'PENDING' ? 'bg-orange-600' : 'bg-gray-600',
  }));

  const qcDistribution = [
    { label: '90-100', value: runs.filter(r => r.qc_score_postnorm >= 90).length, color: 'bg-green-600' },
    { label: '80-89', value: runs.filter(r => r.qc_score_postnorm >= 80 && r.qc_score_postnorm < 90).length, color: 'bg-blue-600' },
    { label: '70-79', value: runs.filter(r => r.qc_score_postnorm >= 70 && r.qc_score_postnorm < 80).length, color: 'bg-orange-600' },
    { label: '<70', value: runs.filter(r => r.qc_score_postnorm < 70).length, color: 'bg-red-600' },
  ];

  const estimatedTotalInstitutionalRuns = 85000;
  const captureRate = ((totalRuns / estimatedTotalInstitutionalRuns) * 100).toFixed(1);
  const lostRuns = estimatedTotalInstitutionalRuns - totalRuns;
  const opportunityCostPerRun = 5800;
  const totalOpportunityCost = lostRuns * opportunityCostPerRun;

  const marketplaceFacilities = [
    { name: 'Quantum Research', services: 36, revenue: 26600, status: 'active' },
    { name: 'LabCore Industries', services: 31, revenue: 22300, status: 'active' },
    { name: 'Scientific Breakthroughs', services: 26, revenue: 19300, status: 'active' },
    { name: 'Epsilon BioTech', services: 32, revenue: 24600, status: 'active' },
    { name: 'Zeta Clinical Labs', services: 19, revenue: 14300, status: 'active' },
  ];

  const totalMarketplaceFacilities = 20;
  const avgServicesPerFacility = 12.4;
  const avgFacilityRevenue = 1000;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-normal text-gray-900 mb-2">Data Capture Pipeline</h2>
        <p className="text-gray-600 mb-6">Real-time view of data ingestion, normalization, and validation flow</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Inbox className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">Ingestion Sources</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-sm text-gray-700">Instrument Direct Feeds</span>
                <span className="text-sm font-medium text-gray-900">180 TB/mo</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-sm text-gray-700">Marketplace Orders</span>
                <span className="text-sm font-medium text-gray-900">450/mo</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-sm text-gray-700">Grant Portal Integrations</span>
                <span className="text-sm font-medium text-gray-900">2,347/mo</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-sm text-gray-700">ELN Systems</span>
                <span className="text-sm font-medium text-gray-900">3,560/mo</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-sm text-gray-700">Institutional Repositories</span>
                <span className="text-sm font-medium text-gray-900">1,200/mo</span>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Total Monthly Ingestion</span>
                  <span className="text-lg font-semibold text-blue-600">7,557 records</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 flex flex-col justify-center items-center">
            <Settings className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Normalizing</h3>
            <div className="text-center">
              <p className="text-3xl font-semibold text-gray-900 mb-2">4.2 days</p>
              <p className="text-sm text-gray-600">Avg processing time</p>
              <p className="text-xs text-gray-500 mt-2">Raw ingestion → Validated, licensable dataset</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileCheck className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-medium text-gray-900">Validation Queue</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">In Review</span>
                  <span className="text-sm font-medium text-orange-600">234 datasets</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-600 h-full" style={{ width: '11%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">Ready to License</span>
                  <span className="text-sm font-medium text-green-600">1,890 datasets</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-600 h-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">Failed Validation</span>
                  <span className="text-sm font-medium text-red-600">12 datasets</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full" style={{ width: '1%' }}></div>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Total in Pipeline</span>
                  <span className="text-lg font-semibold text-gray-900">2,136</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-normal text-gray-900 mb-2">Operations Overview</h2>
        <p className="text-gray-600 mb-6">Real-time operational metrics and data capture efficiency</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Runs"
            value={totalRuns}
            icon={Activity}
            subtitle="All time"
            color="blue"
          />
          <MetricCard
            title="Pass Rate"
            value={`${((passedRuns / totalRuns) * 100).toFixed(1)}%`}
            icon={CheckCircle}
            subtitle={`${passedRuns} passed, ${failedRuns} failed`}
            color="green"
          />
          <MetricCard
            title="Avg Turnaround"
            value={`${avgTurnaround} days`}
            icon={Clock}
            subtitle="Mean completion time"
            color="orange"
          />
          <MetricCard
            title="Total Data Volume"
            value={`${totalDataVolume} GB`}
            icon={Database}
            subtitle={`Avg QC: ${avgQCScore}`}
            color="gray"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Marketplace Seller Performance</h2>
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Facilities</h3>
          <div className="space-y-3">
            {marketplaceFacilities.map((facility) => (
              <div key={facility.name} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{facility.name}</p>
                  <p className="text-xs text-gray-600">{facility.services} services listed</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${(facility.revenue / 1000).toFixed(1)}K revenue</p>
                  <p className="text-xs text-green-600">Active</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
            <p><span className="font-medium text-gray-900">{totalMarketplaceFacilities} total facilities</span> offering avg {avgServicesPerFacility} services each</p>
            <p>Average facility revenue: ${avgFacilityRevenue}/month</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Data Capture Efficiency</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Data Capture Rate"
            value={`${captureRate}%`}
            subtitle={`${totalRuns} of ~${estimatedTotalInstitutionalRuns.toLocaleString()} institutional runs`}
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="Unstructured Runs"
            value={lostRuns.toLocaleString()}
            subtitle="Lost to institutional exhaust"
            icon={AlertTriangle}
            color="orange"
          />
          <MetricCard
            title="Opportunity Cost"
            value={`$${(totalOpportunityCost / 1000000).toFixed(1)}M`}
            subtitle="Potential value not captured"
            icon={AlertTriangle}
            color="red"
          />
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 p-6">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">Capturing the Hidden 95%</h3>
              <p className="text-blue-800 mb-3">
                Currently capturing {captureRate}% of institutional research data. Target: 85% by Year 3, unlocking
                an additional $200-300M in potential institutional asset value.
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-blue-900">Current Quarter</p>
                  <p className="text-blue-800">{totalRuns} runs captured</p>
                  <p className="text-blue-800">{captureRate}% capture rate</p>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Next Quarter Target</p>
                  <p className="text-blue-800">17,000 runs</p>
                  <p className="text-blue-800">20% capture rate</p>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Year 3 Target</p>
                  <p className="text-blue-800">72,000+ runs/quarter</p>
                  <p className="text-blue-800">85% capture rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Runs by Facility</h3>
        <BarChart data={facilityData} height={300} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Fulfillment Status</h3>
          <BarChart data={fulfillmentData} height={250} />
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">QC Score Distribution</h3>
          <BarChart data={qcDistribution} height={250} />
        </div>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Runs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Run ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Facility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">QC Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">QC Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Turnaround</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Data Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {runs.slice(0, 20).map((run) => (
                <tr key={run.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{run.run_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{run.facility_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {run.qc_status === 'Pass' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs">
                        <CheckCircle className="w-3 h-3" />
                        Pass
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs">
                        <XCircle className="w-3 h-3" />
                        Fail
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{run.qc_score_postnorm.toFixed(1)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{run.turnaround_time_days.toFixed(1)} days</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{run.data_volume_gb.toFixed(1)} GB</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 py-1 text-xs
                      ${run.fulfillment_status === 'COMPLETED' ? 'bg-green-50 text-green-700' : ''}
                      ${run.fulfillment_status === 'PENDING' ? 'bg-orange-50 text-orange-700' : ''}
                      ${run.fulfillment_status === 'SUBMITTED' ? 'bg-blue-50 text-blue-700' : ''}
                      ${run.fulfillment_status === 'DRAFT' ? 'bg-gray-50 text-gray-700' : ''}
                    `}>
                      {run.fulfillment_status}
                    </span>
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
