"use client";

import { Tooltip } from "recharts";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Dot,
} from "recharts";
import type { OverviewData } from "@/lib/sheets";

type DailyWorkData = {
  date: string;
  totalMinutes: number;
  projects: {
    [project: string]: number;
  };
};

type WorkSessionChartProps = {
  data: DailyWorkData[];
  overviewData: OverviewData[];
  days?: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload?: {
      fullDate?: string;
      rawRating?: number;
    };
  }>;
};

// Generate pastel colors for projects
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
    const minutes = payload[0]?.value || 0;
    const fullDate = payload[0]?.payload?.fullDate || "";
    const rawRating = payload[0]?.payload?.rawRating;

    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);

    return (
      <div className="border-border flex flex-col border bg-black px-3 py-2 text-sm">
        <p className="text-secondary mb-1 text-xs">{fullDate}</p>
        <p className="text-sm font-medium">
          {hours}h {mins}m
        </p>
        {rawRating !== undefined && rawRating > 0 && (
          <p className="text-secondary mt-1 text-xs">Rating: {rawRating}/7</p>
        )}
      </div>
    );
  }
  return null;
}

export default function WorkSessionChart({
  data,
  overviewData,
  days = 7,
}: WorkSessionChartProps) {
  if (!data || data.length === 0) return null;

  const recentDays = data.slice(0, days).reverse();

  const ratingMap = new Map<string, number>();
  overviewData.forEach((d) => {
    const rating = parseFloat(d.r);
    if (!isNaN(rating)) {
      ratingMap.set(d.date, rating);
    }
  });

  const chartData = recentDays.map((d, index) => {
    const dateParts = d.date.split(",");
    const dayOfWeek = dateParts[0];
    const dateStr = dateParts[1]?.trim();
    const formattedDate = `${dayOfWeek}, ${dateStr}`;

    const rating = ratingMap.get(d.date) || 0;
    const scaledRating = rating > 0 ? (rating / 7) * 600 : 0;

    return {
      index,
      day: dayOfWeek.slice(0, 3),
      minutes: d.totalMinutes,
      fullDate: formattedDate,
      rating: scaledRating,
      rawRating: rating,
    };
  });

  const pastelBlue = "#a5b4fc";
  const deepBlue = "#3b82f6";

  const projectTotals = new Map<string, number>();
  recentDays.forEach((d) => {
    Object.entries(d.projects).forEach(([project, minutes]) => {
      projectTotals.set(project, (projectTotals.get(project) || 0) + minutes);
    });
  });

  const projectArray = Array.from(projectTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([project]) => project);

  return (
    <div className="flex flex-col outline-none **:outline-none focus:outline-none **:focus:outline-none">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={chartData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="workGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor={pastelBlue} stopOpacity={0.15} />
              <stop offset="100%" stopColor={pastelBlue} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            stroke="currentColor"
            strokeOpacity={0.1}
          />
          <XAxis dataKey="index" hide />
          <YAxis hide tickCount={6} domain={[0, 600]} />
          <Tooltip
            cursor={{ stroke: pastelBlue, strokeWidth: 1, strokeOpacity: 0.3 }}
            isAnimationActive={false}
            content={<CustomTooltip />}
          />
          <Area
            type="linear"
            dataKey="minutes"
            stroke={pastelBlue}
            strokeWidth={2}
            fill="url(#workGradient)"
            dot={
              <Dot r={4} fill={pastelBlue} fillOpacity={1} strokeWidth={0} />
            }
            activeDot={{
              r: 6,
              fill: pastelBlue,
              fillOpacity: 1,
              strokeWidth: 0,
            }}
          />
          <Line
            type="monotone"
            dataKey="rating"
            name="Rating"
            stroke={deepBlue}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="border-border grid grid-cols-2 gap-4 border-t p-4 md:grid-cols-5 md:p-6">
        {projectArray.map((project, index) => {
          const totalMinutes = projectTotals.get(project) || 0;
          const hours = Math.floor(totalMinutes / 60);
          const mins = Math.round(totalMinutes % 60);

          return (
            <div key={project} className="flex items-start gap-2">
              <div
                className="mt-1 h-3 w-3 shrink-0 rounded-full"
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
