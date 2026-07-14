export type PlanId = "starter" | "professionnel" | "premium";

export type PlanFeatureKey =
  | "dashboard"
  | "search"
  | "laws"
  | "expertsView"
  | "expertsContact"
  | "scenarios"
  | "matrix"
  | "classified"
  | "admin"
  | "prioritySupport"
  | "seats";

export interface PlanDefinition {
  id: PlanId;
  /** Demo monthly price in DZD (prototype display) */
  priceMonthlyDzd: number;
  /** Demo annual price in DZD */
  priceYearlyDzd: number;
  seats: number;
  highlighted?: boolean;
  features: Record<PlanFeatureKey, boolean | number>;
}

/**
 * Self-serve subscription ladder for the prototype.
 * Starter = individual analyst · Professionnel = operator seats · Premium = enterprise.
 */
export const PLANS: PlanDefinition[] = [
  {
    id: "starter",
    priceMonthlyDzd: 29000,
    priceYearlyDzd: 290000,
    seats: 1,
    features: {
      dashboard: true,
      search: true,
      laws: true,
      expertsView: true,
      expertsContact: false,
      scenarios: false,
      matrix: true,
      classified: false,
      admin: false,
      prioritySupport: false,
      seats: 1,
    },
  },
  {
    id: "professionnel",
    priceMonthlyDzd: 89000,
    priceYearlyDzd: 890000,
    seats: 5,
    highlighted: true,
    features: {
      dashboard: true,
      search: true,
      laws: true,
      expertsView: true,
      expertsContact: true,
      scenarios: true,
      matrix: true,
      classified: false,
      admin: false,
      prioritySupport: true,
      seats: 5,
    },
  },
  {
    id: "premium",
    priceMonthlyDzd: 249000,
    priceYearlyDzd: 2490000,
    seats: 25,
    features: {
      dashboard: true,
      search: true,
      laws: true,
      expertsView: true,
      expertsContact: true,
      scenarios: true,
      matrix: true,
      classified: true,
      admin: true,
      prioritySupport: true,
      seats: 25,
    },
  },
];

export const PLAN_COOKIE = "dz_sentry_plan";
export const DEFAULT_PLAN: PlanId = "starter";

export function isPlanId(v: string | undefined | null): v is PlanId {
  return v === "starter" || v === "professionnel" || v === "premium";
}

export function getPlan(id: PlanId): PlanDefinition {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}

export function planAllows(planId: PlanId, feature: PlanFeatureKey): boolean {
  const v = getPlan(planId).features[feature];
  return typeof v === "boolean" ? v : v > 0;
}

export function formatDzd(amount: number, locale: string): string {
  try {
    return new Intl.NumberFormat(locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-DZ" : "en-DZ", {
      style: "currency",
      currency: "DZD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} DZD`;
  }
}
