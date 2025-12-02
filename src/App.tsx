import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Angel5000Index } from './views/Angel5000Index';
import SimulationDataExport from './views/SimulationDataExport';
import { UniverseJoin } from './views/UniverseJoin';
import { UniverseRefer } from './views/UniverseRefer';
import { UniverseThankYou } from './views/UniverseThankYou';
import { UniverseEligibility } from './views/UniverseEligibility';
import { QRPage } from './views/QRPage';

function App() {
  const [activeView, setActiveView] = useState<'index' | 'export' | 'join' | 'refer' | 'thank-you' | 'eligibility' | 'qr'>('index');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/join') {
      setActiveView('join');
    } else if (path === '/refer') {
      setActiveView('refer');
    } else if (path === '/thank-you') {
      setActiveView('thank-you');
    } else if (path === '/eligibility') {
      setActiveView('eligibility');
    } else if (path === '/qr') {
      setActiveView('qr');
    } else if (path === '/export') {
      setActiveView('export');
    } else {
      setActiveView('index');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {!['join', 'refer', 'thank-you', 'export', 'eligibility', 'qr'].includes(activeView) && (
        <nav className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-light text-slate-900">Angel5000 Index</h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveView('index')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeView === 'index'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Index Dashboard
                </button>
                <button
                  onClick={() => setActiveView('export')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeView === 'export'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Export Data
                </button>
                <a
                  href="/angel5000-simulation-results.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg font-medium transition-colors bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  View Report
                </a>
              </div>
            </div>
          </div>
        </nav>
      )}

      {activeView === 'join' ? (
        <UniverseJoin />
      ) : activeView === 'refer' ? (
        <UniverseRefer />
      ) : activeView === 'thank-you' ? (
        <UniverseThankYou />
      ) : activeView === 'eligibility' ? (
        <UniverseEligibility />
      ) : activeView === 'qr' ? (
        <QRPage />
      ) : activeView === 'index' ? (
        <Layout activeTab="angel5000-index" onTabChange={() => {}}>
          <Angel5000Index />
        </Layout>
      ) : (
        <SimulationDataExport />
      )}
    </div>
  );
}

export default App;
