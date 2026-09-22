export function formatEmissions(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(2)} tonnes`;
  }
  return `${kg.toFixed(1)} kg`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatWeek(date: Date): string {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return `${start.getDate()}-${end.getDate()} ${start.toLocaleString('en-US', { month: 'short' })}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
