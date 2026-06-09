import AnalyticsClient from "@/components/Analytics/Analytics";
import { cacheLife } from "next/cache";
import { getWorkData } from "@/lib/work";
import { fetchBothSheets, fetchWorkouts, fetchMoney } from "@/lib/sheets";
import { fetchGitHubContributions } from "@/lib/github";
import {
  aggregateMoneyData,
  aggregateSleepData,
  aggregateWorkoutData,
  filterByDateRange,
} from "@/lib/analytics-data";

const ANALYTICS_WINDOW_DAYS = 90;

export default async function AnalyticsPage() {
  "use cache";
  cacheLife("hours");

  // Hold the page one month behind the current date: nothing newer than the
  // cutoff is shown, so the dashboard isn't a live feed. Dates are parsed
  // against the real `today` (for correct year inference) but the page treats
  // the cutoff as "today" everywhere downstream.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cutoff = new Date(today);
  cutoff.setMonth(cutoff.getMonth() - 1);
  cutoff.setHours(0, 0, 0, 0);
  const cutoffTimestamp = cutoff.getTime();

  const windowStart = new Date(cutoff);
  windowStart.setDate(cutoff.getDate() - ANALYTICS_WINDOW_DAYS + 1);
  windowStart.setHours(0, 0, 0, 0);
  const windowStartTimestamp = windowStart.getTime();

  const [
    workData,
    sheetsData,
    rawWorkoutData,
    rawMoneyData,
    githubData,
  ] = await Promise.all([
    getWorkData(
      2000,
      cutoffTimestamp,
      today.getTime(),
      windowStartTimestamp,
    ),
    fetchBothSheets(2000),
    fetchWorkouts(2000),
    fetchMoney(2000),
    fetchGitHubContributions(),
  ]);

  const sleep = filterByDateRange(sheetsData.sleep, windowStart, cutoff, today);
  const workouts = filterByDateRange(
    rawWorkoutData,
    windowStart,
    cutoff,
    today,
  );
  const money = filterByDateRange(rawMoneyData, windowStart, cutoff, today);

  const sleepData = aggregateSleepData(sleep);
  const workoutData = aggregateWorkoutData(workouts, cutoffTimestamp);
  const moneyData = aggregateMoneyData(money, cutoffTimestamp);

  return (
    <AnalyticsClient
      workData={workData}
      sleepData={sleepData}
      workoutData={workoutData}
      moneyData={moneyData}
      githubData={githubData}
      todayTimestamp={cutoffTimestamp}
    />
  );
}
