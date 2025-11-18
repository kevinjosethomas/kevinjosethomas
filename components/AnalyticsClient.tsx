"use client";

import { useState } from "react";
import ProjectBreakdownChart from "@/components/ProjectBreakdownChart";
import type { ProcessedWorkData } from "@/lib/work";

type TimePreset = {
  label: string;
  days: number | "all";
};

type AnalyticsClientProps = {
  workData: ProcessedWorkData;
};

export default function AnalyticsClient({ workData }: AnalyticsClientProps) {
  const hasData = workData.dailyData.length > 0;
  const defaultDays = hasData ? Math.min(30, workData.dailyData.length) : 0;
  const [days, setDays] = useState(defaultDays);

  if (!hasData) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black text-white">
        <p className="text-secondary">No work data available.</p>
      </div>
    );
  }

  const presets: TimePreset[] = [
    { label: "14d", days: 14 },
    { label: "30d", days: 30 },
    { label: "6m", days: 180 },
    { label: "1y", days: 365 },
    { label: "all", days: "all" },
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
      <div className="grid w-full grid-cols-2">
        <div className="flex flex-col">
          <div className="border-border flex items-center justify-between border-b p-4">
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
                    className={`border-border border px-2 py-1 text-xs transition-colors ${
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
        <div className="border-border border-l"></div>
      </div>
    </div>
  );
}
