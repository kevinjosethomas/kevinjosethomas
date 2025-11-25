import AnalyticsClient from "@/components/AnalyticsClient";
import { cacheLife } from "next/cache";
import { getWorkData } from "@/lib/work";
import {
  fetchBothSheets,
  fetchScreenTime,
  fetchWorkouts,
  fetchMoney,
} from "@/lib/sheets";
import { fetchGitHubContributions } from "@/lib/github";

export default async function AnalyticsPage() {
  "use cache";
  cacheLife("hours");

  const [workData, sheetsData, screenTimeData, workoutData, moneyData, githubData] =
    await Promise.all([
      getWorkData(2000),
      fetchBothSheets(2000),
      fetchScreenTime(2000),
      fetchWorkouts(2000),
      fetchMoney(2000),
      fetchGitHubContributions(),
    ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();

  return (
    <AnalyticsClient
      workData={workData}
      sleepData={sheetsData.sleep}
      screenTimeData={screenTimeData}
      overviewData={sheetsData.overview}
      workoutData={workoutData}
      moneyData={moneyData}
      githubData={githubData}
      todayTimestamp={todayTimestamp}
    />
  );
}
