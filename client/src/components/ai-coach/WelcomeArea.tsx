import React from 'react';

interface QuickPromptChipProps {
  label: string;
  onClick: (label: string) => void;
  disabled?: boolean;
}

const QuickPromptChip: React.FC<QuickPromptChipProps> = ({ label, onClick, disabled }) => (
  <button
    type="button"
    className={`flex-shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-colors shadow-sm ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) onClick(label);
    }}
    disabled={disabled}
    aria-label={`Quick prompt: ${label}`}
  >
    {label}
  </button>
);

interface WelcomeAreaProps {
  prompts: string[];
  onPrompt: (prompt: string) => void;
  disabled?: boolean;
}

export const WelcomeArea: React.FC<WelcomeAreaProps> = ({ prompts, onPrompt, disabled }) => (
  <section className="mb-8">
    {/* Hero */}
    <div className="text-center py-8">
      <div className="text-6xl mb-4">🌱</div>
      <h2 className="text-3xl font-bold text-slate-800 mb-3">Meet Your Sustainability Coach</h2>
      <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
        Understand your carbon footprint, discover your biggest impact areas, and get practical steps to reduce your emissions.
      </p>
    </div>

    {/* Feature cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { emoji: '🌍', title: 'Understand My Footprint', desc: 'Identify your biggest emission sources.' },
        { emoji: '📉', title: 'Reduce My Impact', desc: 'Get personalized carbon reduction actions.' },
        { emoji: '🎯', title: 'Sustainability Challenges', desc: 'Build sustainable habits with achievable goals.' },
        { emoji: '💡', title: 'Ask Anything', desc: 'Ask about energy, travel, food, waste and sustainability.' },
      ].map(({ emoji, title, desc }) => (
        <div
          key={title}
          className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-3xl mb-3">{emoji}</div>
          <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
          <p className="text-sm text-slate-500">{desc}</p>
        </div>
      ))}
    </div>

    {/* Quick prompts */}
    <div>
      <p className="text-sm font-medium text-slate-500 mb-3 text-center">Quick prompts to get started:</p>
      <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-1">
        {prompts.map((p) => (
          <QuickPromptChip key={p} label={p} onClick={onPrompt} disabled={disabled} />
        ))}
      </div>
    </div>
  </section>
);

