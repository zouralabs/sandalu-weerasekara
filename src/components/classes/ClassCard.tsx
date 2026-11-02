import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { teachers } from "@/data/teachers";
import type { TuitionClass } from "@/types";
export function ClassCard({ item }: { item: TuitionClass }) {
  const teacher = teachers.find((t) => t.id === item.teacherId)!;
  return (
    <article className="class-card">
      <Link
        className="class-poster"
        href={`/classes/${item.slug}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={item.poster}
          alt={`${item.title} sample advertisement`}
          width={600}
          height={750}
        />
      </Link>
      <div className="class-body">
        <div className="badge-row">
          <span className="badge">{item.type}</span>
          {item.featured && <span className="badge warm">Featured ad</span>}
          <span className="demo-label">Demo</span>
        </div>
        <h3>
          <Link href={`/classes/${item.slug}`}>{item.title}</Link>
        </h3>
        <Link className="teacher-byline" href={`/teachers/${teacher.slug}`}>
          {teacher.name}
        </Link>
        <p className="small muted">
          {item.medium} medium · {item.format}
        </p>
        <p className="icon-line">
          <MapPin size={14} />
          {item.district}
        </p>
        <p className="icon-line">
          <Clock size={14} />
          {item.schedule}
        </p>
        <Link className="text-link" href={`/classes/${item.slug}`}>
          View details
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}
export function ClassGrid({ items }: { items: TuitionClass[] }) {
  return (
    <div className="class-grid">
      {items.map((item) => (
        <ClassCard key={item.id} item={item} />
      ))}
    </div>
  );
}
