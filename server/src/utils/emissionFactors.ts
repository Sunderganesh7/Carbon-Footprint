export const EMISSION_FACTORS = {
  transportation: {
    car: 0.21,
    bike: 0,
    bus: 0.089,
    train: 0.041,
  },
  energy: {
    electricity: 0.527,
    ac: 0.65,
  },
  food: {
    vegetarian: 1.5,
    nonVegetarian: 3.3,
  },
  lifestyle: {
    onlineShopping: 2.5,
    waste: 1.8,
  },
} as const;

export function getEmissionFactor(
  category: keyof typeof EMISSION_FACTORS,
  subCategory: string,
): number {
  const factors = EMISSION_FACTORS[category];
  if (factors && typeof factors === 'object' && subCategory in factors) {
    return (factors as Record<string, number>)[subCategory];
  }
  return 0;
}
