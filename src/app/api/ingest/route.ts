import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getCurrentUser } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/rbac";
import { ingestFile, ingestSourceFolder } from "@/lib/rag/pipeline";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!canAccessAdmin(user.role)) {
    return NextResponse.json({ error: "Admin role required" }, { status: 403 });
  }

  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await req.json();
    if (body.reindexFolder) {
      const docs = await ingestSourceFolder();
      return NextResponse.json({ count: docs.length, documents: docs.map((d) => d.title) });
    }
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const uploads = path.join(process.cwd(), "data", "source-documents");
  await mkdir(uploads, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  const dest = path.join(uploads, file.name);
  await writeFile(dest, buf);
  const document = await ingestFile(dest, { status: "pending" });

  return NextResponse.json({
    document: {
      id: document.id,
      title: document.title,
      status: document.status,
      chunks: document.chunks.length,
    },
  });
}
