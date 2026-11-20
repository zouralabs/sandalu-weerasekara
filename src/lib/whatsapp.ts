import { site } from "@/config/site";
import { formatCurrency } from "./formatCurrency";
import { cartLines, cartPricing } from "./cart";
import type { CartItem } from "@/types";
export function whatsappUrl(message: string, number = site.whatsappNumber) {
  return /^94\d{9}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : null;
}
export function orderMessage(items: CartItem[]) {
  const lines = cartLines(items);
  const itemLines = lines.map(({ book, quantity, subtotal }, i) => {
    const details =
      book.category === "Accessories"
        ? `   Type: ${book.category}`
        : `   Medium: ${book.medium}`;
    return `${i + 1}. ${book.title}\n${details}\n   Quantity: ${quantity}\n   Unit Price: ${formatCurrency(book.price)}\n   Subtotal: ${formatCurrency(subtotal)}`;
  });
  const pricing = cartPricing(items);
  return `Hello, I would like to place an order.

ORDER DETAILS

${itemLines.join("\n\n")}

COURIER METHODS
Courier (full payment): ${formatCurrency(pricing.prepaidCourier)}
Courier (cash on delivery / COD): ${formatCurrency(pricing.codCourier)}

TOTALS
Total without courier: ${formatCurrency(pricing.subtotal)}
Total with full payment: ${formatCurrency(pricing.prepaidTotal)}
Total with cash on delivery / COD: ${formatCurrency(pricing.codTotal)}

CUSTOMER DETAILS

නම / Student's Name:
පාසල / School:
ශිෂ්‍යයාගේ දුරකථන අංකය / Student's Contact Number:
ලිපිනය / Delivery Address:
දිස්ත්‍රික්කය / District:
මවුපියන්ගේ නම / Parent's Name:
මවුපියන්ගේ දුරකථන අංකය / Parent's Contact Number:

Please confirm availability and payment arrangements.

Thank you.`;
}
