import { Router, Request, Response } from 'express';
import { carbonInputSchema } from '../validators/carbonValidator.js';
import { computeFootprint, generateEmissionFactors } from '../services/carbonService.js';

const router = Router();

router.post('/calculate', (req: Request, res: Response) => {
  const parsed = carbonInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: 'Validation failed',
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const data = computeFootprint(parsed.data);
  res.json(data);
});

router.get('/factors', (_req: Request, res: Response) => {
  const factors = generateEmissionFactors();
  res.json(factors);
});

export default router;
