"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultLocale,
  isLocale,
  localeMeta,
  type Locale,
} from "@/lib/i18n/config";
import {
  dictionaries,
  getDictionary,
  interpolate,
  type Dictionary,
} from "@/lib/i18n/dictionaries";

type I18nContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLocale: (locale: Locale) => Promise<void>;
  tf: (template: string, vars: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(
    isLocale(initialLocale) ? initialLocale : defaultLocale
  );

  const applyDom = useCallback((next: Locale) => {
    const meta = localeMeta[next];
    const dict = getDictionary(next);
    document.documentElement.lang = next;
    document.documentElement.dir = meta.dir;
    document.documentElement.classList.toggle("font-ar", next === "ar");
    document.body.classList.toggle("font-ar", next === "ar");
    document.title = dict.brand.siteTitle;
  }, []);

  useEffect(() => {
    applyDom(locale);
  }, [locale, applyDom]);

  const setLocale = useCallback(
    async (next: Locale) => {
      setLocaleState(next);
      applyDom(next);
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
    },
    [applyDom]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir: localeMeta[locale].dir,
      t: getDictionary(locale),
      setLocale,
      tf: (template, vars) => interpolate(template, vars),
    }),
    [locale, setLocale]
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return ctx;
}

export function useOptionalI18n() {
  return useContext(I18nContext);
}

/** For modules that may render before provider (should not happen). */
export function peekDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}
