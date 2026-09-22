import { describe, it, expect } from 'vitest';
import {
  calculateCarbonFootprint,
  calculateSustainabilityScore,
} from '../utils/calculations';
import type { CarbonInput } from '../types';

const sampleInput: CarbonInput = {
  transportation: {
    carDistance: 20,
    bikeDistance: 5,
    busDistance: 10,
    trainDistance: 0,
  },
  energy: {
    electricityUsage: 400,
    acUsage: 4,
  },
  food: {
    vegetarianMeals: 7,
    nonVegetarianMeals: 14,
  },
  lifestyle: {
    onlineShoppingFrequency: 3,
    wasteGeneration: 2,
  },
};

describe('Carbon Calculator', () => {
  it('should calculate transportation emissions correctly (daily -> monthly)', () => {
    const result = calculateCarbonFootprint(sampleInput);
    const daily = 20 * 0.21 + 5 * 0 + 10 * 0.089 + 0 * 0.041;
    expect(result.transportation).toBeCloseTo(daily * 30, 2);
  });

  it('should calculate energy emissions correctly', () => {
    const result = calculateCarbonFootprint(sampleInput);
    expect(result.energy).toBeCloseTo(400 * 0.527 + 4 * 0.65, 2);
  });

  it('should calculate food emissions correctly (weekly -> monthly)', () => {
    const result = calculateCarbonFootprint(sampleInput);
    const weekly = 7 * 1.5 + 14 * 3.3;
    expect(result.food).toBeCloseTo(weekly * 4.33, 2);
  });

  it('should calculate lifestyle emissions correctly (waste weekly -> monthly)', () => {
    const result = calculateCarbonFootprint(sampleInput);
    expect(result.lifestyle).toBeCloseTo(3 * 2.5 + 2 * 1.8 * 4.33, 2);
  });

  it('should calculate total emissions', () => {
    const result = calculateCarbonFootprint(sampleInput);
    const expectedTotal =
      result.transportation + result.energy + result.food + result.lifestyle;
    expect(result.total).toBeCloseTo(expectedTotal, 2);
  });

  it('should return zero for all-zero input', () => {
    const zeroInput: CarbonInput = {
      transportation: { carDistance: 0, bikeDistance: 0, busDistance: 0, trainDistance: 0 },
      energy: { electricityUsage: 0, acUsage: 0 },
      food: { vegetarianMeals: 0, nonVegetarianMeals: 0 },
      lifestyle: { onlineShoppingFrequency: 0, wasteGeneration: 0 },
    };
    const result = calculateCarbonFootprint(zeroInput);
    expect(result.total).toBe(0);
    expect(result.transportation).toBe(0);
    expect(result.energy).toBe(0);
    expect(result.food).toBe(0);
    expect(result.lifestyle).toBe(0);
  });
});

describe('Sustainability Score', () => {
  it('should return 100 for zero emissions', () => {
    const score = calculateSustainabilityScore(0, 0);
    expect(score).toBe(100);
  });

  it('should return lower score for higher emissions', () => {
    const highScore = calculateSustainabilityScore(0, 0);
    const lowScore = calculateSustainabilityScore(500, 125);
    expect(highScore).toBeGreaterThan(lowScore);
  });

  it('should clamp score between 0 and 100', () => {
    const veryHigh = calculateSustainabilityScore(5000, 1250);
    expect(veryHigh).toBeGreaterThanOrEqual(0);
    expect(veryHigh).toBeLessThanOrEqual(100);
  });
});
