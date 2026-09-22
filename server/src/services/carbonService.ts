import { CarbonInput } from '../types/index.js';
import { calculateCarbonFootprint, calculateSustainabilityScore, getScoreCategory } from '../utils/calculations.js';

export function computeFootprint(input: CarbonInput) {
  const result = calculateCarbonFootprint(input);
  const weeklyTotal = result.total / 4.33;
  const score = calculateSustainabilityScore(result.total, weeklyTotal);
  const scoreCategory = getScoreCategory(score);

  return {
    result,
    sustainabilityScore: score,
    scoreCategory: scoreCategory.category,
    weeklyTotal,
  };
}

export function generateEmissionFactors() {
  return {
    transportation: {
      car: 0.21,
      bike: 0,
      bus: 0.089,
      train: 0.041,
      unit: 'kg CO₂ per km',
    },
    energy: {
      electricity: 0.527,
      ac: 0.65,
      unit: 'kg CO₂ per hour',
    },
    food: {
      vegetarian: 1.5,
      nonVegetarian: 3.3,
      unit: 'kg CO₂ per meal',
    },
    lifestyle: {
      onlineShopping: 2.5,
      waste: 1.8,
      unit: 'kg CO₂ per activity',
    },
  };
}
