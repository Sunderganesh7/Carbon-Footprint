import { useState, useEffect, useCallback } from 'react';
import type { Challenge } from '../types';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { ChallengeProgress } from '../components/challenges/ChallengeProgress';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { getChallenges, updateChallenge, resetChallenges } from '../services/api';

export function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      setIsLoading(true);
      const data = await getChallenges();
      setChallenges(data.challenges);
      setError(null);
    } catch {
      setError('Failed to load challenges. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = useCallback(
    async (id: string, completed: boolean, progress: number) => {
      try {
        const { challenge } = await updateChallenge(id, completed, progress);
        setChallenges((prev) =>
          prev.map((c) => (c.id === id ? challenge : c)),
        );
      } catch {
        setError('Failed to update challenge.');
      }
    },
    [],
  );

  const handleReset = async () => {
    try {
      const data = await resetChallenges();
      setChallenges(data.challenges);
    } catch {
      setError('Failed to reset challenges.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Eco Challenges
          </h1>
          <p className="text-slate-500">
            Take on challenges to build sustainable habits and earn points.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset All
        </Button>
      </div>

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <p className="text-sm text-red-600">{error}</p>
        </Card>
      )}

      <div className="mb-8">
        <ChallengeProgress challenges={challenges} />
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
