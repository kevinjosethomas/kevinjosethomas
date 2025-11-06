import { NextResponse } from "next/server";

import { fetchBothSheets } from "@/lib/sheets";

export async function GET() {
  try {
    const data = await fetchBothSheets(15);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

export const runtime = "nodejs";
