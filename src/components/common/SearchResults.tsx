"use client";
import { useSearchParams } from "next/navigation";
import { books } from "@/data/books";
import { teachers } from "@/data/teachers";
import { classes } from "@/data/classes";
import { includesQuery } from "@/lib/filters";
import { BookGrid } from "@/components/books/BookCard";
import { ClassGrid } from "@/components/classes/ClassCard";
import { TeacherGrid } from "@/components/teachers/TeacherCard";
import { EmptyState } from "./EmptyState";
import { SectionHeader } from "./SectionHeader";
export function SearchResults() {
  const query = (useSearchParams().get("q") ?? "").trim();
  const foundBooks = query
    ? books.filter((book) =>
        includesQuery(query, book.title, book.subject, book.medium),
      )
    : [];
  const foundClasses = query
    ? classes.filter((item) =>
        includesQuery(
          query,
          item.title,
          item.subject,
          teachers.find((teacher) => teacher.id === item.teacherId)?.name ?? "",
        ),
      )
    : [];
  const foundTeachers = query
    ? teachers.filter((teacher) =>
        includesQuery(query, teacher.name, teacher.subjects),
      )
    : [];
  const total = foundBooks.length + foundClasses.length + foundTeachers.length;
  return (
    <>
      <SectionHeader
        page
        title={query ? `Results for “${query}”` : "What are you looking for?"}
        description="Search book titles, subjects, teachers and tuition classes."
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
          placeholder="Try Physics, Mathematics or a teacher’s name"
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
              ? "No matching books, teachers or classes"
              : "Start with a subject or name"
          }
          description={
            query
              ? "Check the spelling or try a broader subject, such as Physics or English."
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
      {foundClasses.length > 0 && (
        <section className="section">
          <SectionHeader title={`Tuition classes (${foundClasses.length})`} />
          <ClassGrid items={foundClasses} />
        </section>
      )}
      {foundTeachers.length > 0 && (
        <section className="section">
          <SectionHeader title={`Teachers (${foundTeachers.length})`} />
          <TeacherGrid items={foundTeachers} />
        </section>
      )}
    </>
  );
}
