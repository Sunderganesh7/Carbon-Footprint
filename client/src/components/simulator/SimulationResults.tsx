import { memo } from 'react';
import type { CarbonResult } from '../../types';
import { Card } from '../ui/Card';
import { formatEmissions } from '../../utils/format';

interface SimulationResultsProps {
  currentResult: CarbonResult;
  savings: CarbonResult | null;
  savingsPercentage: number;
}

export const SimulationResults = memo(function SimulationResults({
  currentResult,
  savings,
  savingsPercentage,
}: SimulationResultsProps) {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Simulation Results
      </h3>

      <div className="mb-6 text-center">
        <span className="text-4xl font-bold text-emerald-600">
          {formatEmissions(currentResult.total)}
        </span>
        <p className="text-sm text-slate-400">CO₂ per month</p>
      </div>

      {savings && savings.total > 0 && (
        <div className="mb-4 rounded-lg bg-emerald-50 p-4 text-center">
          <p className="text-sm font-medium text-emerald-700">
            Potential Reduction
          </p>
          <p className="text-2xl font-bold text-emerald-600">
            {formatEmissions(savings.total)}
          </p>
          <p className="text-sm text-emerald-500">
            {savingsPercentage}% decrease from current
          </p>
        </div>
      )}

      {savings && savings.total < 0 && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-center">
          <p className="text-sm font-medium text-red-700">
            Emissions Increased
          </p>
          <p className="text-2xl font-bold text-red-600">
            {formatEmissions(Math.abs(savings.total))}
          </p>
          <p className="text-sm text-red-500">
            {Math.abs(savingsPercentage)}% increase
          </p>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-sm text-slate-600">Transportation</span>
          <span className="text-sm font-medium text-slate-800">
            {formatEmissions(currentResult.transportation)}
            {savings && (
              <span
                className={`ml-2 text-xs ${
                  savings.transportation > 0
                    ? 'text-emerald-500'
                    : savings.transportation < 0
                      ? 'text-red-500'
                      : 'text-slate-400'
                }`}
              >
                {savings.transportation > 0 ? '-' : '+'}
                {formatEmissions(Math.abs(savings.transportation))}
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-sm text-slate-600">Energy</span>
          <span className="text-sm font-medium text-slate-800">
            {formatEmissions(currentResult.energy)}
            {savings && (
              <span
                className={`ml-2 text-xs ${
                  savings.energy > 0
                    ? 'text-emerald-500'
                    : savings.energy < 0
                      ? 'text-red-500'
                      : 'text-slate-400'
                }`}
              >
                {savings.energy > 0 ? '-' : '+'}
                {formatEmissions(Math.abs(savings.energy))}
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-sm text-slate-600">Food</span>
          <span className="text-sm font-medium text-slate-800">
            {formatEmissions(currentResult.food)}
            {savings && (
              <span
                className={`ml-2 text-xs ${
                  savings.food > 0
                    ? 'text-emerald-500'
                    : savings.food < 0
                      ? 'text-red-500'
                      : 'text-slate-400'
                }`}
              >
                {savings.food > 0 ? '-' : '+'}
                {formatEmissions(Math.abs(savings.food))}
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Lifestyle</span>
          <span className="text-sm font-medium text-slate-800">
            {formatEmissions(currentResult.lifestyle)}
            {savings && (
              <span
                className={`ml-2 text-xs ${
                  savings.lifestyle > 0
                    ? 'text-emerald-500'
                    : savings.lifestyle < 0
                      ? 'text-red-500'
                      : 'text-slate-400'
                }`}
              >
                {savings.lifestyle > 0 ? '-' : '+'}
                {formatEmissions(Math.abs(savings.lifestyle))}
              </span>
            )}
          </span>
        </div>
      </div>
    </Card>
  );
});
