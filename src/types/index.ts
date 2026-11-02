export type Level = "Primary" | "Grade 6–9" | "O/L" | "A/L" | "All";
export type Medium = "Sinhala" | "English" | "Tamil";
export interface Book {
  id: string;
  slug: string;
  title: string;
  price: number;
  subject: string;
  level: Level;
  medium: Medium;
  category: string;
  image: string;
  inStock: boolean;
  featured: boolean;
  addedAt: string;
  description: string;
  publisher?: string;
  author?: string;
  isbn?: string;
  sample: boolean;
}
export interface Teacher {
  id: string;
  slug: string;
  name: string;
  subjects: string[];
  levels: Level[];
  mediums: Medium[];
  district: string;
  image: string;
  bio: string;
  locations: string[];
  qualifications?: string[];
  sample: boolean;
}
export interface TuitionClass {
  id: string;
  slug: string;
  title: string;
  teacherId: string;
  subject: string;
  level: Level;
  medium: Medium;
  district: string;
  type: "Online" | "Physical" | "Hybrid";
  format: string;
  schedule: string;
  location: string;
  description: string;
  poster: string;
  featured: boolean;
  sample: boolean;
}
export interface Seminar {
  id: string;
  slug: string;
  title: string;
  subject: string;
  teacherId: string;
  date: string;
  endAt: string;
  time: string;
  venue: string;
  type: "Online" | "Physical";
  poster: string;
  description: string;
  sample: boolean;
}
export interface CartItem {
  bookId: string;
  quantity: number;
}
