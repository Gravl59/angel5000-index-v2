import { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';

export function QRPage() {
  const [joinUrl, setJoinUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const baseUrl = window.location.origin;
    const fullJoinUrl = `${baseUrl}/join?source=qr`;
    setJoinUrl(fullJoinUrl);
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullJoinUrl)}`);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 mb-4">
            <QrCode className="w-3 h-3" />
            <span>QR Code • Event Access</span>
          </div>
          <h1 className="text-4xl font-light text-slate-900 mb-3">
            Scan to Join Angel5000
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-2">
            Be part of the first neutral index for early-stage innovation.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12">
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-white p-4 rounded-xl border-2 border-slate-200">
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="QR Code to join Angel5000"
                  className="w-72 h-72"
                />
              )}
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-slate-700">
                Or visit directly:
              </p>
              <a
                href="/join"
                className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2 break-all"
              >
                {window.location.origin}/join
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">How to Use This QR Code</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-medium">•</span>
              <span>Display this page at events, conferences, or pitch competitions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-medium">•</span>
              <span>Founders can scan with their phone camera to instantly access the join form</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-medium">•</span>
              <span>All QR code scans are tracked as "qr" source in your database</span>
            </li>
          </ul>
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
