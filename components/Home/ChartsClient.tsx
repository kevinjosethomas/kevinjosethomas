"use client";

import { Suspense, useState, useEffect } from "react";
import WorkChart from "./WorkChart";
import SleepChart from "./SleepChart";

interface ChartsClientProps {
  overviewData: Array<{ date: string; workScore: string }>;
  sleepData: Array<{ date: string; start: string; end: string }>;
}

export default function ChartsClient({
  overviewData,
  sleepData,
}: ChartsClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="divide-border flex w-full flex-col gap-0 divide-y md:grid md:h-96 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="min-h-[300px]" />
        <div className="min-h-[300px]" />
      </div>
    );
  }

  return (
    <div className="divide-border flex w-full flex-col gap-0 divide-y md:grid md:h-96 md:grid-cols-2 md:divide-x md:divide-y-0">
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <WorkChart data={overviewData} />
      </Suspense>
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <SleepChart data={sleepData} />
      </Suspense>
    </div>
  );
}
