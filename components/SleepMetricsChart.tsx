"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { SleepData, OverviewData } from "@/lib/sheets";
import { SLEEP_COLORS } from "@/lib/colors";

type SleepMetricsChartProps = {
  data: SleepData[];
  overviewData: OverviewData[];
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

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr || timeStr.trim() === "") return 0;

  const hourMatch = timeStr.match(/(\d+)h/);
  const minuteMatch = timeStr.match(/(\d+)m/);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

  return hours * 60 + minutes;
}

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
  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${dayOfWeek}, ${month} ${day}, ${year}`;
}

export default function SleepMetricsChart({
  data,
  overviewData,
  days = 14,
  todayTimestamp,
}: SleepMetricsChartProps) {
  const today = new Date(todayTimestamp);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const validDates: Date[] = [];
  data.forEach((d) => {
    if (d.date && d.time) {
      const parsed = new Date(d.date);
      if (!isNaN(parsed.getTime())) {
        validDates.push(parsed);
      }
    }
  });
  const earliestDataDate =
    validDates.length > 0
      ? new Date(Math.min(...validDates.map((d) => d.getTime())))
      : null;

  const sleepDataMap = new Map<string, SleepData>();
  data.forEach((d) => {
    sleepDataMap.set(d.date, d);
  });

  const requestedStart = new Date(yesterday);
  requestedStart.setDate(yesterday.getDate() - days + 1);
  requestedStart.setHours(0, 0, 0, 0);

  let startDate = requestedStart;
  if (earliestDataDate && earliestDataDate > requestedStart) {
    startDate = earliestDataDate;
  }

  const allDates: Date[] = [];
  const currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);
  while (currentDate <= yesterday) {
    allDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const ratingMap = new Map<string, number>();
  overviewData.forEach((d) => {
    const rating = parseFloat(d.r);
    if (!isNaN(rating)) {
      ratingMap.set(d.date, rating);
    }
  });

  const chartData = allDates.map((date, index) => {
    const dateKey = formatDateKey(date);
    const dayData = sleepDataMap.get(dateKey);

    const totalMinutes = dayData ? parseTimeToMinutes(dayData.time) : 0;
    const remMinutes = dayData ? parseTimeToMinutes(dayData.rem) : 0;
    const deepMinutes = dayData ? parseTimeToMinutes(dayData.deep) : 0;
    const lightMinutes = Math.max(0, totalMinutes - remMinutes - deepMinutes);

    const rating = ratingMap.get(dateKey) || 0;
    const scaledRating = rating > 0 ? (rating / 7) * 600 : 0;

    return {
      index,
      date: dateKey,
      score: dayData?.score || "",
      total: totalMinutes,
      rem: remMinutes,
      deep: deepMinutes,
      light: lightMinutes,
      rating: scaledRating,
      rawRating: rating,
    };
  });

  const totalSleepMinutes = chartData.reduce((sum, d) => sum + d.total, 0);
  const avgTotal =
    allDates.length > 0 ? totalSleepMinutes / allDates.length : 0;

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
