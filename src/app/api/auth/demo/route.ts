import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DEMO_SESSION_COOKIE } from "@/lib/auth/session";
import type { UserRole } from "@/types";
import { DEMO_USERS } from "@/lib/auth/rbac";

export async function POST(req: Request) {
  const body = await req.json();
  const role = body.role as UserRole;
  if (!DEMO_USERS.some((u) => u.role === role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }
  const jar = await cookies();
  jar.set(DEMO_SESSION_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return NextResponse.json({ ok: true, role });
}
