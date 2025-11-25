"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { WorkoutData } from "@/lib/sheets";
import { WORKOUT_COLORS } from "@/lib/colors";

type WorkoutWeeklyChartProps = {
  data: WorkoutData[];
  days?: number;
  todayTimestamp: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    name: string;
  }>;
  label?: string;
};

type WeekData = {
  week: string;
  weekLabel: string;
  [key: string]: number | string;
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

function getWeekLabel(date: Date): string {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (d: Date) => {
    const month = d.toLocaleString("en-US", { month: "short" });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
}

function getWeekKey(date: Date): string {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek.toISOString().split("T")[0];
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
    const totalMinutes = payload.reduce((sum, entry) => sum + entry.value, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMins = Math.round(totalMinutes % 60);

    return (
      <div className="border-border flex flex-col border bg-black px-3 py-2 text-sm">
        <p className="text-secondary mb-2 text-xs">{label}</p>
        <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-2">
          <p className="text-secondary text-xs">Total:</p>
          <p className="text-xs font-medium">
            {totalHours}h {totalMins}m
          </p>
        </div>
        {sortedPayload.map((entry, index) => {
          if (entry.value === 0) return null;
          const hours = Math.floor(entry.value / 60);
          const mins = Math.round(entry.value % 60);
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2"
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-secondary text-xs">{entry.name}:</p>
              <p className="text-xs font-medium">
                {hours}h {mins}m
              </p>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

export default function WorkoutWeeklyChart({
  data,
  days = 90,
  todayTimestamp,
}: WorkoutWeeklyChartProps) {
  const today = new Date(todayTimestamp);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const parseWorkoutDate = (dateStr: string): Date | null => {
    try {
      const parts = dateStr.split(",");
      if (parts.length < 2) return null;

      const monthDay = parts[1].trim().split(" ");
      if (monthDay.length < 2) return null;

      const month = monthDay[0];
      const day = parseInt(monthDay[1], 10);

      const monthMap: Record<string, number> = {
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

      const monthNum = monthMap[month];
      if (monthNum === undefined) return null;

      const currentYear = today.getFullYear();
      let workoutDate = new Date(currentYear, monthNum, day);

      if (workoutDate > today) {
        workoutDate = new Date(currentYear - 1, monthNum, day);
      }

      workoutDate.setHours(0, 0, 0, 0);
      return workoutDate;
    } catch {
      return null;
    }
  };

  const validDates: Date[] = [];
  data.forEach((workout) => {
    if (workout.date && workout.time) {
      const parsed = parseWorkoutDate(workout.date);
      if (parsed && !isNaN(parsed.getTime())) {
        validDates.push(parsed);
      }
    }
  });
  const earliestDataDate =
    validDates.length > 0
      ? new Date(Math.min(...validDates.map((d) => d.getTime())))
      : null;

  const requestedStart = new Date(yesterday);
  requestedStart.setDate(requestedStart.getDate() - days + 1);
  requestedStart.setHours(0, 0, 0, 0);

  let startDate = requestedStart;
  if (earliestDataDate && earliestDataDate > requestedStart) {
    startDate = earliestDataDate;
  }

  const allWeekKeys = new Set<string>();
  const currentDate = new Date(startDate);
  while (currentDate <= yesterday) {
    allWeekKeys.add(getWeekKey(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const weekMap = new Map<string, Map<string, number>>();
  const workoutTypes = new Set<string>();

  allWeekKeys.forEach((weekKey) => {
    weekMap.set(weekKey, new Map());
  });

  data.forEach((workout) => {
    if (!workout.date || !workout.time) return;

    const workoutDate = parseWorkoutDate(workout.date);

    if (!workoutDate || isNaN(workoutDate.getTime())) return;

    if (workoutDate >= startDate && workoutDate <= yesterday) {
      const weekKey = getWeekKey(workoutDate);
      const workoutType = workout.type || "Other";
      const minutes = parseTimeToMinutes(workout.time);

      if (minutes === 0) return;

      workoutTypes.add(workoutType);

      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, new Map());
      }

      const typeMap = weekMap.get(weekKey)!;
      typeMap.set(workoutType, (typeMap.get(workoutType) || 0) + minutes);
    }
  });

  if (workoutTypes.size === 0) {
    workoutTypes.add("No Data");
  }

  const weeks = Array.from(weekMap.entries())
    .map(([weekKey, typeMap]) => {
      const weekDate = new Date(weekKey);
      const weekLabel = getWeekLabel(weekDate);
      const weekData: WeekData = {
        week: weekKey,
        weekLabel,
      };

      typeMap.forEach((minutes, type) => {
        weekData[type] = minutes;
      });

      return weekData;
    })
    .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime());

  const chartData = weeks;

  const totalMinutes = chartData.reduce((sum, week) => {
    return (
      sum +
      Array.from(workoutTypes).reduce((weekSum, type) => {
        return weekSum + ((week[type] as number) || 0);
      }, 0)
    );
  }, 0);

  const avgMinutes = chartData.length > 0 ? totalMinutes / chartData.length : 0;
  const avgHours = Math.floor(avgMinutes / 60);
  const avgMins = Math.round(avgMinutes % 60);

  const workoutTypesArray = Array.from(workoutTypes).sort();

  return (
    <div className="flex h-full flex-col">
      <div className="border-border flex h-14 items-center justify-between border-b px-4">
        <p className="text-sm font-medium">Workout Trends</p>
        <p className="text-secondary text-xs">
          Avg: {avgHours}h {avgMins}m/week
        </p>
      </div>
      <div className="min-h-[300px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis dataKey="weekLabel" hide />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "currentColor", fillOpacity: 0.05 }}
              content={<CustomTooltip />}
              isAnimationActive={false}
            />
            {workoutTypesArray.map((type) => (
              <Bar
                key={type}
                dataKey={type}
                stackId="workout"
                fill={WORKOUT_COLORS[type] || WORKOUT_COLORS.Other}
                fillOpacity={0.8}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
