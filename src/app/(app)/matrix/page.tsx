import { CrossImpactMatrix } from "@/components/matrix/cross-impact-matrix";
import { PageIntro } from "@/components/i18n/page-intro";

export default function MatrixPage() {
  return (
    <div className="space-y-6">
      <PageIntro page="matrix" />
      <CrossImpactMatrix />
    </div>
  );
}
