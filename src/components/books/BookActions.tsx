"use client";
import { useState } from "react";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { orderMessage } from "@/lib/whatsapp";
import type { Book } from "@/types";
export function QuantityControl({
  value,
  onChange,
  label = "Quantity",
}: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  return (
    <div className="quantity">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={15} />
      </button>
      <input
        type="number"
        min={1}
        max={99}
        step={1}
        aria-label={label}
        value={value}
        onChange={(event) => {
          const n = Number(event.target.value);
          if (Number.isFinite(n))
            onChange(Math.min(99, Math.max(1, Math.floor(n))));
        }}
      />
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
export function BookActions({
  book,
  detailed = false,
}: {
  book: Book;
  detailed?: boolean;
}) {
  const { add, ready } = useCart();
  const [quantity, setQuantity] = useState(1);
  return (
    <div className={detailed ? "book-actions detailed" : "book-actions"}>
      {detailed && book.inStock && (
        <div className="quantity-row">
          <span>Quantity</span>
          <QuantityControl value={quantity} onChange={setQuantity} />
        </div>
      )}
      <button
        className="button primary"
        type="button"
        disabled={!book.inStock || !ready}
        onClick={() => add(book.id, quantity)}
      >
        <ShoppingBag size={16} />
        {book.inStock ? "Add to cart" : "Out of stock"}
      </button>
      <WhatsAppButton
        disabled={!book.inStock}
        message={orderMessage([{ bookId: book.id, quantity }])}
        className={detailed ? "button whatsapp" : "whatsapp-text"}
      >
        {detailed ? "Order via WhatsApp" : "WhatsApp order"}
      </WhatsAppButton>
    </div>
  );
}
