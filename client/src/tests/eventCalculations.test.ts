import { describe, it, expect } from 'vitest';
import {
  calculateEventFootprint,
  getEcoVendors,
  getVenueSuggestions,
} from '../utils/eventCalculations';
import type { EventInput } from '../types';

describe('calculateEventFootprint', () => {
  it('calculates emissions for a small party', () => {
    const input: EventInput = {
      eventType: 'party', guestCount: 20, duration: 3, venueType: 'outdoor', cateringType: 'vegetarian', wasteManagement: 'recycling',
    };
    const result = calculateEventFootprint(input);
    expect(result.totalEmissions).toBeGreaterThan(0);
    expect(result.travelEmissions).toBeGreaterThan(0);
    expect(result.cateringEmissions).toBeGreaterThan(0);
    expect(result.energyEmissions).toBeGreaterThan(0);
    expect(result.wasteEmissions).toBeGreaterThan(0);
    expect(result.offsetCost).toBeGreaterThan(0);
  });

  it('returns higher emissions for non-vegetarian catering', () => {
    const base: EventInput = {
      eventType: 'party', guestCount: 50, duration: 4, venueType: 'indoor', cateringType: 'vegetarian', wasteManagement: 'basic',
    };
    const nonVeg: EventInput = { ...base, cateringType: 'non-vegetarian' };
    const vegResult = calculateEventFootprint(base);
    const meatResult = calculateEventFootprint(nonVeg);
    expect(meatResult.totalEmissions).toBeGreaterThan(vegResult.totalEmissions);
  });

  it('wedding has higher weight than conference', () => {
    const wedding: EventInput = {
      eventType: 'wedding', guestCount: 100, duration: 6, venueType: 'indoor', cateringType: 'mixed', wasteManagement: 'basic',
    };
    const conference: EventInput = { ...wedding, eventType: 'conference' };
    const weddingResult = calculateEventFootprint(wedding);
    const conferenceResult = calculateEventFootprint(conference);
    expect(weddingResult.totalEmissions).toBeGreaterThan(conferenceResult.totalEmissions);
  });

  it('zero-waste management produces lowest waste emissions', () => {
    const base: EventInput = {
      eventType: 'party', guestCount: 50, duration: 4, venueType: 'indoor', cateringType: 'mixed', wasteManagement: 'none',
    };
    const zeroWaste: EventInput = { ...base, wasteManagement: 'zero-waste' };
    const noneResult = calculateEventFootprint(base);
    const zeroResult = calculateEventFootprint(zeroWaste);
    expect(zeroResult.wasteEmissions).toBeLessThan(noneResult.wasteEmissions);
  });
});

describe('getEcoVendors', () => {
  it('returns list of vendors', () => {
    const vendors = getEcoVendors();
    expect(vendors.length).toBeGreaterThan(0);
    expect(vendors[0]).toHaveProperty('name');
    expect(vendors[0]).toHaveProperty('category');
    expect(vendors[0]).toHaveProperty('rating');
  });

  it('all vendors have rating between 1 and 5', () => {
    const vendors = getEcoVendors();
    vendors.forEach((v) => {
      expect(v.rating).toBeGreaterThanOrEqual(1);
      expect(v.rating).toBeLessThanOrEqual(5);
    });
  });
});

describe('getVenueSuggestions', () => {
  it('returns suggestions for wedding', () => {
    const suggestions = getVenueSuggestions('wedding');
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0]).toContain('garden');
  });

  it('returns suggestions for conference', () => {
    const suggestions = getVenueSuggestions('conference');
    expect(suggestions.length).toBeGreaterThan(0);
  });

  it('returns fallback for unknown event type', () => {
    const suggestions = getVenueSuggestions('unknown');
    expect(suggestions.length).toBeGreaterThan(0);
  });
});
