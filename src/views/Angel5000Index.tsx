import { useState, useEffect } from 'react';
import { TrendingUp, Building2, Trophy, Rocket, Filter, Search, Target, AlertCircle, Briefcase, UserCheck, CheckCircle, Hash, FileText, Database, Key, Zap, Download, Code, Info } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { Chart } from '../components/Chart';
import { HowItWorks } from '../components/HowItWorks';
import { getAngel5000Companies, getAngel5000Stats, type Angel5000Company } from '../lib/supabase';

export function Angel5000Index() {
  const [companies, setCompanies] = useState<Angel5000Company[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedIndexStatus, setSelectedIndexStatus] = useState<string>('all');
  const [selectedLifecycleStatus, setSelectedLifecycleStatus] = useState<string>('all');
  const [selectedCohortYear, setSelectedCohortYear] = useState<string>('all');
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState<string>('all');
  const [selectedHistoricalPerformance, setSelectedHistoricalPerformance] = useState<string>('all');
  const [selectedDataCompleteness, setSelectedDataCompleteness] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [companiesData, statsData] = await Promise.all([
        getAngel5000Companies(),
        getAngel5000Stats()
      ]);
      setCompanies(companiesData);
      setStats(statsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch =
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.founder_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    const matchesSector = selectedSector === 'all' || company.sector === selectedSector;
    const matchesIndexStatus = selectedIndexStatus === 'all' || company.category === selectedIndexStatus;
    const matchesLifecycleStatus = selectedLifecycleStatus === 'all' || company.category === selectedLifecycleStatus;
    const matchesCohortYear = selectedCohortYear === 'all' || company.category === selectedCohortYear;
    const matchesVerificationStatus = selectedVerificationStatus === 'all' || company.category === selectedVerificationStatus;
    const matchesHistoricalPerformance = selectedHistoricalPerformance === 'all' || company.category === selectedHistoricalPerformance;
    const matchesDataCompleteness = selectedDataCompleteness === 'all' || company.category === selectedDataCompleteness;

    return matchesSearch && matchesCategory && matchesSector && matchesIndexStatus &&
           matchesLifecycleStatus && matchesCohortYear && matchesVerificationStatus &&
           matchesHistoricalPerformance && matchesDataCompleteness;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'mega-winner':
      case 'historic-outlier':
        return 'bg-purple-100 text-purple-800 border border-purple-300';
      case 'potential-unicorn':
      case 'index-constituent':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'universe-only':
        return 'bg-gray-50 text-gray-600 border border-gray-200';
      case 'active':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'exited':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'dormant':
        return 'bg-gray-100 text-gray-500 border border-gray-300';
      case 'verified-company':
      case 'verified-founder':
        return 'bg-teal-50 text-teal-700 border border-teal-200';
      case 'eligible':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
      case 'observed-growth':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'steady-state':
        return 'bg-slate-50 text-slate-700 border border-slate-200';
      case 'full-profile':
        return 'bg-cyan-50 text-cyan-700 border border-cyan-200';
      case 'partial-profile':
        return 'bg-gray-50 text-gray-600 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'mega-winner':
      case 'historic-outlier':
        return 'Historic Outlier';
      case 'potential-unicorn':
      case 'index-constituent':
        return 'Index Constituent';
      case 'universe-only':
        return 'Universe-Only';
      case 'active':
        return 'Active';
      case 'exited':
        return 'Exited';
      case 'dormant':
        return 'Dormant';
      case 'index-year-2025':
        return 'Index Year: 2025';
      case 'index-year-2024':
        return 'Index Year: 2024';
      case 'index-year-2023':
        return 'Index Year: 2023';
      case 'verified-company':
        return 'Verified Company';
      case 'verified-founder':
        return 'Verified Founder';
      case 'eligible':
        return 'Eligible (Universe)';
      case 'observed-growth':
        return 'Observed Growth';
      case 'steady-state':
        return 'Steady-State';
      case 'full-profile':
        return 'Full Profile';
      case 'partial-profile':
        return 'Partial Profile';
      default:
        return 'Index Constituent';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading Angel5000 Index...</div>
      </div>
    );
  }

  const sectorChartData = stats?.sectorBreakdown
    ? Object.entries(stats.sectorBreakdown)
        .map(([sector, count]) => ({ sector, count }))
        .sort((a, b) => (b.count as number) - (a.count as number))
        .slice(0, 10)
    : [];

  const categoryDistribution = [
    { category: 'Mega Winners', count: stats?.megaWinners || 0 },
    { category: 'Potential Unicorns', count: stats?.potentialUnicorns || 0 },
    { category: 'Non-Unicorns', count: stats?.nonUnicorns || 0 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-blue-200 p-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-light text-gray-900">Angel5000 Index</h1>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-3">
            A neutral benchmark of early-stage startups constructed through randomized sampling—not scoring or selection. Currently tracking {stats?.totalCompanies || 0} companies on the path to a 5,000-company index, providing standardized analytics and universe-level insights.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Briefcase className="w-4 h-4" />
            <span>Index Provider — Not a Fund (Phase 1 Company)</span>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href="/Angel5000_TAM_SAM_Analysis_Detailed.html"
              target="_blank"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Download TAM/SAM Analysis
            </a>
            <a
              href="/Angel5000_Seed_Investor_Deck.html"
              target="_blank"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Download Investor Deck
            </a>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Portfolio Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Companies"
            value={stats?.totalCompanies.toLocaleString() || '0'}
            subtitle="Tracked startups"
            icon={Building2}
            color="blue"
          />
          <MetricCard
            title="Mega Winners"
            value={stats?.megaWinners || '0'}
            subtitle="Top Performers Captured (Historical Outcomes)"
            icon={Trophy}
            color="yellow"
          />
          <MetricCard
            title="Notable Performers"
            value={stats?.potentialUnicorns || '0'}
            subtitle="Meaningful Early Signals"
            icon={Rocket}
            color="blue"
          />
          <MetricCard
            title="Average Age"
            value={`${stats?.averageAge || 0} years`}
            subtitle="Portfolio maturity"
            icon={TrendingUp}
            color="green"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Index Methodology</h2>

        {/* 4-Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Box 1 - Startup Universe */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Startup Universe</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium border border-blue-300">
                ~40,000–60,000 companies/year
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Verified early-stage companies entering the Angel5000 pool.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Verified company</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Verified founder</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Anti-bot filters</span>
              </li>
            </ul>
          </div>

          {/* Box 2 - Randomized Sampling */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Randomized Sampling</h3>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium border border-green-300">
                Current: 1,000 → Target: 5,000
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Neutral, rules-based selection from the eligible universe.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>No scoring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>No picking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>No geographic or network bias</span>
              </li>
            </ul>
          </div>

          {/* Box 3 - Inclusion Window */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Inclusion Window</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Companies remain in the index for 10 years or until exit.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Long-term visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Power-law capture</span>
              </li>
            </ul>
          </div>

          {/* Box 4 - Annual Cycle */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Annual Cycle</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Standardized, predictable update process.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Universe refreshed continuously</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Annual cohort selection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Quarterly "alive checks"</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Chart A - Funnel */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-6 text-center">Universe → Eligibility → Sampling → Index</h3>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-2xl">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 text-center font-medium">
                Startup Universe
                <div className="text-sm font-normal mt-1">~40,000–60,000 companies/year</div>
              </div>
              <div className="flex justify-center">
                <div className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-t-[30px] border-t-blue-600"></div>
              </div>
            </div>

            <div className="w-full max-w-xl">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 text-center font-medium">
                Eligibility Checks
                <div className="text-sm font-normal mt-1">Verified founder • Verified company • Anti-bot filters</div>
              </div>
              <div className="flex justify-center">
                <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-t-[30px] border-t-green-600"></div>
              </div>
            </div>

            <div className="w-full max-w-lg">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 text-center font-medium">
                Random Sampling Engine
                <div className="text-sm font-normal mt-1">Neutral • Rules-based • No bias</div>
              </div>
              <div className="flex justify-center">
                <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[30px] border-t-yellow-600"></div>
              </div>
            </div>

            <div className="w-full max-w-md">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 text-center font-medium">
                Angel5000 Index
                <div className="text-sm font-normal mt-1">Current: 1,000 → Target: 5,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart B - Index Size Progress Bar */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Index Size Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <span>Current: {stats?.totalCompanies || 1000}</span>
              <span>Target: 5,000</span>
            </div>
            <div className="w-full bg-gray-200 h-8 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-8 transition-all flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${((stats?.totalCompanies || 1000) / 5000 * 100)}%` }}
              >
                {((stats?.totalCompanies || 1000) / 5000 * 100).toFixed(1)}%
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>1,250</span>
              <span>2,500</span>
              <span>3,750</span>
              <span>5,000</span>
            </div>
          </div>
        </div>

        {/* Chart C - Universe Size Badge */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg className="w-48 h-48" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="45"
                  textAnchor="middle"
                  className="text-2xl font-bold fill-gray-900"
                  style={{ fontSize: '12px', fontWeight: 'bold' }}
                >
                  40K-60K
                </text>
                <text
                  x="50"
                  y="60"
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                  style={{ fontSize: '6px' }}
                >
                  companies/year
                </text>
              </svg>
            </div>
          </div>
          <h3 className="text-center text-lg font-medium text-gray-900 mt-4">Eligible Universe</h3>
          <p className="text-center text-sm text-gray-600 mt-2">
            Verified early-stage startups entering the Angel5000 pool annually
          </p>
        </div>
      </div>

      <HowItWorks />

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Monetization Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${stats?.totalCompanies >= 300 ? 'text-green-600' : 'text-gray-400'}`}>
                {stats?.totalCompanies >= 300 ? 'ACHIEVED' : 'PENDING'}
              </span>
            </div>
            <div className="text-5xl font-light text-gray-900 mb-1">300</div>
            <div className="text-sm text-gray-600 mb-3">Companies milestone</div>
            <div className="w-full bg-gray-200 h-2">
              <div
                className="bg-green-500 h-2 transition-all"
                style={{ width: `${Math.min((stats?.totalCompanies || 0) / 300 * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Revenue stream viable</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${stats?.totalCompanies >= 500 ? 'text-green-600' : 'text-gray-400'}`}>
                {stats?.totalCompanies >= 500 ? 'ACHIEVED' : 'PENDING'}
              </span>
            </div>
            <div className="text-5xl font-light text-gray-900 mb-1">500</div>
            <div className="text-sm text-gray-600 mb-3">Companies milestone</div>
            <div className="w-full bg-gray-200 h-2">
              <div
                className="bg-blue-500 h-2 transition-all"
                style={{ width: `${Math.min((stats?.totalCompanies || 0) / 500 * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Scaled operations</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${stats?.totalCompanies >= 1000 ? 'text-green-600' : 'text-gray-400'}`}>
                {stats?.totalCompanies >= 1000 ? 'ACHIEVED' : 'PENDING'}
              </span>
            </div>
            <div className="text-5xl font-light text-gray-900 mb-1">1,000</div>
            <div className="text-sm text-gray-600 mb-3">Companies milestone</div>
            <div className="w-full bg-gray-200 h-2">
              <div
                className="bg-yellow-500 h-2 transition-all"
                style={{ width: `${Math.min((stats?.totalCompanies || 0) / 1000 * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Market leadership</div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${stats?.totalCompanies >= 2000 ? 'text-green-600' : 'text-gray-400'}`}>
                {stats?.totalCompanies >= 2000 ? 'ACHIEVED' : 'PENDING'}
              </span>
            </div>
            <div className="text-5xl font-light text-gray-900 mb-1">2,000</div>
            <div className="text-sm text-gray-600 mb-3">Companies milestone</div>
            <div className="w-full bg-gray-200 h-2">
              <div
                className="bg-purple-500 h-2 transition-all"
                style={{ width: `${Math.min((stats?.totalCompanies || 0) / 2000 * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Fund launch readiness</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Revenue Stream Viability</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">Research Reports</span>
                <span className={`text-xs font-medium ${stats?.totalCompanies >= 500 ? 'text-green-600' : 'text-gray-500'}`}>
                  Viable at ~500 companies {stats?.totalCompanies >= 500 ? '✓' : ''}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2">
                <div
                  className="bg-green-500 h-2 transition-all"
                  style={{ width: `${Math.min((stats?.totalCompanies || 0) / 500 * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">Data Products</span>
                <span className={`text-xs font-medium ${stats?.totalCompanies >= 500 ? 'text-green-600' : 'text-gray-500'}`}>
                  Viable at ~500 companies {stats?.totalCompanies >= 500 ? '✓' : ''}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2">
                <div
                  className="bg-blue-500 h-2 transition-all"
                  style={{ width: `${Math.min((stats?.totalCompanies || 0) / 500 * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">Index Licensing</span>
                <span className={`text-xs font-medium ${stats?.totalCompanies >= 1000 ? 'text-green-600' : 'text-gray-500'}`}>
                  Scales at ~1,000 companies {stats?.totalCompanies >= 1000 ? '✓' : ''}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2">
                <div
                  className="bg-yellow-500 h-2 transition-all"
                  style={{ width: `${Math.min((stats?.totalCompanies || 0) / 1000 * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">API Access</span>
                <span className={`text-xs font-medium ${stats?.totalCompanies >= 2000 ? 'text-green-600' : 'text-gray-500'}`}>
                  Viable at ~2,000 companies {stats?.totalCompanies >= 2000 ? '✓' : ''}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2">
                <div
                  className="bg-purple-500 h-2 transition-all"
                  style={{ width: `${Math.min((stats?.totalCompanies || 0) / 2000 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-gray-300 p-8">
          <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-600" />
            What Data Do Customers Get?
          </h3>
          <p className="text-sm text-gray-600 mb-6">Complete transparency on data delivery and formats for each revenue stream:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-green-600" />
                <h4 className="text-lg font-medium text-gray-900">Research Reports</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Format:</span>
                  <p className="text-sm text-gray-700">PDF Reports (Quarterly)</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Delivery:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Download className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-700">Email + Download Portal</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Includes:</span>
                  <ul className="text-sm text-gray-700 mt-1 space-y-1 ml-4">
                    <li>• Sector trend analysis</li>
                    <li>• Top 100 company rankings</li>
                    <li>• Cohort performance analysis (based on historical outcomes)</li>
                    <li>• Geographic distribution maps</li>
                    <li>• Executive commentary</li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-xs font-medium text-green-600">Answers: "Which sectors are hot?" "Who are the rising stars?"</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-600" />
                <h4 className="text-lg font-medium text-gray-900">Data Products</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Format:</span>
                  <p className="text-sm text-gray-700">CSV Files (Monthly Updates)</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Delivery:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Download className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-700">SFTP + Secure Portal</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Data Fields (18 total):</span>
                  <div className="bg-slate-50 border border-slate-200 p-3 mt-2 text-xs font-mono text-gray-700">
                    company_id, company_name,<br />
                    founder_name, ein,<br />
                    sector, state, city,<br />
                    date_founded, website,<br />
                    category, stage,<br />
                    performance_signals,<br />
                    employee_range, revenue_band,<br />
                    updated_at
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-xs font-medium text-blue-600">Answers: "Show me all biotech companies in CA" "Export cohort data"</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-6 h-6 text-yellow-600" />
                <h4 className="text-lg font-medium text-gray-900">Index Licensing</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Format:</span>
                  <p className="text-sm text-gray-700">Full Database Access</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Delivery:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Key className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-700">Licensing Agreement + Data Transfer</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Includes:</span>
                  <ul className="text-sm text-gray-700 mt-1 space-y-1 ml-4">
                    <li>• Complete company dataset (all 5,000)</li>
                    <li>• Historical tracking data</li>
                    <li>• Scoring methodology documentation</li>
                    <li>• Quarterly refresh rights</li>
                    <li>• White-label permission</li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-xs font-medium text-yellow-600">Answers: "Build a tracking fund" "Create derivative products"</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
                <h4 className="text-lg font-medium text-gray-900">API Access</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Format:</span>
                  <p className="text-sm text-gray-700">RESTful JSON API</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Delivery:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Code className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-700">API Key + Documentation</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Endpoints:</span>
                  <div className="bg-slate-50 border border-slate-200 p-3 mt-2 text-xs font-mono text-gray-700">
                    GET /api/companies<br />
                    GET /api/companies/:id<br />
                    GET /api/sectors<br />
                    GET /api/search?q=...<br />
                    GET /api/analytics/trends<br />
                    POST /api/webhooks
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Rate Limits:</span>
                  <p className="text-sm text-gray-700">10,000 requests/day (Enterprise tier)</p>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-xs font-medium text-purple-600">Answers: "Integrate into our platform" "Real-time data feeds"</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <strong>Sample Data Available:</strong> Request a free sample dataset (100 companies) to evaluate data quality before purchase.
                Contact: data@angel5000.com
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Progress to 5,000 Companies</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">Current Index Size</span>
                <span className="text-sm font-medium text-gray-900">{stats?.totalCompanies || 0} / 5,000 companies</span>
              </div>
              <div className="w-full bg-gray-200 h-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-4 transition-all"
                  style={{ width: `${((stats?.totalCompanies || 0) / 5000 * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>0</span>
                <span>1,250</span>
                <span>2,500</span>
                <span>3,750</span>
                <span>5,000</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <div className="text-xs text-gray-500 mb-1">Remaining to Target</div>
                <div className="text-lg font-medium text-gray-900">{(5000 - (stats?.totalCompanies || 0)).toLocaleString()} companies</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Completion Rate</div>
                <div className="text-lg font-medium text-gray-900">{((stats?.totalCompanies || 0) / 5000 * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Index Status</div>
                <div className="text-lg font-medium text-blue-600">Active Growth</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300 p-8">
          <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-green-600" />
            Pricing Tiers
          </h3>
          <p className="text-sm text-gray-600 mb-6">Enterprise-grade data products with flexible pricing based on usage and distribution rights</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Research Reports</h4>
                  <p className="text-sm text-gray-500">Quarterly PDF Publications</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Individual Subscription</span>
                  <span className="text-lg font-semibold text-gray-900">$2,500 - $5,000<span className="text-sm font-normal text-gray-500">/year</span></span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Team License (5-20 users)</span>
                  <span className="text-lg font-semibold text-gray-900">$10,000 - $25,000<span className="text-sm font-normal text-gray-500">/year</span></span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Enterprise (unlimited)</span>
                  <span className="text-lg font-semibold text-gray-900">$50,000+<span className="text-sm font-normal text-gray-500">/year</span></span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <a href="/angel5000-q4-2024-research-report-sample.html" target="_blank" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Sample Report
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Data Products</h4>
                  <p className="text-sm text-gray-500">CSV/JSON Data Files</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Monthly Subscription</span>
                  <span className="text-lg font-semibold text-gray-900">$5,000 - $15,000<span className="text-sm font-normal text-gray-500">/month</span></span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Annual License</span>
                  <span className="text-lg font-semibold text-gray-900">$50,000 - $150,000<span className="text-sm font-normal text-gray-500">/year</span></span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Enterprise + Redistribution</span>
                  <span className="text-lg font-semibold text-gray-900">$200,000+<span className="text-sm font-normal text-gray-500">/year</span></span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <a
                    href="/angel5000-sample-dataset-100companies.csv"
                    download="angel5000-sample-dataset-100companies.csv"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Sample CSV (100 companies)
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-6 h-6 text-yellow-600" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Index Licensing</h4>
                  <p className="text-sm text-gray-500">Full Database Access</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Institutional License</span>
                  <span className="text-lg font-semibold text-gray-900">$250,000 - $500,000<span className="text-sm font-normal text-gray-500">/year</span></span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Fund Tracking License (Phase 2)</span>
                  <span className="text-lg font-semibold text-gray-900">$500,000 - $1M<span className="text-sm font-normal text-gray-500">/year</span></span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">White-Label + Derivatives</span>
                  <span className="text-lg font-semibold text-gray-900">Custom</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <a href="/angel5000-licensing-agreement-template.html" target="_blank" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    View Sample Agreement
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">API Access</h4>
                  <p className="text-sm text-gray-500">RESTful JSON API</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Starter (1K req/day)</span>
                  <span className="text-lg font-semibold text-gray-900">$1,000 - $2,500<span className="text-sm font-normal text-gray-500">/month</span></span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Professional (5K req/day)</span>
                  <span className="text-lg font-semibold text-gray-900">$5,000 - $10,000<span className="text-sm font-normal text-gray-500">/month</span></span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Enterprise (10K+ req/day)</span>
                  <span className="text-lg font-semibold text-gray-900">$15,000+<span className="text-sm font-normal text-gray-500">/month</span></span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <a href="/angel5000-api-documentation.html" target="_blank" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    View API Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <strong>Pricing Notes:</strong> Final pricing depends on usage volume, distribution rights, data refresh frequency, and contract length. Volume discounts available. Contact sales@angel5000.com for custom quotes.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-light text-gray-900">Sector Representation (Index Composition)</h2>
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
            <div className="absolute left-0 top-6 w-72 bg-gray-900 text-white text-xs p-3 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              This chart shows how many index companies fall into each sector. It does not represent scoring or ranking.
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-6">
          <Chart
            data={sectorChartData}
            xKey="sector"
            yKey="count"
            title="Top Sectors by Number of Index Companies"
            height={320}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Why Join the Angel5000 Universe</h2>
        <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 p-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-light text-gray-900">Structured Visibility & Community Access</h3>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Joining the Angel5000 Universe provides structured visibility, benchmarking insights, and community access — without scoring, judgment, or competitive filtering. Universe companies become eligible for randomized selection into the Angel5000 Index.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <Trophy className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Index Badge & Status</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Recognized presence as part of the Angel5000 Universe. Selected companies appear in the index for 10 years or until exit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Quarterly Spotlight Reports</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Neutral, cohort-wide insights shared with VCs and corporates. No rankings or scoring.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <Target className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Investor Visibility</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      LPs, angels, and scouts use index and universe data for structured discovery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Peer Benchmarking</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      View your position in aggregated universe-level analytics. No rankings or leaderboards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <UserCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Founder Network Access</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Engage with a broad peer community of founders building at similar stages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <Briefcase className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Media & Research Mentions</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Index-wide trend insights and milestone-based mentions. No guaranteed PR.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-green-500 p-6">
              <h4 className="font-medium text-gray-900 mb-3">How to Join</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>1. Free Sign-Up:</strong> Company EIN, founder identity, sector, location.</p>
                <p><strong>2. Eligibility Checks:</strong> Verified founder, verified company, anti-bot filters.</p>
                <p><strong>3. Randomized Selection:</strong> Eligible companies are randomly selected annually for the 5,000-company index. No scoring or merit evaluation.</p>
                <p><strong>4. No Obligations:</strong> No fees, no equity, no commitments.</p>
              </div>
              <div className="mt-4">
                <button className="bg-green-600 text-white px-6 py-2 hover:bg-green-700 transition-colors font-medium">
                  Join Angel5000 Universe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-light text-gray-900 mb-4">Company Directory</h2>

        <div className="bg-white border border-gray-200 p-6 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="relative md:col-span-3 lg:col-span-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies, founders, sectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedIndexStatus}
                onChange={(e) => setSelectedIndexStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white"
              >
                <option value="all">Index Status: All</option>
                <option value="index-constituent">Index Constituent</option>
                <option value="universe-only">Universe-Only</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedLifecycleStatus}
                onChange={(e) => setSelectedLifecycleStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white"
              >
                <option value="all">Lifecycle: All</option>
                <option value="active">Active</option>
                <option value="exited">Exited</option>
                <option value="dormant">Dormant</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedCohortYear}
                onChange={(e) => setSelectedCohortYear(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white"
              >
                <option value="all">Cohort Year: All</option>
                <option value="index-year-2025">Index Year: 2025</option>
                <option value="index-year-2024">Index Year: 2024</option>
                <option value="index-year-2023">Index Year: 2023</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white"
              >
                <option value="all">Sector: All</option>
                {stats?.sectorBreakdown && Object.keys(stats.sectorBreakdown).sort().map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedVerificationStatus}
                onChange={(e) => setSelectedVerificationStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white"
              >
                <option value="all">Verification: All</option>
                <option value="verified-company">Verified Company</option>
                <option value="verified-founder">Verified Founder</option>
                <option value="eligible">Eligible (Universe)</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedHistoricalPerformance}
                onChange={(e) => setSelectedHistoricalPerformance(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white"
              >
                <option value="all">Performance: All</option>
                <option value="historic-outlier">Historic Outlier</option>
                <option value="observed-growth">Observed Growth</option>
                <option value="steady-state">Steady-State</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedDataCompleteness}
                onChange={(e) => setSelectedDataCompleteness(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white"
              >
                <option value="all">Data: All</option>
                <option value="full-profile">Full Profile</option>
                <option value="partial-profile">Partial Profile</option>
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white"
              >
                <option value="all">Legacy: All</option>
                <option value="mega-winner">Historic Outliers (Legacy)</option>
                <option value="potential-unicorn">Index Constituents (Legacy)</option>
                <option value="non-unicorn">Index Constituents (Legacy)</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredCompanies.length} of {companies.length} companies
          </div>
        </div>

        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Founder
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sector
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Founded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classification
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          {company.company_name}
                        </a>
                        <span className="text-xs text-gray-500">{company.company_id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.founder_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {company.sector}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {company.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(company.date_founded).getFullYear()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium ${getCategoryBadge(company.category)}`}>
                        {getCategoryLabel(company.category)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
