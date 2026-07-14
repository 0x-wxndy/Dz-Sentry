import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { DocumentChunk } from "@/types";
import type { Locale } from "@/lib/i18n/config";

const LANG_INSTRUCTION: Record<Locale, string> = {
  en: "Answer in clear English (French legal terms OK).",
  fr: "Réponds en français clair (termes juridiques arabes OK si pertinents).",
  ar: "أجب بالعربية الفصحى الواضحة (يمكن الإبقاء على المصطلحات القانونية الفرنسية عند الحاجة).",
};

type Provider = "gemini" | "anthropic";

const GEMINI_FALLBACK_MODELS = [
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
  "gemini-3-flash-preview",
  "gemini-3.5-flash",
  "gemini-2.0-flash",
];

function resolveProvider(): Provider | null {
  const pref = (process.env.LLM_PROVIDER || "").toLowerCase();
  const hasGemini = Boolean(process.env.GEMINI_API_KEY?.trim());
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY?.trim());

  if (pref === "gemini" && hasGemini) return "gemini";
  if (pref === "anthropic" && hasAnthropic) return "anthropic";
  if (hasGemini) return "gemini";
  if (hasAnthropic) return "anthropic";
  return null;
}

function buildPrompt(query: string, context: string, locale: Locale) {
  return `You are DZ-Sentry, a strategic intelligence analyst for Algeria. ${LANG_INSTRUCTION[locale]} Cite sources as [n]. Be precise; do not invent statutes.\n\nQuestion: ${query}\n\nContext:\n${context}`;
}

function offlineSynthesis(
  query: string,
  chunks: DocumentChunk[],
  locale: Locale,
  reason?: string
): string {
  const note = reason ? `\n\n(${reason})` : "";
  if (locale === "fr") {
    const bullets = chunks
      .slice(0, 3)
      .map((c) => `• Depuis « ${c.document_title} » : ${c.content.slice(0, 160)}…`)
      .join("\n");
    return `Briefing DZ-Sentry (mode synthèse hors ligne)\n\nRequête : ${query}\n\nSur la base de ${chunks.length} passages du corpus local :\n${bullets}\n\nSources ci-dessous.${note}`;
  }
  if (locale === "ar") {
    const bullets = chunks
      .slice(0, 3)
      .map((c) => `• من « ${c.document_title} »: ${c.content.slice(0, 160)}…`)
      .join("\n");
    return `إحاطة DZ-Sentry (وضع التوليف دون اتصال)\n\nالاستعلام: ${query}\n\nبناءً على ${chunks.length} مقاطع من المجموعة المحلية:\n${bullets}\n\nالمصادر أدناه.${note}`;
  }
  const bullets = chunks
    .slice(0, 3)
    .map((c) => `• From « ${c.document_title} »: ${c.content.slice(0, 160)}…`)
    .join("\n");
  return `DZ-Sentry briefing (offline synthesis mode)\n\nQuery: ${query}\n\nBased on ${chunks.length} retrieved passages from the local corpus:\n${bullets}\n\nSources are listed below.${note}`;
}

function isQuotaError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.includes("429") ||
    msg.toLowerCase().includes("quota") ||
    msg.toLowerCase().includes("too many requests")
  );
}

function geminiModelsToTry(): string[] {
  const preferred = process.env.GEMINI_MODEL || "gemini-flash-latest";
  return [preferred, ...GEMINI_FALLBACK_MODELS.filter((m) => m !== preferred)];
}

async function synthesizeWithGemini(prompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!.trim());
  let lastError: unknown;
  const tried: string[] = [];

  // On serverless (Netlify), keep the chain short to stay under function timeouts.
  const models = geminiModelsToTry().slice(
    0,
    process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME ? 2 : undefined
  );

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      lastError = err;
      tried.push(modelName);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("API_KEY") || msg.includes("401") || msg.includes("403")) {
        throw err;
      }
    }
  }

  const detail =
    lastError instanceof Error ? lastError.message.slice(0, 240) : String(lastError);
  throw new Error(
    `All Gemini models failed (${tried.join(", ")}). Last error: ${detail}`
  );
}

async function synthesizeWithAnthropic(prompt: string): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  const message = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });
  return message.content
    .filter((b) => b.type === "text")
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("\n");
}

/**
 * Server-side RAG synthesis for Semantic Search.
 * Provider: Gemini (GEMINI_API_KEY) or Claude (ANTHROPIC_API_KEY).
 * On quota/API failure, falls back to offline synthesis (never throws).
 */
export async function synthesizeAnswer(
  query: string,
  chunks: DocumentChunk[],
  locale: Locale = "fr"
): Promise<{
  synthesis: string;
  citations: { id: string; title: string; excerpt: string }[];
  provider?: Provider | "offline";
  warning?: string;
}> {
  const citations = chunks.slice(0, 5).map((c) => ({
    id: c.id,
    title: c.document_title,
    excerpt: c.content.slice(0, 220) + (c.content.length > 220 ? "…" : ""),
  }));

  const context = chunks
    .map(
      (c, i) =>
        `[${i + 1}] ${c.document_title} (${c.published_at}, p.${c.page})\n${c.content}`
    )
    .join("\n\n");

  const provider = resolveProvider();
  if (!provider) {
    return {
      synthesis: offlineSynthesis(query, chunks, locale),
      citations,
      provider: "offline",
    };
  }

  const prompt = buildPrompt(query, context, locale);

  try {
    const synthesis =
      provider === "gemini"
        ? await synthesizeWithGemini(prompt)
        : await synthesizeWithAnthropic(prompt);
    return { synthesis, citations, provider };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const quota = isQuotaError(err) || msg.includes("429") || msg.includes("quota");
    const short = msg
      .replace(/key=[^\s&]+/gi, "key=***")
      .replace(/AIza[^\s]+/g, "***")
      .replace(/AQ\.[^\s]+/g, "***")
      .slice(0, 160);

    const warning = quota
      ? locale === "ar"
        ? `تم تجاوز حصة Gemini (429). عُرض توليف محلي. ${short}`
        : locale === "fr"
          ? `Quota Gemini dépassé (429). Synthèse locale. ${short}`
          : `Gemini quota exceeded (429). Local fallback. ${short}`
      : locale === "ar"
        ? `تعذّر الاتصال بالنموذج. عُرض توليف محلي. ${short}`
        : locale === "fr"
          ? `Échec d'appel LLM. Synthèse locale de secours. ${short}`
          : `LLM call failed. Local fallback. ${short}`;

    console.error("[synthesizeAnswer]", msg);
    return {
      synthesis: offlineSynthesis(query, chunks, locale, warning),
      citations,
      provider: "offline",
      warning,
    };
  }
}
