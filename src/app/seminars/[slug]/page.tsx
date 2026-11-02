import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { seminars } from "@/data/seminars";
import { teachers } from "@/data/teachers";
import { EventStatus, SeminarGrid } from "@/components/seminars/SeminarCard";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
export function generateStaticParams() {
  return seminars.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = seminars.find((item) => item.slug === slug);
  return {
    title: item?.title ?? "Seminar not found",
    description: item?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = seminars.find((item) => item.slug === slug);
  if (!item) notFound();
  const teacher = teachers.find((teacher) => teacher.id === item.teacherId)!;
  return (
    <div className="container page">
      <Breadcrumbs
        items={[
          { label: "Seminars", href: "/seminars" },
          { label: item.title },
        ]}
      />
      <section className="listing-detail">
        <Image
          className="detail-poster"
          src={item.poster}
          alt={`${item.title} sample seminar poster`}
          width={600}
          height={750}
          priority
        />
        <div>
          <EventStatus endAt={item.endAt} />
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
              [
                "Date",
                new Date(item.date + "T12:00:00+05:30").toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "Asia/Colombo",
                  },
                ),
              ],
              ["Time", item.time],
              ["Location", item.venue],
              ["Format", item.type],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <WhatsAppButton
            message={`Hello, I would like information about ${item.title}.\nTeacher: ${teacher.name}\nDate: ${item.date}\nTime: ${item.time}\nVenue: ${item.venue}\nPlease confirm whether this seminar is available and share registration details.`}
          >
            Inquire about this seminar
          </WhatsAppButton>
          <p className="info-note">
            This is a sample event, not a confirmed booking. Please verify dates
            and registration with the organizer.
          </p>
        </div>
      </section>
      <section className="section">
        <SectionHeader title="More seminars" href="/seminars" />
        <SeminarGrid
          items={seminars.filter((other) => other.id !== item.id).slice(0, 3)}
        />
      </section>
    </div>
  );
}
