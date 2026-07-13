import type { Alert } from "@/types";

/** Seeded intelligence feed — demo polls this every N seconds. */
export const SEED_ALERTS: Alert[] = [
  {
    id: "a1",
    title: "Hydrocarbon export corridor watch",
    summary:
      "Elevated shipping insurance premiums on Mediterranean LNG routes; monitor Sonatrach lift schedules.",
    sector: "energy",
    severity: "yellow",
    region: "Mediterranean / Skikda",
    created_at: "2026-07-12T14:22:00Z",
    source: "Market Signal Desk",
  },
  {
    id: "a2",
    title: "Sahara border incident cluster",
    summary:
      "Three low-intensity incidents reported near Tin Zaouatine over 72h — trafficking corridor pressure.",
    sector: "security",
    severity: "red",
    region: "Tamanrasset",
    created_at: "2026-07-12T13:05:00Z",
    source: "OSINT Fusion",
  },
  {
    id: "a3",
    title: "Cereal import tender window",
    summary:
      "ONAB tender timing overlaps with Black Sea freight volatility; food-price pass-through risk.",
    sector: "agriculture",
    severity: "yellow",
    region: "National",
    created_at: "2026-07-12T11:40:00Z",
    source: "Agri Desk",
  },
  {
    id: "a4",
    title: "Investment code clarification expected",
    summary:
      "Draft implementing texts for strategic sectors circulating — VVIP briefing recommended.",
    sector: "investment",
    severity: "green",
    region: "Algiers",
    created_at: "2026-07-12T09:15:00Z",
    source: "Legal Monitor",
  },
  {
    id: "a5",
    title: "CREG tariff consultation open",
    summary:
      "Electricity tariff revision consultation may affect industrial offtake contracts Q4.",
    sector: "energy",
    severity: "green",
    region: "National",
    created_at: "2026-07-11T18:30:00Z",
    source: "Regulatory Watch",
  },
  {
    id: "a6",
    title: "Drought stress — High Plateaus",
    summary:
      "Rainfall anomaly −18% vs. 10-year mean; livestock water stress indicators rising.",
    sector: "agriculture",
    severity: "red",
    region: "Sétif / Bordj Bou Arréridj",
    created_at: "2026-07-11T16:00:00Z",
    source: "Climate Proxy",
  },
  {
    id: "a7",
    title: "FDI pipeline — automotive assembly",
    summary:
      "Two OEM site-selection visits scheduled; local content rules remain key diligence item.",
    sector: "investment",
    severity: "green",
    region: "Oran / Relizane",
    created_at: "2026-07-11T12:20:00Z",
    source: "Deal Flow",
  },
  {
    id: "a8",
    title: "Sahel spillover monitoring",
    summary:
      "Refugee / displacement pressure indicators up slightly along southern wilayas.",
    sector: "security",
    severity: "yellow",
    region: "Adrar / Illizi",
    created_at: "2026-07-11T08:45:00Z",
    source: "Regional Desk",
  },
  {
    id: "a9",
    title: "Banking FX settlement delays",
    summary:
      "Anecdotal 3–5 day stretch in documentary credit confirmations for capital goods.",
    sector: "investment",
    severity: "yellow",
    region: "Algiers",
    created_at: "2026-07-10T20:10:00Z",
    source: "Financial Ops",
  },
  {
    id: "a10",
    title: "Pipeline maintenance window",
    summary:
      "Planned maintenance on GK3 segment — temporary throughput derate, non-crisis.",
    sector: "energy",
    severity: "green",
    region: "Hassi R'Mel corridor",
    created_at: "2026-07-10T15:00:00Z",
    source: "Infrastructure",
  },
];

const EXTRA_TITLES = [
  "Port congestion advisory — Algiers",
  "Phosphate logistics disruption risk",
  "Currency parallel-market spread watch",
  "Cross-border trade facilitation update",
  "Industrial zone permitting backlog",
];

/** Rotate / inject a synthetic alert so the live feed feels alive. */
export function nextSyntheticAlert(tick: number): Alert {
  const base = SEED_ALERTS[tick % SEED_ALERTS.length];
  const title = EXTRA_TITLES[tick % EXTRA_TITLES.length];
  return {
    ...base,
    id: `live-${Date.now()}-${tick}`,
    title,
    created_at: new Date().toISOString(),
    summary: `${base.summary} [auto-refresh tick #${tick}]`,
  };
}
