import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [consent1, setConsent1] = useState(true);
  const [consent2, setConsent2] = useState(true);
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate('/retirement-plan');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f0f2f5' }}>
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full py-3 lg:px-60 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: '#1a3260' }}
          >
            G
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">Help Center</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 mt-10">
        <div className="w-full max-w-2xl">

          {/* Security Banner */}
          <div
            className="rounded-t-2xl flex flex-col items-center justify-center py-8"
            style={{ background: 'linear-gradient(135deg, #e8edf5 0%, #dce4f0 100%)' }}
          >
            {/* Shield Icon */}
            <div className="mb-3">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 4L8 10v12c0 11 7.2 21.3 16 24 8.8-2.7 16-13 16-24V10L24 4z"
                  fill="#1a3260"
                />
                <path
                  d="M20 24l3 3 6-7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center gap-1.5 bg-white bg-opacity-60 rounded-full px-4 py-1.5">
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs font-semibold tracking-widest text-gray-600 uppercase">Enterprise Grade Security</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="bg-white rounded-b-2xl shadow-sm px-10 pt-8 pb-6">

            {/* Headline */}
            <h1 className="text-2xl font-extrabold text-gray-900 text-center leading-tight mb-3">
              Secure Your Future with Your<br />Personalized Retirement Plan
            </h1>
            <p className="text-sm text-gray-500 text-center leading-relaxed mb-8 max-w-sm mx-auto">
              Plan your retirement with confidence. Get a customized roadmap based on your unique financial goals and enterprise benefits.
            </p>

            {/* Three Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Efficient',
                  desc: 'Takes only 10–15 minutes to complete',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Confidential',
                  desc: 'Protected by bank-level 256-bit encryption',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: 'Actionable',
                  desc: 'Receive a comprehensive report instantly',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#eef1f8', color: '#1a3260' }}
                  >
                    {icon}
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{title}</p>
                  <p className="text-xs text-gray-400 leading-snug">{desc}</p>
                </div>
              ))}
            </div>

            {/* Disclosures */}
            <div
              className="rounded-xl px-5 py-4 mb-6"
              style={{ backgroundColor: '#f7f9fc', border: '1px solid #e4e9f2' }}
            >
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase text-center mb-3">
                Important Disclosures
              </p>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent1}
                    onChange={(e) => setConsent1(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-blue-700 cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I understand that my information is stored securely and will only be used to generate my retirement projections.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent2}
                    onChange={(e) => setConsent2(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-blue-700 cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                  </span>
                </label>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleBegin}
              disabled={!consent1 || !consent2}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#1a3260' }}
            >
              Begin Questionnaire
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-5 mt-5">
              {[
                { label: 'ISO 27001 Certified' },
                { label: 'SSO Integrated' },
                { label: 'AES-256 Bit Encryption' },
              ].map(({ label }) => (
                <span key={label} className="flex items-center gap-1 text-xs text-gray-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between lg:px-60">
        <p className="text-xs text-gray-400">© 2024 Financial Planning Platform. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {['How your data is used', 'Privacy Statement', 'Compliance'].map((link) => (
            <a key={link} href="#" className="text-xs text-gray-400 hover:text-gray-600 hover:underline">
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;