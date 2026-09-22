import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarbonData } from '../hooks/useCarbonData';
import { useSimulator } from '../hooks/useSimulator';
import { SimulatorControls } from '../components/simulator/SimulatorControls';
import { SimulationResults } from '../components/simulator/SimulationResults';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { CarbonInput } from '../types';

function EmptySimulatorState({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Card className="mb-8">
      <div className="flex flex-col items-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-slate-800">No Data to Simulate</h2>
        <p className="mb-6 max-w-md text-slate-500">
          Calculate your carbon footprint first to use the simulator with your actual data and see how lifestyle changes affect your emissions.
        </p>
        <Button size="lg" onClick={onNavigate} aria-label="Go to calculator to calculate your carbon footprint">
          Go to Calculator
        </Button>
      </div>
    </Card>
  );
}

export function Simulator() {
  const navigate = useNavigate();
  const { latestEntry } = useCarbonData();
  const { input, currentResult, savings, savingsPercentage, updateField, resetToInput } =
    useSimulator(latestEntry?.input);

  useEffect(() => {
    if (latestEntry?.input) {
      resetToInput(latestEntry.input);
    }
  }, [latestEntry?.input, resetToInput]);

  const handleFieldChange = useCallback(
    (category: keyof CarbonInput, field: string, value: number) => {
      const cat = category;
      const typedField = field as keyof CarbonInput[typeof cat];
      updateField(cat, typedField, value);
    },
    [updateField],
  );

  const handleNavigate = useCallback(() => navigate('/calculator'), [navigate]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Carbon Reduction Simulator
        </h1>
        <p className="text-slate-500">
          Adjust sliders to see how lifestyle changes affect your carbon footprint in real time.
        </p>
      </div>

      {!latestEntry && <EmptySimulatorState onNavigate={handleNavigate} />}

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <SimulatorControls
              input={input}
              onFieldChange={handleFieldChange}
            />
          </Card>
        </div>
        <div className="lg:col-span-2">
          <SimulationResults
            currentResult={currentResult}
            savings={savings}
            savingsPercentage={savingsPercentage}
          />
        </div>
      </div>
    </div>
  );
}
