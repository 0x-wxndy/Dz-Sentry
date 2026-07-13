/**
 * DZ-Sentry risk scoring — transparent weighted formula (NOT a trained ML model).
 *
 * Prototype replaces Random Forest / Prophet / neural nets with a documented
 * weighted sum so demo numbers feel "ML-like" (confidence %, trend arrows)
 * while remaining fully explainable for client walkthroughs.
 *
 * Baseline indicators are seeded from World Bank–style Algeria open data ranges.
 * Scenario sliders perturb the same formula live.
 */

import type { RiskIndex, RiskLevel, ScenarioInputs, Sector } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export const BASELINE_INDICATORS = {
  oilPriceUsd: 82,
  gasExportIndex: 68,
  rainfallAnomaly: -12, // negative = drought stress
  foodImportDependency: 55,
  borderIncidentIndex: 34,
  regionalInstability: 41,
  fdiInflowIndex: 48,
  regulatoryClarity: 62,
  inflationPct: 7.2,
  publicDebtGdp: 55,
} as const;

export const SECTOR_WEIGHTS: Record<
  Sector,
  Partial<Record<keyof typeof BASELINE_INDICATORS | keyof ScenarioInputs, number>>
> = {
  energy: {
    oilPrice: 0.35,
    gasExportIndex: 0.25,
    taxPolicyChange: 0.15,
    inflationShock: 0.1,
    fdiInflow: 0.15,
  },
  agriculture: {
    rainfallAnomaly: 0.3,
    foodImportDependency: 0.25,
    oilPrice: 0.1, // fertilizer / logistics cost proxy
    inflationShock: 0.2,
    taxPolicyChange: 0.15,
  },
  security: {
    borderStability: 0.4,
    borderIncidentIndex: 0.25,
    regionalInstability: 0.25,
    inflationShock: 0.1,
  },
  investment: {
    fdiInflow: 0.3,
    regulatoryClarity: 0.2,
    taxPolicyChange: 0.25,
    oilPrice: 0.1,
    inflationShock: 0.15,
  },
};

const SECTOR_LABELS: Record<Sector, string> = {
  energy: "Energy & Hydrocarbons",
  agriculture: "Agriculture & Food",
  security: "Security & Borders",
  investment: "Investment Climate",
};

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function toLevel(score: number): RiskLevel {
  if (score >= 65) return "red";
  if (score >= 40) return "yellow";
  return "green";
}

/**
 * Normalize raw inputs into 0–100 "risk contribution" terms.
 * Higher = more risk exposure for that factor.
 */
function normalizeFactors(inputs: ScenarioInputs) {
  const oil = inputs.oilPrice;
  // Low oil → fiscal/energy risk; very high oil → subsidy & inflation pressure
  const oilRisk =
    oil < 60 ? clamp(60 + (60 - oil) * 1.2) : oil > 100 ? clamp(40 + (oil - 100) * 0.8) : 28;

  const borderRisk = clamp(100 - inputs.borderStability);
  const taxRisk = clamp(45 + Math.abs(inputs.taxPolicyChange) * 1.8);
  const inflationRisk = clamp(inputs.inflationShock * 4.5);
  const fdiRisk = clamp(100 - inputs.fdiInflow);

  return {
    oilPrice: oilRisk,
    gasExportIndex: clamp(100 - BASELINE_INDICATORS.gasExportIndex),
    rainfallAnomaly: clamp(50 - BASELINE_INDICATORS.rainfallAnomaly),
    foodImportDependency: BASELINE_INDICATORS.foodImportDependency,
    borderStability: borderRisk,
    borderIncidentIndex: BASELINE_INDICATORS.borderIncidentIndex,
    regionalInstability: BASELINE_INDICATORS.regionalInstability,
    taxPolicyChange: taxRisk,
    inflationShock: inflationRisk,
    fdiInflow: fdiRisk,
    regulatoryClarity: clamp(100 - BASELINE_INDICATORS.regulatoryClarity),
  };
}

