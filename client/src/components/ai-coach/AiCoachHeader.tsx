import React from 'react';
import { RiLeafFill } from 'react-icons/ri';

interface AiCoachHeaderProps {
  onClear: () => void;
}

export const AiCoachHeader: React.FC<AiCoachHeaderProps> = ({ onClear }) => (
  <header className="flex items-center justify-between mb-6 pb-5 border-b border-gray-200">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
        <RiLeafFill size={22} className="text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-slate-800 leading-tight">AI Sustainability Coach</h1>
        <p className="text-sm text-slate-500">Your personal guide to reducing your carbon footprint</p>
      </div>
    </div>
    <button
      onClick={onClear}
      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
      aria-label="Clear chat"
    >
      Clear Chat
    </button>
  </header>
);
