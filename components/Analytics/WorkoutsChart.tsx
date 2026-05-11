"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { WeeklySeriesData } from "@/lib/analytics-data";
import { WORKOUT_COLORS } from "@/lib/colors";

type WorkoutsChartProps = {
  data: WeeklySeriesData[];
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

function getStartDate(todayTimestamp: number, days: number): Date {
  const today = new Date(todayTimestamp);
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days + 1);
  startDate.setHours(0, 0, 0, 0);
  return startDate;
}

export default function WorkoutsChart({
  data,
  days = 90,
  todayTimestamp,
}: WorkoutsChartProps) {
  const startDate = getStartDate(todayTimestamp, days);
  const chartData = data.filter((week) => new Date(week.week) >= startDate);

  const workoutTypes = new Set<string>();
  chartData.forEach((week) => {
    Object.entries(week).forEach(([key, value]) => {
      if (key !== "week" && key !== "weekLabel" && typeof value === "number") {
        workoutTypes.add(key);
      }
    });
  });

  if (workoutTypes.size === 0) {
    workoutTypes.add("No Data");
  }

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
