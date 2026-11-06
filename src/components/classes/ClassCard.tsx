import Image from "next/image";
import Link from "next/link";
import type { TuitionClass } from "@/types";
import { getLocalizedClassSchedule, getLocalizedClassTitle, getLocalizedMedium } from "@/lib/classes-language";

export function ClassCard({ item }: { item: TuitionClass }) {
  return (
    <article className="commerce-news-card class-card">
      <Link href={`/classes/${item.slug}`}>
        <Image src={item.poster} alt={`${item.title} poster`} width={640} height={640} />
        <span className="commerce-news-date">{item.type === "Physical" ? (item.medium === "Sinhala" ? "භෞතික පන්තිය" : "Physical Class") : (item.medium === "Sinhala" ? "මාර්ගගත පන්තිය" : "Online Class")} · {getLocalizedMedium(item)}</span>
        <strong>{getLocalizedClassTitle(item)}</strong>
        <span className="class-card-meta">
          <span>{getLocalizedClassSchedule(item)}</span>
          <b>{item.medium === "Sinhala" ? "රු." : "Rs."} {item.fee.toLocaleString("en-LK")}/month</b>
        </span>
      </Link>
    </article>
  );
}

export function ClassGrid({ items }: { items: TuitionClass[] }) {
  return <div className="commerce-news-grid class-grid">{items.map((item) => <ClassCard key={item.id} item={item} />)}</div>;
}
