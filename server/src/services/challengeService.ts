import { Challenge } from '../types/index.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', '..', 'data');
const DATA_FILE = join(DATA_DIR, 'challenges.json');

const defaultChallenges: Challenge[] = [
  {
    id: 'public-transport-week',
    title: 'Public Transport Week',
    description:
      'Use only public transportation for an entire week. No private car trips!',
    duration: '7 days',
    points: 500,
    category: 'Transportation',
    completed: false,
    progress: 0,
  },
  {
    id: 'no-car-day',
    title: 'No Car Day',
    description:
      'Go completely car-free for one day. Walk, bike, or use public transit instead.',
    duration: '1 day',
    points: 100,
    category: 'Transportation',
    completed: false,
    progress: 0,
  },
  {
    id: 'save-electricity',
    title: 'Save Electricity',
    description:
      'Reduce your daily electricity consumption by 20%. Turn off unused lights and appliances.',
    duration: '7 days',
    points: 300,
    category: 'Energy',
    completed: false,
    progress: 0,
  },
  {
    id: 'green-shopping',
    title: 'Green Shopping Challenge',
    description:
      'Avoid online shopping for a full week. Buy locally and only what you truly need.',
    duration: '7 days',
    points: 200,
    category: 'Lifestyle',
    completed: false,
    progress: 0,
  },
  {
    id: 'plant-based-week',
    title: 'Plant-Based Week',
    description:
      'Eat only plant-based meals for one week. No meat or dairy products.',
    duration: '7 days',
    points: 400,
    category: 'Food',
    completed: false,
    progress: 0,
  },
  {
    id: 'bike-commute',
    title: 'Bike Commute Challenge',
    description:
      'Commute by bicycle for at least 3 days this week instead of using a motor vehicle.',
    duration: '7 days',
    points: 250,
    category: 'Transportation',
    completed: false,
    progress: 0,
  },
  {
    id: 'solar-switch',
    title: 'Solar Switch Challenge',
    description:
      'Use solar-powered chargers for all your devices for one week. No grid charging allowed!',
    duration: '7 days',
    points: 350,
    category: 'Energy',
    completed: false,
    progress: 0,
  },
  {
    id: 'zero-waste-week',
    title: 'Zero Waste Week',
    description:
      'Produce zero landfill waste for an entire week. Compost, recycle, and refuse single-use items.',
    duration: '7 days',
    points: 450,
    category: 'Lifestyle',
    completed: false,
    progress: 0,
  },
  {
    id: 'local-food-challenge',
    title: 'Local Food Challenge',
    description:
      'Eat only locally-sourced food for one week. Nothing that traveled more than 100 km!',
    duration: '7 days',
    points: 350,
    category: 'Food',
    completed: false,
    progress: 0,
  },
  {
    id: 'cold-water-wash',
    title: 'Cold Water Wash',
    description:
      'Wash all your clothes in cold water for 2 weeks. Hot water washing uses 10x more energy.',
    duration: '14 days',
    points: 200,
    category: 'Energy',
    completed: false,
    progress: 0,
  },
  {
    id: 'carpool-week',
    title: 'Carpool Week',
    description:
      'Share rides with colleagues or friends for at least 5 days. Each shared ride cuts emissions by 50%.',
    duration: '7 days',
    points: 300,
    category: 'Transportation',
    completed: false,
    progress: 0,
  },
  {
    id: 'meat-free-month',
    title: 'Meat-Free Month',
    description:
      'Go completely meat-free for 30 days. Plant-based diets have half the carbon footprint.',
    duration: '30 days',
    points: 1000,
    category: 'Food',
    completed: false,
    progress: 0,
  },
  {
    id: 'paperless-office',
    title: 'Paperless Office',
    description:
      'Go completely paperless for one week. No printing — use digital notes and documents only.',
    duration: '7 days',
    points: 150,
    category: 'Lifestyle',
    completed: false,
    progress: 0,
  },
  {
    id: 'tree-planting',
    title: 'Tree Planting Drive',
    description:
      'Plant at least 5 trees this month. Each tree absorbs ~21 kg CO₂ per year.',
    duration: '30 days',
    points: 600,
    category: 'Lifestyle',
    completed: false,
    progress: 0,
  },
  {
    id: 'ac-free-week',
    title: 'AC-Free Week',
    description:
      'Survive one week without air conditioning. Use fans and natural ventilation instead.',
    duration: '7 days',
    points: 400,
    category: 'Energy',
    completed: false,
    progress: 0,
  },
];

function loadChallenges(): Challenge[] {
  try {
    if (existsSync(DATA_FILE)) {
      const raw = readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load challenges:', err);
  }
  return [];
}

function saveChallenges(data: Challenge[]): void {
  try {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save challenges:', err);
  }
}

function getChallengesInternal(): Challenge[] {
  const saved = loadChallenges();
  if (saved.length === defaultChallenges.length) {
    const needsUpdate = saved.some((s, i) => s.id !== defaultChallenges[i].id);
    if (!needsUpdate) return saved;
  }
  saveChallenges(defaultChallenges);
  return [...defaultChallenges];
}

export function getChallenges(): Challenge[] {
  return getChallengesInternal();
}

export function updateChallenge(
  challengeId: string,
  completed: boolean,
  progress: number,
): Challenge | null {
  const challenges = getChallengesInternal();
  const index = challenges.findIndex((c) => c.id === challengeId);
  if (index === -1) return null;

  challenges[index] = {
    ...challenges[index],
    completed,
    progress: Math.min(100, Math.max(0, progress)),
  };

  saveChallenges(challenges);
  return challenges[index];
}

export function resetChallenges(): Challenge[] {
  saveChallenges(defaultChallenges);
  return [...defaultChallenges];
}
