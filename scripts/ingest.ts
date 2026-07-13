/**
 * Seed local RAG store from data/source-documents
 * Usage: npx tsx scripts/ingest.ts
 */
import { ingestSourceFolder } from "../src/lib/rag/pipeline";

async function main() {
  const docs = await ingestSourceFolder();
  console.log(`Ingested ${docs.length} documents:`);
  for (const d of docs) {
    console.log(` - ${d.title} (${d.chunks.length} chunks, status=${d.status})`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
