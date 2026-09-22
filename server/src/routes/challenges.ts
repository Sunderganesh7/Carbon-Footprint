import { Router, Request, Response } from 'express';
import { challengeUpdateSchema } from '../validators/carbonValidator.js';
import { getChallenges, updateChallenge, resetChallenges } from '../services/challengeService.js';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const challenges = getChallenges();
  res.json({ challenges });
});

router.post('/update', (req: Request, res: Response) => {
  const parsed = challengeUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: 'Validation failed',
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { challengeId, completed, progress } = parsed.data;
  const updated = updateChallenge(challengeId, completed, progress);

  if (!updated) {
    res.status(404).json({ error: 'Challenge not found' });
    return;
  }

  res.json({ challenge: updated });
});

router.post('/reset', (_req: Request, res: Response) => {
  const challenges = resetChallenges();
  res.json({ challenges });
});

export default router;
