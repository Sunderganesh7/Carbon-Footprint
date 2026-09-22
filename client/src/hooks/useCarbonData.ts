import { useCallback, useMemo } from 'react';
import type { CarbonData, CarbonInput, WeeklyData, MonthlyData } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { calculateCarbonFootprint, calculateSustainabilityScore } from '../utils/calculations';
import { generateId } from '../utils/format';

const HISTORY_KEY = 'carbonwise_history';

export function useCarbonData() {
  const [history, setHistory] = useLocalStorage<CarbonData[]>(HISTORY_KEY, []);

  const addEntry = useCallback(
    (input: CarbonInput) => {
      const result = calculateCarbonFootprint(input);
      const weeklyTotal = result.total / 4.33;
      const sustainabilityScore = calculateSustainabilityScore(
        result.total,
        weeklyTotal,
      );

      const entry: CarbonData = {
        id: generateId(),
        date: new Date().toISOString(),
        input,
        result,
        sustainabilityScore,
        weeklyTotal,
      };

      setHistory((prev) => [entry, ...prev]);
      return entry;
    },
    [setHistory],
  );

  const latestEntry = useMemo(
    () => (history.length > 0 ? history[0] : null),
    [history],
  );

  const weeklyData = useMemo((): WeeklyData[] => {
    const weeks = new Map<string, WeeklyData>();
    for (const entry of history) {
      const date = new Date(entry.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];

      if (!weeks.has(weekKey)) {
        weeks.set(weekKey, {
          week: weekKey,
          total: 0,
          transportation: 0,
          energy: 0,
          food: 0,
          lifestyle: 0,
        });
      }
      const week = weeks.get(weekKey)!;
      week.total += entry.result.total;
      week.transportation += entry.result.transportation;
      week.energy += entry.result.energy;
      week.food += entry.result.food;
      week.lifestyle += entry.result.lifestyle;
    }
    return Array.from(weeks.values()).sort((a, b) =>
      a.week.localeCompare(b.week),
    );
  }, [history]);

  const monthlyData = useMemo((): MonthlyData[] => {
    const months = new Map<string, MonthlyData>();
    for (const entry of history) {
      const monthKey = entry.date.substring(0, 7);

      if (!months.has(monthKey)) {
        months.set(monthKey, {
          month: monthKey,
          total: 0,
          transportation: 0,
          energy: 0,
          food: 0,
          lifestyle: 0,
        });
      }
      const month = months.get(monthKey)!;
      month.total += entry.result.total;
      month.transportation += entry.result.transportation;
      month.energy += entry.result.energy;
      month.food += entry.result.food;
      month.lifestyle += entry.result.lifestyle;
    }
    return Array.from(months.values()).sort((a, b) =>
      a.month.localeCompare(b.month),
    );
  }, [history]);

  const lastWeekData = useMemo((): WeeklyData | null => {
    if (weeklyData.length === 0) return null;
    return weeklyData[weeklyData.length - 1];
  }, [weeklyData]);

  const previousWeekData = useMemo((): WeeklyData | null => {
    if (weeklyData.length < 2) return null;
    return weeklyData[weeklyData.length - 2];
  }, [weeklyData]);

  const improvementPercentage = useMemo((): number => {
    if (!lastWeekData || !previousWeekData) return 0;
    if (previousWeekData.total === 0) return 0;
    return Math.round(
      ((previousWeekData.total - lastWeekData.total) /
        previousWeekData.total) *
        100,
    );
  }, [lastWeekData, previousWeekData]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return {
    history,
    latestEntry,
    weeklyData,
    monthlyData,
    improvementPercentage,
    addEntry,
    clearHistory,
  };
}
