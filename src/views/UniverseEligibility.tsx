import { useState, FormEvent, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

const INDUSTRIES = [
  'AI/Machine Learning',
  'B2B SaaS',
  'Biotech/Life Sciences',
  'Climate Tech',
  'Consumer',
  'Developer Tools',
  'Education',
  'Fintech',
  'Healthcare',
  'Hardware',
  'Logistics/Supply Chain',
  'Manufacturing',
  'Marketplace',
  'Media/Entertainment',
  'Real Estate/PropTech',
  'Robotics',
  'Security/Cybersecurity',
  'Other'
];

export function UniverseEligibility() {
  const [formData, setFormData] = useState({
    ein: '',
    domain: '',
    founderLink: '',
    industry: '',
    hqLocation: '',
    humanCheck: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [universeId, setUniverseId] = useState<string | null>(null);
  const [founderName, setFounderName] = useState<string>('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('universe_id') || sessionStorage.getItem('universe_id');

    if (id) {
      setUniverseId(id);
      loadFounderInfo(id);
    } else {
      setError('Invalid verification link. Please use the link sent to your email.');
    }
  }, []);

  const loadFounderInfo = async (id: string) => {
    try {
      const { data } = await supabase
        .from('universe')
        .select('founder_name')
        .eq('id', id)
        .maybeSingle();

      if (data) {
        setFounderName(data.founder_name);
      }
    } catch (err) {
      console.error('Error loading founder info:', err);
    }
  };

  const validateForm = () => {
    if (!formData.ein.trim()) {
      setError('Please enter your company\'s EIN.');
      return false;
    }

    if (!formData.domain.trim()) {
      setError('Please enter a valid domain.');
      return false;
    }

    if (!formData.domain.includes('.')) {
      setError('Please enter a valid domain (e.g., company.com).');
      return false;
    }

    if (!formData.founderLink.trim()) {
      setError('Please provide your LinkedIn or equivalent link.');
      return false;
    }

    if (!formData.founderLink.startsWith('http')) {
      setError('Please provide a valid URL for your profile link.');
      return false;
    }

    if (!formData.industry) {
      setError('Please select your industry.');
      return false;
    }

    if (!formData.hqLocation.trim()) {
      setError('Please enter your headquarters location.');
      return false;
    }

    if (!formData.humanCheck) {
      setError('Please confirm you are a human with a real company.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!universeId) {
      setError('Invalid verification session. Please use the link sent to your email.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from('eligibility')
        .insert({
          universe_id: universeId,
          ein: formData.ein.trim(),
          domain: formData.domain.trim().toLowerCase(),
          founder_link: formData.founderLink.trim(),
          industry: formData.industry,
          hq_location: formData.hqLocation.trim(),
          verified: false,
          verified_at: null,
          rejected_reason: null
        });

      if (insertError) {
        if (insertError.code === '23505') {
          setError('You have already submitted eligibility verification.');
        } else {
          setError('An error occurred. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('universe')
        .update({ status: 'eligible' })
        .eq('id', universeId);

      if (updateError) {
        console.error('Error updating universe status:', updateError);
      }

      setSuccess(true);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-10 text-center relative overflow-hidden border border-slate-100">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-3xl font-light text-slate-900 mb-4">
            Verification Complete
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            You're now part of the eligible Universe that the Angel5000 Index is drawn from.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-8 w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="mb-3 flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          {founderName && (
            <p className="text-lg text-slate-600 mb-2">Hi {founderName},</p>
          )}
          <h1 className="text-4xl font-light text-slate-900 mb-3">
            Verify Your Eligibility for the Angel5000 Index
          </h1>
          <p className="text-lg text-slate-600">
            This is a neutral legitimacy check — no scoring, no judgment. It simply confirms that your company is real so we can include it in the Universe we sample the index from.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="ein" className="block text-sm font-medium text-slate-700 mb-2">
                EIN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ein"
                required
                value={formData.ein}
                onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="12-3456789"
              />
              <p className="text-xs text-slate-500 mt-1">
                Your company's Employer Identification Number
              </p>
            </div>

            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-slate-700 mb-2">
                Company Domain <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="domain"
                required
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="company.com"
              />
              <p className="text-xs text-slate-500 mt-1">
                Your company's primary domain name
              </p>
            </div>

            <div>
              <label htmlFor="founderLink" className="block text-sm font-medium text-slate-700 mb-2">
                Founder LinkedIn or Identity Link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="founderLink"
                required
                value={formData.founderLink}
                onChange={(e) => setFormData({ ...formData, founderLink: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="https://linkedin.com/in/yourname"
              />
              <p className="text-xs text-slate-500 mt-1">
                A link to verify your identity as founder
              </p>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-slate-700 mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                id="industry"
                required
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              >
                <option value="">Select your industry...</option>
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hqLocation" className="block text-sm font-medium text-slate-700 mb-2">
                Headquarters Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="hqLocation"
                required
                value={formData.hqLocation}
                onChange={(e) => setFormData({ ...formData, hqLocation: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="San Francisco, CA"
              />
              <p className="text-xs text-slate-500 mt-1">
                City and state/country of your headquarters
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <input
                type="checkbox"
                id="humanCheck"
                checked={formData.humanCheck}
                onChange={(e) => setFormData({ ...formData, humanCheck: e.target.checked })}
                className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="humanCheck" className="text-sm text-slate-700 cursor-pointer">
                I am a human and this is a real company. <span className="text-red-500">*</span>
              </label>
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
              {isSubmitting ? 'Submitting...' : 'Submit Verification'}
            </button>

            <p className="text-xs text-slate-500 text-center">
              This information is used solely for legitimacy verification and will never be shared or sold.
            </p>
          </form>
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
