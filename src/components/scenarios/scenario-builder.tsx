"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  computeRiskIndices,
  defaultScenarioInputs,
  scenarioNarrative,
} from "@/lib/risk-scoring";
import type { ScenarioInputs } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import { RiskCards } from "@/components/dashboard/risk-cards";
import { useI18n } from "@/components/i18n/locale-provider";

const SLIDER_META: {
  key: keyof ScenarioInputs;
  min: number;
  max: number;
  step: number;
  unit: string;
}[] = [
  { key: "oilPrice", min: 40, max: 140, step: 1, unit: "USD/bbl" },
  { key: "borderStability", min: 0, max: 100, step: 1, unit: "index" },
  { key: "taxPolicyChange", min: -20, max: 20, step: 1, unit: "pp" },
  { key: "inflationShock", min: 0, max: 20, step: 0.1, unit: "%" },
  { key: "fdiInflow", min: 0, max: 100, step: 1, unit: "index" },
];

export function ScenarioBuilder() {
  const { t, locale } = useI18n();
  const [inputs, setInputs] = useState<ScenarioInputs>(defaultScenarioInputs());
  const baseline = useMemo(() => computeRiskIndices(defaultScenarioInputs()), []);
  const projected = useMemo(() => computeRiskIndices(inputs), [inputs]);
  const narrative = useMemo(
    () => scenarioNarrative(baseline, projected, locale),
    [baseline, projected, locale]
  );

  const chartData = baseline.map((b) => {
    const p = projected.find((x) => x.sector === b.sector)!;
    return {
      name: t.sectors[b.sector],
      [t.scenarios.baseline]: b.score,
      [t.scenarios.projected]: p.score,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.scenarios.levers}</CardTitle>
            <CardDescription>{t.scenarios.leversDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {SLIDER_META.map((s) => (
              <div key={s.key}>
                <div className="flex justify-between mb-2 gap-2">
                  <Label>{t.scenarios[s.key]}</Label>
                  <span className="text-xs font-mono text-amber-300 shrink-0">
                    {inputs[s.key]} {s.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={inputs[s.key]}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      [s.key]: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-amber-400"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{t.scenarios.comparison}</CardTitle>
            <CardDescription>{t.scenarios.comparisonDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              key={JSON.stringify(inputs) + locale}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              className="h-72"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: 8,
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey={t.scenarios.baseline}
                    fill="#64748b"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey={t.scenarios.projected}
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">{narrative}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
          {t.scenarios.projectedCards}
        </h3>
        <RiskCards indices={projected} />
      </div>
    </div>
  );
}
