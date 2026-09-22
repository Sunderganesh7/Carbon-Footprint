import React from 'react';
import type { CarbonInput, CarbonData } from '../../types';


interface CarbonInsightCardProps {
  carbonData: CarbonInput;
  carbonResult: CarbonData['result'];
}

const CATEGORY_COLORS: Record<string, string> = {
  Energy: 'bg-amber-400',
  Transportation: 'bg-blue-400',
  Food: 'bg-green-400',
  Lifestyle: 'bg-purple-400',
};

export const CarbonInsightCard: React.FC<CarbonInsightCardProps> = ({ carbonResult }) => {
  const total = carbonResult.total;
  const breakdown = [
    { label: 'Energy', value: carbonResult.energy },
    { label: 'Transportation', value: carbonResult.transportation },
    { label: 'Food', value: carbonResult.food },
    { label: 'Lifestyle', value: carbonResult.lifestyle },
  ].sort((a, b) => b.value - a.value);

  const highest = breakdown[0];

  return (
    <section className="mb-6 p-5 rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white shadow-sm">
      <div className="flex items-start justify-between flex-wrap gap-4">
        {/* Total KPI */}
        <div>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">🌍 Your Carbon Footprint</p>
          <p className="text-4xl font-bold text-slate-800">{total.toFixed(1)}</p>
          <p className="text-sm text-slate-500">kg CO₂e / month</p>
        </div>

        {/* Highest impact */}
        <div className="text-right">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Highest Impact</p>
          <p className="text-xl font-bold text-emerald-700">{highest.label}</p>
          <p className="text-sm text-slate-500">
            {total > 0 ? ((highest.value / total) * 100).toFixed(0) : 0}% of total
          </p>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="mt-4 space-y-2">
        {breakdown.map((item) => {
          const pct = total > 0 ? (item.value / total) * 100 : 0;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-24 text-sm text-slate-600 flex-shrink-0">{item.label}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${CATEGORY_COLORS[item.label] ?? 'bg-emerald-400'} transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm font-medium text-slate-700">
                {pct.toFixed(0)}%
              </span>
              <span className="w-20 text-right text-xs text-slate-400">
                {item.value.toFixed(1)} kg
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
