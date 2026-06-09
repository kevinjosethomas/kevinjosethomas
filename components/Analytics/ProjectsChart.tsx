"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { DailyWorkData } from "@/lib/work";
import { PROJECT_COLORS, CHART_COLORS } from "@/lib/colors";
import { formatProjectName } from "@/lib/project-names";

type ProjectsChartProps = {
  data: DailyWorkData[];
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
    };
  }>;
  label?: string;
  colorMap?: Record<string, string>;
};

type ChartDataPoint = {
  index: number;
  date: string;
  day: string;
  [key: string]: number | string;
};

function CustomTooltip({ active, payload, colorMap }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);

    const totalMinutes = payload.reduce((sum, entry) => sum + entry.value, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMins = Math.round(totalMinutes % 60);

    const firstPayload = payload[0] as {
      payload?: { date?: string };
      value: number;
      dataKey: string;
      color: string;
      name: string;
    };
    const fullDate = firstPayload?.payload?.date || "";
    const dateParts = fullDate.split(",");
    const dayOfWeek = dateParts[0]?.trim() || "";
    const monthDay = dateParts[1]?.trim() || "";
    const year = dateParts[2]?.trim() || "";
    const formattedDate = year
      ? `${dayOfWeek}, ${monthDay}, ${year}`
      : `${dayOfWeek}, ${monthDay}`;

    return (
      <div className="border-border flex flex-col border bg-black px-3 py-2 text-sm">
        <p className="text-secondary mb-2 text-xs">{formattedDate}</p>
        <div className="-mx-3 mb-2 border-b border-white/10 px-3 pb-2">
          <div className="flex items-center gap-2">
            <p className="text-secondary text-xs">Total:</p>
            <p className="text-xs font-medium">
              {totalHours}h {totalMins}m
            </p>
          </div>
        </div>
        {sortedPayload.map((entry, index) => {
          if (entry.value === 0) return null;

          const hours = Math.floor(entry.value / 60);
          const mins = Math.round(entry.value % 60);
          const projectColor = colorMap?.[entry.name] || entry.color;
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2"
                style={{ backgroundColor: projectColor }}
              />
              <p className="text-secondary text-xs">
                {formatProjectName(entry.name)}:
              </p>
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

export default function ProjectsChart({
  data,
  days = 7,
  todayTimestamp,
}: ProjectsChartProps) {
  const today = new Date(todayTimestamp);
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(today);

  const cutoffDate = new Date("2025-04-06");
  cutoffDate.setHours(0, 0, 0, 0);

  const workDataMap = new Map<string, DailyWorkData>();
  data.forEach((d) => {
    workDataMap.set(d.date, d);
  });

  const allDates: Date[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(endDate);
    date.setDate(endDate.getDate() - i);
    date.setHours(0, 0, 0, 0);
    if (date >= cutoffDate) {
      allDates.push(date);
    }
  }
  allDates.reverse();

  const projectTotals = new Map<string, number>();
  allDates.forEach((date) => {
    const dateKey = formatDateKey(date);
    const dayData = workDataMap.get(dateKey);
    if (dayData) {
      Object.entries(dayData.projects).forEach(([project, minutes]) => {
        projectTotals.set(project, (projectTotals.get(project) || 0) + minutes);
      });
    }
  });

  if (allDates.length === 0 || projectTotals.size === 0) return null;

  const projectArray = Array.from(projectTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([project]) => project);

  const chartData = allDates.map((date, index) => {
    const dateKey = formatDateKey(date);
    const dayData = workDataMap.get(dateKey);

    const dateParts = dateKey.split(",");
    const dayOfWeek = dateParts[0];
    const dateStr = dateParts[1]?.trim();
    const year = dateParts[2]?.trim();
    const formattedDate = `${dayOfWeek}, ${dateStr}, ${year}`;

    const dataPoint: ChartDataPoint = {
      index,
      date: formattedDate,
      day: dayOfWeek.slice(0, 3),
    };

    projectArray.forEach((project) => {
      dataPoint[project] = dayData?.projects[project] || 0;
    });

    return dataPoint;
  });

  const totalWorkMinutes = Array.from(projectTotals.values()).reduce(
    (a, b) => a + b,
    0,
  );
  const avgWorkMinutes =
    allDates.length > 0 ? totalWorkMinutes / allDates.length : 0;
  const avgHours = Math.floor(avgWorkMinutes / 60);
  const avgMins = Math.round(avgWorkMinutes % 60);

  const colorMap: Record<string, string> = {};
  const gradientIdMap: Record<string, string> = {};
  let fallbackIdx = 0;
  projectArray.forEach((project, index) => {
    if (PROJECT_COLORS[project]) {
      colorMap[project] = PROJECT_COLORS[project];
    } else {
      colorMap[project] = CHART_COLORS[fallbackIdx % CHART_COLORS.length];
      fallbackIdx++;
    }
    gradientIdMap[project] =
      `work-gradient-${index}-${project.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  });

  return (
    <div className="flex h-full flex-col outline-none focus:outline-none">
      <div className="border-border flex h-14 items-center justify-between border-b px-4">
        <p className="text-sm font-medium">Work Trends</p>
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
            <defs>
              {projectArray.map((project) => (
                <linearGradient
                  key={project}
                  id={gradientIdMap[project]}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                >
                  <stop
                    offset="0%"
                    stopColor={colorMap[project]}
                    stopOpacity={0.78}
                  />
                  <stop
                    offset="65%"
                    stopColor={colorMap[project]}
                    stopOpacity={0.48}
                  />
                  <stop
                    offset="100%"
                    stopColor={colorMap[project]}
                    stopOpacity={0.3}
                  />
                </linearGradient>
              ))}
            </defs>
            <XAxis dataKey="index" hide />
            <YAxis
              tickCount={6}
              domain={[0, 600]}
              hide
              allowDataOverflow={true}
            />
            <Tooltip
              cursor={{ stroke: "#a5b4fc", strokeWidth: 1, strokeOpacity: 0.3 }}
              content={<CustomTooltip colorMap={colorMap} />}
              isAnimationActive={false}
            />
            {projectArray.map((project) => (
              <Area
                key={project}
                type="linear"
                dataKey={project}
                stackId="1"
                fill={`url(#${gradientIdMap[project]})`}
                fillOpacity={1}
                strokeWidth={0}
                isAnimationActive={false}
                activeDot={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="border-border grid grid-cols-2 gap-4 border-y p-4 md:grid-cols-6 md:p-6">
        {projectArray.slice(0, 12).map((project) => {
          const totalMinutes = projectTotals.get(project) || 0;
          const hours = Math.floor(totalMinutes / 60);
          const mins = Math.round(totalMinutes % 60);

          return (
            <div key={project} className="flex items-start gap-2">
              <div
                className="mt-1.5 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: colorMap[project] }}
              />
              <div className="flex flex-col">
                <p className="text-sm">{formatProjectName(project)}</p>
                <p className="text-secondary text-xs">
                  {hours}h {mins}m
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
