import { PageIntro } from "@/components/i18n/page-intro";
import { ExpertsPanel } from "@/components/experts/experts-panel";
import { getCurrentPlan } from "@/lib/auth/plan-session";
import { planAllows } from "@/lib/plans";

export default async function ExpertsPage() {
  const plan = await getCurrentPlan();
  return (
    <div className="space-y-6">
      <PageIntro page="experts" />
      <ExpertsPanel canContact={planAllows(plan, "expertsContact")} />
    </div>
  );
}
