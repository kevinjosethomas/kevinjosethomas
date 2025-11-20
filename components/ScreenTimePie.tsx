"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { ScreenTimeData } from "@/lib/sheets";

type ScreenTimePieProps = {
  data: ScreenTimeData[];
  days?: number;
};

type TooltipPayload = {
  value: number;
  name: string;
  payload?: {
    name: string;
    value: number;
    total?: number;
  };
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
};

const COLORS = [
  "#a5b4fc",
  "#fca5a5",
  "#86efac",
  "#fde68a",
  "#d8b4fe",
  "#f9a8d4",
  "#a5f3fc",
  "#fdba74",
  "#c7d2fe",
  "#d9f99d",
];

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
    const entry = payload[0];
    const minutes = entry?.value ?? 0;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    const name = entry?.name ?? "";
    const total = entry?.payload?.total ?? minutes;
    const percentage = total > 0 ? ((minutes / total) * 100).toFixed(1) : 0;

    return (
      <div className="border-border flex flex-col gap-1 border bg-black px-3 py-2 text-sm">
        <p className="text-secondary text-xs">{name}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium">
            {hours}h {mins}m
          </p>
          <p className="text-secondary text-xs">({percentage}%)</p>
        </div>
      </div>
    );
  }
  return null;
}

export default function ScreenTimePie({ data, days = 14 }: ScreenTimePieProps) {
  const dateSet = new Set<string>();
  const filteredData: ScreenTimeData[] = [];

  for (const entry of data) {
    if (!dateSet.has(entry.date)) {
      if (dateSet.size >= days) break;
      dateSet.add(entry.date);
    }
    if (dateSet.has(entry.date)) {
      filteredData.push(entry);
    }
  }

  const categoryTotals = new Map<string, number>();
  filteredData.forEach((entry) => {
    const category = entry.category || "Other";
    const minutes = parseTimeToMinutes(entry.duration);
    categoryTotals.set(category, (categoryTotals.get(category) || 0) + minutes);
  });

  const totalMinutes = Array.from(categoryTotals.values()).reduce(
    (sum, minutes) => sum + minutes,
    0,
  );

  const rawData = Array.from(categoryTotals.entries())
    .map(([name, minutes]) => ({ name, value: minutes }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value);

  if (rawData.length === 0 || totalMinutes === 0) {
    return (
      <div className="text-secondary flex h-full items-center justify-center text-sm">
        No screen time data.
      </div>
    );
  }

  const threshold = totalMinutes * 0.05;
  const { filteredCategories, otherTotal } = rawData.reduce<{
    filteredCategories: { name: string; value: number }[];
    otherTotal: number;
  }>(
    (acc, entry) => {
      if (entry.name === "Other") {
        return {
          ...acc,
          filteredCategories: [...acc.filteredCategories, entry],
        };
      }
      if (entry.value < threshold) {
        return {
          ...acc,
          otherTotal: acc.otherTotal + entry.value,
        };
      }
      return {
        ...acc,
        filteredCategories: [...acc.filteredCategories, entry],
      };
    },
    { filteredCategories: [], otherTotal: 0 },
  );

  // Add small categories to existing "Other" or create new one
  if (otherTotal > 0) {
    const existingOtherIndex = filteredCategories.findIndex(
      (c) => c.name === "Other",
    );
    if (existingOtherIndex >= 0) {
      filteredCategories[existingOtherIndex].value += otherTotal;
    } else {
      filteredCategories.push({ name: "Other", value: otherTotal });
    }
  }

  const dataWithColors = filteredCategories.map((entry, idx) => ({
    ...entry,
    color: COLORS[idx % COLORS.length],
    total: totalMinutes,
  }));

  return (
    <div className="divide-border flex h-full flex-col divide-y">
      <div className="flex h-14 items-center justify-between px-4">
        <p className="text-sm font-medium">Screen Time</p>
        <p className="text-secondary text-xs">
          Total: {Math.floor(totalMinutes / 60)}h{" "}
          {Math.round(totalMinutes % 60)}m
        </p>
      </div>
      <div className="min-h-[300px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithColors}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={2}
              strokeWidth={0}
              label={(props) => {
                const { name, percent, cx, cy, midAngle, outerRadius } =
                  props as unknown as {
                    name: string;
                    percent: number;
                    cx: number;
                    cy: number;
                    midAngle: number;
                    outerRadius: number;
                  };
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 25;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    fill="currentColor"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={10}
                    opacity={0.7}
                  >
                    {`${name} ${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              labelLine={{
                stroke: "currentColor",
                strokeOpacity: 0.3,
                strokeWidth: 1,
              }}
            >
              {dataWithColors.map((entry) => (
                <Cell key={entry.name} fill={entry.color} fillOpacity={0.4} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
