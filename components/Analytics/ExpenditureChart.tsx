"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { MoneyData } from "@/lib/sheets";
import { SPENDING_COLORS } from "@/lib/colors";

type ExpenditureChartProps = {
  data: MoneyData[];
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

function getWeekLabel(weekKey: string): string {
  const parts = weekKey.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const startOfWeek = new Date(year, month, day);
  const endOfWeek = new Date(year, month, day + 6);

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
    const totalAmount = payload.reduce((sum, entry) => sum + entry.value, 0);

    return (
      <div className="border-border flex flex-col border bg-black px-3 py-2 text-sm">
        <p className="text-secondary mb-2 text-xs">{label}</p>
        <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-2">
          <p className="text-secondary text-xs">Total:</p>
          <p className="text-xs font-medium">${totalAmount.toFixed(2)}</p>
        </div>
        {sortedPayload.map((entry, index) => {
          if (entry.value === 0) return null;
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2"
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-secondary text-xs">{entry.name}:</p>
              <p className="text-xs font-medium">${entry.value.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

export default function ExpenditureChart({
  data,
  days = 90,
  todayTimestamp,
}: ExpenditureChartProps) {
  const today = new Date(todayTimestamp);
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(today);

  const parseMoneyDate = (dateStr: string): Date | null => {
    try {
      const parts = dateStr.split(",").map((p) => p.trim());
      if (parts.length < 2) return null;

      const dateComponents = parts[1].split(" ");
      if (dateComponents.length < 2) return null;

      const month = dateComponents[0];
      const day = parseInt(dateComponents[1], 10);
      const year = parts.length >= 3 ? parseInt(parts[2], 10) : null;

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

      let finalYear: number;
      if (year) {
        finalYear = year;
      } else {
        const currentYear = today.getFullYear();
        const testDate = new Date(currentYear, monthNum, day);
        finalYear = testDate > today ? currentYear - 1 : currentYear;
      }

      const moneyDate = new Date(finalYear, monthNum, day);
      moneyDate.setHours(0, 0, 0, 0);
      return moneyDate;
    } catch {
      return null;
    }
  };

  // Hard cutoff - don't show data before this date
  const cutoffDate = new Date("2022-09-01");
  cutoffDate.setHours(0, 0, 0, 0);

  // Find earliest transaction date after the cutoff
  const validDates: Date[] = [];
  data.forEach((transaction) => {
    if (transaction.date && transaction.amount) {
      const parsed = parseMoneyDate(transaction.date);
      if (parsed && !isNaN(parsed.getTime()) && parsed >= cutoffDate) {
        validDates.push(parsed);
      }
    }
  });
  const earliestDataDate =
    validDates.length > 0
      ? new Date(Math.min(...validDates.map((d) => d.getTime())))
      : null;

  const requestedStart = new Date(endDate);
  requestedStart.setDate(endDate.getDate() - days + 1);
  requestedStart.setHours(0, 0, 0, 0);

  // Ensure we don't go before cutoff date
  const effectiveRequestedStart =
    requestedStart < cutoffDate ? cutoffDate : requestedStart;

  // Start from the earliest transaction date (after cutoff) or the requested start
  let startDate = effectiveRequestedStart;
  if (earliestDataDate && earliestDataDate > effectiveRequestedStart) {
    startDate = earliestDataDate;
  }

  const allWeekKeys = new Set<string>();
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    allWeekKeys.add(getWeekKey(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const weekMap = new Map<string, Map<string, number>>();
  const moneyTags = new Set<string>();

  allWeekKeys.forEach((weekKey) => {
    weekMap.set(weekKey, new Map());
  });

  data.forEach((transaction) => {
    if (!transaction.date || !transaction.amount) return;

    const moneyDate = parseMoneyDate(transaction.date);

    if (!moneyDate || isNaN(moneyDate.getTime())) return;

    if (moneyDate >= startDate && moneyDate <= endDate) {
      const weekKey = getWeekKey(moneyDate);
      const tag = transaction.tag || "Other";
      const amount = parseFloat(transaction.amount.replace(/[^0-9.-]/g, ""));

      if (isNaN(amount) || amount === 0) return;
      if (tag === "Investments") return;

      moneyTags.add(tag);

      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, new Map());
      }

      const tagMap = weekMap.get(weekKey)!;
      tagMap.set(tag, (tagMap.get(tag) || 0) + Math.abs(amount));
    }
  });

  if (moneyTags.size === 0) {
    moneyTags.add("No Data");
  }

  const weeks = Array.from(weekMap.entries())
    .map(([weekKey, tagMap]) => {
      const weekLabel = getWeekLabel(weekKey);
      const weekData: WeekData = {
        week: weekKey,
        weekLabel,
      };

      tagMap.forEach((amount, tag) => {
        weekData[tag] = amount;
      });

      return weekData;
    })
    .sort((a, b) => new Date(a.week).getTime() - new Date(b.week).getTime());

  const chartData = weeks;

  const totalSpent = chartData.reduce((sum, week) => {
    return (
      sum +
      Array.from(moneyTags).reduce((weekSum, tag) => {
        return weekSum + ((week[tag] as number) || 0);
      }, 0)
    );
  }, 0);

  const avgSpent = chartData.length > 0 ? totalSpent / chartData.length : 0;

  const moneyTagsArray = Array.from(moneyTags).sort();

  return (
    <div className="flex h-full flex-col outline-none focus:outline-none">
      <div className="border-border flex h-14 items-center justify-between border-b px-4">
        <p className="text-sm font-medium">Spending Trends</p>
        <p className="text-secondary text-xs">
          Avg: ${avgSpent.toFixed(2)}/week
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
