"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { books } from "@/data/books";
import { teachers } from "@/data/teachers";
import { classes } from "@/data/classes";
import {
  districts,
  subjects,
  levels,
  mediums,
  bookTypes,
} from "@/data/categories";
import { filterBooks } from "@/lib/filters";
import { BookGrid } from "@/components/books/BookCard";
import { ClassGrid } from "@/components/classes/ClassCard";
import { TeacherGrid } from "@/components/teachers/TeacherCard";
import { EmptyState } from "./EmptyState";
type Kind = "books" | "classes" | "teachers";
export function Catalog({ kind }: { kind: Kind }) {
  const search = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [expanded, setExpanded] = useState(false);
  const fields: { key: string; label: string; options: string[] }[] = [
    { key: "level", label: "Educational level", options: levels },
    { key: "subject", label: "Subject", options: subjects },
    { key: "medium", label: "Medium", options: mediums },
    ...(kind === "books"
      ? [
          { key: "category", label: "Book type", options: bookTypes },
          { key: "stock", label: "Availability", options: ["in", "out"] },
        ]
      : [{ key: "district", label: "District", options: districts }]),
    ...(kind === "classes"
      ? [
          {
            key: "type",
            label: "Class type",
            options: ["Online", "Physical", "Hybrid"],
          },
          {
            key: "format",
            label: "Class format",
            options: [
              "Individual",
              "Group",
              "Revision",
              "Theory",
              "Paper Class",
            ],
          },
        ]
      : []),
  ];
  const activeKeys = [
    ...fields.map((field) => field.key),
    ...(kind === "books" ? ["min", "max", "q"] : []),
  ];
  const active = Array.from(search.entries()).filter(
    ([key, value]) => activeKeys.includes(key) && value,
  );
  function change(key: string, value: string) {
    const next = new URLSearchParams(search.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "limit") next.delete("limit");
    router.replace(`${path}?${next.toString()}`, { scroll: false });
  }
  const bookResults = filterBooks(
    books,
    new URLSearchParams(search.toString()),
  );
  const classResults = classes.filter((item) =>
    fields.every(
      ({ key }) =>
        !search.get(key) || item[key as keyof typeof item] === search.get(key),
    ),
  );
  const teacherResults = teachers.filter((item) =>
    fields.every(({ key }) => {
      const value = search.get(key);
      if (!value) return true;
      if (key === "level") return item.levels.some((x) => x === value);
      if (key === "subject") return item.subjects.includes(value);
      if (key === "medium") return item.mediums.some((x) => x === value);
      return item.district === value;
    }),
  );
  const count =
    kind === "books"
      ? bookResults.length
      : kind === "classes"
        ? classResults.length
        : teacherResults.length;
  const rawLimit = Number(search.get("limit") ?? 12);
  const limit =
    Number.isFinite(rawLimit) && rawLimit >= 12 ? Math.floor(rawLimit) : 12;
  return (
    <div className="catalog">
      <aside className="filters">
        <button
          className="filter-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls="catalog-filters"
          onClick={() => setExpanded(!expanded)}
        >
          <SlidersHorizontal size={18} />
          Filters {active.length > 0 && `(${active.length})`}
          <span>{expanded ? "−" : "+"}</span>
        </button>
        <div
          id="catalog-filters"
          className={`filter-content ${expanded ? "expanded" : ""}`}
        >
          <div className="filter-heading">
            <h2>Filter by</h2>
            <button
              type="button"
              className="text-button"
              onClick={() => router.replace(path, { scroll: false })}
            >
              Clear all
            </button>
          </div>
          {fields.map((field) => (
            <div className="filter-field" key={field.key}>
              <label htmlFor={`filter-${field.key}`}>{field.label}</label>
              <select
                id={`filter-${field.key}`}
                value={search.get(field.key) ?? ""}
                onChange={(event) => change(field.key, event.target.value)}
              >
                <option value="">
                  {field.key === "stock"
                    ? "Any availability"
                    : `All ${field.label.toLowerCase()}s`}
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option === "in"
                      ? "In stock"
                      : option === "out"
                        ? "Out of stock"
                        : option === "Primary"
                          ? "Grade 1–5 / Primary"
                          : option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          {kind === "books" && (
            <fieldset className="price-filter">
              <legend>Price range (LKR)</legend>
              <div>
                {["min", "max"].map((key) => (
                  <label key={key}>
                    <span className="small">
                      {key === "min" ? "Minimum" : "Maximum"}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      placeholder={key === "min" ? "0" : "Any"}
                      value={search.get(key) ?? ""}
                      onChange={(event) => change(key, event.target.value)}
                    />
                  </label>
                ))}
              </div>
              {search.get("min") &&
                search.get("max") &&
                Number(search.get("min")) > Number(search.get("max")) && (
                  <p role="alert" className="small">
                    Minimum must not exceed maximum.
                  </p>
                )}
            </fieldset>
          )}
          <div className="filter-help">
            <strong>Need a hand?</strong>
            <p>We can help you find the right book or class.</p>
            <a href="/contact" className="text-link">
              Contact us →
            </a>
          </div>
        </div>
      </aside>
      <div className="catalog-results">
        <div className="results-toolbar">
          <p role="status">
            <strong>{count}</strong> {kind} found
          </p>
          {kind === "books" && (
            <label className="sort-label">
              Sort by
              <select
                value={search.get("sort") ?? ""}
                onChange={(event) => change("sort", event.target.value)}
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A–Z</option>
                <option value="newest">Recently Added</option>
              </select>
            </label>
          )}
        </div>
        {active.length > 0 && (
          <div className="active-filters">
            {active.map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => change(key, "")}
                aria-label={`Remove ${key} filter: ${value}`}
              >
                {key === "stock"
                  ? `${value === "in" ? "In" : "Out of"} stock`
                  : value}
                <X size={13} />
              </button>
            ))}
            <button
              className="text-button"
              type="button"
              onClick={() => router.replace(path, { scroll: false })}
            >
              Clear filters
            </button>
          </div>
        )}
        {count === 0 ? (
          <EmptyState />
        ) : kind === "books" ? (
          <BookGrid items={bookResults.slice(0, limit)} />
        ) : kind === "classes" ? (
          <ClassGrid items={classResults.slice(0, limit)} />
        ) : (
          <TeacherGrid items={teacherResults.slice(0, limit)} />
        )}
        <div className="load-more">
          {count > 0 && (
            <p className="small muted">
              Showing {Math.min(limit, count)} of {count} {kind}
            </p>
          )}
          {count > limit && (
            <button
              type="button"
              className="button secondary"
              onClick={() => change("limit", String(limit + 12))}
            >
              Load more {kind}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
