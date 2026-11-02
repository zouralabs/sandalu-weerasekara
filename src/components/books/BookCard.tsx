import Image from "next/image";
import Link from "next/link";
import { BookActions } from "./BookActions";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Book } from "@/types";
export function BookCard({ book }: { book: Book }) {
  return (
    <article className="book-card">
      <Link
        className="book-image"
        href={`/shop/${book.slug}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={book.image}
          alt={`${book.title} — sample cover`}
          width={450}
          height={600}
          sizes="(max-width: 600px) 40vw, (max-width: 1000px) 25vw, 220px"
        />
        {/* <span className="sample-label">Sample</span> */}
      </Link>
      <div className="book-card-body">
        <p className="eyebrow">
          {book.level} <span>•</span> {book.subject}
        </p>
        <h3>
          <Link href={`/shop/${book.slug}`}>{book.title}</Link>
        </h3>
        <p className="small muted">{book.medium} medium</p>
        <div className="price-row">
          <strong>{formatCurrency(book.price)}</strong>
          <span className={`stock ${book.inStock ? "" : "unavailable"}`}>
            {book.inStock ? "In stock" : "Out of stock"}
          </span>
        </div>
        <BookActions book={book} />
      </div>
    </article>
  );
}
export function BookGrid({ items }: { items: Book[] }) {
  return (
    <div className="book-grid">
      {items.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
