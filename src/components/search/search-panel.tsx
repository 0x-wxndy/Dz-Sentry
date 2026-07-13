"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea, Badge } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DocumentChunk } from "@/types";
import { useI18n } from "@/components/i18n/locale-provider";

const DEFAULT_QUERIES = {
  en: "What investment incentives apply to strategic sectors?",
  fr: "Quels avantages à l'investissement s'appliquent aux secteurs stratégiques ?",
  ar: "ما هي حوافز الاستثمار المطبقة على القطاعات الاستراتيجية؟",
} as const;

export function SearchPanel() {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState<string>(
    DEFAULT_QUERIES[locale] ?? DEFAULT_QUERIES.fr
  );
  const [sector, setSector] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [chunks, setChunks] = useState<DocumentChunk[]>([]);
  const [synthesis, setSynthesis] = useState<string | null>(null);
  const [citations, setCitations] = useState<
    { id: string; title: string; excerpt: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  async function runSearch(withSynthesis: boolean) {
    setLoading(true);
    setSynthesis(null);
    setError(null);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          sector: sector || undefined,
          documentType: documentType || undefined,
          dateFrom: dateFrom || undefined,
          dateTo: dateTo || undefined,
          synthesize: withSynthesis,
          locale,
        }),
      });

      const text = await res.text();
      let data: {
        chunks?: DocumentChunk[];
        synthesis?: string;
        citations?: { id: string; title: string; excerpt: string }[];
        warning?: string;
        error?: string;
        detail?: string;
      } = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setError(
          locale === "ar"
            ? "استجابة غير صالحة من الخادم"
            : locale === "fr"
              ? "Réponse serveur invalide"
              : "Invalid server response"
        );
        return;
      }

      if (!res.ok) {
        setError(data.error || data.detail || `HTTP ${res.status}`);
        setChunks(data.chunks || []);
        return;
      }

      setChunks(data.chunks || []);
      if (withSynthesis) {
        setSynthesis(data.synthesis || null);
        setCitations(data.citations || []);
        if (data.warning) setError(data.warning);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t.search.panelTitle}</CardTitle>
          <CardDescription>{t.search.panelDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p className="text-sm text-amber-300/90 border border-amber-500/20 rounded-md px-3 py-2 bg-amber-500/5">
              {error}
            </p>
          )}
          <div>
            <Label>{t.search.query}</Label>
            <Textarea
              className="mt-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid sm:grid-cols-4 gap-3">
            <div>
              <Label>{t.search.sector}</Label>
              <select
                className="mt-2 w-full h-10 rounded-md border border-white/10 bg-ink-900/60 text-sm px-2"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="">{t.search.all}</option>
                <option value="legal">{t.search.legal}</option>
                <option value="energy">{t.search.energy}</option>
                <option value="agriculture">{t.search.agriculture}</option>
                <option value="security">{t.search.security}</option>
                <option value="investment">{t.search.investment}</option>
              </select>
            </div>
            <div>
              <Label>{t.search.docType}</Label>
              <select
                className="mt-2 w-full h-10 rounded-md border border-white/10 bg-ink-900/60 text-sm px-2"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="">{t.search.all}</option>
                <option value="law">{t.search.law}</option>
                <option value="decree">{t.search.decree}</option>
                <option value="ordinance">{t.search.ordinance}</option>
                <option value="report">{t.search.report}</option>
                <option value="other">{t.search.other}</option>
              </select>
            </div>
            <div>
              <Label>{t.search.from}</Label>
              <Input
                type="date"
                className="mt-2"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <Label>{t.search.to}</Label>
              <Input
                type="date"
                className="mt-2"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => runSearch(false)} disabled={loading}>
              <SearchIcon className="h-4 w-4" />
              {t.search.retrieve}
            </Button>
            <Button
              variant="amber"
              onClick={() => runSearch(true)}
              disabled={loading}
            >
              <Sparkles className="h-4 w-4" />
              {t.search.synthesize}
            </Button>
          </div>
        </CardContent>
      </Card>

      {synthesis && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-amber-500/20">
            <CardHeader>
              <CardTitle>{t.search.synthesisTitle}</CardTitle>
              <CardDescription>{t.search.synthesisDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm text-slate-200 font-sans leading-relaxed">
                {synthesis}
              </pre>
              <div className="mt-4 space-y-2">
                {citations.map((c, i) => (
                  <div
                    key={c.id}
                    className="text-xs border border-white/10 rounded-md p-3 bg-ink-950/40"
                  >
                    <Badge className="mb-2">
                      [{i + 1}] {c.title}
                    </Badge>
                    <p className="text-slate-400">{c.excerpt}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-3">
        {chunks.map((c) => (
          <Card key={c.id}>
            <CardContent className="pt-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm font-medium">{c.document_title}</span>
                <Badge>{c.document_type}</Badge>
                <Badge>{c.sector}</Badge>
                <Badge className="font-mono">
                  sim {(c.similarity ?? 0).toFixed(3)}
                </Badge>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{c.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
