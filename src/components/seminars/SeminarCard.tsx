"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Seminar } from "@/types";
export function EventStatus({ endAt }: { endAt: string }) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const check = () => setPast(Date.now() > new Date(endAt).getTime());
    check();
    const timer = setInterval(check, 60000);
    return () => clearInterval(timer);
  }, [endAt]);
  return (
    <span className="badge">
      {past ? "Past demo event" : "Upcoming demo event"}
    </span>
  );
}
export function SeminarCard({ item }: { item: Seminar }) {
  const educator = "Sandalu Isiwara";
  const date = new Date(`${item.date}T12:00:00+05:30`);
  return (
    <article className="seminar-card">
      <Link
        href={`/seminars/${item.slug}`}
        className="seminar-image"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={item.poster}
          alt={`${item.title} sample event poster`}
          width={600}
          height={750}
        />
      </Link>
      <div className="seminar-body">
        <div className="seminar-date">
          <strong>{date.getUTCDate()}</strong>
          <span>
            {date.toLocaleDateString("en", {
              month: "short",
              timeZone: "Asia/Colombo",
            })}{" "}
            {date.getUTCFullYear()}
          </span>
        </div>
        <div>
          <EventStatus endAt={item.endAt} />
          <h3>
            <Link href={`/seminars/${item.slug}`}>{item.title}</Link>
          </h3>
          <p>
            {educator} · {item.subject}
          </p>
          <p className="small muted">{item.time}</p>
          <p className="small muted">
            {item.type} · {item.venue}
          </p>
          <Link href={`/seminars/${item.slug}`} className="text-link">
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
}
export function SeminarGrid({ items }: { items: Seminar[] }) {
  return (
    <div className="seminar-grid">
      {items.map((item) => (
        <SeminarCard key={item.id} item={item} />
      ))}
    </div>
  );
}
