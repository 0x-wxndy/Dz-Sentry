import { SearchPanel } from "@/components/search/search-panel";
import { PageIntro } from "@/components/i18n/page-intro";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <PageIntro page="search" />
      <SearchPanel />
    </div>
  );
}
