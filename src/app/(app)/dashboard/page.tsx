import { RiskCards } from "@/components/dashboard/risk-cards";
import { IntelligenceFeed } from "@/components/dashboard/intelligence-feed";
import { AlgeriaMap } from "@/components/map/algeria-map";
import { PageIntro } from "@/components/i18n/page-intro";
import { SEED_ALERTS } from "@/data/alerts";
import { computeRiskIndices, defaultScenarioInputs } from "@/lib/risk-scoring";
import { getCurrentUser } from "@/lib/auth/session";
import { canSeeClassified } from "@/lib/auth/rbac";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const indices = computeRiskIndices(defaultScenarioInputs());

  return (
    <div className="space-y-6">
      <PageIntro page="dashboard" />
      <RiskCards indices={indices} />
      <div className="grid xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3">
          <AlgeriaMap canSeeClassified={canSeeClassified(user.role)} />
        </div>
        <div className="xl:col-span-2">
          <IntelligenceFeed initial={SEED_ALERTS} />
        </div>
      </div>
    </div>
  );
}
