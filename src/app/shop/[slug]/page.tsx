import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { siYoutube } from "simple-icons";
import { products as books } from "@/data/products";
import { BookActions } from "@/components/books/BookActions";
import { BookGrid } from "@/components/books/BookCard";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { formatCurrency } from "@/lib/formatCurrency";
export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((book) => book.slug === slug);
  return {
    title: book?.title ?? "Book not found",
    description: book?.description,
    openGraph: { title: book?.title, description: book?.description },
  };
}
export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((book) => book.slug === slug);
  if (!book) notFound();
  const isAccessory = book.category === "Accessories";
  const sameSubject = books.filter(
    (item) => item.subject === book.subject && item.id !== book.id,
  );
  const related = books
    .filter(
      (item) =>
        item.level === book.level &&
        item.id !== book.id &&
        item.subject !== book.subject,
    )
    .slice(0, 4);
  return (
    <div className="container page">
      <Breadcrumbs
        items={[
          {
            label: isAccessory ? "Accessories" : "Book Store",
            href: isAccessory ? "/accessories" : "/shop",
          },
          { label: book.title },
        ]}
      />
      <section className="product-detail">
        <div className="product-cover">
          <Image
            src={book.image}
            alt={`${book.title}, neutral sample cover`}
            width={450}
            height={600}
            priority
          />
        </div>
        <div className="product-info">
          <SectionHeader
            page
            title={book.title}
            eyebrow={
              isAccessory ? "Study accessory" : `${book.level} · ${book.subject}`
            }
            description={
              isAccessory
                ? book.subject
                : `${book.medium ? `${book.medium} medium · ` : ""}${book.category}`
            }
          />
          <p className={`stock ${book.inStock ? "" : "unavailable"}`}>
            {book.inStock ? "In stock" : "Out of stock"}
          </p>
          <p className="detail-price">
            {formatCurrency(book.price)}
            {book.compareAtPrice && (
              <s>{formatCurrency(book.compareAtPrice)}</s>
            )}
          </p>
          <p className="product-description">{book.description}</p>
          {book.videoLessons && book.videoLessons.length > 0 && (
            <section className="section video-lessons-section" aria-label="Video lessons">
              <SectionHeader title="YouTube Playlist" />
              <ul className="video-lesson-list">
                {book.videoLessons.map((lesson) => (
                  <li key={lesson.url}>
                    <a
                      href={lesson.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="video-lesson-play" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path fill="currentColor" d={siYoutube.path} />
                        </svg>
                      </span>
                      <span>{lesson.title}</span>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <BookActions book={book} detailed />
          <div className="info-note">
            No online payment. The store will confirm availability, delivery and
            payment arrangements on WhatsApp.
          </div>
        </div>
      </section>
      {isAccessory ? (
        <section className="section product-information">
          <SectionHeader title="Product information" />
          <dl className="specs">
            {[
              ["Product", book.title],
              ["Category", book.category],
              ["Study area", book.subject],
              ["Suitable for", book.level === "All" ? "All students" : book.level],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : (
        <section className="section book-content">
          <SectionHeader title="Book details & highlights" />
          <div
            className={`book-content-grid${book.descriptionHighlights?.length ? "" : " details-only"}`}
          >
            <div className="book-content-group">
              <h3>Book details</h3>
              <dl className="specs">
                {[
                  ["Subject", book.subject],
                  ["Grade / level", book.level],
                  ...(book.medium ? [["Medium", book.medium]] : []),
                  ["Book type", book.category],
                  ["Publisher", book.publisher],
                  ["Author", book.author],
                  ["ISBN", book.isbn],
                ]
                  .filter(([, value]) => value)
                  .map(([key, value]) => (
                    <div key={key}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
              </dl>
            </div>
            {book.descriptionHighlights && book.descriptionHighlights.length > 0 && (
              <div className="book-content-group">
                <h3>Highlights</h3>
                <ol className="product-highlights-list">
                  {book.descriptionHighlights.map((highlight, index) => (
                    <li key={`${book.id}-highlight-${index}`}>
                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <p>{highlight}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      )}
      {sameSubject.length > 0 && (
        <section className="section">
          <SectionHeader
            title={isAccessory ? "More accessories" : `More ${book.subject} books`}
          />
          <BookGrid items={sameSubject} />
        </section>
      )}
      {!isAccessory && related.length > 0 && (
        <section className="section">
          <SectionHeader
            title="Related books"
            href={`/shop?level=${encodeURIComponent(book.level)}`}
          />
          <BookGrid items={related} />
        </section>
      )}
    </div>
  );
}
