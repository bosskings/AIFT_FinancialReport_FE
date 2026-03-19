import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IRAs = () => {
  const [hasIRA, setHasIRA] = useState(true);
  const [iraTypes, setIraTypes] = useState<string[]>(['traditional']);
  const [iraBalance, setIraBalance] = useState('50,000');
  const [iraContributions, setIraContributions] = useState('7,000');
  const [taxableSavings, setTaxableSavings] = useState('0.00');
  const [incomeSources, setIncomeSources] = useState<string[]>(['none']);
  const navigate = useNavigate();

  const formatNumber = (value: string) => {
    const num = value.replace(/[^0-9.]/g, '');
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
  };

  const toggleIraType = (type: string) => {
    setIraTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const toggleIncomeSource = (source: string) => {
    if (source === 'none') {
      setIncomeSources(['none']);
    } else {
      setIncomeSources(prev => {
        const without = prev.filter(s => s !== 'none');
        return without.includes(source) ? without.filter(s => s !== source) : [...without, source];
      });
    }
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    navigate('/questionnaire/review');
  };

  const iraOptions = [
    { id: 'traditional', label: 'Traditional IRA' },
    { id: 'roth', label: 'Roth IRA' },
    { id: 'sep', label: 'SEP IRA' },
  ];

  const incomeOptions = [
    { id: 'rental', label: 'Rental' },
    { id: 'business', label: 'Business' },
    { id: 'other', label: 'Other' },
    { id: 'none', label: 'None' },
  ];

  return (
    <div className="min-h-screen px-6 py-8" style={{ backgroundColor: '#f0f2f5' }}>
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-400 mb-4">
          <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/questionnaire')}>Questionnaire</span>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-700">IRAs & Other Savings</span>
        </p>

        {/* Page Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">IRAs & Other Savings</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg">
          Manage your individual retirement accounts and additional savings to get a complete picture of your financial future.
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleNext}>

            {/* IRA Question */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Do you have any Individual Retirement Accounts (IRAs)?
              </p>
              <div className="flex items-center gap-6">
                {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map(({ label, value }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setHasIRA(value)}
                    className="flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: hasIRA === value ? '#1a3260' : '#6b7280' }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={hasIRA === value ? { borderColor: '#1a3260' } : { borderColor: '#d1d5db' }}
                    >
                      {hasIRA === value && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#1a3260' }} />
                      )}
                    </div>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* IRA Details */}
            {hasIRA && (
              <div className="mb-8">
                {/* IRA Types */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
                    IRA Types
                  </label>
                  <div className="flex items-center gap-4">
                    {iraOptions.map(({ id, label }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleIraType(id)}
                        className="flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: iraTypes.includes(id) ? '#1a3260' : '#6b7280' }}
                      >
                        <div
                          className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
                          style={iraTypes.includes(id)
                            ? { backgroundColor: '#1a3260', borderColor: '#1a3260' }
                            : { backgroundColor: 'white', borderColor: '#d1d5db' }}
                        >
                          {iraTypes.includes(id) && (
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

                {/* Balance + Contributions */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Total IRA Balance */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                      Total IRA Balance
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        value={iraBalance}
                        onChange={(e) => setIraBalance(formatNumber(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none bg-white"
                        onFocus={e => e.target.style.borderColor = '#1a3260'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Current combined value of all your IRAs.</p>
                  </div>

                  {/* Annual IRA Contributions */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                      Annual IRA Contributions
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        value={iraContributions}
                        onChange={(e) => setIraContributions(formatNumber(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none bg-white"
                        onFocus={e => e.target.style.borderColor = '#1a3260'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Planned yearly contributions for this calendar year.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100 my-6" />

            {/* Other Savings Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Other Savings & Income</h2>
              <div className="h-0.5 w-10 rounded-full mb-5" style={{ backgroundColor: '#1a3260' }} />

              {/* Taxable Savings */}
              <div className="mb-6">
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                  Taxable Savings or Brokerage Accounts{' '}
                  <span className="normal-case font-normal text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={taxableSavings}
                    onChange={(e) => setTaxableSavings(formatNumber(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none bg-white"
                    onFocus={e => e.target.style.borderColor = '#1a3260'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Enter value of non-retirement investment accounts.</p>
              </div>

              {/* Additional Income Sources */}
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
                  Additional Income Sources
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {incomeOptions.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleIncomeSource(id)}
                      className="flex items-center gap-2 px-3 py-3 rounded-lg border text-sm font-medium transition-all"
                      style={incomeSources.includes(id)
                        ? { borderColor: '#1a3260', backgroundColor: '#eef1f8', color: '#1a3260' }
                        : { borderColor: '#e5e7eb', backgroundColor: 'white', color: '#6b7280' }}
                    >
                      <div
                        className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
                        style={incomeSources.includes(id)
                          ? { backgroundColor: '#1a3260', borderColor: '#1a3260' }
                          : { backgroundColor: 'white', borderColor: '#d1d5db' }}
                      >
                        {incomeSources.includes(id) && (
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
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/questionnaire/plans')}
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

export default IRAs;