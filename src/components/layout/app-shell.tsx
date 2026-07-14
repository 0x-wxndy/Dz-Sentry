"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  SlidersHorizontal,
  Grid3X3,
  Shield,
  Lock,
  Scale,
  Users,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROLE_ACCESS, DEMO_USERS } from "@/lib/auth/rbac";
import { planAllows, type PlanId } from "@/lib/plans";
import type { DemoUser, UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

export function AppShell({
  user,
  plan,
  children,
}: {
  user: DemoUser;
  plan: PlanId;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const access = ROLE_ACCESS[user.role];
  const { t, dir } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const NAV = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/search", label: t.nav.search, icon: Search },
    { href: "/laws", label: t.nav.laws, icon: Scale },
    {
      href: "/experts",
      label: t.nav.experts,
      icon: Users,
      requiresPlan: "expertsView" as const,
    },
    {
      href: "/scenarios",
      label: t.nav.scenarios,
      icon: SlidersHorizontal,
      requires: "scenarios" as const,
      requiresPlan: "scenarios" as const,
    },
    { href: "/matrix", label: t.nav.matrix, icon: Grid3X3 },
    {
      href: "/admin",
      label: t.nav.admin,
      icon: Shield,
      requires: "admin" as const,
      requiresPlan: "admin" as const,
    },
    { href: "/settings", label: t.nav.settings, icon: Settings },
  ];

  async function switchRole(role: UserRole) {
    await fetch("/api/auth/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    router.refresh();
  }

  const planLabel =
    plan === "premium"
      ? t.pricing.premium
      : plan === "professionnel"
        ? t.pricing.professionnel
        : t.pricing.starter;

  const navBody = (
    <>
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/dashboard" className="block group" onClick={() => setOpen(false)}>
          <div className="font-display text-2xl tracking-tight text-amber-400 group-hover:text-amber-300 transition-colors">
            DZ-Sentry
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mt-1">
            {t.brand.tagline}
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const roleLocked =
            (item.requires === "scenarios" && !access.scenarios) ||
            (item.requires === "admin" && !access.admin);
          const planLocked =
            item.requiresPlan != null && !planAllows(plan, item.requiresPlan);
          const locked = roleLocked || planLocked;
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          if (locked) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 cursor-not-allowed"
                title={
                  planLocked ? t.pricing.upgradeHint : t.brand.insufficientClearance
                }
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
              onClick={() => setOpen(false)}
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
          {t.pricing.currentPlan}
        </div>
        <div className="text-xs text-amber-400/90">{planLabel}</div>
        <div className="text-[10px] uppercase tracking-wider text-slate-500 pt-1">
          {t.brand.demoIdentity}
        </div>
        <div className="text-sm font-medium">{user.name}</div>
        <div className="text-xs text-slate-400">{t.roles[user.role]}</div>
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
    </>
  );

  return (
    <div
      className={cn(
        "min-h-screen flex bg-ink-950 text-slate-100",
        dir === "rtl" && "lg:flex-row-reverse"
      )}
    >
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex w-60 shrink-0 bg-ink-900/80 flex-col",
          dir === "rtl" ? "border-l border-white/10" : "border-r border-white/10"
        )}
      >
        {navBody}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className={cn(
                "fixed inset-y-0 z-50 w-[min(16.5rem,88vw)] bg-ink-900 flex flex-col border-white/10 lg:hidden",
                dir === "rtl" ? "end-0 border-s" : "start-0 border-e"
              )}
              initial={{ x: dir === "rtl" ? 24 : -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir === "rtl" ? 24 : -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              <div className="absolute top-3 end-3">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {navBody}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-14 border-b border-white/10 bg-ink-900/80 backdrop-blur flex items-center justify-between gap-2 px-3 sm:px-6">
          <div className="flex items-center gap-2 min-w-0">
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden shrink-0"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link
              href="/dashboard"
              className="font-display text-lg text-amber-400 lg:hidden truncate"
            >
              DZ-Sentry
            </Link>
            <div className="hidden sm:block text-xs text-slate-500 font-mono truncate">
              {t.brand.headerDemo} | {new Date().toISOString().slice(0, 10)}
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <LanguageSwitcher compact className="hidden sm:inline-flex" />
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => router.push("/settings?tab=billing")}
            >
              {planLabel}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/login")}
            >
              {t.brand.session}
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto overflow-x-clip p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
