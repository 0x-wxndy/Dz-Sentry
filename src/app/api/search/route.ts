import { NextResponse } from "next/server";
import { semanticSearch } from "@/lib/rag/pipeline";
import { synthesizeAnswer } from "@/lib/rag/synthesize";
import { isLocale, defaultLocale } from "@/lib/i18n/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = String(body.query || "").trim();
    if (!query) {
      return NextResponse.json({ error: "Query required" }, { status: 400 });
    }

    const locale = isLocale(body.locale) ? body.locale : defaultLocale;

    const chunks = await semanticSearch(query, {
      sector: body.sector,
      documentType: body.documentType,
      dateFrom: body.dateFrom,
      dateTo: body.dateTo,
    });

    if (body.synthesize) {
      const result = await synthesizeAnswer(query, chunks, locale);
      return NextResponse.json({
        chunks,
        synthesis: result.synthesis,
        citations: result.citations,
        provider: result.provider,
        warning: result.warning,
      });
    }

    return NextResponse.json({ chunks });
  } catch (err) {
    console.error("[api/search]", err);
    return NextResponse.json(
      {
        error: "Search failed",
        detail: err instanceof Error ? err.message : "Unknown error",
        chunks: [],
      },
      { status: 500 }
    );
  }
}
