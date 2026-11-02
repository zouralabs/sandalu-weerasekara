import type { Book } from "@/types";
export function includesQuery(query: string, ...values: (string | string[])[]) {
  const haystack = values.flat().join(" ").toLocaleLowerCase();
  return query
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}
export function filterBooks(books: Book[], params: URLSearchParams) {
  const filtered = books.filter(
    (book) =>
      ["level", "subject", "medium", "category"].every(
        (key) =>
          !params.get(key) || book[key as keyof Book] === params.get(key),
      ) &&
      includesQuery(
        params.get("q") ?? "",
        book.title,
        book.subject,
        book.medium,
      ) &&
      (!params.get("stock") ||
        book.inStock === (params.get("stock") === "in")) &&
      (!params.get("min") || book.price >= Number(params.get("min"))) &&
      (!params.get("max") || book.price <= Number(params.get("max"))),
  );
  return filtered.sort((a, b) => {
    switch (params.get("sort")) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.title.localeCompare(b.title);
      case "newest":
        return b.addedAt.localeCompare(a.addedAt);
      default:
        return 0;
    }
  });
}
