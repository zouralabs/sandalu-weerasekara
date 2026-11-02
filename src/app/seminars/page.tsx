import { seminars } from "@/data/seminars";
import { SeminarGrid } from "@/components/seminars/SeminarCard";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
export const metadata = {
  title: "Seminars & Revision Programs",
  description:
    "Explore demonstration educational seminars and revision workshops in Sri Lanka.",
};
export default function Page() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Seminars" }]} />
      <SectionHeader
        page
        title="Make time for focused learning."
        eyebrow="SEMINARS & REVISION"
        description="Explore paper discussions, revision workshops and special learning programs. All listed events are unconfirmed demonstrations."
      />
      <SeminarGrid items={seminars} />
    </div>
  );
}
