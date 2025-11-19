"use client";

import { useState } from "react";
import ProjectBreakdownChart from "@/components/ProjectBreakdownChart";
import ProjectTotalsPie from "@/components/ProjectTotalsPie";
import type { ProcessedWorkData } from "@/lib/work";
import type {
  SleepData,
  ScreenTimeData,
  OverviewData,
  WorkoutData,
  MoneyData,
} from "@/lib/sheets";
import SleepMetricsChart from "@/components/SleepMetricsChart";
import ScreenTimePie from "@/components/ScreenTimePie";
import WorkoutWeeklyChart from "@/components/WorkoutWeeklyChart";
import MoneyWeeklyChart from "@/components/MoneyWeeklyChart";

type TimePreset = {
  label: string;
  days: number | "all";
};

type AnalyticsClientProps = {
  workData: ProcessedWorkData;
  sleepData: SleepData[];
  screenTimeData: ScreenTimeData[];
  overviewData: OverviewData[];
  workoutData: WorkoutData[];
  moneyData: MoneyData[];
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

export default function AnalyticsClient({
  workData,
  sleepData,
  screenTimeData,
  overviewData,
  workoutData,
  moneyData,
  todayTimestamp,
}: AnalyticsClientProps) {
  const today = new Date(todayTimestamp);

  const filteredWorkDataAll = workData.dailyData.filter((d) => {
    const dataDate = new Date(d.date);
    return dataDate < today;
  });

  const filteredSleepDataAll = sleepData.filter((d) => {
    const dataDate = new Date(d.date);
    return dataDate < today;
  });

  const filteredScreenTimeDataAll = screenTimeData.filter((d) => {
    const dataDate = new Date(d.date);
    return dataDate < today;
  });

  const filteredOverviewDataAll = overviewData.filter((d) => {
    const dataDate = new Date(d.date);
    return dataDate < today;
  });

  const filteredWorkoutDataAll = workoutData.filter((d) => {
    const dataDate = new Date(d.date);
    return dataDate < today;
  });

  const filteredMoneyDataAll = moneyData.filter((d) => {
    const dataDate = new Date(d.date);
    return dataDate < today;
  });

  const hasData = filteredWorkDataAll.length > 0;
  const defaultDays = hasData ? Math.min(90, filteredWorkDataAll.length) : 0;
  const [days, setDays] = useState(defaultDays);

  const isAllTime = days === filteredWorkDataAll.length;

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
      setDays(filteredWorkDataAll.length);
    } else {
      setDays(Math.min(preset.days, filteredWorkDataAll.length));
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white">
      {/* Top Bar: Time Controls */}
      <div className="border-border flex h-14 items-center justify-between border-b px-4">
        <p className="text-sm font-medium">Analytics</p>
        <div className="flex items-center gap-2">
          {presets.map((preset) => {
            const isActive =
              preset.days === "all"
                ? days === filteredWorkDataAll.length
                : days === preset.days;
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
          <ProjectBreakdownChart
            data={filteredWorkDataAll}
            overviewData={filteredOverviewDataAll}
            days={days}
          />
        </div>
        <div className="border-border border-b">
          <ProjectTotalsPie
            projectTotals={filteredProjectTotals}
            sleepMinutes={sleepMinutes}
            screenMinutes={screenMinutes}
          />
        </div>
      </div>

      <div className="divide-border grid w-full grid-cols-1 md:grid-cols-4 md:divide-x">
        <div className="border-border border-b md:col-span-2">
          <WorkoutWeeklyChart
            data={filteredWorkoutDataAll}
            days={days}
            todayTimestamp={todayTimestamp}
          />
        </div>
        <div className="border-border border-b md:col-span-2">
          <MoneyWeeklyChart
            data={filteredMoneyDataAll}
            days={days}
            todayTimestamp={todayTimestamp}
          />
        </div>
      </div>

      <div className="divide-border grid w-full grid-cols-1 md:grid-cols-4 md:divide-x">
        <div className="border-border border-b md:col-span-3">
          <SleepMetricsChart
            data={filteredSleepDataAll}
            overviewData={filteredOverviewDataAll}
            days={days}
          />
        </div>
        <div className="border-border border-b">
          <ScreenTimePie data={filteredScreenTimeDataAll} days={days} />
        </div>
      </div>
    </div>
  );
}
