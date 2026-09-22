import React from 'react';

export const LoadingIndicator: React.FC = () => (
  <div className="flex items-center justify-center py-4 text-slate-600">
    <span className="mr-2 animate-pulse">AI Coach is thinking</span>
    <span className="flex space-x-1">
      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
    </span>
  </div>
);
