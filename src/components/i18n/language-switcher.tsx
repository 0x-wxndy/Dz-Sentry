"use client";

import { useI18n } from "@/components/i18n/locale-provider";
import { locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className={cn("inline-flex items-center gap-2", className)}>
      {!compact && (
        <span className="text-[10px] uppercase tracking-wider text-slate-500">
          {t.language}
        </span>
      )}
      <select
        className="h-9 rounded-md border border-white/10 bg-ink-950 text-xs px-2 text-slate-200 min-w-[7.5rem]"
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label={t.language}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeMeta[code].nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
