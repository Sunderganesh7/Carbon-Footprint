import { describe, it, expect } from 'vitest';
import { getScoreCategory, getScoreExplanation } from '../utils/sustainabilityScore';

describe('Sustainability Score Utilities', () => {
  describe('getScoreCategory', () => {
    it('should return Excellent for score >= 80', () => {
      const result = getScoreCategory(85);
      expect(result.category).toBe('Excellent');
    });

    it('should return Good for score >= 60', () => {
      const result = getScoreCategory(65);
      expect(result.category).toBe('Good');
    });

    it('should return Average for score >= 40', () => {
      const result = getScoreCategory(45);
      expect(result.category).toBe('Average');
    });

    it('should return Needs Improvement for score < 40', () => {
      const result = getScoreCategory(20);
      expect(result.category).toBe('Needs Improvement');
    });

    it('should return a color string', () => {
      const result = getScoreCategory(85);
      expect(typeof result.color).toBe('string');
      expect(result.color).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('should return a description string', () => {
      const result = getScoreCategory(85);
      expect(typeof result.description).toBe('string');
      expect(result.description.length).toBeGreaterThan(0);
    });
  });

  describe('getScoreExplanation', () => {
    it('should return a string containing the score', () => {
      const explanation = getScoreExplanation(75);
      expect(explanation).toContain('75');
    });

    it('should explain the calculation method', () => {
      const explanation = getScoreExplanation(50);
      expect(explanation).toContain('Indian average (167 kg)');
      expect(explanation).toContain('global average (250 kg)');
      expect(explanation).toContain('sustainable target (83 kg)');
    });
  });
});
