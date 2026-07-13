import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  const file = path.join(process.cwd(), "data", "geojson", "algeria-layers.json");
  const raw = await readFile(file, "utf8");
  return NextResponse.json(JSON.parse(raw));
}
