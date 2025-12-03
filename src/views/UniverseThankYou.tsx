import { CheckCircle2 } from 'lucide-react';

export function UniverseThankYou() {
  const handleReturnHome = () => {
    window.location.href = '/join';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-5xl font-light text-slate-900 mb-4">
            You're in.
          </h1>
          <p className="text-2xl text-slate-700 mb-8">
            Welcome to the Angel5000 Universe.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 relative overflow-hidden border border-slate-100">
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              You're now part of the Angel5000 Universe — the pool we draw from when constructing the randomized index of 5,000 early-stage companies each year.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              You don't need to do anything else for now. When it's time to verify your company for eligibility, we'll send a short follow-up (EIN, domain, basic legitimacy checks only).
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={handleReturnHome}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            Questions? Reach out at{' '}
            <a href="mailto:hello@angel5000.com" className="text-blue-600 hover:text-blue-700 underline">
              hello@angel5000.com
            </a>
          </p>
        </div>

        <div className="mt-12 text-center text-xs text-slate-400">
          <span className="font-semibold text-slate-500">Angel5000</span>
          <span className="mx-1">•</span>
          <span>Neutral Index for Early-Stage Innovation</span>
          <span className="mx-1">•</span>
          <a
            href="mailto:hello@angel5000.com"
            className="underline underline-offset-2 hover:text-slate-600 transition-colors"
          >
            hello@angel5000.com
          </a>
        </div>
      </div>
    </div>
  );
}
