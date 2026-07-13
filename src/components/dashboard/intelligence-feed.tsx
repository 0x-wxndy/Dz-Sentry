"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Radio } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/input";
import { cn, riskColor } from "@/lib/utils";
import type { Alert, Sector } from "@/types";
import { useI18n } from "@/components/i18n/locale-provider";
import { localizeAlerts } from "@/data/alerts-i18n";

const REFRESH_MS = 8000;

export function IntelligenceFeed({ initial }: { initial: Alert[] }) {
  const [alerts, setAlerts] = useState(initial);
  const [tick, setTick] = useState(0);
  const { t, tf, dir, locale } = useI18n();

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const nextTick = tick + 1;
        const res = await fetch(`/api/alerts?tick=${nextTick}`);
        const data = await res.json();
        setAlerts(data.alerts);
        setTick(nextTick);
      } catch {
        /* ignore for demo */
      }
    }, REFRESH_MS);
    return () => clearInterval(id);
  }, [tick]);

  const localized = useMemo(
    () => localizeAlerts(alerts, locale, tick),
    [alerts, locale, tick]
  );

  function sectorLabel(sector: Sector) {
    return t.sectors[sector] ?? sector;
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-amber-400" />
            {t.dashboard.feedTitle}
          </CardTitle>
        </div>
        <CardDescription>
          {tf(t.dashboard.feedDesc, { seconds: REFRESH_MS / 1000 })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div
          className={cn(
            "h-[420px] overflow-y-auto space-y-2 scrollbar-thin",
            dir === "rtl" ? "pl-1" : "pr-1"
          )}
        >
          <AnimatePresence initial={false}>
            {localized.map((a) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, x: dir === "rtl" ? -24 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-md border border-white/8 bg-ink-950/50 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-medium text-slate-100">{a.title}</div>
                  <Badge className={cn(riskColor(a.severity))}>
                    {t.risk[a.severity]}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {a.summary}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-[10px] tracking-wider text-slate-500">
                  <span>{sectorLabel(a.sector)}</span>
                  <span>|</span>
                  <span>{a.region}</span>
                  <span>|</span>
                  <span>{a.source}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
