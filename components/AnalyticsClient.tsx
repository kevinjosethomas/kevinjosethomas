"use client";

import { useState } from "react";
import ProjectBreakdownChart from "@/components/ProjectBreakdownChart";
import ProjectTotalsPie from "@/components/ProjectTotalsPie";
import type { ProcessedWorkData } from "@/lib/work";
import type { SleepData, ScreenTimeData } from "@/lib/sheets";

type TimePreset = {
  label: string;
  days: number | "all";
};

type AnalyticsClientProps = {
  workData: ProcessedWorkData;
  sleepData: SleepData[];
  screenTimeData: ScreenTimeData[];
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
}: AnalyticsClientProps) {
  const hasData = workData.dailyData.length > 0;
  const defaultDays = hasData ? Math.min(14, workData.dailyData.length) : 0;
  const [days, setDays] = useState(defaultDays);

  const sleepMinutes = sleepData.reduce((sum, entry) => {
    return sum + parseTimeToMinutes(entry.time);
  }, 0);

  const screenMinutes = screenTimeData.reduce((sum, entry) => {
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
  ];

  const handlePresetClick = (preset: TimePreset) => {
    if (preset.days === "all") {
      setDays(workData.dailyData.length);
    } else {
      setDays(Math.min(preset.days, workData.dailyData.length));
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      <div className="divide-border grid w-full grid-cols-4 divide-x">
        <div className="col-span-3 flex flex-col">
          <div className="border-border flex h-14 items-center justify-between border-b px-4">
            <p className="text-sm font-medium">Work Sessions</p>
            <div className="flex items-center gap-2">
              {presets.map((preset) => {
                const isActive =
                  preset.days === "all"
                    ? days === workData.dailyData.length
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
          <div>
            <ProjectBreakdownChart data={workData.dailyData} days={days} />
          </div>
        </div>
        <div className="border-border border-b">
          <ProjectTotalsPie
            projectTotals={workData.projectTotals}
            sleepMinutes={sleepMinutes}
            screenMinutes={screenMinutes}
          />
        </div>
      </div>
    </div>
  );
}
