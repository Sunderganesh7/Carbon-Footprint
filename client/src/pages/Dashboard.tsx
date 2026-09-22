import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCarbonData } from '../hooks/useCarbonData';
import { FootprintSummary } from '../components/dashboard/FootprintSummary';
import { EmissionBreakdown } from '../components/dashboard/EmissionBreakdown';
import { SustainabilityScoreCard } from '../components/dashboard/SustainabilityScoreCard';
import { WeeklyTrend } from '../components/dashboard/WeeklyTrend';
import { MonthlyTrend } from '../components/dashboard/MonthlyTrend';
import { Button } from '../components/ui/Button';
import type { WeeklyData, MonthlyData, CarbonResult } from '../types';

const sidebarLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { path: '/calculator', label: 'Calculator', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { path: '/simulator', label: 'Simulator', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { path: '/ai-coach', label: 'AI Coach', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { path: '/challenges', label: 'Challenges', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { path: '/plastic-footprint', label: 'Plastic', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { path: '/event-planner', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
];

function EmptyDashboardState({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100">
          <svg className="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h1 className="mb-3 text-3xl font-bold text-slate-800">Your Dashboard Awaits</h1>
        <p className="mb-8 max-w-lg text-slate-500">
          Calculate your carbon footprint first to unlock personalized charts, track weekly trends, monitor your sustainability score, and get AI-powered recommendations.
        </p>
        <Button size="lg" onClick={onNavigate} aria-label="Go to calculator to calculate your carbon footprint">
          Calculate Your Footprint
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const {
    latestEntry,
    weeklyData,
    monthlyData,
    improvementPercentage,
  } = useCarbonData();

  const memoResult = useMemo((): CarbonResult | null =>
    latestEntry?.result ?? null, [latestEntry]);
  const memoWeekly = useMemo((): WeeklyData[] => weeklyData, [weeklyData]);
  const memoMonthly = useMemo((): MonthlyData[] => monthlyData, [monthlyData]);
  const memoImprovement = useMemo((): number => improvementPercentage, [improvementPercentage]);
  const memoWeeklyTotal = useMemo((): number => latestEntry?.weeklyTotal ?? 0, [latestEntry]);
  const memoSustainabilityScore = useMemo((): number => latestEntry?.sustainabilityScore ?? 0, [latestEntry]);

  if (!latestEntry) {
    return <EmptyDashboardState onNavigate={() => navigate('/calculator')} />;
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#f8fafc]">
      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:flex w-[250px] shrink-0 flex-col border-r border-slate-200 bg-white relative overflow-hidden">
        
        {/* Navigation */}
        <nav className="relative z-10 flex-1 space-y-2 p-4 mt-2">
          {sidebarLinks.map((link) => {
            const isActive = link.path === '/dashboard';
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[14px] font-semibold transition-all ${
                  isActive
                    ? 'bg-[#dcfce7] text-[#059669]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={link.icon} />
                </svg>
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        {/* Sidebar Bottom Graphic & Eco Journey */}
        <div className="relative p-5 mt-auto">
          {/* Forest Background for the bottom of sidebar */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-top opacity-90 mix-blend-multiply" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?q=80&w=400&auto=format&fit=crop')", maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)' }}
          ></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0f4c2c] via-[#0f4c2c]/80 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center mb-6 pt-12">
            <svg className="w-12 h-12 text-[#4ade80] mb-2 transform -rotate-12 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 018 8c0 4.418-3.582 8-8 8H2V10a8 8 0 018-8zm0 2a6 6 0 00-6 6v4h4a6 6 0 006-6c0-3.314-2.686-6-6-6z" clipRule="evenodd"></path></svg>
            <div className="font-['Caveat'] text-2xl font-bold text-white text-center leading-tight -rotate-3">
              Small<br/>Actions<br/>Big Impact
            </div>
          </div>

          <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
              </div>
              <h4 className="text-[13px] font-bold text-slate-800">Your Eco Journey</h4>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mb-1.5 overflow-hidden">
              <div className="bg-[#10b981] h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-500">
              <span>Keep Going!</span>
              <span className="text-[#059669]">60%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative w-full overflow-y-auto">
        
        {/* Right Side Decoration Background */}
        <div 
          className="absolute top-0 right-0 w-1/3 h-[500px] bg-cover bg-left-top opacity-[0.15] pointer-events-none z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?q=80&w=800&auto=format&fit=crop')",
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            WebkitMaskComposite: 'source-in'
          }}
        ></div>

        <div className="relative z-10 max-w-[1450px] mx-auto px-6 py-8 sm:px-8 lg:px-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] text-[#10b981] uppercase mb-2">DASHBOARD</div>
            <h1 className="text-[32px] font-extrabold text-slate-900 tracking-tight mb-2">
              Your Carbon Footprint <span className="text-[#10b981]">Dashboard</span>
            </h1>
            <p className="text-[15px] text-slate-500 font-light">
              Track your emissions, identify trends, and make smarter choices for a greener tomorrow.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2.5 shadow-sm text-[13.5px] font-semibold text-slate-700">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Sep 2026
              <svg className="w-4 h-4 text-slate-400 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <button className="flex items-center gap-2 bg-[#0d5929] hover:bg-[#0a4521] text-white rounded-lg px-5 py-2.5 shadow-md text-[13.5px] font-bold transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Floating Text Decorative (Top Right of Main Content) */}
        <div className="hidden xl:flex absolute top-10 right-10 items-center justify-end pointer-events-none drop-shadow-sm">
          <h3 className="font-['Caveat'] text-[26px] font-bold text-[#0d5929] -rotate-3 text-right">
            Cleaner Choices <br /> Brighter Tomorrows
          </h3>
        </div>

        {/* 4 KPI CARDS */}
        <div className="mb-6">
          <FootprintSummary
            result={memoResult!}
            weeklyTotal={memoWeeklyTotal}
            improvementPercentage={memoImprovement}
          />
        </div>

        {/* EMISSION BREAKDOWN + SCORE */}
        <div className="mb-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <EmissionBreakdown result={memoResult!} />
          <SustainabilityScoreCard score={memoSustainabilityScore} />
        </div>

        {/* TRENDS */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <WeeklyTrend data={memoWeekly} />
          <MonthlyTrend data={memoMonthly} />
        </div>

        {/* BOTTOM CTA */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0a4521] to-[#0d5929] rounded-2xl shadow-lg mt-10">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-cover bg-left opacity-30 mix-blend-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?q=80&w=800&auto=format&fit=crop')" }}></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 py-8 sm:px-10 gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/20 flex items-center justify-center text-emerald-300 shrink-0 shadow-inner backdrop-blur-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-white mb-1 tracking-tight">
                  Recalculate Your Footprint
                </h3>
                <p className="text-[14px] text-emerald-100/90 font-light">
                  Update your data to see how your changes affect your score.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="/simulator"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-2.5 text-[14px] font-bold text-[#0d5929] shadow-md transition-all duration-200 hover:bg-emerald-50 shrink-0 whitespace-nowrap"
              >
                Try the Simulator
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
              <div className="hidden lg:block font-['Caveat'] text-2xl font-bold text-emerald-200/60 rotate-2 whitespace-nowrap pr-4">
                Every <br/> Action Counts
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
