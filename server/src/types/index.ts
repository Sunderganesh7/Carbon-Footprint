export interface CarbonInput {
  transportation: {
    carDistance: number;
    bikeDistance: number;
    busDistance: number;
    trainDistance: number;
  };
  energy: {
    electricityUsage: number;
    acUsage: number;
  };
  food: {
    vegetarianMeals: number;
    nonVegetarianMeals: number;
  };
  lifestyle: {
    onlineShoppingFrequency: number;
    wasteGeneration: number;
  };
}

export interface CarbonResult {
  transportation: number;
  energy: number;
  food: number;
  lifestyle: number;
  total: number;
}

export interface CarbonData {
  id: string;
  date: string;
  input: CarbonInput;
  result: CarbonResult;
  sustainabilityScore: number;
  weeklyTotal: number;
}

export interface WeeklyData {
  week: string;
  total: number;
  transportation: number;
  energy: number;
  food: number;
  lifestyle: number;
}

export interface MonthlyData {
  month: string;
  total: number;
  transportation: number;
  energy: number;
  food: number;
  lifestyle: number;
}

export interface Recommendation {
  category: string;
  suggestion: string;
  impact: string;
  savings: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  points: number;
  category: string;
  completed: boolean;
  progress: number;
}

export interface CoachMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type ScoreCategory = 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';

export interface SustainabilityScoreResult {
  score: number;
  category: ScoreCategory;
  explanation: string;
}

export interface PlasticInput {
  plasticBags: number;
  plasticBottles: number;
  straws: number;
  packaging: number;
  otherPlastic: number;
}

export interface PlasticResult {
  totalPlasticKg: number;
  co2Equivalent: number;
  recyclablePercent: number;
  oceanBoundPercent: number;
  savings: number;
}

export interface EventInput {
  eventType: 'wedding' | 'conference' | 'party' | 'corporate' | 'other';
  guestCount: number;
  duration: number;
  venueType: 'indoor' | 'outdoor' | 'hybrid';
  cateringType: 'vegetarian' | 'non-vegetarian' | 'mixed' | 'vegan';
  wasteManagement: 'none' | 'basic' | 'recycling' | 'composting' | 'zero-waste';
}

export interface EventResult {
  totalEmissions: number;
  travelEmissions: number;
  cateringEmissions: number;
  energyEmissions: number;
  wasteEmissions: number;
  offsetCost: number;
}

export interface CarbonCreditProject {
  id: string;
  name: string;
  type: 'reforestation' | 'renewable' | 'efficiency' | 'ocean' | 'community';
  description: string;
  pricePerTon: number;
  rating: number;
  location: string;
}

export interface HotspotCategory {
  name: string;
  value: number;
  percentage: number;
}

export interface PersonalizedReductionPlan {
  highestCategory: HotspotCategory;
  categorySavings: number;
  totalFootprint: number;
  reductionPercent: number;
  recommendations: Recommendation[];
}
