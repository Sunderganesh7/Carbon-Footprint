import { memo } from 'react';
import type { CarbonResult } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatEmissions } from '../../utils/format';

interface CalculatorResultsProps {
  result: CarbonResult;
}

export const CalculatorResults = memo(function CalculatorResults({ result }: CalculatorResultsProps) {
  const categories = [
    { label: 'Transportation', value: result.transportation, color: 'bg-blue-500' },
    { label: 'Energy', value: result.energy, color: 'bg-amber-500' },
    { label: 'Food', value: result.food, color: 'bg-emerald-500' },
    { label: 'Lifestyle', value: result.lifestyle, color: 'bg-purple-500' },
  ];

  const maxValue = Math.max(...categories.map((c) => c.value), 1);

  return (
    <Card className="animate-fade-in">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Your Carbon Footprint
      </h3>

      <div className="mb-6 text-center">
        <span className="text-5xl font-bold text-emerald-600">
          {formatEmissions(result.total)}
        </span>
        <p className="mt-1 text-sm text-slate-400">CO₂ equivalent per month</p>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-slate-600">{cat.label}</span>
              <span className="text-sm font-medium text-slate-800">
                {formatEmissions(cat.value)}
                <span className="ml-1 text-xs text-slate-400">
                  ({result.total > 0 ? ((cat.value / result.total) * 100).toFixed(1) : 0}%)
                </span>
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-700 ${cat.color}`}
                style={{
                  width: `${(cat.value / maxValue) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="success">
          {result.total < 200
            ? 'Low Impact'
            : result.total < 400
              ? 'Moderate Impact'
              : 'High Impact'}
        </Badge>
        <Badge variant="info">
          Daily avg: {formatEmissions(result.total / 30)}
        </Badge>
      </div>
    </Card>
  );
});
