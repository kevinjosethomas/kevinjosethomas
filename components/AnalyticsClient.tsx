"use client";

import { useState } from "react";
import ProjectBreakdownChart from "@/components/ProjectBreakdownChart";
import ProjectTotalsPie from "@/components/ProjectTotalsPie";
import type { ProcessedWorkData } from "@/lib/work";
import type { SleepData, ScreenTimeData, OverviewData } from "@/lib/sheets";
import SleepMetricsChart from "@/components/SleepMetricsChart";
import ScreenTimePie from "@/components/ScreenTimePie";

type TimePreset = {
  label: string;
  days: number | "all";
};

type AnalyticsClientProps = {
  workData: ProcessedWorkData;
  sleepData: SleepData[];
  screenTimeData: ScreenTimeData[];
  overviewData: OverviewData[];
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
}: AnalyticsClientProps) {
  // Filter out today's data - only include data up to yesterday
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  const hasData = filteredWorkDataAll.length > 0;
  const defaultDays = hasData ? Math.min(14, filteredWorkDataAll.length) : 0;
  const [days, setDays] = useState(defaultDays);
  const [showWorkRating, setShowWorkRating] = useState(false);
  const [showSleepRating, setShowSleepRating] = useState(false);

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
    { label: "7d", days: 7 },
    { label: "14d", days: 14 },
    { label: "1m", days: 30 },
    { label: "3m", days: 90 },
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
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
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
      <div className="divide-border grid w-full grid-cols-4 divide-x">
        <div className="col-span-3 flex flex-col">
          <ProjectBreakdownChart
            data={filteredWorkDataAll}
            overviewData={filteredOverviewDataAll}
            days={days}
            showRating={showWorkRating}
            onToggleRating={() => setShowWorkRating(!showWorkRating)}
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

      <div className="divide-border grid w-full grid-cols-4 divide-x">
        <div className="border-border col-span-3 border-b">
          <SleepMetricsChart
            data={filteredSleepDataAll}
            overviewData={filteredOverviewDataAll}
            days={days}
            showRating={showSleepRating}
            onToggleRating={() => setShowSleepRating(!showSleepRating)}
          />
        </div>
        <div className="border-border border-b">
          <ScreenTimePie data={filteredScreenTimeDataAll} days={days} />
        </div>
      </div>
    </div>
  );
}
