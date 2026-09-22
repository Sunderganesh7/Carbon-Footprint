import { memo } from 'react';
import type { CarbonResult } from '../../types';
import { formatEmissions } from '../../utils/format';

interface FootprintSummaryProps {
  result: CarbonResult;
  weeklyTotal: number;
  improvementPercentage: number;
}

export const FootprintSummary = memo(function FootprintSummary({
  result,
  weeklyTotal,
  improvementPercentage,
}: FootprintSummaryProps) {
  const stats = [
    {
      label: 'Monthly Total',
      value: formatEmissions(result.total),
      sub: `${formatEmissions(result.total / 30)} / day`,
      color: 'text-[#059669]',
      iconBg: 'bg-[#e5fcf1]',
      iconColor: 'text-[#059669]',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" />,
      badge: '+ 12%',
      badgeSub: 'vs last month',
      sparklineColor: 'stroke-[#059669]',
    },
    {
      label: 'Weekly Total',
      value: formatEmissions(weeklyTotal),
      sub: `${formatEmissions(weeklyTotal / 7)} / day`,
      color: 'text-[#2563eb]',
      iconBg: 'bg-[#eff6ff]',
      iconColor: 'text-[#2563eb]',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      badge: '+ 8%',
      badgeSub: 'vs last week',
      sparklineColor: 'stroke-[#2563eb]',
    },
    {
      label: 'Daily Average',
      value: formatEmissions(result.total / 30),
      sub: 'Based on 30-day month',
      color: 'text-[#9333ea]',
      iconBg: 'bg-[#faf5ff]',
      iconColor: 'text-[#9333ea]',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
      badge: '+ 10%',
      badgeSub: 'vs last month',
      sparklineColor: 'stroke-[#9333ea]',
    },
    {
      label: 'Improvement',
      value: `${improvementPercentage}%`,
      sub: 'vs last week',
      color: 'text-[#10b981]',
      iconBg: 'bg-[#ecfdf5]',
      iconColor: 'text-[#10b981]',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
      badge: 'Keep going!',
      badgeSub: '',
      sparklineColor: 'stroke-[#10b981]',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <div
          key={stat.label}
          className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-5 shadow-[0_2px_12px_rgb(0,0,0,0.02)] transition-shadow hover:shadow-[0_8px_24px_rgb(0,0,0,0.04)]"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {stat.icon}
                </svg>
              </div>
              <span className="text-[14px] font-semibold text-slate-600">{stat.label}</span>
            </div>
            
            {/* Top Right Badge */}
            <div className="flex flex-col items-end">
              {idx === 3 ? (
                <div className="flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2.5 py-1 text-[11px] font-bold text-[#059669]">
                  {stat.badge}
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                </div>
              ) : (
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[11px] font-bold text-[#059669]">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    {stat.badge}
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">{stat.badgeSub}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <p className={`text-[28px] font-extrabold leading-none ${stat.color} mb-1.5`}>
                {stat.value}
              </p>
              <p className="text-[12px] font-medium text-slate-400">
                {stat.sub}
              </p>
            </div>
            
            {/* Sparkline Graphic (Decorative) */}
            <div className="h-10 w-24 shrink-0 flex items-end justify-end opacity-80 mb-1">
              <svg viewBox="0 0 100 30" className="w-full h-full preserve-aspect-ratio-none">
                <path 
                  d={
                    idx === 0 ? "M0,25 Q10,20 20,25 T40,20 T60,15 T80,18 T100,5" :
                    idx === 1 ? "M0,20 Q15,25 30,15 T60,25 T100,10" :
                    idx === 2 ? "M0,15 Q20,5 40,20 T70,10 T100,25" :
                    "M0,25 Q20,10 40,25 T70,15 T100,5"
                  } 
                  fill="none" 
                  className={stat.sparklineColor} 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
