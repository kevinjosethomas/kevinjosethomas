"use client";

import { useState } from "react";
import ProjectsChart from "@/components/Analytics/ProjectsChart";
import ProjectsPieChart from "@/components/Analytics/ProjectsPieChart";
import type { ProcessedWorkData } from "@/lib/work";
import type { ContributionsData } from "@/lib/github";
import type {
  DailyRatingData,
  DailyScreenTimeAggregate,
  DailySleepAggregate,
  WeeklySeriesData,
} from "@/lib/analytics-data";
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
  ratingData: DailyRatingData[];
  sleepData: DailySleepAggregate[];
  screenTimeData: DailyScreenTimeAggregate[];
  workoutData: WeeklySeriesData[];
  moneyData: WeeklySeriesData[];
  githubData: ContributionsData;
  todayTimestamp: number;
};

export default function Analytics({
  workData,
  ratingData,
  sleepData,
  screenTimeData,
  workoutData,
  moneyData,
  githubData,
  todayTimestamp,
}: AnalyticsProps) {
  const filteredWorkDataAll = workData.dailyData;

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

  const pieProjectTotals: Record<string, number> = {};
  const pieWorkData = isAllTime ? filteredWorkDataAll : filteredWorkData;
  pieWorkData.forEach((d) => {
    Object.entries(d.projects).forEach(([project, minutes]) => {
      pieProjectTotals[project] = (pieProjectTotals[project] || 0) + minutes;
    });
  });

  const sleepMinutes = sleepData
    .slice(0, days)
    .reduce((sum, entry) => sum + entry.total, 0);

  const screenDateSet = new Set<string>();
  let screenMinutes = 0;
  for (const entry of screenTimeData) {
    if (!screenDateSet.has(entry.date)) {
      if (screenDateSet.size >= days) break;
      screenDateSet.add(entry.date);
    }
    if (screenDateSet.has(entry.date)) {
      screenMinutes += entry.minutes;
    }
  }

  if (!hasData) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black text-white">
        <p className="text-secondary">No work data available.</p>
      </div>
    );
  }

  const presets: TimePreset[] = [
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
            ratingData={ratingData}
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
            data={workoutData}
            days={days}
            todayTimestamp={todayTimestamp}
          />
        </div>
        <div className="border-border border-b md:col-span-2">
          <ExpenditureChart
            data={moneyData}
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
            data={sleepData}
            days={days}
            todayTimestamp={todayTimestamp}
          />
        </div>
        <div className="border-border border-b">
          <ScreenTimePieChart data={screenTimeData} days={days} />
        </div>
      </div>
    </div>
  );
}
