import { useState, FormEvent, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AlertCircle, Users } from 'lucide-react';

export function UniverseRefer() {
  const [formData, setFormData] = useState({
    founder1Name: '',
    founder1Email: '',
    founder2Name: '',
    founder2Email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [referrerId, setReferrerId] = useState<string | null>(null);

  useEffect(() => {
    const email = sessionStorage.getItem('universe_email');
    const id = sessionStorage.getItem('universe_id');
    setCurrentUserEmail(email);
    setReferrerId(id);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const hasFounder1 = formData.founder1Email.trim() !== '';
    const hasFounder2 = formData.founder2Email.trim() !== '';

    if (!hasFounder1 && !hasFounder2) {
      window.location.href = '/thank-you';
      return;
    }

    if (currentUserEmail) {
      if (formData.founder1Email.toLowerCase() === currentUserEmail.toLowerCase()) {
        setError('You cannot nominate yourself.');
        return;
      }
      if (formData.founder2Email.toLowerCase() === currentUserEmail.toLowerCase()) {
        setError('You cannot nominate yourself.');
        return;
      }
    }

    if (hasFounder1 && !formData.founder1Email.includes('@')) {
      setError('Please enter a valid email for Founder #1.');
      return;
    }

    if (hasFounder2 && !formData.founder2Email.includes('@')) {
      setError('Please enter a valid email for Founder #2.');
      return;
    }

    setIsSubmitting(true);

    try {
      const referrals = [];

      if (hasFounder1) {
        referrals.push({
          referrer_id: referrerId,
          nominee_name: formData.founder1Name.trim() || null,
          nominee_email: formData.founder1Email.trim(),
          invite_sent: false
        });
      }

      if (hasFounder2) {
        referrals.push({
          referrer_id: referrerId,
          nominee_name: formData.founder2Name.trim() || null,
          nominee_email: formData.founder2Email.trim(),
          invite_sent: false
        });
      }

      if (referrals.length > 0) {
        const { error: insertError } = await supabase
          .from('referrals')
          .insert(referrals);

        if (insertError) {
          setError('An error occurred. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      window.location.href = '/thank-you';
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    window.location.href = '/thank-you';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="mb-3 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Angel5000 Index • Founder Referrals</span>
            </div>
          </div>
          <h1 className="text-4xl font-light text-slate-900 mb-3">
            Thanks — you're in the Angel5000 Universe.
          </h1>
          <p className="text-2xl text-slate-700 mb-6">
            Know two other founders who should be part of it?
          </p>
          <p className="text-base text-slate-700 leading-relaxed max-w-xl mx-auto">
            The strongest startup cohorts come through trusted founder networks. Nominate up to two founders you respect — we'll invite them privately into the Universe.
            <br /><br />
            Your nominations don't affect your own status in the index; they simply help us build a cleaner, more representative benchmark.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Founder #1
              </h3>
              <div>
                <label htmlFor="founder1Name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  id="founder1Name"
                  value={formData.founder1Name}
                  onChange={(e) => setFormData({ ...formData, founder1Name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Founder's name"
                />
              </div>
              <div>
                <label htmlFor="founder1Email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  type="email"
                  id="founder1Email"
                  value={formData.founder1Email}
                  onChange={(e) => setFormData({ ...formData, founder1Email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="founder@company.com"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8 space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Founder #2
              </h3>
              <div>
                <label htmlFor="founder2Name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  id="founder2Name"
                  value={formData.founder2Name}
                  onChange={(e) => setFormData({ ...formData, founder2Name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Founder's name"
                />
              </div>
              <div>
                <label htmlFor="founder2Email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  type="email"
                  id="founder2Email"
                  value={formData.founder2Email}
                  onChange={(e) => setFormData({ ...formData, founder2Email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="founder@company.com"
                />
              </div>
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
              {isSubmitting ? 'Sending...' : 'Send Invitations'}
            </button>

            <div className="text-center space-y-3">
              <p className="text-sm text-slate-500">
                We never reveal who nominated whom.
                <br />
                Your referrals receive a private, invitation-only link.
              </p>
              <button
                type="button"
                onClick={handleSkip}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Optional — skip if you'd prefer.
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
