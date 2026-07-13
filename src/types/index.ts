export type UserRole = "standard" | "vvip" | "sovereign" | "admin";

export type RiskLevel = "green" | "yellow" | "red";

export type Sector =
  | "energy"
  | "agriculture"
  | "security"
  | "investment";

export type DocumentType =
  | "law"
  | "decree"
  | "ordinance"
  | "report"
  | "other";

export interface RiskIndex {
  sector: Sector;
  score: number;
  level: RiskLevel;
  confidence: number;
  trend: "up" | "down" | "stable";
  delta: number;
  label: string;
}

export interface Alert {
  id: string;
  title: string;
  summary: string;
  sector: Sector;
  severity: RiskLevel;
  region: string;
  created_at: string;
  source: string;
}

export interface DocumentChunk {
  id: string;
  document_id: string;
  document_title: string;
  content: string;
  sector: Sector | "legal" | "general";
  document_type: DocumentType;
  published_at: string;
  page: number;
  similarity?: number;
}

export interface SearchResult {
  chunks: DocumentChunk[];
  synthesis?: string;
  citations?: { id: string; title: string; excerpt: string }[];
}

export interface ScenarioInputs {
  oilPrice: number; // USD/barrel, baseline ~80
  borderStability: number; // 0-100
  taxPolicyChange: number; // -20 to +20 percentage points
  inflationShock: number; // 0-20%
  fdiInflow: number; // index 0-100
}

export interface ScenarioResult {
  baseline: RiskIndex[];
  projected: RiskIndex[];
  narrative: string;
}

export interface MatrixCell {
  row: string;
  col: string;
  intensity: number;
  narrative: string;
  timeframe: string;
}

export interface VerificationItem {
  id: string;
  document_title: string;
  ai_summary: string;
  status: "pending" | "approved" | "edited";
  sector: string;
  created_at: string;
  edited_summary?: string;
}

export interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
