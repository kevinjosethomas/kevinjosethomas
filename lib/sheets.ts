import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

const REQUIRED_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const SERVICE_ACCOUNT_PRIVATE_KEY = (
  process.env.GOOGLE_PRIVATE_KEY as string
).replace(/\\n/g, "\n");
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
  rem: string;
  deep: string;
  time: string;
  score: string;
};

export type OverviewData = {
  date: string;
  rating: string;
  overallScore: string;
  sleepScore: string;
  workScore: string;
  workoutScore: string;
  r: string;
};

export type WorkSessionData = {
  name: string;
  subject: string;
  priority: string;
  focusLevel: string;
  startTime: string;
  endTime: string;
  duration: string;
  date: string;
};

export type WorkoutData = {
  date: string;
  task: string;
  type: string;
  avgHr: string;
  maxHr: string;
  calories: string;
  distance: string;
  pace: string;
  time: string;
};

export type MoneyData = {
  date: string;
  name: string;
  amount: string;
  tag: string;
  merchant: string;
};

export type ScreenTimeData = {
  date: string;
  app: string;
  duration: string;
  category: string;
  type: string;
};

export async function fetchBothSheets(limit = 15): Promise<{
  sleep: SleepData[];
  overview: OverviewData[];
}> {
  const [sleepRows, overviewRows] = await Promise.all([
    fetchSheetRows({ worksheetId: SLEEP_WORKSHEET_ID, limit }),
    fetchSheetRows({ worksheetId: OVERVIEW_WORKSHEET_ID, limit }),
  ]);

  const sleep: SleepData[] = sleepRows.map((row) => ({
    date: (row.Date as string) || "",
    start: (row.Start as string) || "",
    end: (row.End as string) || "",
    rem: (row.REM as string) || "",
    deep: (row.Deep as string) || "",
    time: (row.Time as string) || "",
    score: (row.Score as string) || "",
  }));

  const overview: OverviewData[] = overviewRows.map((row) => ({
    date: (row.Date as string) || "",
    rating: (row.Rating as string) || "",
    overallScore: (row["Overall Score"] as string) || "",
    sleepScore: (row["Sleep Score"] as string) || "",
    workScore: (row["Work Score"] as string) || "",
    workoutScore: (row["Workout Score"] as string) || "",
    r: (row.R as string) || "",
  }));

  return {
    sleep,
    overview,
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
    focusLevel: (row["Focus Level"] as string) || "",
    startTime: (row.Start as string) || "",
    endTime: (row.End as string) || "",
    duration: (row.Time as string) || "",
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
    avgHr: (row["Avg HR"] as string) || "",
    maxHr: (row["Max HR"] as string) || "",
    calories: (row.Calories as string) || "",
    distance: (row.Distance as string) || "",
    pace: (row.Pace as string) || "",
    time: (row.Time as string) || "",
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
    amount: (row.Amount as string) || "",
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
    duration: (row.Duration as string) || "",
    category: (row.Category as string) || "",
    type: (row.Type as string) || "",
  }));
}

export const sheetScopes = REQUIRED_SCOPES;
