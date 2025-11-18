"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { SleepData } from "@/lib/sheets";

type SleepMetricsChartProps = {
  data: SleepData[];
  days?: number;
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

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const date = payload[0]?.payload?.date || "";
    const score = payload[0]?.payload?.score || "";

    return (
      <div className="border-border flex flex-col border bg-black px-3 py-2 text-sm">
        <p className="text-secondary mb-1 text-xs">{date}</p>
        {score && <p className="mb-2 text-xs font-medium">Score: {score}</p>}
        {payload.map((entry, index) => {
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

export default function SleepMetricsChart({
  data,
  days = 14,
}: SleepMetricsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-secondary flex h-full items-center justify-center text-sm">
        No sleep data.
      </div>
    );
  }

  const recentDays = data.slice(0, days).reverse();

  const chartData = recentDays.map((d, index) => {
    const totalMinutes = parseTimeToMinutes(d.time);
    const remMinutes = parseTimeToMinutes(d.rem);
    const deepMinutes = parseTimeToMinutes(d.deep);
    const lightMinutes = Math.max(0, totalMinutes - remMinutes - deepMinutes);

    return {
      index,
      date: d.date,
      score: d.score,
      total: totalMinutes,
      rem: remMinutes,
      deep: deepMinutes,
      light: lightMinutes,
    };
  });

  const avgTotal =
    chartData.length > 0
      ? chartData.reduce((sum, d) => sum + d.total, 0) / chartData.length
      : 0;

  const avgHours = Math.floor(avgTotal / 60);
  const avgMins = Math.round(avgTotal % 60);

  const pastelPurple = "#d8b4fe";
  const pastelBlue = "#a5b4fc";
  const pastelCyan = "#a5f3fc";

  return (
    <div className="flex h-full flex-col">
      <div className="border-border flex h-14 items-center justify-between border-b px-4">
        <p className="text-sm font-medium">Sleep</p>
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
            <CartesianGrid
              strokeDasharray="0"
              stroke="currentColor"
              strokeOpacity={0.1}
            />
            <XAxis dataKey="index" hide />
            <YAxis hide domain={[0, 600]} />
            <Tooltip
              cursor={{
                stroke: pastelPurple,
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
              stroke={pastelPurple}
              strokeWidth={0}
              fill={pastelPurple}
              fillOpacity={0.4}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="rem"
              name="REM"
              stackId="1"
              stroke={pastelBlue}
              strokeWidth={0}
              fill={pastelBlue}
              fillOpacity={0.4}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="light"
              name="Light"
              stackId="1"
              stroke={pastelCyan}
              strokeWidth={0}
              fill={pastelCyan}
              fillOpacity={0.4}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
