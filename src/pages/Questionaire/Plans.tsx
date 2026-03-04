import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const [participates, setParticipates] = useState<boolean | null>(true);
  const [planTypes, setPlanTypes] = useState<string[]>(['401k']);
  const [balance, setBalance] = useState('0.00');
  const [contributionRate, setContributionRate] = useState('0');
  const [contributionUnit, setContributionUnit] = useState<'%' | '$'>('%');
  const [employerMatch, setEmployerMatch] = useState('no_match');
  const [annualReturn, setAnnualReturn] = useState('5.0');
  const [continueUntilRetirement, setContinueUntilRetirement] = useState(true);
  const navigate = useNavigate();

  const togglePlanType = (type: string) => {
    setPlanTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const formatNumber = (value: string) => {
    const num = value.replace(/[^0-9.]/g, '');
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    navigate('/questionnaire/iras');
  };

  const planOptions = [
    { id: '401k', label: '401(k)' },
    { id: '403b', label: '403(b)' },
    { id: '457', label: '457' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen px-6 py-8" style={{ backgroundColor: '#f0f2f5' }}>
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
          <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/questionnaire')}>Questionnaire</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Employer Plans</span>
        </p>

        {/* Page Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Employer Retirement Plans</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg">
          Workplace retirement accounts are often the foundation of financial security. Tell us about your current employer-sponsored plans.
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">

          {/* Participation Toggle */}
          <div className="mb-8">
            <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
              Do you currently participate in an employer-sponsored retirement plan?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setParticipates(true)}
                className="flex items-center justify-between px-5 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all"
                style={participates === true
                  ? { borderColor: '#1a3260', backgroundColor: '#eef1f8', color: '#1a3260' }
                  : { borderColor: '#e5e7eb', backgroundColor: 'white', color: '#6b7280' }}
              >
                Yes, I participate
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={participates === true
                    ? { borderColor: '#1a3260' }
                    : { borderColor: '#d1d5db' }}
                >
                  {participates === true && (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#1a3260' }} />
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setParticipates(false)}
                className="flex items-center justify-between px-5 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all"
                style={participates === false
                  ? { borderColor: '#1a3260', backgroundColor: '#eef1f8', color: '#1a3260' }
                  : { borderColor: '#e5e7eb', backgroundColor: 'white', color: '#6b7280' }}
              >
                No, I do not
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={participates === false
                    ? { borderColor: '#1a3260' }
                    : { borderColor: '#d1d5db' }}
                >
                  {participates === false && (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#1a3260' }} />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Plan Details — shown only if participates */}
          {participates && (
            <div>
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-5 pb-3" style={{ borderLeft: '3px solid #1a3260', paddingLeft: '12px' }}>
                <h2 className="text-base font-bold text-gray-900">Plan Details</h2>
              </div>

              <form onSubmit={handleNext}>

                {/* Plan Type + Balance */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Plan Type */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                      Plan Type (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {planOptions.map(({ id, label }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => togglePlanType(id)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all"
                          style={planTypes.includes(id)
                            ? { borderColor: '#1a3260', backgroundColor: '#eef1f8', color: '#1a3260' }
                            : { borderColor: '#e5e7eb', backgroundColor: 'white', color: '#6b7280' }}
                        >
                          <div
                            className="w-4 h-4 rounded flex items-center justify-center shrink-0 border"
                            style={planTypes.includes(id)
                              ? { backgroundColor: '#1a3260', borderColor: '#1a3260' }
                              : { backgroundColor: 'white', borderColor: '#d1d5db' }}
                          >
                            {planTypes.includes(id) && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current Total Balance */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                      Current Total Balance ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        value={balance}
                        onChange={(e) => setBalance(formatNumber(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none bg-white"
                        onFocus={e => e.target.style.borderColor = '#1a3260'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Total saved amount across all selected plans.</p>
                  </div>
                </div>

                {/* Contribution Rate + Employer Match */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Contribution Rate */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                      Contribution Rate
                    </label>
                    <div className="relative flex">
                      {/* Unit toggle */}
                      <div
                        className="flex border border-gray-200 rounded-l-lg overflow-hidden shrink-0"
                        style={{ borderRight: 'none' }}
                      >
                        {(['%', '$'] as const).map((unit) => (
                          <button
                            key={unit}
                            type="button"
                            onClick={() => setContributionUnit(unit)}
                            className="px-2.5 py-3 text-xs font-semibold transition-all"
                            style={contributionUnit === unit
                              ? { backgroundColor: '#1a3260', color: 'white' }
                              : { backgroundColor: '#f9fafb', color: '#6b7280' }}
                          >
                            {unit}
                          </button>
                        ))}
                      </div>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <input
                          type="number"
                          value={contributionRate}
                          onChange={(e) => setContributionRate(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-r-lg text-sm text-gray-700 focus:outline-none bg-white"
                          onFocus={e => e.target.style.borderColor = '#1a3260'}
                          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Your periodic contribution amount.</p>
                  </div>

                  {/* Employer Match */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                      Employer Match
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <select
                        value={employerMatch}
                        onChange={(e) => setEmployerMatch(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none bg-white appearance-none"
                        onFocus={e => e.target.style.borderColor = '#1a3260'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      >
                        <option value="no_match">No match</option>
                        <option value="25">25% match</option>
                        <option value="50">50% match</option>
                        <option value="75">75% match</option>
                        <option value="100">100% match</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Match based on your deferral.</p>
                  </div>
                </div>

                {/* Annual Return + Contributions Duration */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Expected Annual Return */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                      Exp. Annual Return (%)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </span>
                      <input
                        type="number"
                        value={annualReturn}
                        step="0.1"
                        onChange={(e) => setAnnualReturn(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none bg-white"
                        onFocus={e => e.target.style.borderColor = '#1a3260'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Projected long-term growth rate.</p>
                  </div>

                  {/* Contributions Duration */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                      Contributions Duration
                    </label>
                    <div
                      className="rounded-lg border border-gray-200 px-4 py-3"
                      style={{ backgroundColor: '#fafafa' }}
                    >
                      <p className="text-xs text-gray-500 mb-2">Continue contributions until retirement?</p>
                      <div className="flex items-center gap-4">
                        {[{ label: 'Yes, until then', value: true }, { label: 'No', value: false }].map(({ label, value }) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => setContinueUntilRetirement(value)}
                            className="flex items-center gap-1.5 text-xs font-medium"
                            style={{ color: continueUntilRetirement === value ? '#1a3260' : '#9ca3af' }}
                          >
                            <div
                              className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                              style={continueUntilRetirement === value
                                ? { borderColor: '#1a3260' }
                                : { borderColor: '#d1d5db' }}
                            >
                              {continueUntilRetirement === value && (
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#1a3260' }} />
                              )}
                            </div>
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expert Tip */}
                <div
                  className="flex items-start gap-3 rounded-xl px-5 py-4 mb-8"
                  style={{ backgroundColor: '#eef1f8', border: '1px solid #d4dcee' }}
                >
                  <div className="shrink-0 mt-0.5" style={{ color: '#1a3260' }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2a7 7 0 017 7c0 2.6-1.4 4.9-3.5 6.2V17a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1.8A7 7 0 0112 2zm1 18h-2v1a1 1 0 002 0v-1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#1a3260' }}>
                      Expert Tip: Maximize Your Match
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Financial advisers recommend contributing at least enough to capture your full employer match. This effectively provides a 100% or 50% "guaranteed" return on your initial investment before market performance.
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigate('/questionnaire/income')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Previous Step
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#1a3260' }}
                  >
                    Continue to IRAs
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* If not participating */}
          {participates === false && (
            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                onClick={() => navigate('/questionnaire/income')}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Previous Step
              </button>
              <button
                onClick={() => navigate('/questionnaire/iras')}
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1a3260' }}
              >
                Continue to IRAs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Institutional Grade Security • 256-Bit Encryption
          </p>
          <div className="flex items-center justify-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Contact Compliance'].map(link => (
              <a key={link} href="#" className="text-xs text-gray-400 hover:text-gray-600 hover:underline uppercase tracking-wide">
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
            Financial projections are for illustrative purposes only. All investment strategies involve risk and may result in loss. Past performance may not guarantee future results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plans;