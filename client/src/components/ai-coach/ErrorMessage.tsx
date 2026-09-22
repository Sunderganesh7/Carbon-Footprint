import React from 'react';

interface ErrorMessageProps {
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ onRetry }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
    <p className="mb-2 font-medium">Something went wrong</p>
    <p className="mb-2 text-sm">We couldn't generate a response right now.</p>
    <button
      onClick={onRetry}
      className="mt-2 rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200"
    >
      Try Again
    </button>
  </div>
);
