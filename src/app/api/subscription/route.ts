import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isPlanId, PLAN_COOKIE } from "@/lib/plans";

export async function POST(req: Request) {
  const body = await req.json();
  const plan = body.plan;
  if (!isPlanId(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }
  const billing = body.billing === "yearly" ? "yearly" : "monthly";
  const jar = await cookies();
  jar.set(PLAN_COOKIE, plan, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  // Demo payment — no real PSP. Ready to swap for Stripe/CIB later.
  return NextResponse.json({
    ok: true,
    plan,
    billing,
    status: "active",
    message: "Demo subscription activated",
  });
}

export async function GET() {
  const jar = await cookies();
  const plan = jar.get(PLAN_COOKIE)?.value;
  return NextResponse.json({
    plan: isPlanId(plan) ? plan : "starter",
  });
}
