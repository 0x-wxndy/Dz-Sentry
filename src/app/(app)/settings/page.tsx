import { PageIntro } from "@/components/i18n/page-intro";
import { SettingsPanel, type SettingsTab } from "@/components/settings/settings-panel";
import { getCurrentPlan } from "@/lib/auth/plan-session";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const plan = await getCurrentPlan();
  const tab: SettingsTab =
    searchParams?.tab === "billing" ? "billing" : "general";

  return (
    <div className="space-y-6">
      <PageIntro page="settings" />
      <SettingsPanel initialPlan={plan} initialTab={tab} />
    </div>
  );
}
