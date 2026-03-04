import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Goals = () => {
  const [annualIncome, setAnnualIncome] = useState('85,000');
  const [lifestyle, setLifestyle] = useState('moderate');
  const [confidence, setConfidence] = useState(3);
  const [inflation, setInflation] = useState('standard');
  const navigate = useNavigate();

  const formatNumber = (value: string) => {
    const num = value.replace(/[^0-9.]/g, '');
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
  };

  const lifestyleOptions = [
    {
      id: 'basic',
      label: 'Basic',
      desc: 'Focus on essentials, simple living, and modest travel or entertainment.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'moderate',
      label: 'Moderate',
      desc: 'Comfortable living, regular vacations, and maintaining current lifestyle habits.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'enhanced',
      label: 'Enhanced',
      desc: 'Luxury travel, secondary property, and legacy gifting for family.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  const inflationOptions = [
    { id: 'conservative', label: 'Conservative (2%)' },
    { id: 'standard', label: 'Standard (3%)' },
    { id: 'optimistic', label: 'Optimistic (4%+)' },
  ];

  const confidenceLabels: Record<number, string> = {
    1: 'NOT AT ALL',
    3: 'SOMEWHAT',
    5: 'VERY CONFIDENT',
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    navigate('/questionnaire/review');
  };

  return (
    <div className="min-h-screen px-6 py-8" style={{ backgroundColor: '#f0f2f5' }}>
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-400 mb-4">
          <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/questionnaire')}>Questionnaire</span>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-700">Retirement Goals</span>
        </p>

        {/* Page Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Define Your Retirement Goals</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg">
          Visualizing your future helps us create a more accurate roadmap. Tell us about the lifestyle you envision and your current outlook.
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleNext}>

            {/* Desired Annual Income */}
            <div className="mb-8">
              <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">
                Desired Annual Retirement Income ($)
              </label>
              <p className="text-xs text-gray-400 mb-3">Estimated annual spend in today's dollars.</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">$</span>
                <input
                  type="text"
                  value={annualIncome}
                  required
                  onChange={(e) => setAnnualIncome(formatNumber(e.target.value))}
                  className="w-full pl-9 pr-4 py-3.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none bg-white"
                  onFocus={e => e.target.style.borderColor = '#1a3260'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Preferred Lifestyle */}
            <div className="mb-8">
              <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
                Preferred Retirement Lifestyle
              </label>
              <div className="grid grid-cols-3 gap-3">
                {lifestyleOptions.map(({ id, label, desc, icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setLifestyle(id)}
                    className="flex flex-col items-start text-left p-4 rounded-xl border-2 transition-all"
                    style={lifestyle === id
                      ? { borderColor: '#1a3260', backgroundColor: '#eef1f8' }
                      : { borderColor: '#e5e7eb', backgroundColor: 'white' }}
                  >
                    <span
                      className="mb-3"
                      style={{ color: lifestyle === id ? '#1a3260' : '#9ca3af' }}
                    >
                      {icon}
                    </span>
                    <p
                      className="text-sm font-bold mb-1.5"
                      style={{ color: lifestyle === id ? '#1a3260' : '#1f2937' }}
                    >
                      {label}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Retirement Readiness Confidence */}
            <div className="mb-8">
              <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
                Retirement Readiness Confidence
              </label>

              {/* Scale labels */}
              <div className="flex justify-between mb-2 px-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex flex-col items-center" style={{ width: '18%' }}>
                    {confidenceLabels[n] && (
                      <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1 text-center whitespace-nowrap">
                        {confidenceLabels[n]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Number buttons */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setConfidence(n)}
                    className="flex-1 py-3.5 rounded-lg border-2 text-sm font-bold transition-all"
                    style={confidence === n
                      ? { borderColor: '#1a3260', backgroundColor: '#eef1f8', color: '#1a3260' }
                      : { borderColor: '#e5e7eb', backgroundColor: 'white', color: '#6b7280' }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Inflation Sensitivity */}
            <div className="mb-8">
              <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">
                Inflation Sensitivity
              </label>
              <p className="text-xs text-gray-400 mb-3">How would you like to model future cost-of-living increases?</p>
              <div className="flex gap-3">
                {inflationOptions.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setInflation(id)}
                    className="flex-1 py-3 px-3 rounded-lg border-2 text-sm font-semibold transition-all text-center"
                    style={inflation === id
                      ? { borderColor: '#1a3260', backgroundColor: '#eef1f8', color: '#1a3260' }
                      : { borderColor: '#e5e7eb', backgroundColor: 'white', color: '#6b7280' }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/questionnaire/iras')}
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
                Next Step: Review
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-400 text-center mt-5 flex items-center justify-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Your data is encrypted and securely stored for your personal report only.
        </p>
      </div>
    </div>
  );
};

export default Goals;