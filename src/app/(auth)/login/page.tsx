"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_PASSWORD, DEMO_USERS, findDemoUserByEmail } from "@/lib/auth/rbac";
import type { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useI18n } from "@/components/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [email, setEmail] = useState(DEMO_USERS[0].email);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [activeRole, setActiveRole] = useState<UserRole>(DEMO_USERS[0].role);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function autofill(role: UserRole) {
    const user = DEMO_USERS.find((u) => u.role === role);
    if (!user) return;
    setActiveRole(role);
    setEmail(user.email);
    setPassword(DEMO_PASSWORD);
    setError("");
  }

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const user = findDemoUserByEmail(email);
      if (!user || password !== DEMO_PASSWORD) {
        setError(t.login.invalidCreds);
        return;
      }
      await fetch("/api/auth/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: user.role }),
      });
      router.push("/dashboard");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg space-y-6 sm:space-y-8">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
        <div className="text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-amber-400 tracking-tight">
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
          <CardContent className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                {t.login.quickPick}
              </p>
              <p className="text-[11px] text-slate-500 mb-2">
                {t.login.autofillHint}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_USERS.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => autofill(u.role)}
                    className={cn(
                      "rounded-md border px-3 py-2.5 text-start transition-colors",
                      activeRole === u.role
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                    )}
                  >
                    <div className="text-sm font-medium truncate">{u.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {t.roles[u.role]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={signIn} className="space-y-3">
              <div>
                <Label htmlFor="email">{t.login.email}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  className="mt-1.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">{t.login.password}</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="mt-1.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-risk-red">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={busy}>
                {t.login.signIn}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-[11px] text-slate-600 leading-relaxed">
          {t.login.phase2}
        </p>
      </div>
    </div>
  );
}
