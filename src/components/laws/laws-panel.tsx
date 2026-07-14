"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, FileText, Search, X } from "lucide-react";
import {
  SEED_LAWS,
  localizeLawField,
  type LawCategory,
  type LawItem,
} from "@/data/laws";
import { useI18n } from "@/components/i18n/locale-provider";
import { Button } from "@/components/ui/button";
import { Badge, Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LawsPanel() {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<LawCategory>("all");
  const [selected, setSelected] = useState<LawItem | null>(null);
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEED_LAWS.filter((law) => {
      if (category !== "all" && law.category !== category) return false;
      if (!q) return true;
      const hay = [
        localizeLawField(law, "title", locale),
        localizeLawField(law, "summary", locale),
        law.reference,
        law.type,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, category, locale]);

  const chips: { key: LawCategory; label: string }[] = [
    { key: "all", label: t.laws.filterAll },
    { key: "investment", label: t.laws.filterInvestment },
    { key: "tax", label: t.laws.filterTax },
    { key: "trade", label: t.laws.filterTrade },
    { key: "energy", label: t.laws.filterEnergy },
  ];

  function typeLabel(type: LawItem["type"]) {
    if (type === "law") return t.laws.typeLaw;
    if (type === "decree") return t.laws.typeDecree;
    return t.laws.typeOrdinance;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-slate-500" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.laws.searchPlaceholder}
          className="ps-10 h-11"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <Button
            key={chip.key}
            size="sm"
            variant={category === chip.key ? "amber" : "secondary"}
            onClick={() => setCategory(chip.key)}
          >
            {chip.label}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((law, i) => (
          <motion.div
            key={law.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="h-full hover:border-amber-500/25 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <FileText className="h-5 w-5 text-amber-400 shrink-0" />
                  <button
                    type="button"
                    aria-label={t.laws.save}
                    onClick={() =>
                      setSaved((s) => ({ ...s, [law.id]: !s[law.id] }))
                    }
                    className={cn(
                      "p-1 rounded hover:bg-white/5",
                      saved[law.id] ? "text-amber-400" : "text-slate-500"
                    )}
                  >
                    <Bookmark
                      className="h-4 w-4"
                      fill={saved[law.id] ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <CardTitle className="text-base leading-snug mt-2">
                  {localizeLawField(law, "title", locale)}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Badge className="text-amber-300 border-amber-500/30">
                    {typeLabel(law.type)}
                  </Badge>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {law.reference} | {law.date}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {localizeLawField(law, "summary", locale)}
                </CardDescription>
                <Button
                  size="sm"
                  variant="ghost"
                  className="px-0 text-amber-300 hover:text-amber-200"
                  onClick={() => setSelected(law)}
                >
                  {t.laws.readMore}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-slate-500 py-8 text-center">{t.laws.empty}</p>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              className="w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-lg border border-white/10 bg-ink-900 p-5 shadow-glow"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h2 className="font-display text-xl text-slate-50">
                    {localizeLawField(selected, "title", locale)}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge>{typeLabel(selected.type)}</Badge>
                    <Badge>{selected.reference}</Badge>
                    <Badge>{selected.date}</Badge>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {localizeLawField(selected, "summary", locale)}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                {localizeLawField(selected, "body", locale)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
