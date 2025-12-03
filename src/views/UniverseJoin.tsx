import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function UniverseJoin() {
  const [formData, setFormData] = useState({
    founderName: '',
    companyName: '',
    email: '',
    websiteOrLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const urlParams = new URLSearchParams(window.location.search);
    const sourceParam = urlParams.get('source') || 'manual';

    try {
      const { data, error: insertError } = await supabase
        .from('universe')
        .insert({
          founder_name: formData.founderName,
          company_name: formData.companyName,
          email: formData.email,
          website_or_link: formData.websiteOrLink || null,
          source: sourceParam,
          referrer_id: null,
          status: 'unverified'
        })
        .select('id, email')
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        if (insertError.code === '23505') {
          setError('This email is already in the Universe.');
        } else if (insertError.message) {
          setError(`Error: ${insertError.message}`);
        } else {
          setError('An error occurred. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      if (data) {
        sessionStorage.setItem('universe_email', data.email);
        sessionStorage.setItem('universe_id', data.id);
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/refer';
      }, 1500);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-light text-slate-900 mb-6 text-center">You're in the Angel5000 Universe.</h2>

          <div className="text-slate-600 leading-relaxed space-y-4 mb-8">
            <p>
              Angel5000 is currently in stealth mode, but as a pilot founder you'll be among the first to see how the neutral index works and how early data will be shared with founders.
            </p>

            <p>In the first phase, we'll share:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>A behind-the-scenes look at how the index is constructed</li>
              <li>Early benchmarking views across the founder universe</li>
              <li>Opportunities to help shape how founders and investors use Angel5000</li>
            </ul>

            <p>
              For now, you're confirmed. We'll reach out as we open the first internal views.
            </p>
          </div>

          <div className="text-center">
            <a
              href="/refer"
              className="inline-block px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Invite another founder to the Universe
            </a>
          </div>
        </div>
      </div>
    );
  }

  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('source') || 'direct';

  let heroTitle = '';
  let heroSubtitle = '';

  if (source === 'qr') {
    heroTitle = 'Angel5000 Index';
    heroSubtitle = 'Join the Universe of Startups';
  } else if (source === 'referral') {
    heroTitle = 'Angel5000 Index';
    heroSubtitle = 'Join the Universe of Startups';
  } else {
    heroTitle = 'Angel5000 Index';
    heroSubtitle = 'Join the Universe of Startups';
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Early Access • Founders Only</span>
          </div>
          <h1 className="text-4xl font-light text-slate-900 mb-3">
            {heroTitle}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {heroSubtitle}
            <br />
            <span className="font-medium">90 seconds — no cost, no equity, no pitch.</span>
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
          <p className="text-slate-700 leading-relaxed mb-4">
            "I built Angel5000 because strong founders were getting lost in the noise. Early-stage innovation has no neutral benchmark, no shared reference point, and no structured way to make thousands of new companies visible. Angel5000 is my attempt to fix that by creating a neutral, rules-based index so early innovation is visible, not filtered by investor bias or narrative."
          </p>
          <p className="text-sm text-slate-600">
            — Gabor, Founder of Angel5000
          </p>
        </div>

        <div className="text-center mb-8">
          <p className="text-sm text-slate-500 leading-relaxed">
            Angel5000 is currently in stealth mode. Founders in this pilot cohort will be the first to see how the index works behind the scenes.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="founderName" className="block text-sm font-medium text-slate-700 mb-2">
                Founder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="founderName"
                required
                value={formData.founderName}
                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Your company's name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="founder@company.com"
              />
            </div>

            <div>
              <label htmlFor="websiteOrLink" className="block text-sm font-medium text-slate-700 mb-2">
                Website or LinkedIn <span className="text-slate-400">(optional)</span>
              </label>
              <input
                type="url"
                id="websiteOrLink"
                value={formData.websiteOrLink}
                onChange={(e) => setFormData({ ...formData, websiteOrLink: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="https://yourcompany.com"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Joining...' : 'Join the Universe'}
            </button>

            <p className="text-sm text-slate-500 text-center">
              Founders are added to the Universe first.
              <br />
              Verification for index eligibility happens later.
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Confidential. No data is ever shared or sold.
        </p>

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
