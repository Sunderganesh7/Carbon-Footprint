import type { Challenge } from '../../types';

interface ChallengeProgressProps {
  challenges: Challenge[];
}

export function ChallengeProgress({ challenges }: ChallengeProgressProps) {
  const completed = challenges.filter((c) => c.completed).length;
  const totalPoints = challenges
    .filter((c) => c.completed)
    .reduce((sum, c) => sum + c.points, 0);
  const totalAvailable = challenges.reduce((sum, c) => sum + c.points, 0);
  const percentage = totalAvailable > 0 ? Math.round((totalPoints / totalAvailable) * 100) : 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Overall Progress
      </h3>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-600">
            {completed}/{challenges.length}
          </p>
          <p className="text-xs text-slate-400">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{totalPoints}</p>
          <p className="text-xs text-slate-400">Points Earned</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">{percentage}%</p>
          <p className="text-xs text-slate-400">Overall</p>
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
