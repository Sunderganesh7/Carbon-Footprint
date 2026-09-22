import React from 'react';

type ImpactLevel = 'Low' | 'Medium' | 'High' | 'Very High';

interface RecommendationCardProps {
  title: string;
  description: string;
  impact?: ImpactLevel;
  // savings is optional and if present is an estimate
  savings?: number; // e.g., kg CO2e per month
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ title, description, impact, savings }) => (
  <div className="my-4 p-4 border border-emerald-200 rounded-md shadow-sm bg-emerald-50">
    <h3 className="text-lg font-semibold text-emerald-800 mb-1 flex items-center">
      <span className="mr-2">⚡</span>
      {title}
    </h3>
    <p className="text-sm text-gray-700 mb-2">{description}</p>
    {impact && (
      <p className="text-sm font-medium text-emerald-700">Impact: {impact}</p>
    )}
    {typeof savings === 'number' && (
      <p className="text-sm text-emerald-600">
        Estimated saving: {savings.toFixed(1)} kg CO₂e/month
      </p>
    )}
  </div>
);
