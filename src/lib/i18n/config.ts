export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const LOCALE_COOKIE = "dz_sentry_locale";

export const localeMeta: Record<
  Locale,
  { label: string; nativeLabel: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr" },
  fr: { label: "French", nativeLabel: "Français", dir: "ltr" },
  ar: { label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
