import { redirect } from "next/navigation";
import { ScenarioBuilder } from "@/components/scenarios/scenario-builder";
import { PageIntro } from "@/components/i18n/page-intro";
import { getCurrentUser } from "@/lib/auth/session";
import { canAccessScenarios } from "@/lib/auth/rbac";

export default async function ScenariosPage() {
  const user = await getCurrentUser();
  if (!canAccessScenarios(user.role)) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <PageIntro page="scenarios" />
      <ScenarioBuilder />
    </div>
  );
}
