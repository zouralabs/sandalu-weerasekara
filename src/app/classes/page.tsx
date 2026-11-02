import { Suspense } from "react";
import { Catalog } from "@/components/common/Catalog";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
export const metadata = {
  title: "Classes",
  description:
    "Find tuition by subject, grade, district and medium. All listings are fictional demonstrations.",
};
export default function Page() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Classes" }]} />
      <SectionHeader
        page
        title="A class that fits your learning."
        description="Find tuition by subject, grade, district and medium. All listings are fictional demonstrations."
        eyebrow="CLASSES"
      />
      <Suspense fallback={<p role="status">Loading filters…</p>}>
        <Catalog kind="classes" />
      </Suspense>
    </div>
  );
}
