import { useState, useMemo, useCallback } from 'react';
import type { CarbonInput, CarbonResult } from '../types';
import { calculateCarbonFootprint } from '../utils/calculations';

const defaultInput: CarbonInput = {
  transportation: { carDistance: 20, bikeDistance: 5, busDistance: 10, trainDistance: 0 },
  energy: { electricityUsage: 400, acUsage: 4 },
  food: { vegetarianMeals: 7, nonVegetarianMeals: 14 },
  lifestyle: { onlineShoppingFrequency: 3, wasteGeneration: 2 },
};

export function useSimulator(initialInput?: CarbonInput) {
  const [input, setInput] = useState<CarbonInput>(initialInput ?? defaultInput);

  const currentResult = useMemo(() => calculateCarbonFootprint(input), [input]);

  const updateField = useCallback(
    <K extends keyof CarbonInput>(
      category: K,
      field: keyof CarbonInput[K],
      value: number,
    ) => {
      setInput((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value,
        },
      }));
    },
    [],
  );

  const savings = useMemo((): CarbonResult | null => {
    if (!initialInput) return null;
    const initial = calculateCarbonFootprint(initialInput);
    return {
      transportation: initial.transportation - currentResult.transportation,
      energy: initial.energy - currentResult.energy,
      food: initial.food - currentResult.food,
      lifestyle: initial.lifestyle - currentResult.lifestyle,
      total: initial.total - currentResult.total,
    };
  }, [initialInput, currentResult]);

  const savingsPercentage = useMemo((): number => {
    if (!initialInput) return 0;
    const initial = calculateCarbonFootprint(initialInput);
    if (initial.total === 0) return 0;
    return Math.round(
      ((initial.total - currentResult.total) / initial.total) * 100,
    );
  }, [initialInput, currentResult]);

  const resetToInput = useCallback(
    (newInput: CarbonInput) => {
      setInput(newInput);
    },
    [],
  );

  return {
    input,
    currentResult,
    savings,
    savingsPercentage,
    updateField,
    resetToInput,
  };
}
