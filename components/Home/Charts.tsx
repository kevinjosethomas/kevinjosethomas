import { cacheLife } from "next/cache";
import { fetchBothSheets } from "@/lib/sheets";
import ChartsClient from "./ChartsClient";

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
    <ChartsClient
      overviewData={sheetData?.overview ?? []}
      sleepData={sheetData?.sleep ?? []}
    />
  );
}
