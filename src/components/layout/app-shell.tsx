"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  SlidersHorizontal,
  Grid3X3,
  Shield,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROLE_ACCESS, DEMO_USERS } from "@/lib/auth/rbac";
import type { DemoUser, UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

export function AppShell({
  user,
  children,
}: {
  user: DemoUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const access = ROLE_ACCESS[user.role];
  const { t, dir } = useI18n();

  const NAV = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/search", label: t.nav.search, icon: Search },
    {
      href: "/scenarios",
      label: t.nav.scenarios,
      icon: SlidersHorizontal,
      requires: "scenarios" as const,
    },
    { href: "/matrix", label: t.nav.matrix, icon: Grid3X3 },
    {
      href: "/admin",
      label: t.nav.admin,
      icon: Shield,
      requires: "admin" as const,
    },
  ];

  async function switchRole(role: UserRole) {
    await fetch("/api/auth/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    router.refresh();
  }

  return (
    <div
      className={cn(
        "min-h-screen flex bg-ink-950 text-slate-100",
        dir === "rtl" && "flex-row-reverse"
      )}
    >
      <aside
        className={cn(
          "w-60 shrink-0 bg-ink-900/80 flex flex-col",
          dir === "rtl" ? "border-l border-white/10" : "border-r border-white/10"
        )}
      >
        <div className="px-5 py-6 border-b border-white/10">
          <Link href="/dashboard" className="block group">
            <div className="font-display text-2xl tracking-tight text-amber-400 group-hover:text-amber-300 transition-colors">
              DZ-Sentry
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mt-1">
              {t.brand.tagline}
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => {
            const locked =
              (item.requires === "scenarios" && !access.scenarios) ||
              (item.requires === "admin" && !access.admin);
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            if (locked) {
              return (
                <div
                  key={item.href}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 cursor-not-allowed"
                  title={t.brand.insufficientClearance}
                >
                  <Lock className="h-4 w-4" />
                  {item.label}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-2.5 text-sm rounded-md transition-colors",
                  active
                    ? "text-amber-200"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-amber-500/10 border border-amber-500/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="h-4 w-4 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <LanguageSwitcher />
          <div className="text-[10px] uppercase tracking-wider text-slate-500">
            {t.brand.demoIdentity}
          </div>
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-xs text-amber-400/90">{t.roles[user.role]}</div>
          <select
            className="w-full h-9 rounded-md border border-white/10 bg-ink-950 text-xs px-2 text-slate-200"
            value={user.role}
            onChange={(e) => switchRole(e.target.value as UserRole)}
          >
            {DEMO_USERS.map((u) => (
              <option key={u.id} value={u.role}>
                {t.roles[u.role]}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-white/10 bg-ink-900/40 backdrop-blur flex items-center justify-between px-6 gap-3">
          <div className="text-xs text-slate-500 font-mono truncate">
            {t.brand.headerDemo} | {new Date().toISOString().slice(0, 10)}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher compact className="hidden sm:inline-flex" />
            <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
              {t.brand.session}
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
