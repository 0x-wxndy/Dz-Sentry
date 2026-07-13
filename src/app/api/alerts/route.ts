import { NextResponse } from "next/server";
import { SEED_ALERTS, nextSyntheticAlert } from "@/data/alerts";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tick = Number(searchParams.get("tick") || "0");
  const alerts = [...SEED_ALERTS];
  if (tick > 0) {
    alerts.unshift(nextSyntheticAlert(tick));
  }
  return NextResponse.json({ alerts: alerts.slice(0, 12), tick });
}
