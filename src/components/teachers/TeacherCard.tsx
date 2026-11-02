import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Teacher } from "@/types";
export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <article className="teacher-card">
      <Image
        src={teacher.image}
        alt={`Initials placeholder for ${teacher.name}, fictional teacher`}
        width={400}
        height={400}
      />
      <div>
        <p className="eyebrow">{teacher.subjects.join(" · ")}</p>
        <h3>
          <Link href={`/teachers/${teacher.slug}`}>{teacher.name}</Link>
        </h3>
        <p className="small muted">
          {teacher.levels.join(" · ")} · {teacher.mediums.join(" / ")}
        </p>
        <p className="icon-line">
          <MapPin size={14} />
          {teacher.district}
          <span className="demo-label">Demo profile</span>
        </p>
        <Link className="text-link" href={`/teachers/${teacher.slug}`}>
          View profile
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
export function TeacherGrid({ items }: { items: Teacher[] }) {
  return (
    <div className="teacher-grid">
      {items.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
}