function scoreSector(
  sector: Sector,
  factors: ReturnType<typeof normalizeFactors>
): number {
  const weights = SECTOR_WEIGHTS[sector];
  let total = 0;
  let weightSum = 0;

  for (const [key, weight] of Object.entries(weights)) {
    const value = factors[key as keyof typeof factors];
    if (typeof value === "number" && typeof weight === "number") {
      total += value * weight;
      weightSum += weight;
    }
  }

  return clamp(weightSum > 0 ? total / weightSum : 50);
}

/** Pseudo-confidence: tighter when inputs near baseline, wider under shocks. */
function confidenceFor(inputs: ScenarioInputs, score: number): number {
  const shock =
    Math.abs(inputs.oilPrice - 82) / 40 +
    Math.abs(inputs.borderStability - 66) / 50 +
    Math.abs(inputs.taxPolicyChange) / 15 +
    inputs.inflationShock / 12 +
    Math.abs(inputs.fdiInflow - 48) / 40;

  const base = 92 - shock * 12 - Math.abs(score - 50) * 0.08;
  return clamp(base, 62, 96);
}

export function defaultScenarioInputs(): ScenarioInputs {
  return {
    oilPrice: BASELINE_INDICATORS.oilPriceUsd,
    borderStability: 66,
    taxPolicyChange: 0,
    inflationShock: BASELINE_INDICATORS.inflationPct,
    fdiInflow: BASELINE_INDICATORS.fdiInflowIndex,
  };
}

export function computeRiskIndices(inputs: ScenarioInputs): RiskIndex[] {
  const factors = normalizeFactors(inputs);
  const baseline = defaultScenarioInputs();
  const baselineFactors = normalizeFactors(baseline);

  return (Object.keys(SECTOR_LABELS) as Sector[]).map((sector) => {
    const score = Math.round(scoreSector(sector, factors) * 10) / 10;
    const baseScore = scoreSector(sector, baselineFactors);
    const delta = Math.round((score - baseScore) * 10) / 10;
    const trend: RiskIndex["trend"] =
      Math.abs(delta) < 1.5 ? "stable" : delta > 0 ? "up" : "down";

    return {
      sector,
      score,
      level: toLevel(score),
      confidence: Math.round(confidenceFor(inputs, score) * 10) / 10,
      trend,
      delta,
      label: SECTOR_LABELS[sector],
    };
  });
}

export function scenarioNarrative(
  baseline: RiskIndex[],
  projected: RiskIndex[],
  locale: Locale = "en"
): string {
  const dict = getDictionary(locale);
  const worst = [...projected].sort((a, b) => b.score - a.score)[0];
  const biggestMove = projected
    .map((p) => {
      const b = baseline.find((x) => x.sector === p.sector)!;
      return {
        sector: dict.sectors[p.sector],
        delta: p.score - b.score,
      };
    })
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))[0];

  const worstLabel = dict.sectors[worst.sector];
  const level = dict.risk[worst.level];
  const absDelta = Math.abs(biggestMove.delta).toFixed(1);

  if (locale === "fr") {
    const dir = biggestMove.delta >= 0 ? "augmente" : "réduit";
    return `Sous les hypothèses configurées, l'exposition composite culmine dans ${worstLabel} (${worst.score.toFixed(0)} / 100, ${level}). Le plus grand écart ${dir} le risque dans ${biggestMove.sector} de ${absDelta} points vs. la référence.`;
  }
  if (locale === "ar") {
    const dir = biggestMove.delta >= 0 ? "يرفع" : "يخفّض";
    return `في ظل الافتراضات المحددة، تبلغ المخاطر المركبة ذروتها في ${worstLabel} (${worst.score.toFixed(0)} / 100، ${level}). أكبر تغيّر ${dir} المخاطر في ${biggestMove.sector} بمقدار ${absDelta} نقطة مقارنة بخط الأساس.`;
  }

  const direction = biggestMove.delta >= 0 ? "elevates" : "eases";
  return `Under the configured assumptions, composite exposure peaks in ${worstLabel} (${worst.score.toFixed(0)} / 100, ${level.toUpperCase()}). The largest swing ${direction} risk in ${biggestMove.sector} by ${absDelta} points versus baseline.`;
}
