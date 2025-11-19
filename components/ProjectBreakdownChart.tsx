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
import type { DailyWorkData } from "@/lib/work";
import type { OverviewData } from "@/lib/sheets";

type ProjectBreakdownChartProps = {
  data: DailyWorkData[];
  overviewData: OverviewData[];
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
      rawRating?: number;
    };
  }>;
  label?: string;
};

type ChartDataPoint = {
  index: number;
  date: string;
  day: string;
  rawRating: number;
  [key: string]: number | string;
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

const COLORS = [
  "#a5b4fc", // pastel blue
  "#fca5a5", // pastel red
  "#86efac", // pastel green
  "#fde68a", // pastel yellow
  "#d8b4fe", // pastel violet
  "#f9a8d4", // pastel pink
  "#a5f3fc", // pastel cyan
  "#fdba74", // pastel orange
  "#c7d2fe", // pastel indigo
  "#d9f99d", // pastel lime
];

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);

    const totalMinutes = payload.reduce((sum, entry) => sum + entry.value, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMins = Math.round(totalMinutes % 60);

    const firstPayload = payload[0] as {
      payload?: { date?: string; rawRating?: number };
      value: number;
      dataKey: string;
      color: string;
      name: string;
    };
    const fullDate = firstPayload?.payload?.date || "";
    const rawRating = firstPayload?.payload?.rawRating;
    const dateParts = fullDate.split(",");
    const dayOfWeek = dateParts[0]?.trim() || "";
    const dateWithYear = dateParts[1]?.trim() || "";
    const monthDay = dateWithYear.split(" ").slice(0, 2).join(" ");
    const formattedDate = `${dayOfWeek}, ${monthDay}`;

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

export default function ProjectBreakdownChart({
  data,
  overviewData,
  days = 7,
}: ProjectBreakdownChartProps) {
  if (!data || data.length === 0) return null;

  const cutoffDate = new Date("2025-04-06");
  const filteredData = data.filter((d) => {
    const parsedDate = new Date(d.date);
    return parsedDate >= cutoffDate;
  });

  const recentDays = filteredData.slice(0, days).reverse();

  const ratingMap = new Map<string, number>();
  overviewData.forEach((d) => {
    const rating = parseFloat(d.r);
    if (!isNaN(rating)) {
      ratingMap.set(d.date, rating);
    }
  });

  const projectTotals = new Map<string, number>();
  recentDays.forEach((d) => {
    Object.entries(d.projects).forEach(([project, minutes]) => {
      projectTotals.set(project, (projectTotals.get(project) || 0) + minutes);
    });
  });

  const projectArray = Array.from(projectTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([project]) => project);

  const chartData = recentDays.map((d, index) => {
    const dateParts = d.date.split(",");
    const dayOfWeek = dateParts[0];
    const dateStr = dateParts[1]?.trim();
    const formattedDate = `${dayOfWeek}, ${dateStr}`;

    const rating = ratingMap.get(d.date) || 0;

    const dataPoint: ChartDataPoint = {
      index,
      date: formattedDate,
      day: dayOfWeek.slice(0, 3),
      rawRating: rating,
    };

    projectArray.forEach((project) => {
      dataPoint[project] = d.projects[project] || 0;
    });

    return dataPoint;
  });

  const totalWorkMinutes = recentDays.reduce((sum, d) => {
    return sum + Object.values(d.projects).reduce((a, b) => a + b, 0);
  }, 0);
  const avgWorkMinutes =
    recentDays.length > 0 ? totalWorkMinutes / recentDays.length : 0;
  const avgHours = Math.floor(avgWorkMinutes / 60);
  const avgMins = Math.round(avgWorkMinutes % 60);

  return (
    <div className="flex h-full flex-col">
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
            <CartesianGrid
              strokeDasharray="0"
              stroke="currentColor"
              strokeOpacity={0.1}
            />
            <XAxis dataKey="index" hide />
            <YAxis
              tickCount={6}
              domain={[0, 600]}
              hide
              allowDataOverflow={true}
            />
            <Tooltip
              cursor={{ stroke: "#a5b4fc", strokeWidth: 1, strokeOpacity: 0.3 }}
              content={<CustomTooltip />}
              isAnimationActive={false}
            />
            {projectArray.map((project, index) => (
              <Area
                key={project}
                type="linear"
                dataKey={project}
                stackId="1"
                fill={COLORS[index % COLORS.length]}
                fillOpacity={0.4}
                strokeWidth={0}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="border-border grid grid-cols-2 gap-4 border-y p-4 md:grid-cols-6 md:p-6">
        {projectArray.slice(0, 12).map((project, index) => {
          const totalMinutes = projectTotals.get(project) || 0;
          const hours = Math.floor(totalMinutes / 60);
          const mins = Math.round(totalMinutes % 60);

          return (
            <div key={project} className="flex items-start gap-2">
              <div
                className="mt-1.5 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div className="flex flex-col">
                <p className="text-sm">{project}</p>
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
