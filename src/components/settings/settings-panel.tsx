"use client";

import { useEffect, useState } from "react";
import { CreditCard, Moon, Settings2, Sun } from "lucide-react";
import { PricingPanel } from "@/components/pricing/pricing-panel";
import { useI18n } from "@/components/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PlanId } from "@/lib/plans";

export type SettingsTab = "general" | "billing";
export type ThemeMode = "dark" | "light";

const THEME_KEY = "dz_sentry_theme";

export function SettingsPanel({
  initialPlan,
  initialTab = "general",
}: {
  initialPlan: PlanId;
  initialTab?: SettingsTab;
}) {
  const { t } = useI18n();
  const [tab, setTab] = useState<SettingsTab>(initialTab);
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      applyTheme(stored);
    }
  }, []);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  function applyTheme(mode: ThemeMode) {
    document.documentElement.classList.toggle("theme-light", mode === "light");
    document.documentElement.classList.toggle("dark", mode === "dark");
  }

  function changeTheme(mode: ThemeMode) {
    setTheme(mode);
    localStorage.setItem(THEME_KEY, mode);
    applyTheme(mode);
  }

  const tabs: { id: SettingsTab; label: string; icon: typeof Settings2 }[] = [
    { id: "general", label: t.settings.tabGeneral, icon: Settings2 },
    { id: "billing", label: t.settings.tabBilling, icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {tabs.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              size="sm"
              variant={tab === item.id ? "amber" : "secondary"}
              onClick={() => {
                setTab(item.id);
                const url = new URL(window.location.href);
                url.searchParams.set("tab", item.id);
                window.history.replaceState({}, "", url.toString());
              }}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>

      {tab === "general" && (
        <div className="grid gap-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>{t.settings.themeTitle}</CardTitle>
              <CardDescription>{t.settings.themeDesc}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={theme === "dark" ? "amber" : "secondary"}
                onClick={() => changeTheme("dark")}
              >
                <Moon className="h-4 w-4" />
                {t.settings.themeDark}
              </Button>
              <Button
                size="sm"
                variant={theme === "light" ? "amber" : "secondary"}
                onClick={() => changeTheme("light")}
              >
                <Sun className="h-4 w-4" />
                {t.settings.themeLight}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.settings.languageTitle}</CardTitle>
              <CardDescription>{t.settings.languageDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Label className="mb-2 block">{t.language}</Label>
              <LanguageSwitcher />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.settings.densityTitle}</CardTitle>
              <CardDescription>{t.settings.densityDesc}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button size="sm" variant="amber" disabled>
                {t.settings.densityComfortable}
              </Button>
              <Button size="sm" variant="secondary" disabled>
                {t.settings.densityCompact}
              </Button>
              <p className="w-full text-xs text-slate-500 mt-1">
                {t.settings.comingSoon}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "billing" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-slate-100">
              {t.settings.billingTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {t.settings.billingDesc}
            </p>
          </div>
          <PricingPanel initialPlan={initialPlan} />
        </div>
      )}
    </div>
  );
}
