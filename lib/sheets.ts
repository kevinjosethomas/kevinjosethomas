import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

const REQUIRED_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const SERVICE_ACCOUNT_PRIVATE_KEY = JSON.parse(
  process.env.GOOGLE_PRIVATE_KEY as string,
).private_key;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID as string;
const SLEEP_WORKSHEET_ID = parseInt(process.env.SLEEP_WORKSHEET_ID as string);
const OVERVIEW_WORKSHEET_ID = parseInt(
  process.env.OVERVIEW_WORKSHEET_ID as string,
);
const WORK_WORKSHEET_ID = parseInt(process.env.WORK_WORKSHEET_ID as string);
const WORKOUT_WORKSHEET_ID = parseInt(
  process.env.WORKOUT_WORKSHEET_ID as string,
);
const MONEY_WORKSHEET_ID = parseInt(process.env.MONEY_WORKSHEET_ID as string);
const SCREENTIME_WORKSHEET_ID = parseInt(
  process.env.SCREENTIME_WORKSHEET_ID as string,
);

type SheetRow = Record<string, unknown>;

export type FetchSheetRowsOptions = {
  spreadsheetId?: string;
  worksheetId?: number;
  worksheetTitle?: string;
  limit?: number;
};

async function loadWorksheet(worksheetId: number) {
  const auth = new JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const document = new GoogleSpreadsheet(SPREADSHEET_ID, auth);
  await document.loadInfo();

  return document.sheetsById[worksheetId];
}

export async function fetchSheetRows(
  options: FetchSheetRowsOptions = {},
): Promise<SheetRow[]> {
  const worksheetId = options.worksheetId as number;
  const worksheet = await loadWorksheet(worksheetId);
  const { limit } = options;

  await worksheet.loadHeaderRow();
  const rows = await worksheet.getRows(limit ? { limit } : undefined);

  return rows.map((row) => row.toObject());
}

export type SleepData = {
  date: string;
  start: string;
  end: string;
  rem: number;
  deep: number;
  time: number;
  score: number;
};

export type OverviewData = {
  date: string;
  rating: number;
  overallScore: number;
  sleepScore: number;
  workScore: number;
  workoutScore: number;
  r: string;
};

export type WorkSessionData = {
  name: string;
  subject: string;
  priority: string;
  focusLevel: number;
  startTime: string;
  endTime: string;
  duration: number;
  date: string;
};

export type WorkoutData = {
  date: string;
  task: string;
  type: string;
  avgHr: number;
  maxHr: number;
  calories: number;
  distance: number;
  pace: string;
  time: number;
};

export type MoneyData = {
  date: string;
  name: string;
  amount: number;
  tag: string;
  merchant: string;
};

export type ScreenTimeData = {
  date: string;
  app: string;
  duration: number;
  category: string;
  type: string;
};

export async function fetchBothSheets(limit = 100): Promise<{
  sleepData: SleepData[];
  overviewData: OverviewData[];
}> {
  const [sleepRows, overviewRows] = await Promise.all([
    fetchSheetRows({ worksheetId: SLEEP_WORKSHEET_ID, limit }),
    fetchSheetRows({ worksheetId: OVERVIEW_WORKSHEET_ID, limit }),
  ]);

  const sleepData: SleepData[] = sleepRows.map((row) => ({
    date: (row.Date as string) || "",
    start: (row.Start as string) || "",
    end: (row.End as string) || "",
    rem: parseFloat((row.REM as string) || "0"),
    deep: parseFloat((row.Deep as string) || "0"),
    time: parseFloat((row.Time as string) || "0"),
    score: parseFloat((row.Score as string) || "0"),
  }));

  const overviewData: OverviewData[] = overviewRows.map((row) => ({
    date: (row.Date as string) || "",
    rating: parseInt((row.Rating as string) || "0"),
    overallScore: parseFloat((row["Overall Score"] as string) || "0"),
    sleepScore: parseFloat((row["Sleep Score"] as string) || "0"),
    workScore: parseFloat((row["Work Score"] as string) || "0"),
    workoutScore: parseFloat((row["Workout Score"] as string) || "0"),
    r: (row.R as string) || "",
  }));

  return {
    sleepData,
    overviewData,
  };
}

export async function fetchWorkSessions(
  limit?: number,
): Promise<WorkSessionData[]> {
  const rows = await fetchSheetRows({
    worksheetId: WORK_WORKSHEET_ID,
    limit,
  });

  const mappedRows = rows.map((row) => ({
    name: (row.Task as string) || "",
    subject: (row.Subject as string) || "",
    priority: (row.Priority as string) || "",
    focusLevel: parseFloat((row["Focus Level"] as string) || "0"),
    startTime: (row.Start as string) || "",
    endTime: (row.End as string) || "",
    duration: parseFloat((row.Time as string) || "0"),
    date: (row.Date as string) || "",
  }));

  return mappedRows;
}

export async function fetchWorkouts(limit?: number): Promise<WorkoutData[]> {
  const rows = await fetchSheetRows({
    worksheetId: WORKOUT_WORKSHEET_ID,
    limit,
  });

  return rows.map((row) => ({
    date: (row.Date as string) || "",
    task: (row.Task as string) || "",
    type: (row.Type as string) || "",
    avgHr: parseFloat((row["Avg HR"] as string) || "0"),
    maxHr: parseFloat((row["Max HR"] as string) || "0"),
    calories: parseFloat((row.Calories as string) || "0"),
    distance: parseFloat((row.Distance as string) || "0"),
    pace: (row.Pace as string) || "",
    time: parseFloat((row.Time as string) || "0"),
  }));
}

export async function fetchMoney(limit?: number): Promise<MoneyData[]> {
  const rows = await fetchSheetRows({
    worksheetId: MONEY_WORKSHEET_ID,
    limit,
  });

  return rows.map((row) => ({
    date: (row.Date as string) || "",
    name: (row.Name as string) || "",
    amount: parseFloat((row.Amount as string) || "0"),
    tag: (row.Tag as string) || "",
    merchant: (row.Merchant as string) || "",
  }));
}

export async function fetchScreenTime(
  limit?: number,
): Promise<ScreenTimeData[]> {
  const rows = await fetchSheetRows({
    worksheetId: SCREENTIME_WORKSHEET_ID,
    limit,
  });

  return rows.map((row) => ({
    date: (row.Date as string) || "",
    app: (row["App / Website"] as string) || "",
    duration: parseFloat((row.Duration as string) || "0"),
    category: (row.Category as string) || "",
    type: (row.Type as string) || "",
  }));
}

export const sheetScopes = REQUIRED_SCOPES;
