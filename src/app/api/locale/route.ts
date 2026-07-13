import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isLocale, LOCALE_COOKIE, localeMeta } from "@/lib/i18n/config";

export async function POST(req: Request) {
  const body = await req.json();
  const locale = body.locale;
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }
  const jar = await cookies();
  jar.set(LOCALE_COOKIE, locale, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return NextResponse.json({
    ok: true,
    locale,
    dir: localeMeta[locale].dir,
  });
}
