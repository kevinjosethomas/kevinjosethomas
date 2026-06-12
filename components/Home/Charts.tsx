import WorkChart from "./WorkChart";
import SleepChart from "./SleepChart";
import { cacheLife } from "next/cache";
import { fetchBothSheets } from "@/lib/sheets";
import { getWorkData } from "@/lib/work";
import { filterByCutoff } from "@/lib/analytics-data";

const WORK_CHART_DAYS = 7;

async function getSheetData() {
  try {
    return await fetchBothSheets(90);
  } catch {
    return null;
  }
}

async function getHomeWorkData(cutoff: Date, today: Date) {
  const windowStart = new Date(cutoff);
  windowStart.setDate(cutoff.getDate() - WORK_CHART_DAYS + 1);
  windowStart.setHours(0, 0, 0, 0);

  try {
    return await getWorkData(
      2000,
      cutoff.getTime(),
      today.getTime(),
      windowStart.getTime(),
    );
  } catch {
    return null;
  }
}

export default async function Charts() {
  "use cache";
  cacheLife("hours");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cutoff = new Date(today);
  cutoff.setMonth(cutoff.getMonth() - 1);
  cutoff.setHours(0, 0, 0, 0);

  const [sheetData, workData] = await Promise.all([
    getSheetData(),
    getHomeWorkData(cutoff, today),
  ]);

  const sleep = sheetData ? filterByCutoff(sheetData.sleep, cutoff, today) : [];

  return (
    <div className="divide-border flex w-full flex-col gap-0 divide-y md:grid md:h-96 md:grid-cols-2 md:divide-x md:divide-y-0">
      <WorkChart
        data={workData?.dailyData ?? null}
        todayTimestamp={cutoff.getTime()}
      />
      <SleepChart data={sleep} />
    </div>
  );
}
