import type {
  SleepData,
  WorkoutData,
  MoneyData,
} from "@/lib/sheets";

export type DailySleepAggregate = {
  index: number;
  date: string;
  total: number;
  rem: number;
  deep: number;
  light: number;
  score: string;
};

export type WeeklySeriesData = {
  week: string;
  weekLabel: string;
  [key: string]: number | string;
};

const MONTHS: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr || timeStr.trim() === "") return 0;

  const hourMatch = timeStr.match(/(\d+)h/);
  const minuteMatch = timeStr.match(/(\d+)m/);
  const secondMatch = timeStr.match(/(\d+)s/);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;
  const seconds = secondMatch ? parseInt(secondMatch[1], 10) : 0;

  return hours * 60 + minutes + Math.round(seconds / 60);
}

function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins}m`;
}

function formatDateKey(date: Date): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function parseSheetDate(dateStr: string, today: Date): Date | null {
  try {
    const parts = dateStr.split(",").map((part) => part.trim());
    if (parts.length < 2) return null;

    const monthDay = parts[1].split(" ");
    if (monthDay.length < 2) return null;

    const month = MONTHS[monthDay[0]];
    const day = parseInt(monthDay[1], 10);
    if (month === undefined || Number.isNaN(day)) return null;

    const explicitYear = parts.length >= 3 ? parseInt(parts[2], 10) : NaN;
    let year = Number.isNaN(explicitYear) ? today.getFullYear() : explicitYear;

    let parsed = new Date(year, month, day);
    parsed.setHours(0, 0, 0, 0);

    if (Number.isNaN(explicitYear) && parsed > today) {
      year -= 1;
      parsed = new Date(year, month, day);
      parsed.setHours(0, 0, 0, 0);
    }

    return parsed;
  } catch {
    return null;
  }
}

function getWeekKey(date: Date): string {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek.toISOString().split("T")[0];
}

function getWeekLabel(weekKey: string): string {
  const [year, month, day] = weekKey.split("-").map(Number);
  const startOfWeek = new Date(year, month - 1, day);
  const endOfWeek = new Date(year, month - 1, day + 6);

  const formatDate = (date: Date) => {
    const monthName = date.toLocaleString("en-US", { month: "short" });
    return `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
}

// Drops rows whose date is newer than the cutoff. Dates are parsed against the
// real `referenceToday` so year inference stays correct. Rows we can't parse are
// dropped so public analytics never fail open.
export function filterByCutoff<T extends { date: string }>(
  rows: T[],
  cutoff: Date,
  referenceToday: Date,
): T[] {
  return filterByDateRange(rows, undefined, cutoff, referenceToday);
}

export function filterByDateRange<T extends { date: string }>(
  rows: T[],
  start: Date | undefined,
  end: Date,
  referenceToday: Date,
): T[] {
  const startTime = start?.getTime();
  const endTime = end.getTime();
  return rows.filter((row) => {
    if (!row.date) return false;
    const parsed = parseSheetDate(row.date, referenceToday);
    if (!parsed) return false;
    const time = parsed.getTime();
    if (startTime !== undefined && time < startTime) return false;
    return time <= endTime;
  });
}

export function aggregateSleepData(sleepData: SleepData[]): DailySleepAggregate[] {
  return sleepData.map((entry, index) => {
    const total = parseTimeToMinutes(entry.time);
    const rem = parseTimeToMinutes(entry.rem);
    const deep = parseTimeToMinutes(entry.deep);
    const light = Math.max(0, total - rem - deep);

    return {
      index,
      date: entry.date,
      total,
      rem,
      deep,
      light,
      score: entry.score,
    };
  });
}

export function aggregateWorkoutData(
  workoutData: WorkoutData[],
  todayTimestamp: number,
): WeeklySeriesData[] {
  const today = new Date(todayTimestamp);
  today.setHours(0, 0, 0, 0);
  const weeklyData = new Map<string, WeeklySeriesData>();

  for (const entry of workoutData) {
    if (!entry.date || !entry.time) continue;

    const parsed = parseSheetDate(entry.date, today);
    if (!parsed || Number.isNaN(parsed.getTime())) continue;

    const minutes = parseTimeToMinutes(entry.time);
    if (minutes === 0) continue;

    const type = entry.type || "Other";
    const week = getWeekKey(parsed);
    const weekData = weeklyData.get(week) || {
      week,
      weekLabel: getWeekLabel(week),
    };

    weekData[type] = ((weekData[type] as number | undefined) || 0) + minutes;
    weeklyData.set(week, weekData);
  }

  return Array.from(weeklyData.values()).sort(
    (a, b) => new Date(a.week).getTime() - new Date(b.week).getTime(),
  );
}

export function aggregateMoneyData(
  moneyData: MoneyData[],
  todayTimestamp: number,
): WeeklySeriesData[] {
  const today = new Date(todayTimestamp);
  today.setHours(0, 0, 0, 0);
  const cutoffDate = new Date("2022-09-01");
  cutoffDate.setHours(0, 0, 0, 0);
  const weeklyData = new Map<string, WeeklySeriesData>();

  for (const entry of moneyData) {
    if (!entry.date || !entry.cad) continue;

    const parsed = parseSheetDate(entry.date, today);
    if (!parsed || Number.isNaN(parsed.getTime()) || parsed < cutoffDate) {
      continue;
    }

    const amount = parseFloat(entry.cad.replace(/[^0-9.-]/g, ""));
    if (Number.isNaN(amount) || amount === 0) continue;

    const tag = entry.tag || "Other";
    if (tag === "Investments") continue;

    const week = getWeekKey(parsed);
    const weekData = weeklyData.get(week) || {
      week,
      weekLabel: getWeekLabel(week),
    };

    weekData[tag] = ((weekData[tag] as number | undefined) || 0) +
      Math.abs(amount);
    weeklyData.set(week, weekData);
  }

  return Array.from(weeklyData.values()).sort(
    (a, b) => new Date(a.week).getTime() - new Date(b.week).getTime(),
  );
}

export function totalSleepMinutes(
  data: DailySleepAggregate[],
  days: number,
): number {
  return data.slice(0, days).reduce((sum, entry) => sum + entry.total, 0);
}

export { formatDateKey, formatMinutes };
