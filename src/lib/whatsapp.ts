import { site } from "@/config/site";
import { formatCurrency } from "./formatCurrency";
import { cartLines } from "./cart";
import type { CartItem, TuitionClass, Teacher } from "@/types";
export function whatsappUrl(message: string, number = site.whatsappNumber) {
  return /^94\d{9}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : null;
}
export function orderMessage(items: CartItem[]) {
  const lines = cartLines(items);
  return `Hello, I would like to place a book order.\n\nBOOK ORDER\n\n${lines.map(({ book, quantity, subtotal }, i) => `${i + 1}. ${book.title}\n   Medium: ${book.medium}\n   Quantity: ${quantity}\n   Unit Price: ${formatCurrency(book.price)}\n   Subtotal: ${formatCurrency(subtotal)}`).join("\n\n")}\n\nTOTAL: ${formatCurrency(lines.reduce((total, line) => total + line.subtotal, 0))}\n\nPlease confirm book availability and delivery details.\n\nThank you.`;
}
export const classMessage = (item: TuitionClass, teacher: Teacher) =>
  `Hello, I would like more information about the following tuition class.\n\nSubject: ${item.level} ${item.subject}\nTeacher: ${teacher.name}\nLocation: ${item.location}\nSchedule: ${item.schedule}\nMedium: ${item.medium}\n\nPlease share registration details.\n\nThank you.`;
export const advertiseMessage =
  "Hello, I would like to advertise my tuition class on your website.\n\nPlease share the advertising details and requirements.\n\nThank you.";
