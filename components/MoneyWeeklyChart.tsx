"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { MoneyData } from "@/lib/sheets";

type MoneyWeeklyChartProps = {
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

const COLORS: Record<string, string> = {
  Food: "#fca5a5",
  Transportation: "#a5b4fc",
  Entertainment: "#86efac",
  Shopping: "#fde68a",
  Bills: "#d8b4fe",
  Healthcare: "#f9a8d4",
  Education: "#a5f3fc",
  Travel: "#fdba74",
  Groceries: "#c7d2fe",
  Subscriptions: "#a7f3d0",
  Gifts: "#d9f99d",
  Personal: "#fbbf24",
  Utilities: "#c084fc",
  Insurance: "#fb923c",
  Fitness: "#34d399",
  Dining: "#f87171",
  Gas: "#60a5fa",
  Other: "#e9d5ff",
  "No Data": "#94a3b8",
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
    return `${month} ${day}`;
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

export default function MoneyWeeklyChart({
  data,
  days = 90,
  todayTimestamp,
}: MoneyWeeklyChartProps) {
  const today = new Date(todayTimestamp);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const startDate = new Date(yesterday);
  startDate.setDate(startDate.getDate() - days + 1);

  const allWeekKeys = new Set<string>();
  const currentDate = new Date(startDate);
  while (currentDate <= yesterday) {
    allWeekKeys.add(getWeekKey(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const weekMap = new Map<string, Map<string, number>>();
  const moneyTags = new Set<string>();

  allWeekKeys.forEach((weekKey) => {
    weekMap.set(weekKey, new Map());
  });

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

  data.forEach((transaction) => {
    if (!transaction.date || !transaction.amount) return;

    const moneyDate = parseMoneyDate(transaction.date);

    if (!moneyDate || isNaN(moneyDate.getTime())) return;

    if (moneyDate >= startDate && moneyDate <= yesterday) {
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
    <div className="flex h-full flex-col">
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
            <CartesianGrid
              strokeDasharray="0"
              stroke="currentColor"
              strokeOpacity={0.1}
            />
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
                fill={COLORS[tag] || COLORS.Other}
                fillOpacity={0.3}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
