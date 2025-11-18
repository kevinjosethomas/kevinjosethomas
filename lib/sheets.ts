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
};

export type OverviewData = {
  date: string;
  overallScore: string;
  sleepScore: string;
  workScore: string;
  workoutScore: string;
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
  notes: string;
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
  }));

  const overview: OverviewData[] = overviewRows.map((row) => ({
    date: (row.Date as string) || "",
    overallScore: (row["Overall Score"] as string) || "",
    sleepScore: (row["Sleep Score"] as string) || "",
    workScore: (row["Work Score"] as string) || "",
    workoutScore: (row["Workout Score"] as string) || "",
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

  if (rows.length > 0) {
    console.log("First row keys:", Object.keys(rows[0]));
    console.log("First row data:", rows[0]);
  }

  const mappedRows = rows.map((row) => ({
    name: (row.Task as string) || "",
    subject: (row.Subject as string) || "",
    priority: (row.Priority as string) || "",
    focusLevel: (row["Focus Level"] as string) || "",
    startTime: (row.Start as string) || "",
    endTime: (row.End as string) || "",
    duration: (row.Time as string) || "",
    date: (row.Date as string) || "",
    notes: (row.Notes as string) || "",
  }));

  console.log("First mapped row:", mappedRows[0]);

  return mappedRows;
}

export const sheetScopes = REQUIRED_SCOPES;
