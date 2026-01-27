import dynamic from "next/dynamic";
import { cacheLife } from "next/cache";
import { fetchBothSheets } from "@/lib/sheets";

const WorkChart = dynamic(() => import("./WorkChart"), { ssr: false });
const SleepChart = dynamic(() => import("./SleepChart"), { ssr: false });

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
