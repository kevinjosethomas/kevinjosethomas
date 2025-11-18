import AnalyticsClient from "@/components/AnalyticsClient";
import { cacheLife } from "next/cache";
import { getWorkData } from "@/lib/work";
import { fetchBothSheets, fetchScreenTime } from "@/lib/sheets";

export default async function AnalyticsPage() {
  "use cache";
  cacheLife("hours");

  const [workData, sheetsData, screenTimeData] = await Promise.all([
    getWorkData(2000),
    fetchBothSheets(2000),
    fetchScreenTime(2000),
  ]);

  return (
    <AnalyticsClient
      workData={workData}
      sleepData={sheetsData.sleep}
      screenTimeData={screenTimeData}
      overviewData={sheetsData.overview}
    />
  );
}
