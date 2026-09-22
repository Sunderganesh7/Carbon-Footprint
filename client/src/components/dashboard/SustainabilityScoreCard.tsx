import { memo } from 'react';
import { getScoreCategory, getScoreExplanation } from '../../utils/sustainabilityScore';

interface SustainabilityScoreCardProps {
  score: number;
}

export const SustainabilityScoreCard = memo(function SustainabilityScoreCard({ score }: SustainabilityScoreCardProps) {
  const { category, color, description } = getScoreCategory(score);
  const explanation = getScoreExplanation(score);

  const badgeVariantColors =
    category === 'Excellent'
      ? 'bg-emerald-100 text-emerald-700'
      : category === 'Good'
        ? 'bg-blue-100 text-blue-700'
        : category === 'Average'
          ? 'bg-amber-100 text-amber-700'
          : 'bg-red-100 text-red-700';

  const strokeColor =
    category === 'Excellent'
      ? '#10b981'
      : category === 'Good'
        ? '#3b82f6'
        : category === 'Average'
          ? '#f59e0b'
          : '#ef4444';

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] h-full flex flex-col relative">
      {/* Decorative leaf top right */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#ecfdf5] flex items-center justify-center text-[#10b981]">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zM9.5 16.5l-4-4 1.414-1.414L9.5 13.672l6.086-6.086L17 9l-7.5 7.5z" clipRule="evenodd"></path></svg>
      </div>

      {/* Header */}
      <div className="flex gap-3 mb-8">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e5fcf1] text-[#059669]">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-slate-900 mb-0.5">
            Sustainability Score
          </h3>
          <p className="text-[13px] text-slate-500 font-light">
            Your overall environmental impact score
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center gap-8">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="fill-none stroke-slate-100"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="fill-none transition-all duration-1000 ease-out"
              strokeWidth="10"
              stroke={strokeColor}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
            {/* Inner aesthetic ring */}
            <circle
              cx="50"
              cy="50"
              r={radius - 8}
              className="fill-none stroke-slate-50"
              strokeWidth="1"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[32px] font-extrabold leading-none" style={{ color: strokeColor }}>
              {score}
            </span>
            <span className="text-[12px] font-medium text-slate-400 mt-1 border-t border-slate-200 pt-1 w-8 text-center">
              100
            </span>
          </div>
        </div>

        {/* Info Right */}
        <div className="flex-1">
          <div className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide mb-3 ${badgeVariantColors}`}>
            {category}
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: strokeColor }}></div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, backgroundColor: strokeColor }}></div>
            </div>
          </div>

          <p className="text-[14px] font-semibold text-slate-700 mb-1.5 leading-snug">
            {description}
          </p>
          <p className="text-[12.5px] text-slate-500 leading-relaxed font-light line-clamp-3">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
});
