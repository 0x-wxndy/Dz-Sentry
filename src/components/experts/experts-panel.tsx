"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Globe2,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Star,
  X,
} from "lucide-react";
import {
  EXPERT_FIELDS,
  SEED_EXPERTS,
  countByField,
  localizeExpertField,
  type Expert,
  type ExpertField,
} from "@/data/experts";
import { useI18n } from "@/components/i18n/locale-provider";
import { Button } from "@/components/ui/button";
import { Badge, Input, Label, Textarea } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ExpertsPanel({ canContact = true }: { canContact?: boolean }) {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [field, setField] = useState<ExpertField>("all");
  const [contact, setContact] = useState<Expert | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEED_EXPERTS.filter((expert) => {
      if (field !== "all" && expert.field !== field) return false;
      if (!q) return true;
      const hay = [
        expert.name,
        localizeExpertField(expert, "title", locale),
        localizeExpertField(expert, "bio", locale),
        expert.field,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, field, locale]);

  const fieldLabels: Record<ExpertField, string> = {
    all: t.experts.fieldAll,
    economy: t.experts.fieldEconomy,
    business: t.experts.fieldBusiness,
    education: t.experts.fieldEducation,
    engineering: t.experts.fieldEngineering,
    finance: t.experts.fieldFinance,
    law: t.experts.fieldLaw,
    medicine: t.experts.fieldMedicine,
    technology: t.experts.fieldTechnology,
  };

  function openContact(expert: Expert) {
    setContact(expert);
    setMessage("");
    setSent(false);
  }

  function submitContact() {
    if (!message.trim()) return;
    setSent(true);
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-slate-500" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.experts.searchPlaceholder}
          className="ps-10 h-11"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", ...EXPERT_FIELDS] as ExpertField[]).map((key) => (
          <Button
            key={key}
            size="sm"
            variant={field === key ? "amber" : "secondary"}
            onClick={() => setField(key)}
            className="gap-1.5"
          >
            <Briefcase className="h-3.5 w-3.5 opacity-70" />
            {fieldLabels[key]} ({countByField(key)})
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((expert, i) => (
          <motion.div
            key={expert.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="h-full hover:border-amber-500/25 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-display text-lg shrink-0">
                    {expert.initials}
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-base">{expert.name}</CardTitle>
                    <CardDescription className="mt-0.5">
                      {localizeExpertField(expert, "title", locale)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-400" />
                    {expert.rating.toFixed(1)} ({expert.reviews})
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {t.experts.years.replace("{n}", String(expert.years))}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {localizeExpertField(expert, "bio", locale)}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {expert.freeConsult ? (
                      <Badge className="text-risk-green border-risk-green/30">
                        {t.experts.free}
                      </Badge>
                    ) : (
                      <Badge>{t.experts.paid}</Badge>
                    )}
                    <Badge className="inline-flex items-center gap-1">
                      <Globe2 className="h-3 w-3" />
                      {expert.languages.join(" / ").toUpperCase()}
                    </Badge>
                  </div>
                  {canContact ? (
                    <Button size="sm" onClick={() => openContact(expert)}>
                      <MessageSquare className="h-4 w-4" />
                      {t.experts.contact}
                    </Button>
                  ) : (
                    <Link
                      href="/settings?tab=billing"
                      className="inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium border border-white/15 text-slate-100 hover:bg-white/5"
                    >
                      {t.pricing.upgradeHint}
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {!canContact && (
        <p className="text-sm text-amber-300/80 border border-amber-500/20 rounded-md px-3 py-2 bg-amber-500/5">
          {t.experts.contactLocked}
        </p>
      )}

      {filtered.length === 0 && (
        <p className="text-sm text-slate-500 py-8 text-center">
          {t.experts.empty}
        </p>
      )}

      <AnimatePresence>
        {contact && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContact(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              className="w-full max-w-lg rounded-lg border border-white/10 bg-ink-900 p-5 shadow-glow space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl text-slate-50">
                    {t.experts.contactTitle}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    {contact.name} |{" "}
                    {localizeExpertField(contact, "title", locale)}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setContact(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col gap-2 text-sm text-slate-300">
                <a
                  href={`mailto:${contact.email}`}
                  className={cn(
                    "inline-flex items-center gap-2 text-amber-300 hover:text-amber-200"
                  )}
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-slate-100"
                >
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </a>
              </div>

              {sent ? (
                <p className="text-sm text-risk-green border border-risk-green/30 rounded-md px-3 py-2 bg-risk-green/10">
                  {t.experts.sent}
                </p>
              ) : (
                <div className="space-y-2">
                  <Label>{t.experts.messageLabel}</Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.experts.messagePlaceholder}
                    rows={4}
                  />
                  <Button
                    className="w-full"
                    onClick={submitContact}
                    disabled={!message.trim()}
                  >
                    {t.experts.send}
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
