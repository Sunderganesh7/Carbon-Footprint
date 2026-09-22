import { CarbonInput, CarbonResult } from '../types/index.js';
import { EMISSION_FACTORS } from './emissionFactors.js';

export function calculateTransportation(input: CarbonInput['transportation']): number {
  const daily =
    input.carDistance * EMISSION_FACTORS.transportation.car +
    input.bikeDistance * EMISSION_FACTORS.transportation.bike +
    input.busDistance * EMISSION_FACTORS.transportation.bus +
    input.trainDistance * EMISSION_FACTORS.transportation.train;
  return daily * 30;
}

export function calculateEnergy(input: CarbonInput['energy']): number {
  return (
    input.electricityUsage * EMISSION_FACTORS.energy.electricity +
    input.acUsage * EMISSION_FACTORS.energy.ac
  );
}

export function calculateFood(input: CarbonInput['food']): number {
  const weekly =
    input.vegetarianMeals * EMISSION_FACTORS.food.vegetarian +
    input.nonVegetarianMeals * EMISSION_FACTORS.food.nonVegetarian;
  return weekly * 4.33;
}

export function calculateLifestyle(input: CarbonInput['lifestyle']): number {
  return (
    input.onlineShoppingFrequency * EMISSION_FACTORS.lifestyle.onlineShopping +
    input.wasteGeneration * EMISSION_FACTORS.lifestyle.waste * 4.33
  );
}

export function calculateCarbonFootprint(input: CarbonInput): CarbonResult {
  const transportation = calculateTransportation(input.transportation);
  const energy = calculateEnergy(input.energy);
  const food = calculateFood(input.food);
  const lifestyle = calculateLifestyle(input.lifestyle);
  const total = transportation + energy + food + lifestyle;

  return { transportation, energy, food, lifestyle, total };
}

export function calculateWeeklyFootprint(dailyResults: CarbonResult[]): number {
  return dailyResults.reduce((sum, day) => sum + day.total, 0);
}

export function calculateMonthlyFootprint(dailyResults: CarbonResult[]): number {
  return dailyResults.reduce((sum, day) => sum + day.total, 0);
}

const INDIAN_AVG_FOOTPRINT = 167;
const GLOBAL_AVG_FOOTPRINT = 250;
const TARGET_FOOTPRINT = 83;

export function calculateSustainabilityScore(
  total: number,
  _weeklyTotal: number,
): number {
  const monthlyScore = Math.max(0, 100 - (total / INDIAN_AVG_FOOTPRINT) * 100);
  const globalScore = Math.max(0, 100 - (total / GLOBAL_AVG_FOOTPRINT) * 100);
  const targetScore = total <= TARGET_FOOTPRINT
    ? 100
    : Math.max(0, 100 - ((total - TARGET_FOOTPRINT) / (GLOBAL_AVG_FOOTPRINT - TARGET_FOOTPRINT)) * 100);

  const score = Math.round(monthlyScore * 0.4 + globalScore * 0.3 + targetScore * 0.3);
  return Math.min(100, Math.max(0, score));
}

export function getScoreBenchmarks(): {
  indianAvg: number;
  globalAvg: number;
  target: number;
  unit: string;
} {
  return {
    indianAvg: INDIAN_AVG_FOOTPRINT,
    globalAvg: GLOBAL_AVG_FOOTPRINT,
    target: TARGET_FOOTPRINT,
    unit: 'kg CO₂/month',
  };
}

export function getScoreCategory(score: number): {
  category: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
  color: string;
} {
  if (score >= 80) return { category: 'Excellent', color: '#10b981' };
  if (score >= 60) return { category: 'Good', color: '#34d399' };
  if (score >= 40) return { category: 'Average', color: '#f59e0b' };
  return { category: 'Needs Improvement', color: '#ef4444' };
}
