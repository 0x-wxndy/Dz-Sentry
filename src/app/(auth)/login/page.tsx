"use client";

import { useRouter } from "next/navigation";
import { DEMO_USERS } from "@/lib/auth/rbac";
import type { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/components/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();

  async function enter(role: UserRole) {
    await fetch("/api/auth/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
        <div className="text-center">
          <h1 className="font-display text-5xl text-amber-400 tracking-tight">
            DZ-Sentry
          </h1>
          <p className="mt-3 text-slate-400 text-sm max-w-md mx-auto">
            {t.login.subtitle}
          </p>
        </div>

        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle>{t.login.demoSession}</CardTitle>
            <CardDescription>{t.login.demoSessionDesc}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {DEMO_USERS.map((u) => (
              <Button
                key={u.id}
                variant="secondary"
                className="justify-between h-12"
                onClick={() => enter(u.role)}
              >
                <span>{u.name}</span>
                <span className="text-amber-400 text-xs">{t.roles[u.role]}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        <p className="text-center text-[11px] text-slate-600 leading-relaxed">
          {t.login.phase2}
        </p>
      </div>
    </div>
  );
}
