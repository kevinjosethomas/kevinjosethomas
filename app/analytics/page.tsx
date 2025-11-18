import AnalyticsClient from "@/components/AnalyticsClient";
import { cacheLife } from "next/cache";
import { getWorkData } from "@/lib/work";

export default async function AnalyticsPage() {
  "use cache";
  cacheLife("hours");

  const workData = await getWorkData(2000);

  return <AnalyticsClient workData={workData} />;
}
