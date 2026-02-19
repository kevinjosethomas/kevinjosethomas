"use client";

import { useState } from "react";
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
