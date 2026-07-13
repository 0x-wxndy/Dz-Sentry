/**
 * Local deterministic embedding for prototype RAG without an embedding API.
 * Produces a unit-normalized 384-d vector from token hashing — good enough
 * for demo semantic ranking over a few dozen sample chunks. Swap for
 * OpenAI/Voyage/Gemini embeddings when wiring production Supabase pgvector.
 */

const DIM = 384;

export function embedText(text: string): number[] {
  const vec = new Array(DIM).fill(0);
  const tokens = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9\u00C0-\u024F\u0600-\u06FF\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  for (const token of tokens) {
    let h = 2166136261;
    for (let i = 0; i < token.length; i++) {
      h ^= token.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const idx = Math.abs(h) % DIM;
    const sign = h & 1 ? 1 : -1;
    vec[idx] += sign;
    // bigram boost
    if (token.length > 3) {
      const idx2 = Math.abs(h >>> 8) % DIM;
      vec[idx2] += sign * 0.5;
    }
  }

  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

export function chunkText(
  text: string,
  opts: { maxChars?: number; overlap?: number } = {}
): string[] {
  const maxChars = opts.maxChars ?? 900;
  const overlap = opts.overlap ?? 120;
  const cleaned = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!cleaned) return [];

  const paragraphs = cleaned.split(/\n\n+/);
  const chunks: string[] = [];
  let buf = "";

  const flush = () => {
    const t = buf.trim();
    if (t) chunks.push(t);
    buf = "";
  };

  for (const p of paragraphs) {
    if ((buf + "\n\n" + p).length > maxChars && buf) {
      flush();
      if (chunks.length && overlap) {
        const prev = chunks[chunks.length - 1];
        buf = prev.slice(-overlap) + "\n\n";
      }
    }
    buf = buf ? `${buf}\n\n${p}` : p;
    while (buf.length > maxChars) {
      chunks.push(buf.slice(0, maxChars).trim());
      buf = buf.slice(maxChars - overlap);
    }
  }
  flush();
  return chunks;
}
