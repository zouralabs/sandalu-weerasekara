import { products as books } from "@/data/products";
import type { CartItem } from "@/types";
export const MAX_QUANTITY = 99;
export const COURIER_CHARGE_MINIMUM = 200;
export function normalizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const quantities = new Map<string, number>();
  for (const item of value) {
    if (
      !item ||
      typeof item.bookId !== "string" ||
      typeof item.quantity !== "number" ||
      !Number.isFinite(item.quantity) ||
      item.quantity < 1 ||
      !books.some((book) => book.id === item.bookId && book.inStock)
    )
      continue;
    quantities.set(
      item.bookId,
      Math.min(
        MAX_QUANTITY,
        (quantities.get(item.bookId) ?? 0) + Math.floor(item.quantity),
      ),
    );
  }
  return Array.from(quantities, ([bookId, quantity]) => ({ bookId, quantity }));
}
export function courierCharge(items: CartItem[]) {
  return normalizeCart(items).length > 0 ? COURIER_CHARGE_MINIMUM : 0;
}
export function cartLines(items: CartItem[]) {
  return normalizeCart(items).flatMap((item) => {
    const book = books.find((book) => book.id === item.bookId);
    return book
      ? [
          {
            book,
            quantity: item.quantity,
            subtotal: book.price * item.quantity,
          },
        ]
      : [];
  });
}
