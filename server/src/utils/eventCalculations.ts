import type { EventInput, EventResult } from '../types/index.js';

const EVENT_FACTORS = {
  travel: { indoor: 2.5, outdoor: 1.8, hybrid: 3.2 },
  catering: { vegetarian: 3.2, 'non-vegetarian': 7.8, mixed: 5.5, vegan: 2.1 },
  energy: { indoor: 5.0, outdoor: 1.5, hybrid: 3.5 },
  waste: { none: 2.0, basic: 1.5, recycling: 0.8, composting: 0.4, 'zero-waste': 0.1 },
} as const;

const EVENT_WEIGHT: Record<string, number> = {
  wedding: 1.3, conference: 0.8, party: 1.1, corporate: 0.9, other: 1.0,
};

export function calculateEventFootprint(input: EventInput): EventResult {
  const weight = EVENT_WEIGHT[input.eventType] || 1.0;
  const travelEmissions = input.guestCount * input.duration * EVENT_FACTORS.travel[input.venueType] * weight;
  const cateringEmissions = input.guestCount * EVENT_FACTORS.catering[input.cateringType] * weight;
  const energyEmissions = (input.guestCount / 10) * input.duration * EVENT_FACTORS.energy[input.venueType] * weight;
  const wasteEmissions = input.guestCount * EVENT_FACTORS.waste[input.wasteManagement] * weight;
  const totalEmissions = travelEmissions + cateringEmissions + energyEmissions + wasteEmissions;
  const offsetCost = totalEmissions * 0.015;
  return { totalEmissions, travelEmissions, cateringEmissions, energyEmissions, wasteEmissions, offsetCost };
}
