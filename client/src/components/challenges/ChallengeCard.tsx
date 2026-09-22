import type { Challenge } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

interface ChallengeCardProps {
  challenge: Challenge;
  onUpdate: (id: string, completed: boolean, progress: number) => void;
}

export function ChallengeCard({ challenge, onUpdate }: ChallengeCardProps) {
  const categoryColors: Record<string, 'info' | 'warning' | 'success' | 'danger'> = {
    Transportation: 'info',
    Energy: 'warning',
    Food: 'success',
    Lifestyle: 'danger',
  };

  return (
    <Card
      className={`transition-all ${
        challenge.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-800">
              {challenge.title}
            </h3>
            <Badge variant={categoryColors[challenge.category] || 'default'}>
              {challenge.category}
            </Badge>
          </div>
          <p className="mb-3 text-sm text-slate-500">
            {challenge.description}
          </p>
          <div className="mb-3 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {challenge.duration}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {challenge.points} pts
            </span>
          </div>
          <ProgressBar
            value={challenge.progress}
            color={challenge.completed ? '#10b981' : '#3b82f6'}
            size="sm"
          />
        </div>
        <button
          onClick={() =>
            onUpdate(
              challenge.id,
              !challenge.completed,
              challenge.completed ? 0 : 100,
            )
          }
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onUpdate(challenge.id, !challenge.completed, challenge.completed ? 0 : 100); } }}
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
            challenge.completed
              ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
              : 'border-slate-300 text-slate-400 hover:border-emerald-400 hover:text-emerald-500'
          }`}
          aria-label={
            challenge.completed
              ? `Mark ${challenge.title} as incomplete`
              : `Mark ${challenge.title} as complete`
          }
          tabIndex={0}
          role="switch"
          aria-checked={challenge.completed}
        >
          {challenge.completed ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          )}
        </button>
      </div>
    </Card>
  );
}
