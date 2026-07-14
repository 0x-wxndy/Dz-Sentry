import { RiskCards } from "@/components/dashboard/risk-cards";
import { IntelligenceFeed } from "@/components/dashboard/intelligence-feed";
import { AlgeriaMap } from "@/components/map/algeria-map";
import { PageIntro } from "@/components/i18n/page-intro";
import { SEED_ALERTS } from "@/data/alerts";
import { computeRiskIndices, defaultScenarioInputs } from "@/lib/risk-scoring";
import { getCurrentUser } from "@/lib/auth/session";
import { getCurrentPlan } from "@/lib/auth/plan-session";
import { canSeeClassified } from "@/lib/auth/rbac";
import { planAllows } from "@/lib/plans";

export default async function DashboardPage() {
  const [user, plan] = await Promise.all([getCurrentUser(), getCurrentPlan()]);
  const indices = computeRiskIndices(defaultScenarioInputs());
  const classified =
    canSeeClassified(user.role) && planAllows(plan, "classified");

  return (
    <div className="space-y-6">
      <PageIntro page="dashboard" />
      <RiskCards indices={indices} />
      <div className="grid xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3">
          <AlgeriaMap canSeeClassified={classified} />
        </div>
        <div className="xl:col-span-2">
          <IntelligenceFeed initial={SEED_ALERTS} />
        </div>
      </div>
    </div>
  );
}
