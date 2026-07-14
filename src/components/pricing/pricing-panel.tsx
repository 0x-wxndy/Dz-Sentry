"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, CreditCard } from "lucide-react";
import { PLANS, formatDzd, type PlanId } from "@/lib/plans";
import { useI18n } from "@/components/i18n/locale-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

const FEATURE_ORDER = [
  "dashboard",
  "search",
  "laws",
  "expertsView",
  "expertsContact",
  "scenarios",
  "matrix",
  "classified",
  "admin",
  "prioritySupport",
  "seats",
] as const;

export function PricingPanel({ initialPlan }: { initialPlan: PlanId }) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [billing, setBilling] = useState<Billing>("monthly");
  const [current, setCurrent] = useState<PlanId>(initialPlan);
  const [busy, setBusy] = useState<PlanId | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    setCurrent(initialPlan);
  }, [initialPlan]);

  const planNames: Record<PlanId, string> = {
    starter: t.pricing.starter,
    professionnel: t.pricing.professionnel,
    premium: t.pricing.premium,
  };

  const planBlurb: Record<PlanId, string> = {
    starter: t.pricing.starterBlurb,
    professionnel: t.pricing.professionnelBlurb,
    premium: t.pricing.premiumBlurb,
  };

  const featureLabels: Record<(typeof FEATURE_ORDER)[number], string> = {
    dashboard: t.pricing.featDashboard,
    search: t.pricing.featSearch,
    laws: t.pricing.featLaws,
    expertsView: t.pricing.featExpertsView,
    expertsContact: t.pricing.featExpertsContact,
    scenarios: t.pricing.featScenarios,
    matrix: t.pricing.featMatrix,
    classified: t.pricing.featClassified,
    admin: t.pricing.featAdmin,
    prioritySupport: t.pricing.featSupport,
    seats: t.pricing.featSeats,
  };

  async function subscribe(plan: PlanId) {
    setBusy(plan);
    setNote("");
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment failed");
      setCurrent(plan);
      setNote(t.pricing.activated.replace("{plan}", planNames[plan]));
      router.refresh();
    } catch (e) {
      setNote(e instanceof Error ? e.message : t.pricing.payError);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          size="sm"
          variant={billing === "monthly" ? "amber" : "secondary"}
          onClick={() => setBilling("monthly")}
        >
          {t.pricing.monthly}
        </Button>
        <Button
          size="sm"
          variant={billing === "yearly" ? "amber" : "secondary"}
          onClick={() => setBilling("yearly")}
        >
          {t.pricing.yearly}
          <Badge className="ms-1 text-risk-green border-risk-green/30">
            {t.pricing.saveYearly}
          </Badge>
        </Button>
      </div>

      {note && (
        <p className="text-center text-sm text-amber-300/90">{note}</p>
      )}

      <div className="grid gap-4 md:grid-cols-3 items-stretch">
        {PLANS.map((plan, i) => {
          const price =
            billing === "monthly" ? plan.priceMonthlyDzd : plan.priceYearlyDzd;
          const active = current === plan.id;
          return (
            <motion.div
              key={plan.id}
              className="h-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={cn(
                  "h-full flex flex-col relative pt-3",
                  plan.highlighted && "border-amber-500/40 shadow-glow",
                  active && "ring-1 ring-amber-400/50"
                )}
              >
                <div className="h-6 flex items-center justify-center shrink-0">
                  {plan.highlighted ? (
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40">
                      {t.pricing.recommended}
                    </Badge>
                  ) : (
                    <span className="invisible text-[10px]">.</span>
                  )}
                </div>

                <CardHeader className="pt-2 pb-2 shrink-0">
                  <CardTitle className="font-display text-xl min-h-[1.75rem]">
                    {planNames[plan.id]}
                  </CardTitle>
                  <CardDescription className="min-h-[2.5rem]">
                    {planBlurb[plan.id]}
                  </CardDescription>
                  <div className="pt-3 min-h-[4.25rem]">
                    <div className="text-3xl font-display text-amber-300 tabular-nums">
                      {formatDzd(price, locale)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {billing === "monthly"
                        ? t.pricing.perMonth
                        : t.pricing.perYear}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 pt-0">
                  <ul className="space-y-2 text-sm flex-1">
                    {FEATURE_ORDER.map((key) => {
                      const val = plan.features[key];
                      const on = typeof val === "boolean" ? val : true;
                      if (!on) return null;
                      const label =
                        key === "seats"
                          ? featureLabels.seats.replace(
                              "{n}",
                              String(plan.seats)
                            )
                          : featureLabels[key];
                      return (
                        <li
                          key={key}
                          className="flex items-start gap-2 text-slate-300"
                        >
                          <Check className="h-4 w-4 text-risk-green shrink-0 mt-0.5" />
                          <span>{label}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-white/10 shrink-0">
                    <Button
                      className="w-full"
                      variant={active ? "secondary" : "default"}
                      disabled={active || busy === plan.id}
                      onClick={() => subscribe(plan.id)}
                    >
                      <CreditCard className="h-4 w-4" />
                      {active
                        ? t.pricing.currentPlan
                        : busy === plan.id
                          ? t.pricing.processing
                          : t.pricing.subscribe}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
        {t.pricing.demoPayNote}
      </p>
    </div>
  );
}
