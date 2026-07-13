import { readFile, readdir, writeFile, mkdir } from "fs/promises";
import path from "path";
import { chunkText, embedText, cosineSimilarity } from "./embeddings";
import type { DocumentChunk, DocumentType, Sector } from "@/types";

export interface IngestedDocument {
  id: string;
  title: string;
  source_path: string;
  sector: Sector | "legal" | "general";
  document_type: DocumentType;
  published_at: string;
  status: "pending" | "approved" | "live";
  ai_summary: string;
  edited_summary?: string;
  chunks: (DocumentChunk & { embedding: number[] })[];
}

const STORE_PATH = path.join(process.cwd(), "data", "rag-store.json");
const SOURCE_DIR = path.join(process.cwd(), "data", "source-documents");

async function loadPdfParse() {
  try {
    // pdf-parse is CJS
    const mod = await import("pdf-parse");
    return (mod as unknown as { default: (buf: Buffer) => Promise<{ text: string }> }).default ??
      (mod as unknown as (buf: Buffer) => Promise<{ text: string }>);
  } catch {
    return null;
  }
}

function inferMeta(filename: string): Pick<
  IngestedDocument,
  "sector" | "document_type" | "published_at" | "title"
> {
  const lower = filename.toLowerCase();
  let sector: IngestedDocument["sector"] = "legal";
  if (lower.includes("energy") || lower.includes("hydro") || lower.includes("creg")) {
    sector = "energy";
  } else if (lower.includes("agri") || lower.includes("food")) {
    sector = "agriculture";
  } else if (lower.includes("secur") || lower.includes("border")) {
    sector = "security";
  } else if (lower.includes("invest") || lower.includes("finance") || lower.includes("fdi")) {
    sector = "investment";
  }

  let document_type: DocumentType = "other";
  if (lower.includes("loi") || lower.includes("law")) document_type = "law";
  else if (lower.includes("decret") || lower.includes("decree")) document_type = "decree";
  else if (lower.includes("ordon")) document_type = "ordinance";
  else if (lower.includes("rapport") || lower.includes("report")) document_type = "report";

  const yearMatch = filename.match(/(20\d{2})/);
  const published_at = yearMatch ? `${yearMatch[1]}-01-15` : "2024-06-01";
  const title = filename.replace(/\.(pdf|txt|md)$/i, "").replace(/[_-]+/g, " ");

  return { sector, document_type, published_at, title };
}

function summarizeHeuristic(text: string, title: string): string {
  const first = text.replace(/\s+/g, " ").trim().slice(0, 420);
  return `AI draft summary of « ${title} »: ${first}${first.length >= 420 ? "…" : ""}`;
}

export async function loadStore(): Promise<IngestedDocument[]> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as IngestedDocument[];
  } catch {
    return [];
  }
}

async function saveStore(docs: IngestedDocument[]) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(docs, null, 2), "utf8");
}

async function extractText(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".txt" || ext === ".md") {
    return readFile(filePath, "utf8");
  }
  if (ext === ".pdf") {
    const pdfParse = await loadPdfParse();
    if (!pdfParse) {
      throw new Error("pdf-parse unavailable");
    }
    const buf = await readFile(filePath);
    const parsed = await pdfParse(buf);
    return parsed.text || "";
  }
  throw new Error(`Unsupported file type: ${ext}`);
}

export async function ingestFile(
  filePath: string,
  opts?: { status?: IngestedDocument["status"] }
): Promise<IngestedDocument> {
  const filename = path.basename(filePath);
  const text = await extractText(filePath);
  const meta = inferMeta(filename);
  const parts = chunkText(text);
  const id = `doc-${Buffer.from(filename).toString("hex").slice(0, 16)}`;

  const chunks = parts.map((content, i) => ({
    id: `${id}-c${i}`,
    document_id: id,
    document_title: meta.title,
    content,
    sector: meta.sector,
    document_type: meta.document_type,
    published_at: meta.published_at,
    page: i + 1,
    embedding: embedText(content),
  }));

  const doc: IngestedDocument = {
    id,
    title: meta.title,
    source_path: filePath,
    sector: meta.sector,
    document_type: meta.document_type,
    published_at: meta.published_at,
    status: opts?.status ?? "pending",
    ai_summary: summarizeHeuristic(text, meta.title),
    chunks,
  };

  const store = await loadStore();
  const next = [...store.filter((d) => d.id !== id), doc];
  await saveStore(next);
  return doc;
}

export async function ingestSourceFolder(): Promise<IngestedDocument[]> {
  await mkdir(SOURCE_DIR, { recursive: true });
  const files = await readdir(SOURCE_DIR);
  const targets = files.filter((f) => /\.(pdf|txt|md)$/i.test(f));
  const out: IngestedDocument[] = [];
  for (const f of targets) {
    const doc = await ingestFile(path.join(SOURCE_DIR, f), { status: "live" });
    out.push(doc);
  }
  return out;
}

export interface SearchFilters {
  sector?: string;
  documentType?: string;
  dateFrom?: string;
  dateTo?: string;
}

export async function semanticSearch(
  query: string,
  filters: SearchFilters = {},
  topK = 8
): Promise<DocumentChunk[]> {
  let store = await loadStore();
  if (store.length === 0) {
    store = await ingestSourceFolder();
  }

  const q = embedText(query);
  const scored: DocumentChunk[] = [];

  for (const doc of store) {
    if (doc.status !== "live" && doc.status !== "approved") continue;
    if (filters.sector && doc.sector !== filters.sector) continue;
    if (filters.documentType && doc.document_type !== filters.documentType) continue;
    if (filters.dateFrom && doc.published_at < filters.dateFrom) continue;
    if (filters.dateTo && doc.published_at > filters.dateTo) continue;

    for (const chunk of doc.chunks) {
      scored.push({
        id: chunk.id,
        document_id: chunk.document_id,
        document_title: chunk.document_title,
        content: chunk.content,
        sector: chunk.sector,
        document_type: chunk.document_type,
        published_at: chunk.published_at,
        page: chunk.page,
        similarity: cosineSimilarity(q, chunk.embedding),
      });
    }
  }

  return scored.sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0)).slice(0, topK);
}

export async function listVerificationQueue() {
  const store = await loadStore();
  return store.map((d) => ({
    id: d.id,
    document_title: d.title,
    ai_summary: d.ai_summary,
    edited_summary: d.edited_summary,
    status: d.status === "live" ? ("approved" as const) : d.status,
    sector: d.sector,
    created_at: d.published_at,
  }));
}

export async function updateVerification(
  id: string,
  action: "approve" | "edit",
  editedSummary?: string
) {
  const store = await loadStore();
  const doc = store.find((d) => d.id === id);
  if (!doc) throw new Error("Document not found");
  if (action === "edit" && editedSummary) {
    doc.edited_summary = editedSummary;
    doc.status = "approved";
  } else {
    doc.status = "live";
  }
  await saveStore(store);
  return doc;
}
