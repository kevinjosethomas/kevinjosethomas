import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

const REQUIRED_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const SERVICE_ACCOUNT_PRIVATE_KEY = (() => {
  const raw = process.env.GOOGLE_PRIVATE_KEY as string;

  // Try parsing as-is first (in case env var is clean JSON)
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "object" && parsed.private_key) {
      return parsed.private_key.replace(/\\n/g, "\n");
    }
    if (typeof parsed === "string") {
      return parsed.replace(/\\n/g, "\n");
    }
  } catch {
    // Direct parse failed
  }

  // The env var is double-escaped: \" for quotes.
  // After unescaping quotes, we also need to ensure \\n sequences are valid for JSON.
  // In the raw string, newlines in the PEM key appear as \\n (4 chars in raw: \ \ n).
  // After unescaping quotes only, these remain as \\n which JSON interprets as literal \n char - that's wrong.
  // We need to check what's actually at position ~165 (inside the private key value).
  const unescaped = raw.replace(/\\"/g, '"');
  console.log("[v0] chars around pos 160-175:", JSON.stringify(unescaped.substring(155, 180)));
  try {
    const parsed = JSON.parse(unescaped);
    if (typeof parsed === "object" && parsed.private_key) {
      return parsed.private_key;
    }
    if (typeof parsed === "string") {
      return parsed;
    }
  } catch (e) {
    console.log("[v0] parse after unescape failed:", (e as Error).message);
    // Try also normalizing \\n to \\n (keeping it as valid JSON escape for newline)
    // The issue might be that \n in the env var is a single backslash + n,
    // which is not a valid JSON escape on its own outside of \\n
    const doubleFixed = unescaped.replace(/(?<!\\)\\n/g, "\\n");
    console.log("[v0] doubleFixed chars around pos 160-175:", JSON.stringify(doubleFixed.substring(155, 180)));
    try {
      const parsed2 = JSON.parse(doubleFixed);
      if (typeof parsed2 === "object" && parsed2.private_key) {
        console.log("[v0] doubleFixed parse succeeded!");
        return parsed2.private_key;
      }
    } catch (e2) {
      console.log("[v0] doubleFixed parse also failed:", (e2 as Error).message);
    }
  }

  // Last resort: treat as raw PEM string
  return raw.replace(/\\n/g, "\n");
})();
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
  cad: string;
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
    cad: (row.CAD as string) || "",
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
