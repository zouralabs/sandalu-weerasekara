import Image from "next/image";
import { notFound } from "next/navigation";
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
        items={[{ label: "Book Store", href: "/shop" }, { label: book.title }]}
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
          <span className="demo-label">Demonstration product</span>
        </div>
        <div className="product-info">
          <SectionHeader
            page
            title={book.title}
            eyebrow={`${book.level} · ${book.subject}`}
            description={`${book.medium} medium · ${book.category}`}
          />
          <p className={`stock ${book.inStock ? "" : "unavailable"}`}>
            {book.inStock ? "In stock" : "Out of stock"}
          </p>
          <p className="detail-price">{formatCurrency(book.price)}</p>
          <p>{book.description}</p>
          <BookActions book={book} detailed />
          <div className="info-note">
            No online payment. The store will confirm availability, delivery and
            payment arrangements on WhatsApp. Prices shown are sample prices.
          </div>
        </div>
      </section>
      <section className="section">
        <SectionHeader title="Book details" />
        <dl className="specs">
          {[
            ["Subject", book.subject],
            ["Grade / level", book.level],
            ["Medium", book.medium],
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
      </section>
      {sameSubject.length > 0 && (
        <section className="section">
          <SectionHeader title={`More ${book.subject} books`} />
          <BookGrid items={sameSubject} />
        </section>
      )}
      <section className="section">
        <SectionHeader
          title="Related books"
          href={`/shop?level=${encodeURIComponent(book.level)}`}
        />
        <BookGrid items={related} />
      </section>
    </div>
  );
}
