import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import carbonRoutes from './routes/carbon.js';
import coachRoutes from './routes/coach.js';
import challengeRoutes from './routes/challenges.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://carbonwise-ai-ashy.vercel.app',
  'https://carbonwise-ai-git-main-harsh160311s-projects.vercel.app',
  'http://localhost:5173',
].filter(Boolean) as string[];

app.use(cors({
  origin: allowedOrigins,
}));
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

app.use('/api/carbon', carbonRoutes);
app.use('/api/coach', coachRoutes);
app.use('/api/challenges', challengeRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`CarbonWise AI server running on port ${PORT}`);
});

export default app;
