import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Income = () => {
  const [grossSalary, setGrossSalary] = useState('120,000');
  const [otherIncome, setOtherIncome] = useState('0.00');
  const navigate = useNavigate();

  const formatNumber = (value: string) => {
    const num = value.replace(/[^0-9.]/g, '');
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    navigate('/questionnaire/employer-plans');
  };

  return (
    <div className="min-h-screen px-6 py-8" style={{ backgroundColor: '#f0f2f5' }}>
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-400 mb-4">
          <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/questionnaire')}>Questionnaire</span>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-700">Income Details</span>
        </p>

        {/* Page Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Your Income Details</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xl">
          Enter your current earnings to help us estimate your retirement lifestyle and calculate your projected Social Security benefits.
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-14">

          {/* Section Header */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Current Annual Earnings</h2>
            <div className="mt-1.5 h-0.5 w-10 rounded-full" style={{ backgroundColor: '#1a3260' }} />
          </div>

          <form onSubmit={handleNext}>
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-6 mb-6">

              {/* Annual Gross Salary */}
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                  Annual Gross Salary
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
                    $
                  </span>
                  <input
                    type="text"
                    value={grossSalary}
                    required
                    onChange={(e) => setGrossSalary(formatNumber(e.target.value))}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none bg-white"
                    onFocus={e => e.target.style.borderColor = '#1a3260'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Total yearly earnings before taxes and deductions.</p>
              </div>

              {/* Other Annual Income */}
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                  Other Annual Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(formatNumber(e.target.value))}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none bg-white"
                    onFocus={e => e.target.style.borderColor = '#1a3260'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Rental income, dividends, side businesses, or other sources.</p>
              </div>
            </div>

            {/* Social Security Impact Notice */}
            <div
              className="flex items-start gap-3 rounded-xl px-5 py-4 mb-10"
              style={{ backgroundColor: '#eef1f8', border: '1px solid #d4dcee' }}
            >
              <div className="shrink-0 mt-0.5" style={{ color: '#1a3260' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#1a3260' }}>
                  Social Security Impact
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Accurate income reporting is critical for your retirement plan. We use these figures to estimate your future Social Security payments based on your current tax contributions. Providing precise data ensures your projected monthly retirement income is as realistic as possible.
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/questionnaire/profile')}
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
                Next Step: Employer Plans
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

export default Income;