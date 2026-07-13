import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const raw = jar.get(LOCALE_COOKIE)?.value;
  return isLocale(raw) ? raw : defaultLocale;
}

export async function getServerDictionary(): Promise<{
  locale: Locale;
  dict: Dictionary;
}> {
  const locale = await getLocale();
  return { locale, dict: getDictionary(locale) };
}
