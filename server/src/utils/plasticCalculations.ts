import type { PlasticInput, PlasticResult } from '../types/index.js';

const PLASTIC_FACTORS = {
  plasticBags: { kgPerUnit: 0.008, co2PerUnit: 0.024 },
  plasticBottles: { kgPerUnit: 0.012, co2PerUnit: 0.036 },
  straws: { kgPerUnit: 0.002, co2PerUnit: 0.006 },
  packaging: { kgPerUnit: 0.025, co2PerUnit: 0.075 },
  otherPlastic: { kgPerUnit: 0.015, co2PerUnit: 0.045 },
} as const;

export function calculatePlasticFootprint(input: PlasticInput): PlasticResult {
  const totalPlasticKg =
    input.plasticBags * PLASTIC_FACTORS.plasticBags.kgPerUnit +
    input.plasticBottles * PLASTIC_FACTORS.plasticBottles.kgPerUnit +
    input.straws * PLASTIC_FACTORS.straws.kgPerUnit +
    input.packaging * PLASTIC_FACTORS.packaging.kgPerUnit +
    input.otherPlastic * PLASTIC_FACTORS.otherPlastic.kgPerUnit;

  const co2Equivalent =
    input.plasticBags * PLASTIC_FACTORS.plasticBags.co2PerUnit +
    input.plasticBottles * PLASTIC_FACTORS.plasticBottles.co2PerUnit +
    input.straws * PLASTIC_FACTORS.straws.co2PerUnit +
    input.packaging * PLASTIC_FACTORS.packaging.co2PerUnit +
    input.otherPlastic * PLASTIC_FACTORS.otherPlastic.co2PerUnit;

  const totalItems = input.plasticBags + input.plasticBottles + input.straws + input.packaging + input.otherPlastic;
  const recyclablePercent = Math.min(90, ((input.plasticBottles + input.packaging) / Math.max(1, totalItems)) * 100);
  const oceanBoundPercent = Math.min(100, ((input.plasticBags + input.straws + input.otherPlastic) / Math.max(1, totalItems)) * 100);
  const savings = recyclablePercent > 50 ? totalPlasticKg * 0.6 * 3 : totalPlasticKg * 0.3 * 3;

  return { totalPlasticKg, co2Equivalent, recyclablePercent, oceanBoundPercent, savings };
}
