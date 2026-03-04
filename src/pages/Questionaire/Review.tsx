import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Stage 1: Final Review & Acknowledgment ───────────────────────────────────
const AcknowledgmentView = ({ onGenerate }: { onGenerate: () => void }) => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ backgroundColor: '#f0f2f5' }}>
      <div className="w-full max-w-3xl">

        {/* Shield Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#eef1f8' }}>
            <svg className="w-7 h-7" fill="none" stroke="#1a3260" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-2">Final Review & Acknowledgment</h1>
        <p className="text-sm text-gray-400 text-center mb-8">Please review the following disclosure to finalize your retirement plan.</p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">

          {/* Disclosure Quote */}
          <div className="rounded-xl px-6 py-5 mb-6 text-center" style={{ backgroundColor: '#f7f9fc', border: '1px solid #e4e9f2' }}>
            <p className="text-sm text-gray-600 italic leading-relaxed">
              "I understand this plan is for educational and planning purposes only and does not constitute individualized investment advice."
            </p>
          </div>

          {/* Agree Checkbox */}
          <label className="flex items-center justify-center gap-3 cursor-pointer mb-8">
            <div
              className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all"
              style={agreed ? { backgroundColor: '#1a3260', borderColor: '#1a3260' } : { backgroundColor: 'white', borderColor: '#d1d5db' }}
              onClick={() => setAgreed(!agreed)}
            >
              {agreed && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700">I agree to the terms above</span>
          </label>

          {/* Generate Button */}
          <button
            onClick={onGenerate}
            disabled={!agreed}
            className="w-full py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed mb-4"
            style={{ backgroundColor: '#1a3260' }}
          >
            Generate My Retirement Plan
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          {/* Previous */}
          <button
            onClick={() => navigate('/questionnaire/goals')}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Previous
          </button>
        </div>

        {/* Footer badges */}
        <div className="mt-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-6">
            {[
              { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Institutional Grade' },
              { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Secure Transmission' },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
                <span className="uppercase tracking-widest font-semibold">{label}</span>
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
            Your data is protected by bank-level 256-bit encryption. We do not share your personal financial details with third parties without explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Stage 2: Loading / Building Plan ────────────────────────────────────────
const LoadingView = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Analyzing your financial profile...',
    'Calculating tax projections...',
    'Modeling Social Security scenarios...',
    'Projecting investment growth...',
    'Generating your personalized report...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); onComplete(); return 100; }
        return prev + 1.8;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStepIndex(Math.min(Math.floor(progress / 20), steps.length - 1));
  }, [progress]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: '#f0f2f5' }}>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-10 text-center">

        {/* Spinner with hourglass */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4" />
              <circle
                cx="32" cy="32" r="28"
                fill="none" stroke="#1a3260" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          Building your personalized 25-page<br />retirement plan...
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-2">
          We are calculating your tax projections and analyzing social security scenarios. This typically takes 30–45 seconds.
        </p>
        <p className="text-xs font-medium mb-6" style={{ color: '#1a3260' }}>{steps[stepIndex]}</p>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: '#1a3260' }}
          />
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-0 divide-x divide-gray-200">
          {[
            { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Securing Your Data' },
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Institutional Grade Protection' },
          ].map(({ icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-gray-400 px-5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              {label}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-5 text-center max-w-sm">
        Please do not close your browser tab during calculation to ensure accurate data processing.
      </p>
    </div>
  );
};

// ─── Stage 3: Report View ─────────────────────────────────────────────────────
const ReportView = () => {
  const navigate = useNavigate();

  const assets = [
    { label: 'Liquid Assets (Cash/Equiv.)', current: '$425,000', target: '$350,000' },
    { label: 'Retirement Accounts (401k/IRA)', current: '$1,840,000', target: '$3,200,000' },
    { label: 'Real Estate Equity', current: '$850,000', target: '$1,100,000' },
  ];

  const incomeStreams = [
    { label: 'Social Security', amount: '$4,200 / mo', pct: 28, color: '#1a3260' },
    { label: '401k Distributions', amount: '$8,500 / mo', pct: 56, color: '#2d5aa0' },
    { label: 'Private IRAs & Dividends', amount: '$2,800 / mo', pct: 20, color: '#6b9e6e' },
  ];

  return (
    <div className="min-h-screen px-6 py-8" style={{ backgroundColor: '#f0f2f5' }}>
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-400 mb-6">
          <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/overview')}>Reports</span>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-700">Executive Summary</span>
        </p>

        {/* Report Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Report Header */}
          <div className="px-8 pt-8 pb-5 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#eef1f8' }}>
                <svg className="w-5 h-5" fill="none" stroke="#1a3260" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Confidential Report · Wealth Strategy Group</p>
                <h2 className="text-xl font-extrabold text-gray-900 mt-0.5">Personalized Retirement Strategy</h2>
                <p className="text-xs text-gray-400 mt-0.5">Prepared for John & Jane Doe · October 2025</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-8">

            {/* Executive Summary */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">Executive Summary</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Based on your current financial trajectory and the goals outlined in your discovery session, your retirement plan shows strong resilience. This summary provides a high-level overview of your readiness, projected asset growth, and diversified income streams. Your strategy is designed to maintain your lifestyle while mitigating long-term market volatility and inflation risks.
              </p>
            </div>

            {/* Readiness + Confidence */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-5" style={{ backgroundColor: '#f7f9fc', border: '1px solid #e4e9f2' }}>
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Retirement Readiness</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-extrabold text-gray-900">82%</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-green-700 bg-green-100">On Track</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Your probability of meeting all retirement spending goals through age 95, including healthcare and legacy objectives.</p>
              </div>
              <div className="rounded-xl p-5 text-white" style={{ backgroundColor: '#1a3260' }}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs font-bold">Institutional Confidence</span>
                </div>
                <p className="text-xs opacity-75 leading-relaxed">Analysis based on 10,000 Monte Carlo simulations using current market data.</p>
              </div>
            </div>

            {/* Financial Snapshot */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4">Financial Snapshot</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-400 font-semibold uppercase tracking-widest pb-2">Asset Category</th>
                    <th className="text-right text-gray-400 font-semibold uppercase tracking-widest pb-2">Current Value</th>
                    <th className="text-right text-gray-400 font-semibold uppercase tracking-widest pb-2">Target at Retirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {assets.map(({ label, current, target }) => (
                    <tr key={label}>
                      <td className="py-3 text-gray-600">{label}</td>
                      <td className="py-3 text-right text-gray-700 font-medium">{current}</td>
                      <td className="py-3 text-right text-gray-700 font-medium">{target}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-200">
                    <td className="pt-3 font-bold" style={{ color: '#1a3260' }}>Total Portfolio</td>
                    <td className="pt-3 text-right font-extrabold" style={{ color: '#1a3260' }}>$3,115,000</td>
                    <td className="pt-3 text-right font-extrabold" style={{ color: '#1a3260' }}>$4,650,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Income Sources */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4">Income Sources at Age 67</h3>
              <div className="space-y-4">
                {incomeStreams.map(({ label, amount, pct, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-gray-700">{label}</span>
                      <span className="text-xs font-semibold text-gray-500">{amount}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Footer */}
          <div className="px-8 py-4 flex items-center justify-between border-t border-gray-100" style={{ backgroundColor: '#f7f9fc' }}>
            <p className="text-xs text-gray-400 uppercase tracking-widest">© 2025 Enterprise Wealth Management</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Page 1 of 25</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Restricted
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex flex-col items-center mt-6 text-gray-400">
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <p className="text-xs uppercase tracking-widest mt-1">Scroll for More</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Review Component ────────────────────────────────────────────────────
const Review = () => {
  const [stage, setStage] = useState<'acknowledge' | 'loading' | 'report'>('acknowledge');

  if (stage === 'loading') return <LoadingView onComplete={() => setStage('report')} />;
  if (stage === 'report') return <ReportView />;
  return <AcknowledgmentView onGenerate={() => setStage('loading')} />;
};

export default Review;