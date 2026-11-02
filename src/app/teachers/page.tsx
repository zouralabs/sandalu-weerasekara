import { Suspense } from "react";
import { Catalog } from "@/components/common/Catalog";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
export const metadata = {
  title: "Teachers",
  description:
    "Explore sample teacher profiles, subjects and available classes across Sri Lanka.",
};
export default function Page() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Teachers" }]} />
      <SectionHeader
        page
        title="Find your teacher."
        description="Explore sample teacher profiles, subjects and available classes across Sri Lanka."
        eyebrow="TEACHERS"
      />
      <Suspense fallback={<p role="status">Loading filters…</p>}>
        <Catalog kind="teachers" />
      </Suspense>
    </div>
  );
}
