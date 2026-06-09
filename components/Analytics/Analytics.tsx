"use client";

import ProjectsChart from "@/components/Analytics/ProjectsChart";
import ProjectsPieChart from "@/components/Analytics/ProjectsPieChart";
import type { ProcessedWorkData } from "@/lib/work";
import type { ContributionsData } from "@/lib/github";
import type {
  DailySleepAggregate,
  WeeklySeriesData,
} from "@/lib/analytics-data";
import SleepTrendsChart from "@/components/Analytics/SleepTrendsChart";
import WorkoutsChart from "@/components/Analytics/WorkoutsChart";
import ExpenditureChart from "@/components/Analytics/ExpenditureChart";
import ContributionsChart from "@/components/Analytics/ContributionsChart";
import ProductiveHoursChart from "@/components/Analytics/ProductiveHoursChart";

const ANALYTICS_WINDOW_DAYS = 90;

type AnalyticsProps = {
  workData: ProcessedWorkData;
  sleepData: DailySleepAggregate[];
  workoutData: WeeklySeriesData[];
  moneyData: WeeklySeriesData[];
  githubData: ContributionsData;
  todayTimestamp: number;
};

export default function Analytics({
  workData,
  sleepData,
  workoutData,
  moneyData,
  githubData,
  todayTimestamp,
}: AnalyticsProps) {
  const filteredWorkDataAll = workData.dailyData;

  const hasData = filteredWorkDataAll.length > 0;
  const days = ANALYTICS_WINDOW_DAYS;

  const cutoffDate = new Date("2025-04-06");
  const workDataToUse = filteredWorkDataAll.filter((d) => {
    const parsedDate = new Date(d.date);
    return parsedDate >= cutoffDate;
  });

  const filteredWorkData = workDataToUse.slice(0, days);

  const pieProjectTotals: Record<string, number> = {};
  filteredWorkData.forEach((d) => {
    Object.entries(d.projects).forEach(([project, minutes]) => {
      pieProjectTotals[project] = (pieProjectTotals[project] || 0) + minutes;
    });
  });

  const sleepMinutes = sleepData
    .slice(0, days)
    .reduce((sum, entry) => sum + entry.total, 0);

  if (!hasData) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-black text-white">
        <p className="text-secondary">No work data available.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col overflow-x-hidden bg-black text-white">
      {/* First Row: Work Sessions */}
      <div className="divide-border grid w-full grid-cols-1 md:grid-cols-4 md:divide-x">
        <div className="border-border flex flex-col border-b md:col-span-3 md:border-b-0">
          <ProjectsChart
            data={filteredWorkDataAll}
            days={days}
            todayTimestamp={todayTimestamp}
          />
        </div>
        <div className="border-border border-b">
          <ProjectsPieChart
            projectTotals={pieProjectTotals}
            sleepMinutes={sleepMinutes}
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
          <ProductiveHoursChart data={workData.hourHeatmapData} />
        </div>
      </div>
    </div>
  );
}
