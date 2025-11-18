import { fetchWorkSessions } from "@/lib/sheets";
import type { WorkSessionData } from "@/lib/sheets";

export type ProjectTimeData = Record<string, number>;

export type DailyWorkData = {
  date: string;
  totalMinutes: number;
  projects: ProjectTimeData;
};

export type ProcessedWorkData = {
  dailyData: DailyWorkData[];
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

export function processWorkSessions(
  sessions: WorkSessionData[],
): ProcessedWorkData {
  const dailyMap = new Map<string, DailyWorkData>();
  const projectTotals: ProjectTimeData = {};
  const allDates: Date[] = [];

  for (const session of sessions) {
    const { date, subject, duration } = session;
    const minutes = parseTimeToMinutes(duration);

    if (minutes === 0) continue;

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
    projectTotals,
  };
}

export async function getWorkData(
  limit?: number,
): Promise<ProcessedWorkData> {
  const sessions = await fetchWorkSessions(limit);
  return processWorkSessions(sessions);
}
