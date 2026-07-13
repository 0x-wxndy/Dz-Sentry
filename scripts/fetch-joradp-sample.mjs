#!/usr/bin/env node
/**
 * Optional polite JORADP helper — prefers manual downloads.
 * Usage: node scripts/fetch-joradp-sample.mjs
 * Respects delay; does not mirror the full archive.
 */
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const OUT = path.join(process.cwd(), "data", "source-documents");
const UA =
  "DZ-Sentry-Prototype/0.1 (research demo; contact: local-dev; +respect robots)";

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log(`
JORADP sourcing (recommended):
  1. Open https://www.joradp.dz and download 20–50 recent text-based PDF issues
     (roughly 2001+; skip scanned pre-2001).
  2. Place them in: ${OUT}
  3. Run Admin → "Reindex source folder" or: npm run ingest

This script only writes a README stub — government portals often need
manual download due to session quirks. Be a good citizen: delay requests,
don't parallelize aggressively, don't mirror the full archive.
`);
  await writeFile(
    path.join(OUT, "README-sourcing.txt"),
    "Drop JORADP PDFs or .txt samples here. Pipeline processes whatever is present.\n",
    "utf8"
  );
  console.log("Wrote sourcing README. User-Agent template:", UA);
}

main();
