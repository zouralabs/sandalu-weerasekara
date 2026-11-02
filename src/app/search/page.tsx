import { Suspense } from "react";
import { SearchResults } from "@/components/common/SearchResults";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
export const metadata = {
  title: "Search Books, Teachers & Classes",
  description: "Search the educational bookstore and tuition directory.",
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Search" }]} />
      <Suspense fallback={<p role="status">Loading search…</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
