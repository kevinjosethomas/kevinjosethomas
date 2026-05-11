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
import { SPENDING_COLORS } from "@/lib/colors";
import InfoTooltip from "@/components/Home/InfoTooltip";

type ExpenditureChartProps = {
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
  grandTotal?: number;
};

function CustomTooltip({
  active,
  payload,
  label,
  grandTotal,
}: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
    const weekTotal = payload.reduce((sum, entry) => sum + entry.value, 0);

    return (
      <div className="border-border flex flex-col border bg-black px-3 py-2 text-sm">
        <p className="text-secondary mb-2 text-xs">{label}</p>
        {sortedPayload.map((entry, index) => {
          if (entry.value === 0) return null;
          const pct =
            grandTotal && grandTotal > 0
              ? ((entry.value / grandTotal) * 100).toFixed(1)
              : "0";
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2"
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-secondary text-xs">{entry.name}:</p>
              <p className="text-xs font-medium">{pct}▲</p>
            </div>
          );
        })}
        {grandTotal && grandTotal > 0 && (
          <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
            <p className="text-secondary text-xs">Week total:</p>
            <p className="text-xs font-medium">
              {((weekTotal / grandTotal) * 100).toFixed(1)}▲
            </p>
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

export default function ExpenditureChart({
  data,
  days = 90,
  todayTimestamp,
}: ExpenditureChartProps) {
  const startDate = getStartDate(todayTimestamp, days);
  const cutoffDate = new Date("2022-09-01");
  cutoffDate.setHours(0, 0, 0, 0);
  const effectiveStart = startDate < cutoffDate ? cutoffDate : startDate;

  const chartData = data.filter((week) => new Date(week.week) >= effectiveStart);

  const moneyTags = new Set<string>();
  chartData.forEach((week) => {
    Object.entries(week).forEach(([key, value]) => {
      if (key !== "week" && key !== "weekLabel" && typeof value === "number") {
        moneyTags.add(key);
      }
    });
  });

  if (moneyTags.size === 0) {
    moneyTags.add("No Data");
  }

  const totalSpent = chartData.reduce((sum, week) => {
    return (
      sum +
      Array.from(moneyTags).reduce((weekSum, tag) => {
        return weekSum + ((week[tag] as number) || 0);
      }, 0)
    );
  }, 0);

  const moneyTagsArray = Array.from(moneyTags).sort();

  return (
    <div className="flex h-full flex-col outline-none focus:outline-none">
      <div className="border-border flex h-14 items-center justify-between border-b px-4">
        <p className="text-sm font-medium">Spending Trends</p>
        <InfoTooltip content="▲ = proportional unit. Each bar segment shows % of total period spend." />
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
              content={<CustomTooltip grandTotal={totalSpent} />}
              isAnimationActive={false}
            />
            {moneyTagsArray.map((tag) => (
              <Bar
                key={tag}
                dataKey={tag}
                stackId="money"
                fill={SPENDING_COLORS[tag] || SPENDING_COLORS.Other}
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
