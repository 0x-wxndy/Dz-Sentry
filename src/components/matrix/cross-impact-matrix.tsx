"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CROSS_IMPACT_MATRIX, MATRIX_FACTORS, getMatrixCell } from "@/data/matrix";
import type { MatrixCell } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/locale-provider";
import {
  getLocalizedNarrative,
  localizeTimeframe,
} from "@/data/matrix-i18n";

function intensityColor(v: number) {
  if (v >= 0.7) return "bg-risk-red/70";
  if (v >= 0.45) return "bg-risk-yellow/60";
  if (v >= 0.25) return "bg-teal-500/40";
  return "bg-white/10";
}

export function CrossImpactMatrix() {
  const { t, locale, dir } = useI18n();
  const [selected, setSelected] = useState<MatrixCell | null>(
    CROSS_IMPACT_MATRIX[0]
  );

  function factorLabel(key: string) {
    return t.matrix.factors[key] ?? key;
  }

  const legend = [
    { className: "bg-risk-red/70", label: t.matrix.legendHigh },
    { className: "bg-risk-yellow/60", label: t.matrix.legendMedium },
    { className: "bg-teal-500/40", label: t.matrix.legendLow },
    { className: "bg-white/10", label: t.matrix.legendWeak },
  ];

  return (
    <div className="grid lg:grid-cols-5 gap-4">
      <Card className="lg:col-span-3 overflow-x-auto">
        <CardHeader>
          <CardTitle>{t.matrix.matrixTitle}</CardTitle>
          <CardDescription>{t.matrix.matrixDesc}</CardDescription>
          <div className="pt-3 space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">
              {t.matrix.legendTitle}
            </div>
            <div className="flex flex-wrap gap-3">
              {legend.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-[11px] text-slate-400"
                >
                  <span
                    className={cn(
                      "h-3.5 w-3.5 rounded-sm border border-white/15 shrink-0",
                      item.className
                    )}
                  />
                  {item.label}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">{t.matrix.legendSelf}</p>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse text-xs min-w-[520px]">
            <thead>
              <tr>
                <th
                  className={cn(
                    "p-2 text-slate-500 font-medium",
                    dir === "rtl" ? "text-right" : "text-left"
                  )}
                >
                  {t.matrix.impactArrow}
                </th>
                {MATRIX_FACTORS.map((f) => (
                  <th key={f} className="p-2 text-slate-400 font-normal max-w-[80px]">
                    {factorLabel(f)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX_FACTORS.map((row) => (
                <tr key={row}>
                  <td className="p-2 text-slate-300 whitespace-nowrap">
                    {factorLabel(row)}
                  </td>
                  {MATRIX_FACTORS.map((col) => {
                    const cell = getMatrixCell(row, col)!;
                    const active =
                      selected?.row === row && selected?.col === col;
                    return (
                      <td key={col} className="p-1">
                        <button
                          type="button"
                          onClick={() => setSelected(cell)}
                          className={cn(
                            "w-full aspect-square rounded-md border transition-all",
                            intensityColor(cell.intensity),
                            active
                              ? "border-amber-400 ring-2 ring-amber-400/40 scale-105"
                              : "border-white/10 hover:border-white/30"
                          )}
                          title={`${factorLabel(row)} → ${factorLabel(col)}: ${Math.round(cell.intensity * 100)}%`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>{t.matrix.narrativeTitle}</CardTitle>
          <CardDescription>{t.matrix.narrativeDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={`${selected.row}-${selected.col}-${locale}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div>
                  <div className="text-amber-300 font-medium text-sm">
                    {factorLabel(selected.row)}
                  </div>
                  <div className="text-slate-500 text-xs my-1">
                    {t.matrix.impacts}
                  </div>
                  <div className="text-slate-100 font-medium text-sm">
                    {factorLabel(selected.col)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-[10px] tracking-wider text-slate-500">
                  <span>
                    {t.matrix.intensity}{" "}
                    {(selected.intensity * 100).toFixed(0)}%
                  </span>
                  <span>|</span>
                  <span>{localizeTimeframe(selected.timeframe, locale)}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {getLocalizedNarrative(selected, locale)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
