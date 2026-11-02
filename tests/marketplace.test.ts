import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { books } from "../src/data/books";
import { classes } from "../src/data/classes";
import { teachers } from "../src/data/teachers";
import { seminars } from "../src/data/seminars";
import { districts } from "../src/data/categories";
import { normalizeCart, cartLines } from "../src/lib/cart";
import { filterBooks, includesQuery } from "../src/lib/filters";
import { orderMessage, whatsappUrl, classMessage } from "../src/lib/whatsapp";
import { formatCurrency } from "../src/lib/formatCurrency";
test("inventory references, slugs and local images are valid", () => {
  assert.equal(books.length, 24);
  assert.equal(classes.length, 12);
  assert.equal(teachers.length, 8);
  assert.equal(seminars.length, 6);
  assert.equal(new Set(districts).size, 25);
  for (const group of [books, classes, teachers, seminars]) {
    assert.equal(new Set(group.map((x) => x.id)).size, group.length);
    assert.equal(new Set(group.map((x) => x.slug)).size, group.length);
    for (const item of group) {
      assert.match(item.slug, /^[a-z0-9-]+$/);
      const file = "image" in item ? item.image : item.poster;
      assert.ok(fs.existsSync(`public${file}`), file);
    }
  }
  for (const item of [...classes, ...seminars])
    assert.ok(teachers.some((teacher) => teacher.id === item.teacherId));
  for (const item of classes) assert.ok(districts.includes(item.district));
});
test("cart rejects corrupted quantities, unavailable books and stale ids", () => {
  assert.deepEqual(normalizeCart(null), []);
  assert.deepEqual(
    normalizeCart([
      { bookId: "missing", quantity: 2 },
      { bookId: books[10].id, quantity: 1 },
      { bookId: books[0].id, quantity: -2 },
      { bookId: books[0].id, quantity: NaN },
    ]),
    [],
  );
  assert.deepEqual(
    normalizeCart([
      { bookId: books[0].id, quantity: 1.9 },
      { bookId: books[0].id, quantity: 120 },
    ]),
    [{ bookId: books[0].id, quantity: 99 }],
  );
});
test("cart and WhatsApp include every title with exact quantities, units and totals", () => {
  const items = [
    { bookId: books[0].id, quantity: 2 },
    { bookId: books[1].id, quantity: 3 },
  ];
  const total = books[0].price * 2 + books[1].price * 3;
  assert.equal(
    cartLines(items).reduce((sum, line) => sum + line.subtotal, 0),
    total,
  );
  const message = orderMessage(items);
  for (const book of books.slice(0, 2)) {
    assert.ok(message.includes(book.title));
    assert.ok(message.includes(formatCurrency(book.price)));
  }
  assert.ok(message.includes("Quantity: 2"));
  assert.ok(message.includes("Quantity: 3"));
  assert.ok(message.includes(`TOTAL: ${formatCurrency(total)}`));
  assert.equal(whatsappUrl(message), null);
  const url = whatsappUrl(message, "94712345678")!;
  assert.equal(new URL(url).searchParams.get("text"), message);
  assert.equal(whatsappUrl(message, "947XX"), null);
});
test("combined filters, sorting and search produce matching inventory", () => {
  const exact = filterBooks(
    books,
    new URLSearchParams({
      level: "A/L",
      subject: "Physics",
      medium: "English",
      category: "Past Papers",
      stock: "in",
      min: "1000",
      max: "1500",
    }),
  );
  assert.deepEqual(
    exact.map((x) => x.id),
    [books[1].id],
  );
  const sorted = filterBooks(
    books,
    new URLSearchParams({ sort: "price-desc" }),
  );
  assert.ok(sorted.every((x, i) => !i || sorted[i - 1].price >= x.price));
  assert.equal(
    filterBooks(books, new URLSearchParams({ min: "3000", max: "100" })).length,
    0,
  );
  assert.ok(includesQuery("pHySiCs", books[1].title));
  assert.ok(includesQuery("physics al", "AL Physics guide"));
  assert.ok(!includesQuery("French", books[1].title));
});
test("class inquiry uses linked teacher and full schedule", () => {
  const item = classes[0];
  const teacher = teachers.find((t) => t.id === item.teacherId)!;
  const message = classMessage(item, teacher);
  for (const value of [
    teacher.name,
    item.schedule,
    item.location,
    item.subject,
  ])
    assert.ok(message.includes(value));
});
