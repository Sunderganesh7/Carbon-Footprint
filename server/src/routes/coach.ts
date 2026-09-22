import { Router, Request, Response } from 'express';
import { chatMessageSchema } from '../validators/carbonValidator.js';
import { generateCoachResponse } from '../services/coachService.js';

const router = Router();

let userRequestCount = 0;

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const parsed = chatMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    userRequestCount++;
    console.log(`[AI Coach] User request #${userRequestCount}`);

    const { message, carbonData } = parsed.data;
    const response = await generateCoachResponse(message, carbonData);

    res.json({
      message: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Coach error:', error);
    const errorMessage = error instanceof Error && error.message.startsWith('AI Coach Error')
      ? error.message
      : 'Failed to generate response';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
