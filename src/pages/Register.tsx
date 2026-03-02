import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'];

  const handleRegister = (event: any) => {
    event.preventDefault();
    if (!agreed) return;
    console.log('Register attempt with:', { fullName, email, password });
    localStorage.setItem('accessToken', 'aabbccdd');
    navigate('/overview');
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left Panel */}
      <div
        className="w-1/2 flex flex-col justify-between px-12 pl-32 py-10 text-white relative overflow-hidden"
        style={{ backgroundColor: '#0f1f3d', backgroundImage: 'linear-gradient(135deg, #0f1f3d 0%, #1a3260 100%)' }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(#4a7fd4 1px, transparent 1px), linear-gradient(90deg, #4a7fd4 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <p className="text-lg font-bold tracking-tight">Retirement Planner</p>
          <p className="text-xs uppercase tracking-widest text-blue-300 mt-0.5">Enterprise Financial Solutions</p>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold leading-tight mb-6">
            Secure your future with<br />institutional precision.
          </h1>
          <p className="text-sm text-blue-200 mb-10 leading-relaxed max-w-xs">
            Join thousands of enterprise employees managing their wealth with advanced forecasting and real-time asset tracking.
          </p>

          {/* Feature bullets */}
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 w-8 h-8 rounded-full border border-blue-400 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">Employer-Sponsored Access</p>
                <p className="text-xs text-blue-300 mt-0.5">Complimentary access through your corporate benefits package.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-0.5 w-8 h-8 rounded-full border border-blue-400 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">Bank-Level Encryption</p>
                <p className="text-xs text-blue-300 mt-0.5">Your financial data is protected by AES-256 bit encryption protocols.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-xs text-blue-400">
            © 2024 Retirement Planner. All financial data is encrypted and handled according to SOC2 Type II compliance standards.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center px-12 overflow-y-auto">
        <div className="w-full max-w-md py-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Create Your Account</h2>
          <p className="text-sm text-gray-500 mb-8">Get started with your enterprise-sponsored retirement dashboard.</p>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={fullName}
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                />
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                />
              </div>

              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ backgroundColor: i <= strength ? strengthColors[strength] : '#e5e7eb' }}
                      />
                    ))}
                  </div>
                  <p className="text-xs flex items-center gap-1" style={{ color: strengthColors[strength] }}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {strengthLabel}: Use 8+ characters with mixed case &amp; symbols
                  </p>
                </div>
              )}
              {!password && (
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Use 8+ characters with mixed case &amp; symbols
                </p>
              )}
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                , and I consent to the secure handling of my data.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreed}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#0f1f3d' }}
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-500 pt-1">
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline font-medium"
                onClick={() => navigate('/login')}
              >
                Log in
              </span>
            </p>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 pt-2 border-t border-gray-200">
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                AES-256 ENCRYPTED
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                SOC2 COMPLIANT
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;