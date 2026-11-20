"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cartLines, cartPricing } from "@/lib/cart";
import { orderMessage } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/formatCurrency";
import { QuantityControl } from "@/components/books/BookActions";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { EmptyState } from "@/components/common/EmptyState";
export function Cart() {
  const { items, ready, update, remove, clear, storageError } = useCart();
  const lines = cartLines(items);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const pricing = cartPricing(items);
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
                    {book.medium ? `${book.medium} medium · ` : ""}Sample product
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
              <dt>Items ({itemCount})</dt>
              <dd>{formatCurrency(pricing.subtotal)}</dd>
            </div>
            <div>
              <dt>Courier (full payment)</dt>
              <dd>{formatCurrency(pricing.prepaidCourier)}</dd>
            </div>
            <div>
              <dt>COD courier</dt>
              <dd>{formatCurrency(pricing.codCourier)}</dd>
            </div>
            <div className="summary-total">
              <dt>Total without courier</dt>
              <dd>{formatCurrency(pricing.subtotal)}</dd>
            </div>
            <div className="summary-total">
              <dt>Full payment total</dt>
              <dd>{formatCurrency(pricing.prepaidTotal)}</dd>
            </div>
            <div className="summary-total">
              <dt>COD total</dt>
              <dd>{formatCurrency(pricing.codTotal)}</dd>
            </div>
          </dl>
          <WhatsAppButton message={orderMessage(items)} onClick={clear} />
          <p className="small muted">
            Review your message, open WhatsApp and send it manually. The store
            will confirm availability, delivery and payment.
          </p>
          <p className="small">Clicking the order button clears this cart.</p>
        </aside>
      </div>
    </>
  );
}
