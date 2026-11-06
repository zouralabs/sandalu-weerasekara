import type { Book } from "@/types";
export const accessories: Book[] = [
  {
    id: "acc-001",
    slug: "calculator",
    title: "Calculator",
    price: 450,
    subject: "Stationery",
    level: "All",
    category: "Accessories",
    image: "/images/accessories/calculator.png",
    inStock: true,
    featured: true,
    addedAt: "2026-11-01",
    shortDescription:
      "A handy everyday tool for classroom and study calculations.",
    description:
      "Sample calculator. Replace with verified product photo and information before selling.",
    sample: true,
  },
  {
    id: "acc-002",
    slug: "foolscap sheet",
    title: "Foolscap Sheet",
    price: 350,
    subject: "Stationery",
    level: "All",
    category: "Accessories",
    image: "/images/accessories/paper.png",
    inStock: true,
    featured: true,
    addedAt: "2026-11-01",
    shortDescription:
      "Everyday writing paper for notes, exercises, and revision practice.",
    description:
      "Sample foolscap sheet. Replace with verified product photo and information before selling.",
    sample: true,
  },
];
