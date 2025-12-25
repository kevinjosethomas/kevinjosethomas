import type {
  SleepData,
  OverviewData,
  WorkSessionData,
  WorkoutData,
  MoneyData,
  ScreenTimeData,
} from '../sheets';

/**
 * Calculate average from an array of numbers
 */
export function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

/**
 * Calculate median from an array of numbers
 */
export function median(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/**
 * Filter data by date range (last N days)
 */
export function filterByDays<T extends { date: string }>(
  data: T[],
  days: number
): T[] {
  // Handle undefined or null data
  if (!data || !Array.isArray(data)) {
    console.warn('filterByDays received invalid data:', data);
    return [];
  }

  if (days === -1) return data; // Return all data

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  cutoffDate.setHours(0, 0, 0, 0);

  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= cutoffDate;
  });
}

/**
 * Calculate sleep statistics
 */
export function calculateSleepStats(data: SleepData[]) {
  if (!data || !Array.isArray(data)) {
    return {
      avgDuration: 0,
      avgScore: 0,
      avgRem: 0,
      avgDeep: 0,
      totalNights: 0,
    };
  }

  const durations = data.map((d) => d.time).filter((t) => t > 0);
  const scores = data.map((d) => d.score).filter((s) => s > 0);
  const remPercentages = data
    .map((d) => (d.rem / d.time) * 100)
    .filter((p) => !isNaN(p) && isFinite(p));
  const deepPercentages = data
    .map((d) => (d.deep / d.time) * 100)
    .filter((p) => !isNaN(p) && isFinite(p));

  return {
    avgDuration: average(durations),
    avgScore: average(scores),
    avgRem: average(remPercentages),
    avgDeep: average(deepPercentages),
    totalNights: data.length,
  };
}

/**
 * Calculate work statistics
 */
export function calculateWorkStats(data: WorkSessionData[]) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return {
      totalHours: 0,
      avgHoursPerDay: 0,
      mostProductiveSubject: 'N/A',
      subjectHours: {},
      totalSessions: 0,
    };
  }

  const totalHours = data.reduce((sum, session) => sum + session.duration, 0);
  const uniqueDays = new Set(data.map((d) => d.date)).size;

  // Calculate hours by subject
  const subjectHours = data.reduce((acc, session) => {
    acc[session.subject] = (acc[session.subject] || 0) + session.duration;
    return acc;
  }, {} as Record<string, number>);

  const mostProductiveSubject = Object.entries(subjectHours).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0] || 'N/A';

  return {
    totalHours,
    avgHoursPerDay: uniqueDays > 0 ? totalHours / uniqueDays : 0,
    mostProductiveSubject,
    subjectHours,
    totalSessions: data.length,
  };
}

/**
 * Calculate workout statistics
 */
export function calculateWorkoutStats(data: WorkoutData[]) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return {
      totalWorkouts: 0,
      totalCalories: 0,
      avgCaloriesPerWorkout: 0,
      avgHeartRate: 0,
      mostCommonType: 'N/A',
      typeCounts: {},
    };
  }

  const totalCalories = data.reduce((sum, w) => sum + w.calories, 0);
  const avgHr = average(data.map((w) => w.avgHr).filter((hr) => hr > 0));

  // Count by type
  const typeCounts = data.reduce((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonType = Object.entries(typeCounts).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0] || 'N/A';

  return {
    totalWorkouts: data.length,
    totalCalories,
    avgCaloriesPerWorkout: data.length > 0 ? totalCalories / data.length : 0,
    avgHeartRate: avgHr,
    mostCommonType,
    typeCounts,
  };
}

/**
 * Calculate money statistics
 */
export function calculateMoneyStats(data: MoneyData[]) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return {
      totalSpent: 0,
      avgPerTransaction: 0,
      totalTransactions: 0,
      categorySpending: {},
      merchantSpending: {},
      topMerchants: [],
    };
  }

  const totalSpent = data.reduce((sum, m) => sum + m.amount, 0);
  const avgPerTransaction = data.length > 0 ? totalSpent / data.length : 0;

  // Spending by category
  const categorySpending = data.reduce((acc, transaction) => {
    acc[transaction.tag] = (acc[transaction.tag] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  // Spending by merchant
  const merchantSpending = data.reduce((acc, transaction) => {
    acc[transaction.merchant] = (acc[transaction.merchant] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const topMerchants = Object.entries(merchantSpending)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return {
    totalSpent,
    avgPerTransaction,
    totalTransactions: data.length,
    categorySpending,
    merchantSpending,
    topMerchants,
  };
}

/**
 * Calculate screen time statistics
 */
export function calculateScreenTimeStats(data: ScreenTimeData[]) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return {
      totalMinutes: 0,
      avgPerDay: 0,
      categoryTime: {},
      appTime: {},
      topApps: [],
    };
  }

  const totalMinutes = data.reduce((sum, s) => sum + s.duration, 0);
  const avgPerDay = totalMinutes / (new Set(data.map((d) => d.date)).size || 1);

  // Time by category
  const categoryTime = data.reduce((acc, screen) => {
    acc[screen.category] = (acc[screen.category] || 0) + screen.duration;
    return acc;
  }, {} as Record<string, number>);

  // Time by app
  const appTime = data.reduce((acc, screen) => {
    acc[screen.app] = (acc[screen.app] || 0) + screen.duration;
    return acc;
  }, {} as Record<string, number>);

  const topApps = Object.entries(appTime)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return {
    totalMinutes,
    avgPerDay,
    categoryTime,
    appTime,
    topApps,
  };
}

/**
 * Calculate overall statistics from overview data
 */
export function calculateOverallStats(data: OverviewData[]) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return {
      avgScore: 0,
      medianScore: 0,
      ratingDistribution: {},
      totalDays: 0,
    };
  }

  const scores = data.map((d) => d.overallScore).filter((s) => s > 0);
  const ratings = data.map((d) => d.rating);

  // Rating distribution
  const ratingDistribution = ratings.reduce((acc, rating) => {
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return {
    avgScore: average(scores),
    medianScore: median(scores),
    ratingDistribution,
    totalDays: data.length,
  };
}

/**
 * Format duration in minutes to hours and minutes
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(num));
}

/**
 * Group data by week
 */
export function groupByWeek<T extends { date: string }>(
  data: T[]
): Record<string, T[]> {
  return data.reduce((acc, item) => {
    const date = new Date(item.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!acc[weekKey]) acc[weekKey] = [];
    acc[weekKey].push(item);

    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Group data by month
 */
export function groupByMonth<T extends { date: string }>(
  data: T[]
): Record<string, T[]> {
  return data.reduce((acc, item) => {
    const date = new Date(item.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(item);

    return acc;
  }, {} as Record<string, T[]>);
}
