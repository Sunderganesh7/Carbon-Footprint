import type { CarbonInput, FootprintResponse, Challenge } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export function calculateFootprint(input: CarbonInput): Promise<FootprintResponse> {
  return request<FootprintResponse>('/carbon/calculate', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function getEmissionFactors() {
  return request('/carbon/factors');
}

export function sendChatMessage(
  message: string,
  carbonData?: CarbonInput,
): Promise<{ message: string; timestamp: string }> {
  return request('/coach/chat', {
    method: 'POST',
    body: JSON.stringify({ message, carbonData }),
  });
}

export function getChallenges(): Promise<{ challenges: Challenge[] }> {
  return request('/challenges');
}

export function updateChallenge(
  challengeId: string,
  completed: boolean,
  progress: number,
): Promise<{ challenge: Challenge }> {
  return request('/challenges/update', {
    method: 'POST',
    body: JSON.stringify({ challengeId, completed, progress }),
  });
}

export function resetChallenges(): Promise<{ challenges: Challenge[] }> {
  return request('/challenges/reset', { method: 'POST' });
}
