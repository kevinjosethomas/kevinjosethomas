import { fetchWorkSessions } from "@/lib/sheets";
import type { WorkSessionData } from "@/lib/sheets";
import { parseSheetDate } from "@/lib/analytics-data";

export type ProjectTimeData = Record<string, number>;

export type DailyWorkData = {
  date: string;
  totalMinutes: number;
  projects: ProjectTimeData;
};

export type WorkHourHeatmapData = {
  dayIndex: number;
  day: string;
  hour: number;
  totalMinutes: number;
  sessionCount: number;
};

export type ProcessedWorkData = {
  dailyData: DailyWorkData[];
  hourHeatmapData: WorkHourHeatmapData[];
  projectTotals: ProjectTimeData;
};

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr || timeStr.trim() === "") return 0;

  const hourMatch = timeStr.match(/(\d+)h/);
  const minuteMatch = timeStr.match(/(\d+)m/);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

  return hours * 60 + minutes;
}

function formatDate(date: Date): string {
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

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayName}, ${monthName} ${day}, ${year}`;
}

function parseClockTime(timeStr: string): number | null {
  if (!timeStr || timeStr.trim() === "") return null;

  const match = timeStr
    .trim()
    .match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!match) return null;

  const period = match[3]?.toUpperCase();
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;

  if (Number.isNaN(hours) || Number.isNaN(minutes) || minutes > 59) {
    return null;
  }

  if (period) {
    if (hours < 1 || hours > 12) return null;
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  } else if (hours > 23) {
    return null;
  }

  return hours * 60 + minutes;
}

function getDayIndex(dateStr: string): number | null {
  const day = dateStr.split(",")[0]?.trim();
  const days: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return days[day] ?? null;
}

function addSessionToHourHeatmapData(
  heatmapData: WorkHourHeatmapData[],
  date: string,
  startTime: string,
  durationMinutes: number,
) {
  const dayIndex = getDayIndex(date);
  const startMinute = parseClockTime(startTime);
  if (dayIndex === null || startMinute === null || durationMinutes <= 0) {
    return;
  }

  const hour = Math.floor(startMinute / 60) % 24;
  const bucket = heatmapData.find(
    (entry) => entry.dayIndex === dayIndex && entry.hour === hour,
  );

  if (!bucket) return;
  bucket.totalMinutes += durationMinutes;
  bucket.sessionCount += 1;
}

export function processWorkSessions(
  sessions: WorkSessionData[],
): ProcessedWorkData {
  const dailyMap = new Map<string, DailyWorkData>();
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hourHeatmapData: WorkHourHeatmapData[] = dayLabels.flatMap(
    (day, dayIndex) =>
      Array.from({ length: 24 }, (_, hour) => ({
        dayIndex,
        day,
        hour,
        totalMinutes: 0,
        sessionCount: 0,
      })),
  );
  const projectTotals: ProjectTimeData = {};
  const allDates: Date[] = [];

  for (const session of sessions) {
    const { date, subject, startTime, duration } = session;
    const minutes = parseTimeToMinutes(duration);

    if (minutes === 0) continue;

    addSessionToHourHeatmapData(hourHeatmapData, date, startTime, minutes);

    const parsedDate = new Date(date);
    allDates.push(parsedDate);

    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        date,
        totalMinutes: 0,
        projects: {},
      });
    }

    const dailyData = dailyMap.get(date)!;

    dailyData.totalMinutes += minutes;

    if (!dailyData.projects[subject]) {
      dailyData.projects[subject] = 0;
    }
    dailyData.projects[subject] += minutes;

    if (!projectTotals[subject]) {
      projectTotals[subject] = 0;
    }
    projectTotals[subject] += minutes;
  }

  if (allDates.length > 0) {
    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

    const currentDate = new Date(minDate);
    while (currentDate <= maxDate) {
      const dateStr = formatDate(currentDate);

      if (!dailyMap.has(dateStr)) {
        dailyMap.set(dateStr, {
          date: dateStr,
          totalMinutes: 0,
          projects: {},
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  const dailyData = Array.from(dailyMap.values()).sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return {
    dailyData,
    hourHeatmapData,
    projectTotals,
  };
}

export async function getWorkData(
  limit?: number,
  cutoffTimestamp?: number,
  referenceTodayTimestamp?: number,
  startTimestamp?: number,
): Promise<ProcessedWorkData> {
  const sessions = await fetchWorkSessions(limit);
  const referenceToday = new Date(referenceTodayTimestamp ?? Date.now());
  referenceToday.setHours(0, 0, 0, 0);

  const filtered =
    cutoffTimestamp === undefined
      ? sessions
      : sessions.filter((session) => {
          const parsed = parseSheetDate(session.date, referenceToday);
          if (!parsed) return false;
          const time = parsed.getTime();
          if (startTimestamp !== undefined && time < startTimestamp) {
            return false;
          }
          return time <= cutoffTimestamp;
        });
  return processWorkSessions(filtered);
}
