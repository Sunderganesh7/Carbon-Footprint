import { memo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { MonthlyData } from '../../types';

interface MonthlyTrendProps {
  data: MonthlyData[];
}

const COLORS = {
  Transportation: '#2563eb', // blue
  Energy: '#f59e0b', // orange
  Food: '#10b981', // green
  Lifestyle: '#8b5cf6', // purple
};

export const MonthlyTrend = memo(function MonthlyTrend({ data }: MonthlyTrendProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] h-full">
        <h3 className="mb-2 text-lg font-semibold text-slate-800">
          Monthly Trend
        </h3>
        <p className="text-sm text-slate-400">
          No data yet. Calculate your footprint to see trends.
        </p>
      </div>
    );
  }

  // Use the latest month's data to show the 4 category bars
  const latestMonth = data[data.length - 1];
  
  const chartData = [
    { name: 'Transportation', value: Math.round(latestMonth.transportation * 10) / 10 },
    { name: 'Energy', value: Math.round(latestMonth.energy * 10) / 10 },
    { name: 'Food', value: Math.round(latestMonth.food * 10) / 10 },
    { name: 'Lifestyle', value: Math.round(latestMonth.lifestyle * 10) / 10 },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ecfdf5] text-[#10b981]">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-900 mb-0.5">
              Monthly Trend
            </h3>
            <p className="text-[13px] text-slate-500 font-light">
              Category-wise emissions for this month
            </p>
          </div>
        </div>
        
        {/* Dropdown styling */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-600 shadow-sm cursor-pointer hover:bg-slate-50">
          This Month
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={50}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
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
              cursor={{ fill: '#f8fafc' }}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});
