import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: '/dashboard', label: 'Dashboard', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { path: '/calculator', label: 'Calculator', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { path: '/simulator', label: 'Simulator', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { path: '/ai-coach', label: 'AI Coach', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { path: '/challenges', label: 'Challenges', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { path: '/plastic-footprint', label: 'Plastic', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { path: '/event-planner', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
];

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Eco Sense AI Brand */}
            <a href="http://localhost:8000" className="flex flex-col text-slate-800 hover:text-emerald-700 transition-colors">
              <div className="flex items-center gap-1.5 font-bold text-sm">
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
                Eco Sense AI
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">For a Greener Tomorrow</span>
            </a>
            
            {/* Separator */}
            <div className="w-[1px] h-8 bg-slate-200 mx-2 hidden sm:block"></div>

            {/* CarbonWise Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-bold text-slate-800 hover:text-emerald-600 transition-colors hidden sm:flex"
            >
              <svg
                className="h-6 w-6 text-emerald-500"
                viewBox="0 0 100 100"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M50 10 C25 10 10 35 10 50 C10 75 25 90 50 90 C75 90 90 75 90 50 C90 35 75 10 50 10Z" opacity="0.2" />
                <path d="M50 20 C35 20 25 40 25 50 C25 65 35 80 50 80 C65 80 75 65 75 50 C75 40 65 20 50 20Z" opacity="0.4" />
                <path d="M50 30 C40 30 35 45 35 50 C35 60 40 70 50 70 C60 70 65 60 65 50 C65 45 60 30 50 30Z" />
                <path d="M50 40 C45 40 42 48 42 50 C42 55 45 60 50 60 C55 60 58 55 58 50 C58 48 55 40 50 40Z" opacity="0.7" />
              </svg>
              <span>CarbonWise</span>
            </Link>
          </div>

          {/* Center/Right Nav Links */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={link.icon}
                    />
                  </svg>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
             {/* Theme Toggle */}
             <div className="flex items-center gap-2 bg-slate-200 rounded-full p-1 w-[52px]">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-700 ml-auto">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                </div>
             </div>
             
             {/* Avatar */}
             <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-slate-700 transition-colors">
                S
             </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 lg:hidden" role="menu">
          <div className="space-y-1 px-4 py-3 bg-white">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={link.icon}
                    />
                  </svg>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
