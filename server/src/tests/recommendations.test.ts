import { describe, it, expect } from 'vitest';
import { generateRecommendations } from '../services/coachService.js';
import type { CarbonInput } from '../types/index.js';

describe('Recommendation Engine', () => {
  it('should generate transport recommendations for high car usage', () => {
    const input: CarbonInput = {
      transportation: { carDistance: 50, bikeDistance: 0, busDistance: 0, trainDistance: 0 },
      energy: { electricityUsage: 200, acUsage: 2 },
      food: { vegetarianMeals: 7, nonVegetarianMeals: 7 },
      lifestyle: { onlineShoppingFrequency: 1, wasteGeneration: 1 },
    };
    const recs = generateRecommendations(input);
    const transportRecs = recs.filter((r) => r.category === 'Transportation');
    expect(transportRecs.length).toBeGreaterThan(0);
  });

  it('should generate energy recommendations for high electricity usage', () => {
    const input: CarbonInput = {
      transportation: { carDistance: 10, bikeDistance: 0, busDistance: 0, trainDistance: 0 },
      energy: { electricityUsage: 2000, acUsage: 8 },
      food: { vegetarianMeals: 7, nonVegetarianMeals: 7 },
      lifestyle: { onlineShoppingFrequency: 1, wasteGeneration: 1 },
    };
    const recs = generateRecommendations(input);
    const energyRecs = recs.filter((r) => r.category === 'Energy');
    expect(energyRecs.length).toBeGreaterThan(0);
  });

  it('should generate food recommendations for high meat consumption', () => {
    const input: CarbonInput = {
      transportation: { carDistance: 10, bikeDistance: 0, busDistance: 0, trainDistance: 0 },
      energy: { electricityUsage: 200, acUsage: 2 },
      food: { vegetarianMeals: 2, nonVegetarianMeals: 19 },
      lifestyle: { onlineShoppingFrequency: 1, wasteGeneration: 1 },
    };
    const recs = generateRecommendations(input);
    const foodRecs = recs.filter((r) => r.category === 'Food');
    expect(foodRecs.length).toBeGreaterThan(0);
  });

  it('should generate lifestyle recommendations for high shopping', () => {
    const input: CarbonInput = {
      transportation: { carDistance: 10, bikeDistance: 0, busDistance: 0, trainDistance: 0 },
      energy: { electricityUsage: 200, acUsage: 2 },
      food: { vegetarianMeals: 7, nonVegetarianMeals: 7 },
      lifestyle: { onlineShoppingFrequency: 10, wasteGeneration: 5 },
    };
    const recs = generateRecommendations(input);
    const lifestyleRecs = recs.filter((r) => r.category === 'Lifestyle');
    expect(lifestyleRecs.length).toBeGreaterThan(0);
  });

  it('should return empty for very low impact input', () => {
    const input: CarbonInput = {
      transportation: { carDistance: 0, bikeDistance: 10, busDistance: 0, trainDistance: 0 },
      energy: { electricityUsage: 50, acUsage: 0 },
      food: { vegetarianMeals: 21, nonVegetarianMeals: 0 },
      lifestyle: { onlineShoppingFrequency: 0, wasteGeneration: 0 },
    };
    const recs = generateRecommendations(input);
    expect(recs.length).toBe(0);
  });
});
