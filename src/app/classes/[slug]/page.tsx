import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { classes } from "@/data/classes";
import { teachers } from "@/data/teachers";
import { ClassGrid } from "@/components/classes/ClassCard";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { classMessage } from "@/lib/whatsapp";
export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = classes.find((item) => item.slug === slug);
  return {
    title: item?.title ?? "Class not found",
    description: item?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = classes.find((item) => item.slug === slug);
  if (!item) notFound();
  const teacher = teachers.find((teacher) => teacher.id === item.teacherId)!;
  const related = classes
    .filter(
      (other) =>
        other.id !== item.id &&
        (other.subject === item.subject || other.level === item.level),
    )
    .slice(0, 3);
  return (
    <div className="container page">
      <Breadcrumbs
        items={[
          { label: "Tuition Classes", href: "/classes" },
          { label: item.title },
        ]}
      />
      <section className="listing-detail">
        <div className="detail-poster">
          <Image
            src={item.poster}
            alt={`${item.title} demonstration poster`}
            width={600}
            height={750}
            priority
          />
        </div>
        <div>
          <span className="badge warm">Demo listing · {item.type}</span>
          <SectionHeader
            page
            title={item.title}
            description={item.description}
          />
          <p>
            With{" "}
            <Link className="text-link" href={`/teachers/${teacher.slug}`}>
              {teacher.name}
            </Link>
          </p>
          <dl className="specs">
            {[
              ["Subject", item.subject],
              ["Grade", item.level],
              ["Medium", item.medium],
              ["District", item.district],
              ["Class type", item.type],
              ["Format", item.format],
              ["Location", item.location],
              ["Schedule", item.schedule + " (Sri Lanka time)"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <WhatsAppButton message={classMessage(item, teacher)}>
            Inquire via WhatsApp
          </WhatsAppButton>
          <p className="small muted">
            The website owner handles inquiries. Confirm all class details
            before registering.
          </p>
        </div>
      </section>
      <section className="section">
        <SectionHeader title="About the teacher" />
        <TeacherCard teacher={teacher} />
        <p className="prose">{teacher.bio}</p>
      </section>
      <section className="section">
        <SectionHeader title="Related tuition classes" href="/classes" />
        <ClassGrid items={related} />
      </section>
    </div>
  );
}
