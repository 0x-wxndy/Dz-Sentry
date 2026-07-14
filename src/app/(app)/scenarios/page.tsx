import { redirect } from "next/navigation";
import { ScenarioBuilder } from "@/components/scenarios/scenario-builder";
import { PageIntro } from "@/components/i18n/page-intro";
import { getCurrentUser } from "@/lib/auth/session";
import { getCurrentPlan } from "@/lib/auth/plan-session";
import { canAccessScenarios } from "@/lib/auth/rbac";
import { planAllows } from "@/lib/plans";

export default async function ScenariosPage() {
  const [user, plan] = await Promise.all([getCurrentUser(), getCurrentPlan()]);
  if (!canAccessScenarios(user.role) || !planAllows(plan, "scenarios")) {
    redirect(planAllows(plan, "scenarios") ? "/dashboard" : "/settings?tab=billing");
  }

  return (
    <div className="space-y-6">
      <PageIntro page="scenarios" />
      <ScenarioBuilder />
    </div>
  );
}
