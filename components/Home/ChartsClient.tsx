"use client";

import dynamic from "next/dynamic";

const WorkChart = dynamic(() => import("./WorkChart"), { ssr: false });
const SleepChart = dynamic(() => import("./SleepChart"), { ssr: false });

interface ChartsClientProps {
  overviewData: Array<{ date: string; hours: number }>;
  sleepData: Array<{ date: string; hours: number }>;
}

export default function ChartsClient({
  overviewData,
  sleepData,
}: ChartsClientProps) {
  return (
    <div className="divide-border flex w-full flex-col gap-0 divide-y md:grid md:h-96 md:grid-cols-2 md:divide-x md:divide-y-0">
      <WorkChart data={overviewData} />
      <SleepChart data={sleepData} />
    </div>
  );
}
