"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { products as books } from "@/data/products";
import { MAX_QUANTITY, normalizeCart } from "@/lib/cart";
import type { CartItem } from "@/types";
const KEY = "sandalu-weerasekara-cart-v1";
interface CartValue {
  items: CartItem[];
  ready: boolean;
  notice: string;
  storageError: string;
  add: (id: string, quantity?: number) => void;
  update: (id: string, quantity: number) => void;
  remove: (id: string) => void;
}
const CartContext = createContext<CartValue | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    try {
      setItems(normalizeCart(JSON.parse(localStorage.getItem(KEY) ?? "[]")));
    } catch {
      setStorageError(
        "Your saved cart could not be read. You can still shop in this tab.",
      );
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      setStorageError(
        "Your browser cannot save the cart. Keep this tab open while ordering.",
      );
    }
  }, [items, ready]);
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === KEY) {
        try {
          setItems(normalizeCart(JSON.parse(event.newValue ?? "[]")));
        } catch {
          /* Ignore invalid data from another tab. */
        }
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);
  const add = useCallback((id: string, quantity = 1) => {
    if (
      !books.some((book) => book.id === id && book.inStock) ||
      !Number.isFinite(quantity) ||
      quantity < 1
    )
      return;
    setItems((current) =>
      normalizeCart([...current, { bookId: id, quantity }]),
    );
    setNotice("Book added to your cart. Maximum 99 per title.");
  }, []);
  const update = useCallback((id: string, quantity: number) => {
    if (!Number.isFinite(quantity)) return;
    setItems((current) =>
      normalizeCart(
        current.map((item) =>
          item.bookId === id
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  Math.min(MAX_QUANTITY, Math.floor(quantity)),
                ),
              }
            : item,
        ),
      ),
    );
  }, []);
  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.bookId !== id));
    setNotice("Book removed from your cart.");
  }, []);
  return (
    <CartContext.Provider
      value={{ items, ready, notice, storageError, add, update, remove }}
    >
      {children}
      <div
        role="status"
        aria-live="polite"
        className={notice ? "toast" : "sr-only"}
      >
        {notice}
      </div>
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider is required");
  return context;
}
