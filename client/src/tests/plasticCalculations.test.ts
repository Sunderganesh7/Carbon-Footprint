import { describe, it, expect } from 'vitest';
import {
  calculatePlasticFootprint,
  generatePlasticAlternatives,
  calculatePlasticSavings,
} from '../utils/plasticCalculations';
import type { PlasticInput } from '../types';

describe('calculatePlasticFootprint', () => {
  it('returns zero for all-zero input', () => {
    const input: PlasticInput = {
      plasticBags: 0, plasticBottles: 0, straws: 0, packaging: 0, otherPlastic: 0,
    };
    const result = calculatePlasticFootprint(input);
    expect(result.totalPlasticKg).toBe(0);
    expect(result.co2Equivalent).toBe(0);
    expect(result.recyclablePercent).toBe(0);
    expect(result.oceanBoundPercent).toBe(0);
  });

  it('calculates correct values for moderate usage', () => {
    const input: PlasticInput = {
      plasticBags: 5, plasticBottles: 3, straws: 4, packaging: 6, otherPlastic: 2,
    };
    const result = calculatePlasticFootprint(input);
    expect(result.totalPlasticKg).toBeCloseTo(0.264, 3);
    expect(result.co2Equivalent).toBeCloseTo(0.792, 3);
  });

  it('calculates recyclable percent correctly', () => {
    const input: PlasticInput = {
      plasticBags: 0, plasticBottles: 10, straws: 0, packaging: 10, otherPlastic: 0,
    };
    const result = calculatePlasticFootprint(input);
    expect(result.recyclablePercent).toBe(90);
    expect(result.oceanBoundPercent).toBe(0);
  });

  it('caps recyclablePercent at 90', () => {
    const input: PlasticInput = {
      plasticBags: 0, plasticBottles: 100, straws: 0, packaging: 100, otherPlastic: 0,
    };
    const result = calculatePlasticFootprint(input);
    expect(result.recyclablePercent).toBe(90);
  });

  it('calculates ocean-bound percent for non-recyclable items', () => {
    const input: PlasticInput = {
      plasticBags: 10, plasticBottles: 0, straws: 10, packaging: 0, otherPlastic: 10,
    };
    const result = calculatePlasticFootprint(input);
    expect(result.oceanBoundPercent).toBe(100);
  });

  it('provides savings estimate', () => {
    const input: PlasticInput = {
      plasticBags: 10, plasticBottles: 10, straws: 10, packaging: 10, otherPlastic: 10,
    };
    const result = calculatePlasticFootprint(input);
    expect(result.savings).toBeGreaterThan(0);
  });
});

describe('generatePlasticAlternatives', () => {
  it('returns alternatives for plasticBags', () => {
    const alts = generatePlasticAlternatives('plasticBags');
    expect(alts).toContain('Cloth bags');
    expect(alts).toContain('Jute bags');
  });

  it('returns alternatives for plasticBottles', () => {
    const alts = generatePlasticAlternatives('plasticBottles');
    expect(alts).toContain('Steel bottles');
  });

  it('returns fallback for unknown category', () => {
    const alts = generatePlasticAlternatives('unknown');
    expect(alts).toContain('Seek reusable alternatives');
  });
});

describe('calculatePlasticSavings', () => {
  it('returns positive savings when reducing usage', () => {
    const current: PlasticInput = {
      plasticBags: 10, plasticBottles: 10, straws: 10, packaging: 10, otherPlastic: 10,
    };
    const target: PlasticInput = {
      plasticBags: 2, plasticBottles: 2, straws: 2, packaging: 2, otherPlastic: 2,
    };
    const savings = calculatePlasticSavings(current, target);
    expect(savings).toBeGreaterThan(0);
  });

  it('returns zero when no change', () => {
    const input: PlasticInput = {
      plasticBags: 5, plasticBottles: 3, straws: 4, packaging: 6, otherPlastic: 2,
    };
    const savings = calculatePlasticSavings(input, input);
    expect(savings).toBe(0);
  });
});
