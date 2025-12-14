"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ProjectsChart from "@/components/Analytics/ProjectsChart";
import ProjectsPieChart from "@/components/Analytics/ProjectsPieChart";
import type { ProcessedWorkData } from "@/lib/work";
import type {
  SleepData,
  ScreenTimeData,
  OverviewData,
  WorkoutData,
  MoneyData,
} from "@/lib/sheets";
import type { ContributionsData } from "@/lib/github";
import SleepTrendsChart from "@/components/Analytics/SleepTrendsChart";
import ScreenTimePieChart from "@/components/Analytics/ScreenTimePieChart";
import WorkoutsChart from "@/components/Analytics/WorkoutsChart";
import ExpenditureChart from "@/components/Analytics/ExpenditureChart";
import ContributionsChart from "@/components/Analytics/ContributionsChart";
import Tooltip from "@/components/Common/Tooltip";

type TimePreset = {
  label: string;
  days: number | "all";
};

type AnalyticsProps = {
  workData: ProcessedWorkData;
  sleepData: SleepData[];
  screenTimeData: ScreenTimeData[];
  overviewData: OverviewData[];
  workoutData: WorkoutData[];
  moneyData: MoneyData[];
  githubData: ContributionsData;
  todayTimestamp: number;
};

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr || timeStr.trim() === "") return 0;

  const hourMatch = timeStr.match(/(\d+)h/);
  const minuteMatch = timeStr.match(/(\d+)m/);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

  return hours * 60 + minutes;
}

