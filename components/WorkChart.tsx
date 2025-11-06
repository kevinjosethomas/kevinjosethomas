"use client";

import { Tooltip } from "recharts";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Dot,
} from "recharts";
import InfoTooltip from "./InfoTooltip";

type DataPoint = {
  date: string;
  workScore: string;
};

type WorkScoreChartProps = {
  data: DataPoint[];
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload?: {
      fullDate?: string;
    };
  }>;
  coordinate?: {
    x: number;
    y: number;
  };
};

function CustomTooltip({ active, payload, coordinate }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const score = payload[0]?.value || 0;
    const fullDate = payload[0]?.payload?.fullDate || "";

    const hours = (score / 100) * 4;
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);

    let left = coordinate?.x;
    let top = coordinate?.y;

    const allDots = document.querySelectorAll("circle.recharts-dot");

    for (const dot of allDots) {
      const r = dot.getAttribute("r");
      if (r === "6") {
        const cx = dot.getAttribute("cx");
        const cy = dot.getAttribute("cy");
        if (cx && cy) {
          left = Math.round(Number(cx));
          top = Math.round(Number(cy));
          break;
        }
      }
    }

    if (left === undefined || top === undefined) return null;

    return (
      <div
        className="border-border pointer-events-none flex w-24 flex-col border bg-black px-2 py-1 text-sm"
        style={{
          position: "absolute",
          left: `${left}px`,
          top: `${top}px`,
          transform: "translate(-50%, -120%)",
        }}
      >
        <p className="text-secondary text-xs">{fullDate}</p>
        <p className="font-medium">
          {wholeHours}h {minutes}m
        </p>
      </div>
    );
  }
  return null;
}

export default function WorkChart({ data }: WorkScoreChartProps) {
  if (!data || data.length === 0) return null;

  const last7Days = data.slice(0, 7).reverse();

  const chartData = last7Days.map((d) => {
    const dateParts = d.date.split(",");
    const dayOfWeek = dateParts[0];
    const dateStr = dateParts[1]?.trim();
    const formattedDate = `${dayOfWeek}, ${dateStr}`;

    return {
      day: dayOfWeek.slice(0, 3),
      score: parseInt(d.workScore) || 0,
      fullDate: formattedDate,
    };
  });

  return (
    <div className="flex flex-col outline-none **:outline-none focus:outline-none **:focus:outline-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="currentColor" stopOpacity={0.25} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            stroke="currentColor"
            strokeOpacity={0.1}
          />
          <XAxis dataKey="day" hide />
          <YAxis hide tickCount={6} />
          <Tooltip
            cursor={false}
            isAnimationActive={false}
            content={<CustomTooltip />}
          />
          <Area
            type="linear"
            dataKey="score"
            stroke="currentColor"
            strokeWidth={2}
            fill="url(#colorGradient)"
            dot={
              <Dot r={4} fill="currentColor" fillOpacity={1} strokeWidth={0} />
            }
            activeDot={{
              r: 6,
              fill: "currentColor",
              fillOpacity: 1,
              strokeWidth: 0,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="border-border flex items-center justify-between border-t px-4 py-2">
        <div />
        <p className="text-secondary text-sm">Time Spent in Deep Work (7d)</p>
        <InfoTooltip content="This chart shows the total time I've dedicated 100% of my focus into working on a single task over the last 7 days." />
      </div>
    </div>
  );
}
