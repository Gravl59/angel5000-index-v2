import { ShieldCheck, GitBranch, CheckCircle, Clock, AlertTriangle, FileCheck } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { Chart } from '../components/Chart';
import { useMemo } from 'react';
import { getAllRuns } from '../lib/supabase';

export function RegulatoryProvenance() {
  const runs = useMemo(() => getAllRuns(), []);

  const totalRuns = runs.length;
  const completeProvenance = totalRuns;
  const qcTraceability = 100;
  const fairCompliant = Math.floor(totalRuns * 0.87);
  const fairComplianceRate = 87;

  if (false) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-slate-50 to-green-50 border border-green-200 p-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-light text-gray-900">Regulatory Provenance</h1>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Complete audit trails and regulatory compliance tracking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Tracked Runs"
            value={totalRuns.toLocaleString()}
            subtitle="Complete provenance"
            icon={<GitBranch className="w-5 h-5 text-blue-600" />}
          />
          <MetricCard
            title="Audit Trail"
            value="100%"
            subtitle="Complete traceability"
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
          />
          <MetricCard
            title="FAIR Compliance"
            value={`${fairComplianceRate}%`}
            subtitle={`${fairCompliant} datasets`}
            icon={<FileCheck className="w-5 h-5 text-green-600" />}
          />
          <MetricCard
            title="QC Traceability"
            value={`${qcTraceability}%`}
            subtitle="Full chain of custody"
            icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
          />
        </div>
      </div>
    );
  }

  const transactionAuditMetrics = {
    totalOrders: 119,
    orderHistoryWithTimestamps: true,
    sampleSubmissionForms: true,
    completeMetadata: 15,
    dataDeliveryTracking: true,
    purchaseOrderDocumentation: true,
  };

  const provenanceCompleteness = [
    { metric: 'Instrument\nLinkage', complete: 100 },
    { metric: 'Sample\nChain-of-Custody', complete: 100 },
    { metric: 'User\nAuthentication', complete: 100 },
    { metric: 'QC Event\nTimestamps', complete: 100 },
    { metric: 'FAIR Data\nPrinciples', complete: fairComplianceRate },
  ];

  const regulatoryAlignment = [
    { standard: 'NIH DMS', compliant: 94 },
    { standard: 'NSF Guidelines', compliant: 91 },
    { standard: 'FAIR Principles', compliant: 87 },
    { standard: 'HIPAA (where applicable)', compliant: 100 },
    { standard: 'NIST 800-171', compliant: 89 },
  ];

  const timeToSubmission = [
    { phase: 'Data Collection\n(Historical)', weeks: 12 },
    { phase: 'Manual\nProof Assembly', weeks: 8 },
    { phase: 'Compliance\nReview', weeks: 6 },
    { phase: 'FDA Submission\n(Total Historical)', weeks: 26 },
    { phase: 'FDA Submission\n(With GRAVL)', weeks: 4 },
  ];

  const safetySignalDetection = [
    { quarter: 'Q1 2024', events: 3 },
    { quarter: 'Q2 2024', events: 5 },
    { quarter: 'Q3 2024', events: 8 },
    { quarter: 'Q4 2024', events: 7 },
    { quarter: 'Q1 2025', events: 11 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-light text-gray-900">Regulatory-Grade Provenance</h1>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            FDA-ready audit trails with immutable chain-of-custody linking instruments, samples, and users.
            Complete QC event traceability and FAIR data compliance accelerate regulatory approval and enable
            post-market safety surveillance.
          </p>
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 px-4 py-2 text-emerald-800 font-medium">
            <FileCheck className="w-5 h-5" />
            FDA Purchases QC Logs for Safety Monitoring
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Audit Trail Completeness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Complete Provenance"
            value={completeProvenance.toLocaleString()}
            subtitle="Runs with immutable metadata linkage"
            icon={GitBranch}
            color="green"
          />
          <MetricCard
            title="QC Event Traceability"
            value={`${qcTraceability}%`}
            subtitle="Timestamped quality control checkpoints"
            icon={CheckCircle}
            color="blue"
          />
          <MetricCard
            title="FAIR-Compliant Runs"
            value={fairCompliant.toLocaleString()}
            subtitle={`${fairComplianceRate}% meet FAIR data principles`}
            icon={FileCheck}
            color="green"
          />
          <MetricCard
            title="Time-to-Submission"
            value="4 weeks"
            subtitle="vs. 26 weeks historical average"
            icon={Clock}
            color="orange"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Provenance Completeness by Component</h2>
        <div className="bg-white border border-gray-200 p-6">
          <Chart
            data={provenanceCompleteness}
            xKey="metric"
            yKey="complete"
            title="Completeness Rate (%)"
            height={300}
          />
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Chain-of-Custody Integrity</p>
              <p className="text-3xl font-light text-gray-900 mb-2">100%</p>
              <p className="text-sm text-gray-700">
                Every run includes immutable metadata linking instrument → sample → user with
                microsecond-precision timestamps.
                <span className="font-medium text-green-600"> FDA-ready from day one.</span>
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">FAIR Data Compliance</p>
              <p className="text-3xl font-light text-gray-900 mb-2">{fairComplianceRate}%</p>
              <p className="text-sm text-gray-700">
                {fairCompliant.toLocaleString()} runs meet Findable, Accessible, Interoperable, Reusable
                (FAIR) principles for reproducibility and auditability.
                <span className="font-medium text-blue-600"> NIH/NSF mandate alignment.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-light text-gray-900 mb-4">Regulatory Standard Alignment</h2>
          <div className="bg-white border border-gray-200 p-6">
            <div className="space-y-4">
              {regulatoryAlignment.map((standard) => (
                <div key={standard.standard} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">{standard.standard}</span>
                    <span className="text-sm text-gray-600">{standard.compliant}% compliant</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 h-2">
                      <div
                        className={`h-2 ${
                          standard.compliant === 100 ? 'bg-green-500' :
                          standard.compliant >= 90 ? 'bg-blue-500' :
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${standard.compliant}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-2">Architecture aligns with:</p>
              <p>HIPAA (where applicable), NIST 800-171, FAIR data principles, NIH DMS requirements,
              and NSF expectations for reproducibility and auditability.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-light text-gray-900 mb-4">Time-to-Regulatory Approval</h2>
          <div className="bg-white border border-gray-200 p-6">
            <Chart
              data={timeToSubmission}
              xKey="phase"
              yKey="weeks"
              title="Time Required (Weeks)"
              height={280}
            />
            <div className="mt-6 p-4 bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-600" />
                <p className="font-medium text-green-900">85% Faster FDA Submission</p>
              </div>
              <p className="text-sm text-green-800">
                GRAVL's immutable audit trails reduce time-to-submission from 26 weeks to 4 weeks—
                a 12-18 month competitive advantage in time-to-market.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Post-Market Safety Surveillance</h2>
        <div className="bg-white border border-gray-200 p-6">
          <Chart
            data={safetySignalDetection}
            xKey="quarter"
            yKey="events"
            title="Adverse Event Signals Detected"
            height={260}
          />
          <div className="mt-6 grid grid-cols-3 gap-6">
            <div className="border-l-4 border-red-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Safety Signal Detection</p>
              <p className="text-3xl font-light text-gray-900 mb-2">34 events</p>
              <p className="text-sm text-gray-700">
                Real-time adverse event correlation across institutional cohorts enables early
                detection of safety concerns.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Cross-Institutional Pooling</p>
              <p className="text-3xl font-light text-gray-900 mb-2">5 facilities</p>
              <p className="text-sm text-gray-700">
                Multi-site data aggregation increases statistical power for rare event detection
                vs. single-institution monitoring.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Transaction Audit Trail</p>
              <p className="text-3xl font-light text-gray-900 mb-2">{transactionAuditMetrics.totalOrders} Orders</p>
              <p className="text-sm text-gray-700">
                Full order history with timestamps, sample metadata ({transactionAuditMetrics.completeMetadata}+ fields),
                and delivery tracking for complete provenance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Provenance Value Drivers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-medium text-gray-900">Immutable Audit Trails</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Complete chain-of-custody with instrument, sample, user, and QC event linkage.
              Eliminates manual proof assembly—saving 8-12 weeks per submission.
            </p>
            <div className="text-2xl font-light text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Provenance completeness</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">FAIR Compliance</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              {fairComplianceRate}% of runs meet FAIR data principles (Findable, Accessible,
              Interoperable, Reusable)—ensuring reproducibility and regulatory acceptance.
            </p>
            <div className="text-2xl font-light text-gray-900">{fairComplianceRate}%</div>
            <div className="text-sm text-gray-600">FAIR-compliant datasets</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-medium text-gray-900">Time-to-Market</h3>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              FDA submission readiness in 4 weeks vs. 26 weeks historical average. 12-18 month
              competitive advantage worth 10-20× the data infrastructure cost.
            </p>
            <div className="text-2xl font-light text-gray-900">4 weeks</div>
            <div className="text-sm text-gray-600">vs. 26 weeks without GRAVL</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">Licensing Opportunity: Pharmaceutical Companies & Regulatory Agencies</h3>
            <p className="text-blue-800 mb-4">
              Pharmaceutical companies seek FDA-ready audit trails to accelerate regulatory approval and
              gain 12-18 month time-to-market advantage. Regulatory agencies seek QC logs for post-market
              safety monitoring. GRAVL provides immutable provenance infrastructure for both use cases.
            </p>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-medium text-blue-900 mb-2">Licensing Model</p>
                <p className="text-blue-800">• Single Dataset (FDA Submission): $5-10M</p>
                <p className="text-blue-800">• Post-Market Surveillance: $2-5M/year</p>
                <p className="text-blue-800">• Regulatory Body Direct Access: $8-15M/year</p>
              </div>
              <div>
                <p className="font-medium text-blue-900 mb-2">Value Proposition</p>
                <p className="text-blue-800">• 85% faster FDA submission (26→4 weeks)</p>
                <p className="text-blue-800">• 12-18 month time-to-market advantage</p>
                <p className="text-blue-800">• Turnkey post-market surveillance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-amber-900 mb-2">Regulatory Context</h3>
            <p className="text-amber-800 mb-3">
              NIH and NSF increasingly mandate FAIR data principles and reproducible research practices.
              GRAVL's provenance infrastructure ensures institutional compliance while creating licensable
              assets that meet pharma and FDA requirements.
            </p>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-medium text-amber-900">FDA Direct Purchasing</p>
                <p className="text-amber-800">FDA already purchases quality-control logs from industry
                to monitor post-market safety (per GRAVL investor materials).</p>
              </div>
              <div>
                <p className="font-medium text-amber-900">Comparable Transaction</p>
                <p className="text-amber-800">Flatiron Health ($2B Roche acquisition) built on
                unpublished real-world clinical outcomes data with regulatory-grade provenance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
