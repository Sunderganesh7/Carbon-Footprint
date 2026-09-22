import { memo, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { CarbonResult } from '../../types';

interface EmissionBreakdownProps {
  result: CarbonResult;
}

const COLORS = {
  transportation: '#2563eb', // blue
  energy: '#f59e0b', // orange
  food: '#10b981', // green
  lifestyle: '#8b5cf6', // purple
};

const CATEGORY_LABELS: Record<string, string> = {
  transportation: 'Transportation',
  energy: 'Energy',
  food: 'Food',
  lifestyle: 'Lifestyle',
};

const CATEGORY_ICONS: Record<string, JSX.Element> = {
  transportation: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />, // simplified, let's use a car-like or generic transport icon
  energy: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  food: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />, 
  lifestyle: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
};

// Update icons specifically for the list
const TransportIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7a4 4 0 108 0M8 7v1m8-1v1M8 15a4 4 0 108 0M8 15v1m8-1v1M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);
const EnergyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);
const FoodIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
);
const LifestyleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);

const getIcon = (key: string) => {
  switch (key) {
    case 'transportation': return <TransportIcon />;
    case 'energy': return <EnergyIcon />;
    case 'food': return <FoodIcon />;
    case 'lifestyle': return <LifestyleIcon />;
    default: return <LifestyleIcon />;
  }
};

export const EmissionBreakdown = memo(function EmissionBreakdown({ result }: EmissionBreakdownProps) {
  const data = useMemo(
    () =>
      Object.entries(result)
        .filter(([key]) => key !== 'total')
        .map(([key, value]) => ({
          key,
          name: CATEGORY_LABELS[key] || key,
          value: Math.round(value * 10) / 10,
          color: COLORS[key as keyof typeof COLORS],
        })),
    [result],
  );

  const total = result.total;

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e5fcf1] text-[#059669]">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-900 mb-0.5">
              Emission Breakdown
            </h3>
            <p className="text-[13px] text-slate-500 font-light">
              See how your emissions are distributed across different categories.
            </p>
          </div>
        </div>
        
        {/* Dropdown styling */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-600 shadow-sm cursor-pointer hover:bg-slate-50">
          This Month
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-8 pt-4 pb-2">
        {/* Chart */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="100%"
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                animationBegin={0}
                animationDuration={300}
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} kg`, 'Emissions']}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Centered Total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[22px] font-extrabold text-slate-900 leading-none mb-1">
              {total.toFixed(1)} <span className="text-[14px]">kg</span>
            </span>
            <span className="text-[12px] font-semibold text-slate-400 tracking-wider">
              CO₂e
            </span>
          </div>
        </div>

        {/* Legend / List */}
        <div className="flex-1 w-full space-y-4 pr-2">
          {data.map((item) => {
            const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
            return (
              <div key={item.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div 
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-opacity-10 transition-colors"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {getIcon(item.key)}
                  </div>
                  <span className="text-[14px] font-semibold text-slate-700">{item.name}</span>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="text-[14px] font-bold text-slate-900">
                    {item.value.toFixed(1)} kg
                  </span>
                  <span className="text-[12px] font-medium text-slate-400 w-12 text-right">
                    ({percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
