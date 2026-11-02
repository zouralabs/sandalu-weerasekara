import Image from "next/image";
import { notFound } from "next/navigation";
import { teachers } from "@/data/teachers";
import { classes } from "@/data/classes";
import { ClassGrid } from "@/components/classes/ClassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
export function generateStaticParams() {
  return teachers.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = teachers.find((item) => item.slug === slug);
  return { title: item?.name ?? "Teacher not found", description: item?.bio };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const teacher = teachers.find((item) => item.slug === slug);
  if (!teacher) notFound();
  const available = classes.filter((item) => item.teacherId === teacher.id);
  return (
    <div className="container page">
      <Breadcrumbs
        items={[
          { label: "Teachers", href: "/teachers" },
          { label: teacher.name },
        ]}
      />
      <section className="profile-detail">
        <Image
          src={teacher.image}
          alt={`Initials placeholder for fictional teacher ${teacher.name}`}
          width={400}
          height={400}
        />
        <div>
          <span className="demo-label">Fictional sample profile</span>
          <SectionHeader
            page
            title={teacher.name}
            description={teacher.subjects.join(" · ")}
            eyebrow="TEACHER PROFILE"
          />
          <p>{teacher.bio}</p>
          <dl className="specs">
            {[
              ["Teaching levels", teacher.levels.join(", ")],
              ["Medium", teacher.mediums.join(", ")],
              ["District", teacher.district],
              ["Teaching locations", teacher.locations.join(" · ")],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {teacher.qualifications && (
            <p>Qualifications: {teacher.qualifications.join(", ")}</p>
          )}
          <WhatsAppButton
            message={`Hello, I would like more information about ${teacher.name}’s ${teacher.subjects.join(" and ")} classes. Please share available schedules and registration details.`}
          >
            Contact via WhatsApp
          </WhatsAppButton>
        </div>
      </section>
      <section className="section">
        <SectionHeader
          title={`Classes with ${teacher.name.split(" ")[0]}`}
          description="Explore the class posters and schedules below."
        />
        <ClassGrid items={available} />
      </section>
    </div>
  );
}
