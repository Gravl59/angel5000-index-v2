import { ArrowRight, Database, Users, TrendingUp, Building2, CheckCircle, Shuffle } from 'lucide-react';

export function HowItWorks() {
  return (
    <div>
      <h2 className="text-xl font-light text-gray-900 mb-4">How It Works</h2>
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-200 p-6">
        <div className="flex items-center justify-center gap-3 flex-wrap">

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center flex-1 min-w-[140px] max-w-[180px]">
            <Building2 className="w-5 h-5 text-gray-600 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Early-Stage Universe</h3>
            <p className="text-xs text-gray-500">Raw eligible startups</p>
          </div>

          <ArrowRight className="w-4 h-4 text-gray-400" />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center flex-1 min-w-[140px] max-w-[180px]">
            <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Eligibility Checks</h3>
            <p className="text-xs text-gray-500">Verified company + verified founder + anti-bot filters</p>
          </div>

          <ArrowRight className="w-4 h-4 text-gray-400" />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center flex-1 min-w-[140px] max-w-[180px]">
            <Shuffle className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Randomized Sampling</h3>
            <p className="text-xs text-gray-500">Neutral, rules-based selection (no scoring, no curation)</p>
          </div>

          <ArrowRight className="w-4 h-4 text-gray-400" />

          <div className="bg-white rounded-lg shadow-md border-2 border-blue-300 p-4 text-center flex-1 min-w-[160px] max-w-[200px]">
            <Database className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Angel5000 Index</h3>
            <p className="text-xs text-gray-600">Standardized 5,000-company cohort selected annually</p>
          </div>

          <ArrowRight className="w-4 h-4 text-gray-400" />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center flex-1 min-w-[140px] max-w-[180px]">
            <Users className="w-5 h-5 text-green-600 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Benchmark Users</h3>
            <p className="text-xs text-gray-500">Angels, scouts, institutions using the index for structured visibility</p>
          </div>

          <ArrowRight className="w-4 h-4 text-gray-400" />

          <div className="bg-gradient-to-br from-slate-100 to-gray-100 rounded-lg shadow-sm border-2 border-dashed border-gray-400 p-4 text-center flex-1 min-w-[140px] max-w-[180px]">
            <TrendingUp className="w-5 h-5 text-slate-600 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Future Tracking Fund</h3>
            <p className="text-xs text-gray-500">A systematic fund that may track the index (Phase 2)</p>
          </div>

        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 p-3 rounded text-center">
          <p className="text-xs text-gray-700">
            <strong>Index = Product.</strong> Neutral benchmark providing standardized visibility. Fund = optional Phase 2, not the core business.
          </p>
        </div>
      </div>
    </div>
  );
}
