"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/input";
import { cn, formatPercent, riskBg, riskColor } from "@/lib/utils";
import type { RiskIndex } from "@/types";
import { useI18n } from "@/components/i18n/locale-provider";

export function RiskCards({ indices }: { indices: RiskIndex[] }) {
  const { t, dir } = useI18n();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {indices.map((r, i) => (
        <motion.div
          key={r.sector}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.35 }}
        >
          <Card className={cn("border", riskBg(r.level))}>
            <CardHeader className="pb-1">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xs text-slate-300 font-medium normal-case tracking-normal">
                  {t.sectors[r.sector]}
                </CardTitle>
                <Badge className={cn("border-0", riskColor(r.level))}>
                  {t.risk[r.level]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className={cn("text-3xl font-display tabular-nums", riskColor(r.level))}>
                    {r.score.toFixed(0)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {t.risk.confidence} {formatPercent(r.confidence, 1)}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  {r.trend === "up" && (
                    <ArrowUpRight className="h-4 w-4 text-risk-red" />
                  )}
                  {r.trend === "down" && (
                    <ArrowDownRight className="h-4 w-4 text-risk-green" />
                  )}
                  {r.trend === "stable" && (
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 text-slate-500",
                        dir === "rtl" && "rotate-180"
                      )}
                    />
                  )}
                  <span className="tabular-nums">
                    {r.delta > 0 ? "+" : ""}
                    {r.delta.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-black/30 overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    r.level === "red" && "bg-risk-red",
                    r.level === "yellow" && "bg-risk-yellow",
                    r.level === "green" && "bg-risk-green",
                    dir === "rtl" && "ml-auto"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${r.score}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
