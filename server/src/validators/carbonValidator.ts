import { z } from 'zod';

export const carbonInputSchema = z.object({
  transportation: z.object({
    carDistance: z.number().min(0).max(500),
    bikeDistance: z.number().min(0).max(500),
    busDistance: z.number().min(0).max(500),
    trainDistance: z.number().min(0).max(500),
  }),
  energy: z.object({
    electricityUsage: z.number().min(0).max(10000),
    acUsage: z.number().min(0).max(720),
  }),
  food: z.object({
    vegetarianMeals: z.number().min(0).max(21),
    nonVegetarianMeals: z.number().min(0).max(21),
  }),
  lifestyle: z.object({
    onlineShoppingFrequency: z.number().min(0).max(50),
    wasteGeneration: z.number().min(0).max(50),
  }),
});

export const chatMessageSchema = z.object({
  message: z.string().min(1).max(1000),
  carbonData: carbonInputSchema.optional(),
});

export const challengeUpdateSchema = z.object({
  challengeId: z.string().min(1),
  completed: z.boolean(),
  progress: z.number().min(0).max(100),
});
