import AnalyticsClient from "@/components/Analytics/Analytics";
import { cacheLife } from "next/cache";
import { getWorkData } from "@/lib/work";
import {
  fetchBothSheets,
  fetchScreenTime,
  fetchWorkouts,
  fetchMoney,
} from "@/lib/sheets";
import { fetchGitHubContributions } from "@/lib/github";
import {
  aggregateMoneyData,
  aggregateRatings,
  aggregateScreenTimeData,
  aggregateSleepData,
  aggregateWorkoutData,
} from "@/lib/analytics-data";

export default async function AnalyticsPage() {
  "use cache";
  cacheLife("hours");

  const [
    workData,
    sheetsData,
    rawScreenTimeData,
    rawWorkoutData,
    rawMoneyData,
    githubData,
  ] = await Promise.all([
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

  const ratingData = aggregateRatings(sheetsData.overview);
  const sleepData = aggregateSleepData(sheetsData.sleep, sheetsData.overview);
  const screenTimeData = aggregateScreenTimeData(rawScreenTimeData);
  const workoutData = aggregateWorkoutData(rawWorkoutData, todayTimestamp);
  const moneyData = aggregateMoneyData(rawMoneyData, todayTimestamp);

  return (
    <AnalyticsClient
      workData={workData}
      ratingData={ratingData}
      sleepData={sleepData}
      screenTimeData={screenTimeData}
      workoutData={workoutData}
      moneyData={moneyData}
      githubData={githubData}
      todayTimestamp={todayTimestamp}
    />
  );
}
