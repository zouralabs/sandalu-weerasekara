import { Suspense } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ClassCatalog } from "@/components/classes/ClassCatalog";

export const metadata = {
  title: "A/L Accounting Classes",
  description: "Physical and online A/L Accounting classes by Sandalu Isiwara.",
};

export default function ClassesPage() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Classes" }]} />
      <SectionHeader page title="A/L Accounting Classes" eyebrow="SANDALU ISIWARA" description="Choose a physical or online Accounting class in Sinhala or English medium." />
      <Suspense fallback={<p role="status">Loading classes…</p>}>
        <ClassCatalog />
      </Suspense>
    </div>
  );
}
