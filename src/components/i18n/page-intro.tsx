"use client";

import { useI18n } from "@/components/i18n/locale-provider";

type PageKey = "dashboard" | "search" | "scenarios" | "matrix" | "admin";

export function PageIntro({ page }: { page: PageKey }) {
  const { t } = useI18n();
  const copy = t[page];
  return (
    <div>
      <h1 className="font-display text-3xl text-slate-50 tracking-tight">
        {copy.title}
      </h1>
      <p className="text-sm text-slate-400 mt-1 max-w-2xl">{copy.subtitle}</p>
    </div>
  );
}
