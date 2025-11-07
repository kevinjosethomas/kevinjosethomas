import WorkChart from "./WorkChart";
import SleepChart from "./SleepChart";
import { cacheLife } from "next/cache";
import { fetchBothSheets } from "@/lib/sheets";

async function getSheetData() {
  try {
    return await fetchBothSheets(15);
  } catch {
    return null;
  }
}

export default async function Charts() {
  "use cache";
  cacheLife("hours");

  const sheetData = await getSheetData();
  return (
    <div className="divide-border flex w-full flex-col gap-0 divide-y md:grid md:h-96 md:grid-cols-2 md:divide-x md:divide-y-0">
      <WorkChart data={sheetData?.overview ?? []} />
      <SleepChart data={sheetData?.sleep ?? []} />
    </div>
  );
}
