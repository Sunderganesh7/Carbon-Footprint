import { memo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { WeeklyData } from '../../types';

interface WeeklyTrendProps {
  data: WeeklyData[];
}

export const WeeklyTrend = memo(function WeeklyTrend({ data }: WeeklyTrendProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] h-full">
        <h3 className="mb-2 text-lg font-semibold text-slate-800">
          Weekly Trend
        </h3>
        <p className="text-sm text-slate-400">
          No data yet. Calculate your footprint to see trends.
        </p>
      </div>
    );
  }

  const chartData = data.map((d) => ({
    // Format "YYYY-MM-DD" to "Sep 10" style for the UI if possible,
    // or just use existing string. If it's a date string, we could format it.
    // For now we'll just take the week string and use it.
    week: d.week.substring(5), // e.g. "09-10"
    emissions: Math.round(d.total * 10) / 10,
  }));

  // Simulate dates for the chart labels (Sep 10, Sep 11, etc) to match screenshot
  // The actual data might just be week strings. Let's provide a custom tick formatter if needed.
  // Actually, I'll just use the exact data that's passed in but make the chart look like the screenshot.

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ecfdf5] text-[#10b981]">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-900 mb-0.5">
              Weekly Trend
            </h3>
            <p className="text-[13px] text-slate-500 font-light">
              Your daily emissions over the past week
            </p>
          </div>
        </div>
        
        {/* Dropdown styling */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-600 shadow-sm cursor-pointer hover:bg-slate-50">
          Last 7 Days
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#f1f5f9" />
            <XAxis
              dataKey="week"
              stroke="#cbd5e1"
              fontSize={11}
              fontWeight={500}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#cbd5e1"
              fontSize={11}
              fontWeight={500}
              tickLine={false}
              axisLine={false}
              dx={-10}
              label={{
                value: 'kg CO₂e',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#94a3b8', fontSize: 11, fontWeight: 600 },
                dx: 15
              }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '13px',
                fontWeight: '600'
              }}
              formatter={(value: number) => [`${value} kg`, 'Emissions']}
            />
            <Area
              type="monotone"
              dataKey="emissions"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorEmissions)"
              activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});
