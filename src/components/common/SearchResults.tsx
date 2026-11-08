"use client";
import { useSearchParams } from "next/navigation";
import { books } from "@/data/books";
import { accessories } from "@/data/accessories";
import { classes } from "@/data/classes";
import { seminars } from "@/data/seminars";
import { includesQuery } from "@/lib/filters";
import { BookGrid } from "@/components/books/BookCard";
import { ClassGrid } from "@/components/classes/ClassCard";
import { SeminarGrid } from "@/components/seminars/SeminarCard";
import { EmptyState } from "./EmptyState";
import { SectionHeader } from "./SectionHeader";
export function SearchResults() {
  const query = (useSearchParams().get("q") ?? "").trim();
  const foundBooks = query
    ? books.filter((book) =>
        includesQuery(
          query,
          book.title,
          book.subject,
          book.level,
          book.medium ?? "",
          book.category,
          book.author ?? "",
          book.publisher ?? "",
          book.description,
        ),
      )
    : [];
  const foundAccessories = query
    ? accessories.filter((item) =>
        includesQuery(
          query,
          item.title,
          item.subject,
          item.medium ?? "",
          item.category,
          item.description,
        ),
      )
    : [];
  const foundClasses = query
    ? classes.filter((item) =>
        includesQuery(
          query,
          item.title,
          item.subject,
          item.level,
          item.medium,
          item.district,
          item.type,
          item.format,
          item.schedule,
          item.location,
          item.description,
          item.target ?? "",
        ),
      )
    : [];
  const foundSeminars = query
    ? seminars.filter((item) =>
        includesQuery(
          query,
          item.title,
          item.subject,
          item.venue,
          item.type,
          item.time,
          item.description,
        ),
      )
    : [];
  const total =
    foundBooks.length +
    foundAccessories.length +
    foundClasses.length +
    foundSeminars.length;
  return (
    <>
      <SectionHeader
        page
        title={query ? `Results for “${query}”` : "What are you looking for?"}
        description="Search classes, book titles, subjects, authors, publishers, and accessories."
      />
      <form className="page-search" action="/search/" role="search">
        <label className="sr-only" htmlFor="results-query">
          Search term
        </label>
        <input
          key={query}
          id="results-query"
          type="search"
          name="q"
          required
          defaultValue={query}
          placeholder="Try Accounting, Calculator or Sandalu"
        />
        <button className="button primary">Search</button>
      </form>
      {query && (
        <p role="status" className="muted">
          {total} results found
        </p>
      )}
      {total === 0 && (
        <EmptyState
          title={
            query
              ? "No matching results"
              : "Start with a subject or name"
          }
          description={
            query
              ? "Check the spelling or try a broader term, such as Accounting, Books, or Accessories."
              : "Enter a search term above to explore the marketplace."
          }
        />
      )}{" "}
      {foundBooks.length > 0 && (
        <section className="section">
          <SectionHeader title={`Books (${foundBooks.length})`} />
          <BookGrid items={foundBooks} />
        </section>
      )}
      {foundAccessories.length > 0 && (
        <section className="section">
          <SectionHeader title={`Accessories (${foundAccessories.length})`} />
          <BookGrid items={foundAccessories} />
        </section>
      )}
      {foundClasses.length > 0 && (
        <section className="section">
          <SectionHeader title={`Classes (${foundClasses.length})`} />
          <ClassGrid items={foundClasses} />
        </section>
      )}
      {foundSeminars.length > 0 && (
        <section className="section">
          <SectionHeader title={`Seminars (${foundSeminars.length})`} />
          <SeminarGrid items={foundSeminars} />
        </section>
      )}
    </>
  );
}
