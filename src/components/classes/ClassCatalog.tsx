"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { classes } from "@/data/classes";
import { ClassGrid } from "./ClassCard";
import { EmptyState } from "@/components/common/EmptyState";

export function ClassCatalog() {
  const search = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [expanded, setExpanded] = useState(false);

  const fields = [
    {
      key: "medium",
      label: "Medium",
      options: ["Sinhala", "English"],
    },
    {
      key: "type",
      label: "Class type",
      options: ["Physical", "Online"],
    },
    {
      key: "batch",
      label: "Student batch",
      options: ["2027", "2028"],
    },
    {
      key: "district",
      label: "Location",
      options: ["Nugegoda"],
    },
  ];

  function change(key: string, value: string) {
    const next = new URLSearchParams(search.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${path}?${next.toString()}`, { scroll: false });
  }

  const results = classes.filter((item) => {
    const medium = search.get("medium");
    const type = search.get("type");
    const batch = search.get("batch");
    const district = search.get("district");

    return (
      (!medium || item.medium === medium) &&
      (!type || item.type === type) &&
      (!batch ||
        (batch === "2028"
          ? item.title.includes("2028")
          : !item.title.includes("2028"))) &&
      (!district || item.district === district)
    );
  });

  const active = fields
    .map((field) => [field.key, search.get(field.key) ?? ""] as const)
    .filter(([, value]) => value);

  function clearAll() {
    router.replace(path, { scroll: false });
  }

  return (
    <div className="catalog">
      <aside className="filters">
        <button
          className="filter-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls="class-filters"
          onClick={() => setExpanded(!expanded)}
        >
          <SlidersHorizontal size={18} />
          Filters {active.length > 0 && `(${active.length})`}
          <span>{expanded ? "−" : "+"}</span>
        </button>
        <div
          id="class-filters"
          className={`filter-content ${expanded ? "expanded" : ""}`}
        >
          <div className="filter-heading">
            <h2>Filter by</h2>
            <button type="button" className="text-button" onClick={clearAll}>
              Clear all
            </button>
          </div>
          {fields.map((field) => (
            <div className="filter-field" key={field.key}>
              <label htmlFor={`class-filter-${field.key}`}>{field.label}</label>
              <select
                id={`class-filter-${field.key}`}
                value={search.get(field.key) ?? ""}
                onChange={(event) => change(field.key, event.target.value)}
              >
                <option value="">
                  {field.key === "batch"
                    ? "All student batches"
                    : `All ${field.label.toLowerCase()}s`}
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="filter-help">
            <strong>Need a hand?</strong>
            <p>We can help you choose the right class.</p>
            <a href="/contact" className="text-link">
              Contact us →
            </a>
          </div>
        </div>
      </aside>
      <div className="catalog-results">
        <div className="results-toolbar">
          <p role="status">
            <strong>{results.length}</strong> classes found
          </p>
        </div>
        {active.length > 0 && (
          <div className="active-filters">
            {active.map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => change(key, "")}
                aria-label={`Remove filter: ${value}`}
              >
                {value}
                <X size={13} />
              </button>
            ))}
            <button className="text-button" type="button" onClick={clearAll}>
              Clear filters
            </button>
          </div>
        )}
        {results.length === 0 ? <EmptyState /> : <ClassGrid items={results} />}
      </div>
    </div>
  );
}
