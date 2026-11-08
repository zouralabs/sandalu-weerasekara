import Image from "next/image";
import { notFound } from "next/navigation";
import { classes } from "@/data/classes";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EnrollmentDialog } from "@/components/classes/EnrollmentDialog";
import { getLocalizedClassDescription, getLocalizedClassLocation, getLocalizedClassSchedule, getLocalizedClassTitle, getLocalizedMedium } from "@/lib/classes-language";

export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classes.find((item) => item.slug === slug);
  return item
    ? { title: getLocalizedClassTitle(item), description: getLocalizedClassDescription(item) }
    : { title: "Class not found", description: "The requested class could not be found." };
}

export default async function ClassDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = classes.find((item) => item.slug === slug);
  if (!item) notFound();

  const title = getLocalizedClassTitle(item);
  const description = getLocalizedClassDescription(item);
  const features = item.features.map((feature) => {
    const separator = feature.indexOf(":");
    return separator > 0
      ? {
          title: feature.slice(0, separator),
          description: feature.slice(separator + 1).trim(),
        }
      : { title: feature, description: "" };
  });
  const feeLabel = item.medium === "Sinhala" ? "මාසික ගාස්තුව" : "Monthly fee";
  const feeAmount = item.medium === "Sinhala"
    ? `රු. ${item.fee.toLocaleString("si-LK")}`
    : `Rs. ${item.fee.toLocaleString("en-LK")}`;
  const labels = item.medium === "Sinhala"
    ? [["Medium", getLocalizedMedium(item)], ["Location", getLocalizedClassLocation(item)], ["Commencement", "නොවැම්බර් දෙවන සතියේ සිට"], ["Time", getLocalizedClassSchedule(item)]]
    : [["Medium", getLocalizedMedium(item)], ["Location", getLocalizedClassLocation(item)], ["Commencement", item.commencement ?? ""], ["Time", getLocalizedClassSchedule(item)]];

  return (
    <div className="container page">
      <Breadcrumbs
        items={[
          { label: "Classes", href: "/classes" },
          { label: title },
        ]}
      />
      <section className="listing-detail">
        <Image className="detail-poster" src={item.poster} alt={`${title} poster`} width={640} height={640} priority />
        <div>
          <SectionHeader page title={title} description={description} />
          {item.target && <p className="badge warm">{item.medium === "Sinhala" ? "2028 A/L සිංහල මාධ්‍ය සිසුන් සඳහා" : item.target}</p>}
          <div className="class-detail-fee" aria-label={`${feeLabel}: ${feeAmount}`}>
            <span>{feeLabel}</span>
            <strong>{feeAmount}</strong>
            <span>{item.medium === "Sinhala" ? "මාසිකව" : "per month"}</span>
          </div>
          <dl className="specs">
            {labels.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <section className="class-features" aria-labelledby="class-features-title">
            <h2 id="class-features-title">
              {item.medium === "Sinhala" ? "අපේ පන්තියේ විශේෂතා" : "Why choose this class?"}
            </h2>
            <ol>
              {features.map((feature, index) => (
                <li key={`${feature.title}-${index}`}>
                  <span className="class-feature-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{feature.title}</h3>
                    {feature.description && <p>{feature.description}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </section>
          {item.type === "Physical" && <p className="info-note">{item.medium === "Sinhala" ? "තනි අවධානය සඳහා උපරිම සිසුන් සංඛ්‍යාව 40 ක්." : "Maximum batch size: 40 students for individual attention."}</p>}
          {item.type === "Online" && <p className="info-note">{item.medium === "Sinhala" ? "Google Meet හරහා සජීවීව. Tutes සහ Model Papers මාසිකව සිසුන්ගේ නිවසට Deliver කෙරේ." : "Live classes via Google Meet. Model papers and tutes are delivered monthly to the student's home."}</p>}
          <EnrollmentDialog
            initialClassId={item.id}
            label="Enroll class"
            className="button whatsapp"
          />
        </div>
      </section>
    </div>
  );
}
