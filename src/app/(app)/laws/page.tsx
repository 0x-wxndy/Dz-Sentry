import { PageIntro } from "@/components/i18n/page-intro";
import { LawsPanel } from "@/components/laws/laws-panel";

export default function LawsPage() {
  return (
    <div className="space-y-6">
      <PageIntro page="laws" />
      <LawsPanel />
    </div>
  );
}
