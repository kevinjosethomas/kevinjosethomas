"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { DailySleepAggregate } from "@/lib/analytics-data";
import { SLEEP_COLORS } from "@/lib/colors";

type SleepTrendsChartProps = {
  data: DailySleepAggregate[];
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
    payload?: {
      date?: string;
      score?: string;
      rawRating?: number;
    };
  }>;
};

function getRatingLabel(rating: number): string {
  const roundedRating = Math.round(rating);
  switch (roundedRating) {
    case 1:
      return "Very Unpleasant Day";
    case 2:
      return "Unpleasant Day";
    case 3:
      return "Slightly Unpleasant Day";
    case 4:
      return "Neutral Day";
    case 5:
      return "Slightly Pleasant Day";
    case 6:
      return "Pleasant Day";
    case 7:
      return "Very Pleasant Day";
    default:
      return "";
  }
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const date = payload[0]?.payload?.date || "";
    const score = payload[0]?.payload?.score || "";
    const rawRating = payload[0]?.payload?.rawRating;

    return (
      <div className="border-border flex flex-col border bg-black px-3 py-2 text-sm">
        <p className="text-secondary mb-2 text-xs">{date}</p>
        {score && (
          <div className="-mx-3 mb-2 border-b border-white/10 px-3 pb-2">
            <div className="flex items-center gap-2">
              <p className="text-secondary text-xs">Score:</p>
              <p className="text-xs font-medium">{score}</p>
            </div>
          </div>
        )}
        {payload.map((entry, index) => {
          if (entry.dataKey === "rating") return null;
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
        {rawRating !== undefined && rawRating > 0 && (
          <div className="-mx-3 mt-2 border-t border-white/10 px-3 pt-2">
            <p className="text-xs font-medium">{getRatingLabel(rawRating)}</p>
          </div>
        )}
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

export default function SleepTrendsChart({
  data,
  days = 14,
  todayTimestamp,
}: SleepTrendsChartProps) {
  const startDate = getStartDate(todayTimestamp, days);
  const chartData = data
    .filter((entry) => new Date(entry.date) >= startDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((entry, index) => ({ ...entry, index }));

  const totalSleepMinutes = chartData.reduce((sum, d) => sum + d.total, 0);
  const avgTotal =
    chartData.length > 0 ? totalSleepMinutes / chartData.length : 0;

  const avgHours = Math.floor(avgTotal / 60);
  const avgMins = Math.round(avgTotal % 60);

  return (
    <div className="flex h-full flex-col">
      <div className="border-border flex h-14 items-center justify-between border-b px-4">
        <p className="text-sm font-medium">Sleep Trends</p>
        <p className="text-secondary text-xs">
          Avg: {avgHours}h {avgMins}m
        </p>
      </div>
      <div className="min-h-[200px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis dataKey="index" hide />
            <YAxis hide domain={[0, 600]} />
            <Tooltip
              cursor={{
                stroke: "#a5b4fc",
                strokeWidth: 1,
                strokeOpacity: 0.3,
              }}
              content={<CustomTooltip />}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="deep"
              name="Deep"
              stackId="1"
              stroke={SLEEP_COLORS.deep}
              strokeWidth={0}
              fill={SLEEP_COLORS.deep}
              fillOpacity={0.8}
              isAnimationActive={false}
              activeDot={false}
            />
            <Area
              type="monotone"
              dataKey="rem"
              name="REM"
              stackId="1"
              stroke={SLEEP_COLORS.rem}
              strokeWidth={0}
              fill={SLEEP_COLORS.rem}
              fillOpacity={0.8}
              isAnimationActive={false}
              activeDot={false}
            />
            <Area
              type="monotone"
              dataKey="light"
              name="Light"
              stackId="1"
              stroke={SLEEP_COLORS.light}
              strokeWidth={0}
              fill={SLEEP_COLORS.light}
              fillOpacity={0.8}
              isAnimationActive={false}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
