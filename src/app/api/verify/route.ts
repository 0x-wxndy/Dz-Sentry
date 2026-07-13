import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/rbac";
import { listVerificationQueue, updateVerification } from "@/lib/rag/pipeline";

export async function GET() {
  const user = await getCurrentUser();
  if (!canAccessAdmin(user.role)) {
    return NextResponse.json({ error: "Admin role required" }, { status: 403 });
  }
  const items = await listVerificationQueue();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!canAccessAdmin(user.role)) {
    return NextResponse.json({ error: "Admin role required" }, { status: 403 });
  }
  const body = await req.json();
  const doc = await updateVerification(body.id, body.action, body.editedSummary);
  return NextResponse.json({ document: { id: doc.id, status: doc.status } });
}
