import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event: any) => {
    event.preventDefault();
    console.log('Login attempt with:', { email, password });
    localStorage.setItem('accessToken', 'aabbccdd');
    navigate('/onboarding');
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
            backgroundImage: 'linear-gradient(#4a7fd4 1px, transparent 1px), linear-gradient(90deg, #4a7fd4 1px, transparent 1px)',
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
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center px-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Sign In</h2>
          <p className="text-sm text-gray-500 mb-8">Access your enterprise-sponsored retirement dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-5 text-gray-600">
            {/* Email */}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
            </div>

            {/* Forgot Password */}
            <div className="text-right -mt-2">
              <a href="#" className="text-blue-600 text-sm hover:underline">Forgot your password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#0f1f3d' }}
            >
              Sign In
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Divider + Register */}
            <p className="text-center text-sm text-gray-500 pt-3 border-t border-gray-200">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
            </p>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 pt-2">
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

export default Login;