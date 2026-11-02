"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cartLines } from "@/lib/cart";
import { orderMessage } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/formatCurrency";
import { QuantityControl } from "@/components/books/BookActions";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { EmptyState } from "@/components/common/EmptyState";
export function Cart() {
  const { items, ready, update, remove, storageError } = useCart();
  const lines = cartLines(items);
  const total = lines.reduce((sum, line) => sum + line.subtotal, 0);
  if (!ready) return <p role="status">Loading your saved cart…</p>;
  if (!lines.length)
    return (
      <>
        <EmptyState
          title="Your bookshelf starts here."
          description="Your cart is empty. Browse our educational books and add the resources you need."
          href="/shop"
        />
        {storageError && <p role="alert">{storageError}</p>}
      </>
    );
  return (
    <>
      {storageError && (
        <p role="alert" className="info-note">
          {storageError}
        </p>
      )}
      <div className="cart-layout">
        <div>
          <div className="cart-items">
            {lines.map(({ book, quantity, subtotal }) => (
              <article className="cart-item" key={book.id}>
                <Link href={`/shop/${book.slug}`}>
                  <Image
                    src={book.image}
                    alt={`${book.title} sample cover`}
                    width={90}
                    height={120}
                  />
                </Link>
                <div className="cart-item-info">
                  <h2>
                    <Link href={`/shop/${book.slug}`}>{book.title}</Link>
                  </h2>
                  <p className="small muted">
                    {book.medium} medium · Sample product
                  </p>
                  <p>{formatCurrency(book.price)} each</p>
                  <button
                    type="button"
                    className="remove-button"
                    aria-label={`Remove ${book.title}`}
                    onClick={() => remove(book.id)}
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
                <QuantityControl
                  value={quantity}
                  onChange={(value) => update(book.id, value)}
                  label={`${book.title} quantity`}
                />
                <strong className="line-total">
                  {formatCurrency(subtotal)}
                </strong>
              </article>
            ))}
          </div>
          <Link href="/shop" className="text-link continue">
            <ArrowLeft size={16} />
            Continue shopping
          </Link>
        </div>
        <aside className="order-summary">
          <h2>Order summary</h2>
          <dl>
            <div>
              <dt>
                Items ({lines.reduce((sum, line) => sum + line.quantity, 0)})
              </dt>
              <dd>{formatCurrency(total)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>Confirmed in chat</dd>
            </div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{formatCurrency(total)}</dd>
            </div>
          </dl>
          <WhatsAppButton message={orderMessage(items)} />
          <p className="small muted">
            Review your message, open WhatsApp and send it manually. The store
            will confirm availability, delivery and payment.
          </p>
          <p className="small">Your cart stays saved when you open WhatsApp.</p>
        </aside>
      </div>
    </>
  );
}
