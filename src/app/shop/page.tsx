import { Suspense } from "react";
import { Catalog } from "@/components/common/Catalog";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
export const metadata = {
  title: "Shop",
  description:
    "Browse educational books, revision guides and past papers for Sri Lankan learners.",
};
export default function Page() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Shop" }]} />
      <SectionHeader
        page
        title="Find your next study companion."
        description="Browse educational books, revision guides and past papers for Sri Lankan learners."
        eyebrow="BOOKS"
      />
      <Suspense fallback={<p role="status">Loading filters…</p>}>
        <Catalog kind="books" />
      </Suspense>
    </div>
  );
}
