import assert from "node:assert/strict";
import test from "node:test";
import { products } from "../src/data/products";
import { formatCurrency } from "../src/lib/formatCurrency";
import { cartPricing } from "../src/lib/cart";
import { orderMessage } from "../src/lib/whatsapp";

test("cart pricing includes prepaid and COD courier options", () => {
  const product = products.find((item) => item.inStock);
  assert.ok(product);
  const items = [{ bookId: product.id, quantity: 1 }];
  const pricing = cartPricing(items);

  assert.equal(pricing.prepaidCourier, 200);
  assert.equal(pricing.prepaidTotal, pricing.subtotal + 200);
  assert.equal(pricing.codCourier, 300);
  assert.equal(pricing.codTotal, pricing.subtotal + 300);

  const message = orderMessage(items);
  const prepaidCourier = `Courier (full payment): ${formatCurrency(200)}`;
  const codCourier = `Courier (cash on delivery / COD): ${formatCurrency(300)}`;
  const noCourierTotal = `Total without courier: ${formatCurrency(pricing.subtotal)}`;
  const prepaidTotal = `Total with full payment: ${formatCurrency(pricing.prepaidTotal)}`;
  const codTotal = `Total with cash on delivery / COD: ${formatCurrency(pricing.codTotal)}`;
  const totalsStart = message.indexOf("TOTALS");

  assert.ok(message.indexOf(prepaidCourier) < totalsStart);
  assert.ok(message.indexOf(codCourier) < totalsStart);
  assert.ok(message.indexOf(noCourierTotal) > totalsStart);
  assert.ok(message.indexOf(prepaidTotal) > message.indexOf(noCourierTotal));
  assert.ok(message.indexOf(codTotal) > message.indexOf(prepaidTotal));
});