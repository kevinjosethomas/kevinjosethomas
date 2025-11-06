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
  const worksheetId = options.worksheetId || SLEEP_WORKSHEET_ID;
  const worksheet = await loadWorksheet(worksheetId);
  const { limit } = options;

  await worksheet.loadHeaderRow();
  const rows = await worksheet.getRows(limit ? { limit } : undefined);

  return rows.map((row) => row.toObject());
}

export async function fetchBothSheets(limit = 15): Promise<{
  sleep: SheetRow[];
  overview: SheetRow[];
}> {
  const [sleepRows, overviewRows] = await Promise.all([
    fetchSheetRows({ worksheetId: SLEEP_WORKSHEET_ID, limit }),
    fetchSheetRows({ worksheetId: OVERVIEW_WORKSHEET_ID, limit }),
  ]);

  return {
    sleep: sleepRows,
    overview: overviewRows,
  };
}

export const sheetScopes = REQUIRED_SCOPES;