export default function Analytics({
  workData,
  sleepData,
  screenTimeData,
  overviewData,
  workoutData,
  moneyData,
  githubData,
  todayTimestamp,
}: AnalyticsProps) {
  const filteredWorkDataAll = workData.dailyData;
  const filteredSleepDataAll = sleepData;
  const filteredScreenTimeDataAll = screenTimeData;
  const filteredOverviewDataAll = overviewData;
  const filteredWorkoutDataAll = workoutData;
  const filteredMoneyDataAll = moneyData;

  const hasData = filteredWorkDataAll.length > 0;
  const defaultDays = hasData ? Math.min(90, filteredWorkDataAll.length) : 0;
  const [days, setDays] = useState(defaultDays);
  const [isAllTime, setIsAllTime] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTargetRef = useRef<number | null>(null);
  const cursorCurrentRef = useRef(50);
  const cursorAnimationFrameRef = useRef<number | null>(null);
  const clipRectRef = useRef<SVGRectElement | null>(null);

  const updateClipWidth = useCallback((percent: number) => {
    if (!clipRectRef.current) return;
    const normalized = Math.min(1, Math.max(0, percent / 100));
    clipRectRef.current.setAttribute("width", normalized.toString());
  }, []);

  const animateCursor = () => {
    if (!cursorRef.current || cursorTargetRef.current === null) {
      cursorAnimationFrameRef.current = null;
      return;
    }

    const current = cursorCurrentRef.current;
    const target = cursorTargetRef.current;
    const delta = target - current;

    if (Math.abs(delta) < 0.1) {
      cursorCurrentRef.current = target;
      cursorRef.current.style.left = `${target}%`;
      updateClipWidth(target);
      cursorAnimationFrameRef.current = null;
      return;
    }

    const next = current + delta * 0.2;
    cursorCurrentRef.current = next;
    cursorRef.current.style.left = `${next}%`;
    updateClipWidth(next);
    cursorAnimationFrameRef.current = requestAnimationFrame(animateCursor);
  };

  const requestCursorAnimation = () => {
    if (cursorAnimationFrameRef.current === null) {
      cursorAnimationFrameRef.current = requestAnimationFrame(animateCursor);
    }
  };

  useEffect(() => {
    updateClipWidth(cursorCurrentRef.current);

    return () => {
      if (cursorAnimationFrameRef.current !== null) {
        cancelAnimationFrame(cursorAnimationFrameRef.current);
      }
    };
  }, [updateClipWidth]);

  const cutoffDate = new Date("2025-04-06");
  let workDataToUse = filteredWorkDataAll;

  if (!isAllTime) {
    workDataToUse = filteredWorkDataAll.filter((d) => {
      const parsedDate = new Date(d.date);
      return parsedDate >= cutoffDate;
    });
  }

  const filteredWorkData = workDataToUse.slice(0, days);

  const filteredProjectTotals: Record<string, number> = {};
  filteredWorkData.forEach((d) => {
    Object.entries(d.projects).forEach(([project, minutes]) => {
      filteredProjectTotals[project] =
        (filteredProjectTotals[project] || 0) + minutes;
    });
  });

  const pieProjectTotals: Record<string, number> = {};
  const pieWorkData = isAllTime ? filteredWorkDataAll : filteredWorkData;
  pieWorkData.forEach((d) => {
    Object.entries(d.projects).forEach(([project, minutes]) => {
      pieProjectTotals[project] = (pieProjectTotals[project] || 0) + minutes;
    });
  });

  const filteredSleepData = filteredSleepDataAll.slice(0, days);
  const sleepMinutes = filteredSleepData.reduce((sum, entry) => {
    return sum + parseTimeToMinutes(entry.time);
  }, 0);

  const screenDateSet = new Set<string>();
  const filteredScreenData: ScreenTimeData[] = [];
  for (const entry of filteredScreenTimeDataAll) {
    if (!screenDateSet.has(entry.date)) {
      if (screenDateSet.size >= days) break;
      screenDateSet.add(entry.date);
    }
    if (screenDateSet.has(entry.date)) {
      filteredScreenData.push(entry);
    }
  }
  const screenMinutes = filteredScreenData.reduce((sum, entry) => {
    return sum + parseTimeToMinutes(entry.duration);
  }, 0);

  if (!hasData) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black text-white">
        <p className="text-secondary">No work data available.</p>
      </div>
    );
  }

  const presets: TimePreset[] = [
    { label: "14d", days: 14 },
    { label: "1m", days: 30 },
    { label: "3m", days: 90 },
    { label: "6m", days: 180 },
    { label: "All", days: "all" },
  ];

  const handlePresetClick = (preset: TimePreset) => {
    if (preset.days === "all") {
      setDays(10000);
      setIsAllTime(true);
    } else {
      setDays(preset.days);
      setIsAllTime(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white">
      {/* Hero Section */}
      <div className="border-border relative flex flex-col items-start justify-center overflow-hidden border-b px-8 py-10 text-left md:px-20 md:py-32 xl:py-48">
        {/* Cursor line */}
        <div
          ref={cursorRef}
          className="pointer-events-none absolute top-0 z-20 h-full"
          style={{
            transform: "translateX(-50%)",
            left: "50%",
            opacity: 0,
            width: "1px",
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(17,24,39,0.35))",
            transition: "opacity 150ms ease",
          }}
        />
        {/* Decorative line graph with grid */}
        <div
          ref={chartRef}
          className="absolute inset-0 flex items-center justify-center"
          onMouseMove={(e) => {
            if (chartRef.current && cursorRef.current) {
              const rect = chartRef.current.getBoundingClientRect();
              if (rect.width <= 0) return;
              const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
              const clampedX = Math.min(100, Math.max(0, relativeX));
              cursorTargetRef.current = clampedX;
              cursorRef.current.style.opacity = "1";
              requestCursorAnimation();
            }
          }}
          onMouseLeave={() => {
            cursorTargetRef.current = null;
            if (cursorAnimationFrameRef.current !== null) {
              cancelAnimationFrame(cursorAnimationFrameRef.current);
              cursorAnimationFrameRef.current = null;
            }
            if (cursorRef.current) {
              cursorRef.current.style.opacity = "0";
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
            <AreaChart
              data={[
                { x: 0, y: 2 },
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 3 },
                { x: 4, y: 4 },
                { x: 5, y: 4 },
                { x: 6, y: 5 },
                { x: 7, y: 5 },
                { x: 8, y: 5 },
                { x: 9, y: 6 },
              ]}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DC4A15" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#DC4A15" stopOpacity={0} />
                </linearGradient>
                <clipPath
                  id="heroGradientClip"
                  clipPathUnits="objectBoundingBox"
                >
                  <rect
                    ref={(node) => {
                      clipRectRef.current = node;
                    }}
                    x="0"
                    y="0"
                    width="0.5"
                    height="1"
                  />
                </clipPath>
              </defs>
              <CartesianGrid
                strokeDasharray="0"
                stroke="white"
                strokeOpacity={0.1}
              />
              <XAxis
                dataKey="x"
                hide
                type="number"
                domain={[0, 9]}
                ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              />
              <YAxis
                hide
                type="number"
                domain={[0, 6]}
                ticks={[0, 1, 2, 3, 4, 5, 6]}
              />
              <Area
                type="linear"
                dataKey="y"
                stroke="none"
                fill="url(#heroGradient)"
                clipPath="url(#heroGradientClip)"
                isAnimationActive={false}
              />
              <Area
                type="linear"
                dataKey="y"
                stroke="#DC4A15"
                strokeWidth={2.5}
                fill="none"
                dot={{
                  fill: "#DC4A15",
                  r: 5,
                  fillOpacity: 1,
                  strokeWidth: 0,
                }}
                activeDot={{
                  fill: "#DC4A15",
                  r: 6,
                  fillOpacity: 0.8,
                  strokeWidth: 0,
                }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="pointer-events-none relative z-10 flex max-w-lg flex-col items-start gap-2 md:gap-4">
          <h1 className="text-2xl font-bold tracking-tight md:text-6xl">
            Analytics
          </h1>
          <p className="text-secondary text-base leading-relaxed md:text-lg">
            I track my time, health, mood and money—mostly automatically—to
            understand the patterns that shape my life. Data is the closest
            thing we have to truth; the better we use it, the better we live.
            <Tooltip
              number={1}
              content="Eventually, this data could be useful to LLMs: understanding my patterns, helping me make better decisions, and creating context-aware agents that can help me leverage my time  more effectively."
            />
          </p>
        </div>
      </div>

      {/* Time Controls */}
      <div className="border-border flex h-14 items-center justify-between border-b px-4">
        <p className="text-sm font-medium">Time Range</p>
        <div className="flex items-center gap-2">
          {presets.map((preset) => {
            const isActive =
              preset.days === "all"
                ? isAllTime
                : !isAllTime && days === preset.days;
            return (
              <button
                key={preset.label}
                onClick={() => handlePresetClick(preset)}
                className={`border-border cursor-pointer border px-2 py-1 text-xs transition-colors ${
                  isActive
                    ? "bg-white text-black"
                    : "text-secondary bg-black hover:bg-white/10"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* First Row: Work Sessions */}
      <div className="divide-border grid w-full grid-cols-1 md:grid-cols-4 md:divide-x">
        <div className="border-border flex flex-col border-b md:col-span-3 md:border-b-0">
          <ProjectsChart
            data={filteredWorkDataAll}
            overviewData={filteredOverviewDataAll}
            days={days}
            todayTimestamp={todayTimestamp}
          />
        </div>
        <div className="border-border border-b">
          <ProjectsPieChart
            projectTotals={pieProjectTotals}
            sleepMinutes={sleepMinutes}
            screenMinutes={screenMinutes}
          />
        </div>
      </div>

      <div className="divide-border grid w-full grid-cols-1 md:grid-cols-4 md:divide-x">
        <div className="border-border border-b md:col-span-2">
          <WorkoutsChart
            data={filteredWorkoutDataAll}
            days={days}
            todayTimestamp={todayTimestamp}
          />
        </div>
        <div className="border-border border-b md:col-span-2">
          <ExpenditureChart
            data={filteredMoneyDataAll}
            days={days}
            todayTimestamp={todayTimestamp}
          />
        </div>
      </div>

      <div className="divide-border grid w-full grid-cols-1">
        <div className="border-border border-b">
          <ContributionsChart data={githubData} />
        </div>
      </div>

      <div className="divide-border grid w-full grid-cols-1 md:grid-cols-4 md:divide-x">
        <div className="border-border border-b md:col-span-3">
          <SleepTrendsChart
            data={filteredSleepDataAll}
            overviewData={filteredOverviewDataAll}
            days={days}
            todayTimestamp={todayTimestamp}
          />
        </div>
        <div className="border-border border-b">
          <ScreenTimePieChart data={filteredScreenTimeDataAll} days={days} />
        </div>
      </div>
    </div>
  );
}
