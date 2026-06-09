import WorkChart from "./WorkChart";
import SleepChart from "./SleepChart";
import { cacheLife } from "next/cache";
import { fetchBothSheets } from "@/lib/sheets";
import { filterByCutoff } from "@/lib/analytics-data";

async function getSheetData() {
  try {
    return await fetchBothSheets(90);
  } catch {
    return null;
  }
}

export default async function Charts() {
  "use cache";
  cacheLife("hours");

  const sheetData = await getSheetData();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cutoff = new Date(today);
  cutoff.setMonth(cutoff.getMonth() - 1);
  cutoff.setHours(0, 0, 0, 0);

  const overview = sheetData
    ? filterByCutoff(sheetData.overview, cutoff, today)
    : [];
  const sleep = sheetData ? filterByCutoff(sheetData.sleep, cutoff, today) : [];

  return (
    <div className="divide-border flex w-full flex-col gap-0 divide-y md:grid md:h-96 md:grid-cols-2 md:divide-x md:divide-y-0">
      <WorkChart data={overview} />
      <SleepChart data={sleep} />
    </div>
  );
}
