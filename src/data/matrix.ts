import type { MatrixCell } from "@/types";

/** Hand-written cross-impact narratives — Module 4 is simulated, not computed. */
export const MATRIX_FACTORS = [
  "Oil price shock",
  "Border instability",
  "Tax reform",
  "Drought / agri stress",
  "FDI surge",
] as const;

export const CROSS_IMPACT_MATRIX: MatrixCell[] = [
  {
    row: "Oil price shock",
    col: "Border instability",
    intensity: 0.55,
    timeframe: "3–9 months",
    narrative:
      "Sustained hydrocarbon revenue pressure constrains discretionary security modernization budgets along southern corridors, while parallel markets for fuel can amplify smuggling incentives. Not a direct causal link — fiscal channel and illicit-economy channel both matter.",
  },
  {
    row: "Oil price shock",
    col: "Tax reform",
    intensity: 0.72,
    timeframe: "6–18 months",
    narrative:
      "Lower oil receipts historically accelerate non-hydrocarbon fiscal measures. A sharp price drop raises the political cost of delayed tax-base broadening; conversely, a windfall can postpone reform. Watch draft finance laws and implementing decrees.",
  },
  {
    row: "Oil price shock",
    col: "Drought / agri stress",
    intensity: 0.48,
    timeframe: "1–2 seasons",
    narrative:
      "Energy fiscal space funds food import buffers. Price shocks compress subsidy headroom precisely when drought elevates cereal import needs — a classic twin-stress scenario for consumer inflation.",
  },
  {
    row: "Oil price shock",
    col: "FDI surge",
    intensity: 0.4,
    timeframe: "12–36 months",
    narrative:
      "Hydrocarbon cycles color investor sentiment for energy-adjacent manufacturing and logistics. Price collapses can paradoxically open reform windows that improve the investment code narrative.",
  },
  {
    row: "Border instability",
    col: "Oil price shock",
    intensity: 0.35,
    timeframe: "Immediate–6 months",
    narrative:
      "Instability rarely moves global oil benchmarks alone, but can raise local security premiums on pipelines, ports, and personnel — a cost-of-operations channel rather than a price channel.",
  },
  {
    row: "Border instability",
    col: "Tax reform",
    intensity: 0.3,
    timeframe: "Political cycle",
    narrative:
      "Security prioritization can crowd out administrative capacity for complex tax administration upgrades in peripheral wilayas, slowing compliance gains even if statutes pass.",
  },
  {
    row: "Border instability",
    col: "Drought / agri stress",
    intensity: 0.62,
    timeframe: "Seasonal",
    narrative:
      "Displacement and disrupted pastoral routes compound livestock stress. Informal cross-border grain and livestock flows become less predictable, raising local price volatility.",
  },
  {
    row: "Border instability",
    col: "FDI surge",
    intensity: 0.7,
    timeframe: "6–24 months",
    narrative:
      "Site-selection committees discount southern logistics hubs when incident clusters rise. Coastal industrial zones are less sensitive; Saharan resource projects are highly sensitive.",
  },
  {
    row: "Tax reform",
    col: "Oil price shock",
    intensity: 0.25,
    timeframe: "Indirect",
    narrative:
      "Tax reform does not move oil prices; the reverse channel dominates. Residual effect: clearer fiscal rules can improve sovereign narrative during commodity downturns.",
  },
  {
    row: "Tax reform",
    col: "Border instability",
    intensity: 0.2,
    timeframe: "Long",
    narrative:
      "Formalization pressure on informal border trade can temporarily raise friction and enforcement incidents before settling into a new equilibrium.",
  },
  {
    row: "Tax reform",
    col: "Drought / agri stress",
    intensity: 0.45,
    timeframe: "1–2 years",
    narrative:
      "VAT / subsidy redesign during drought years is politically fraught. Poor sequencing amplifies food-price perceptions even if net fiscal design is sound.",
  },
  {
    row: "Tax reform",
    col: "FDI surge",
    intensity: 0.78,
    timeframe: "12–36 months",
    narrative:
      "Predictable tax treatment of reinvested earnings and strategic-sector incentives is among the highest-leverage signals for greenfield FDI. Ambiguity is priced as risk.",
  },
  {
    row: "Drought / agri stress",
    col: "Oil price shock",
    intensity: 0.15,
    timeframe: "Weak",
    narrative:
      "Agriculture stress does not drive oil; only a weak fiscal-demand feedback exists via higher import bills.",
  },
  {
    row: "Drought / agri stress",
    col: "Border instability",
    intensity: 0.5,
    timeframe: "Seasonal",
    narrative:
      "Resource competition around water points and grazing can elevate local disputes; national-level security metrics usually move less than local incident logs.",
  },
  {
    row: "Drought / agri stress",
    col: "Tax reform",
    intensity: 0.38,
    timeframe: "Budget cycle",
    narrative:
      "Emergency agri spending and import facilitation measures often appear as mid-year budget adjustments — a fiscal sequencing risk for broader tax reform calendars.",
  },
  {
    row: "Drought / agri stress",
    col: "FDI surge",
    intensity: 0.42,
    timeframe: "Agri & water",
    narrative:
      "Water-stressed regions see delayed agribusiness FDI; desalination / irrigation tech investors may accelerate. Sector composition matters more than headline FDI.",
  },
  {
    row: "FDI surge",
    col: "Oil price shock",
    intensity: 0.22,
    timeframe: "Indirect",
    narrative:
      "FDI composition toward non-hydrocarbon industry gradually reduces oil-revenue dependence — a structural, not cyclical, effect.",
  },
  {
    row: "FDI surge",
    col: "Border instability",
    intensity: 0.33,
    timeframe: "Local",
    narrative:
      "Large project camps and logistics corridors can attract predation or protest risk if benefit-sharing is opaque. Community engagement is a security control, not just ESG.",
  },
  {
    row: "FDI surge",
    col: "Tax reform",
    intensity: 0.6,
    timeframe: "Negotiation",
    narrative:
      "Major investors lobby for clarity and sometimes carve-outs. A surge without parallel administration capacity can produce ad-hoc rulings that undermine the reform brand.",
  },
  {
    row: "FDI surge",
    col: "Drought / agri stress",
    intensity: 0.28,
    timeframe: "Project-level",
    narrative:
      "Industrial water demand from new plants can compete with irrigation in stressed basins — an environmental clearance and social-license channel.",
  },
];

export function getMatrixCell(row: string, col: string): MatrixCell | undefined {
  if (row === col) {
    return {
      row,
      col,
      intensity: 1,
      timeframe: "—",
      narrative: "Diagonal identity — self-impact is definitional, not cross-impact. Select an off-diagonal cell for narrative analysis.",
    };
  }
  return CROSS_IMPACT_MATRIX.find((c) => c.row === row && c.col === col);
}
