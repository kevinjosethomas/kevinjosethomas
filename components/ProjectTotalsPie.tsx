"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { ProjectTimeData } from "@/lib/work";

type ProjectTotalsPieProps = {
  projectTotals: ProjectTimeData;
  sleepMinutes?: number;
  screenMinutes?: number;
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

export default function ProjectTotalsPie({
  projectTotals,
  sleepMinutes = 0,
  screenMinutes = 0,
}: ProjectTotalsPieProps) {
  const totalMinutes = Object.values(projectTotals).reduce(
    (sum, minutes) => sum + minutes,
    0,
  );

  const rawData = Object.entries(projectTotals)
    .map(([name, minutes]) => ({ name, value: minutes }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value);

  if (rawData.length === 0 || totalMinutes === 0) {
    return (
      <div className="text-secondary flex h-full items-center justify-center text-sm">
        No project data.
      </div>
    );
  }

  const threshold = totalMinutes * 0.05;
  const { filteredData, otherTotal } = rawData.reduce<{
    filteredData: { name: string; value: number }[];
    otherTotal: number;
  }>(
    (acc, entry) => {
      if (entry.value < threshold) {
        return {
          ...acc,
          otherTotal: acc.otherTotal + entry.value,
        };
      }
      return {
        ...acc,
        filteredData: [...acc.filteredData, entry],
      };
    },
    { filteredData: [], otherTotal: 0 },
  );

  if (otherTotal > 0) {
    filteredData.push({ name: "Other", value: otherTotal });
  }

  const dataWithColors = filteredData.map((entry, idx) => ({
    ...entry,
    color: COLORS[idx % COLORS.length],
    total: totalMinutes,
  }));

  return (
    <div className="divide-border flex h-full flex-col divide-y">
      <div className="flex h-14 items-center justify-between px-4">
        <p className="text-sm font-medium">Project Breakdown</p>
        <p className="text-secondary text-xs">
          Total: {Math.floor(totalMinutes / 60)}h
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
                const radius = outerRadius + 30;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    fill="currentColor"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={12}
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
      <div className="flex h-[140px] flex-col gap-2 px-4 py-3">
        <p>Time spent</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="text-secondary text-sm">Deep Work</p>
            <p className="text-sm font-medium">
              {Math.floor(totalMinutes / 60)}h {Math.round(totalMinutes % 60)}m
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-secondary text-sm">Asleep</p>
            <p className="text-sm font-medium">
              {Math.floor(sleepMinutes / 60)}h {Math.round(sleepMinutes % 60)}m
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-secondary text-sm">Screen Time</p>
            <p className="text-sm font-medium">
              {Math.floor(screenMinutes / 60)}h {Math.round(screenMinutes % 60)}
              m
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
