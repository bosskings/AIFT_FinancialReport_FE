import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [retirementAge, setRetirementAge] = useState('65');
  const navigate = useNavigate();

  const handleNext = (e: any) => {
    e.preventDefault();
    navigate('/questionnaire/income');
  };

  return (
    <div className="min-h-screen px-6 py-8" style={{ backgroundColor: '#f0f2f5' }}>
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-400 mb-4">
          <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/questionnaire')}>Questionnaire</span>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-700">Personal Profile</span>
        </p>

        {/* Page Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Personal Profile</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xl">
          Let's start with the basics. This information allows us to customize your retirement projections based on your unique life situation.
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-14">

          {/* Section Header */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
            <div className="mt-1.5 h-0.5 w-10 rounded-full" style={{ backgroundColor: '#1a3260' }} />
          </div>

          <form onSubmit={handleNext}>
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    required
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 text-gray-500 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 bg-white"
                    style={{ focusRingColor: '#1a3260' } as any}
                    onFocus={e => e.target.style.borderColor = '#1a3260'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Enter your full legal name as it appears on documents.</p>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="date"
                    value={dob}
                    required
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="MM/DD/YYYY"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white text-gray-500"
                    onFocus={e => e.target.style.borderColor = '#1a3260'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Used to calculate your current age and retirement timeline.</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Marital Status */}
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                  Marital Status
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <select
                    value={maritalStatus}
                    required
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white appearance-none text-gray-500"
                    onFocus={e => e.target.style.borderColor = '#1a3260'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  >
                    <option value="" disabled>Select status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                    <option value="domestic_partner">Domestic Partner</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Marital status affects Social Security and tax calculations.</p>
              </div>

              {/* Planned Retirement Age */}
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                  Planned Retirement Age
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <input
                    type="number"
                    value={retirementAge}
                    required
                    min={40}
                    max={80}
                    onChange={(e) => setRetirementAge(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-gray-500 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white"
                    onFocus={e => e.target.style.borderColor = '#1a3260'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">The age you ideally hope to stop working full-time.</p>
              </div>
            </div>

            {/* Privacy Notice */}
            <div
              className="flex items-start gap-3 rounded-xl px-5 py-4 mb-8"
              style={{ backgroundColor: '#eef1f8', border: '1px solid #d4dcee' }}
            >
              <div className="shrink-0 mt-0.5" style={{ color: '#1a3260' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: '#1a3260' }}>Privacy Guaranteed</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your personal details are used solely for generating your retirement report. We use enterprise-grade encryption to protect all your data.
                </p>
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1a3260' }}
              >
                Next Step: Income
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

export default Profile;