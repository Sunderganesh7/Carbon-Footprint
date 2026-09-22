import { useState, useCallback, useMemo } from 'react';
import type { CarbonInput, CarbonResult } from '../types';
import { TransportForm } from '../components/calculator/TransportForm';
import { EnergyForm } from '../components/calculator/EnergyForm';
import { FoodForm } from '../components/calculator/FoodForm';
import { LifestyleForm } from '../components/calculator/LifestyleForm';
import { CalculatorResults } from '../components/calculator/Results';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { calculateCarbonFootprint } from '../utils/calculations';
import { useCarbonData } from '../hooks/useCarbonData';

const initialInput: CarbonInput = {
  transportation: { carDistance: 0, bikeDistance: 0, busDistance: 0, trainDistance: 0 },
  energy: { electricityUsage: 0, acUsage: 0 },
  food: { vegetarianMeals: 0, nonVegetarianMeals: 0 },
  lifestyle: { onlineShoppingFrequency: 0, wasteGeneration: 0 },
};

type FormStep = 'transport' | 'energy' | 'food' | 'lifestyle' | 'results';

export function Calculator() {
  const [input, setInput] = useState<CarbonInput>(initialInput);
  const [step, setStep] = useState<FormStep>('transport');
  const [showResults, setShowResults] = useState(false);
  const { addEntry } = useCarbonData();

  const result = useMemo((): CarbonResult => calculateCarbonFootprint(input), [input]);

  const updateField = useCallback(
    <K extends keyof CarbonInput>(
      category: K,
      field: keyof CarbonInput[K],
      value: number,
    ) => {
      setInput((prev) => ({
        ...prev,
        [category]: { ...prev[category], [field]: value },
      }));
    },
    [],
  );

  const handleCalculate = () => {
    addEntry(input);
    setShowResults(true);
    setStep('results');
  };

  const steps: { key: FormStep; label: string }[] = [
    { key: 'transport', label: 'Transportation' },
    { key: 'energy', label: 'Energy' },
    { key: 'food', label: 'Food' },
    { key: 'lifestyle', label: 'Lifestyle' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Carbon Footprint Calculator
        </h1>
        <p className="text-slate-500">
          Enter your daily habits to estimate your carbon emissions.
        </p>
      </div>

      {!showResults && (
        <>
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-emerald-600">
                {steps[currentStepIndex].label}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Card>
            {step === 'transport' && (
              <TransportForm
                data={input.transportation}
                onChange={(field, value) =>
                  updateField('transportation', field, value)
                }
              />
            )}
            {step === 'energy' && (
              <EnergyForm
                data={input.energy}
                onChange={(field, value) =>
                  updateField('energy', field, value)
                }
              />
            )}
            {step === 'food' && (
              <FoodForm
                data={input.food}
                onChange={(field, value) =>
                  updateField('food', field, value)
                }
              />
            )}
            {step === 'lifestyle' && (
              <LifestyleForm
                data={input.lifestyle}
                onChange={(field, value) =>
                  updateField('lifestyle', field, value)
                }
              />
            )}

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <Button
                variant="ghost"
                onClick={() => {
                  const idx = currentStepIndex - 1;
                  if (idx >= 0) setStep(steps[idx].key);
                }}
                disabled={currentStepIndex === 0}
              >
                Previous
              </Button>

              {currentStepIndex < steps.length - 1 ? (
                <Button
                  onClick={() => setStep(steps[currentStepIndex + 1].key)}
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleCalculate}>
                  Calculate Footprint
                </Button>
              )}
            </div>
          </Card>
        </>
      )}

      {showResults && (
        <div className="space-y-6">
          <CalculatorResults result={result} />

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="/dashboard"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              View Dashboard
            </a>
            <a
              href="/ai-coach"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-emerald-500 bg-transparent px-4 py-2 text-sm font-medium text-emerald-600 transition-all duration-200 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Get AI Recommendations
            </a>
            <Button
              variant="ghost"
              onClick={() => {
                setShowResults(false);
                setStep('transport');
                setInput(initialInput);
              }}
            >
              Calculate Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
