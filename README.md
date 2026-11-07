# EduLanka

A complete frontend-only educational bookstore and tuition directory for Sri Lanka, built with Next.js App Router, React, TypeScript, Tailwind CSS and Lucide icons.

## Run locally

Install Node.js 20.9 or newer (Node.js 22 or 24 recommended), extract this archive, and open a terminal in the `edulanka` folder.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. No environment file, account, database, payment service or cloud configuration is needed.

```bash
npm test
npm run typecheck
npm run build
```

The production build generates static pages in `out/`. Do not open generated HTML with `file://`; use the development command above for local use. Dynamic detail routes are generated from the inventory during the build; rebuild after changing data. Next.js provides the local development tooling only: there are no application backend endpoints or server-side databases.

## Included

- Complete homepage, bookstore, book details, shopping cart, tuition directory, class details, teacher directory and profiles, seminars and event details, advertising, contact and search pages.
- 24 sample products, 12 fictional classes, 8 fictional teachers and 6 unconfirmed demo seminars.
- URL-based book, class and teacher filters; book sorting, active filter chips, empty states and load-more pagination.
- A persisted shopping cart with quantity limits, unavailable-product protection and current inventory prices.
- WhatsApp message previews for orders, classes, teachers, seminars, advertising and contact inquiries.
- Responsive navigation, expandable mobile filters, native accessible dialogs, keyboard focus styles, reduced-motion support and `clamp()` typography.
- Local vector cover/poster placeholders, bundled Inter / Noto Sans Sinhala / Noto Sans Tamil fonts, metadata and linked detail pages.

## First change: your business information

Edit `src/config/site.ts`:

- `name`: your brand name.
- `logo`: a local image path, e.g. `/images/logo.svg`.
- `whatsappNumber`: your real Sri Lankan international number, **11 digits beginning with 94**, without `+`, spaces or hyphens. For example, convert your own `07…` number by removing the leading zero and prefixing `94`.
- `telephone`, `email`, `address`: leave blank to omit them, or enter your actual information.
- `socialLinks`: add only actual profiles as `{ label: "Facebook", url: "https://…" }`.
- `description`, `currency` and `navigation`: shared site settings.

The shipped number `947XXXXXXXX` is intentionally invalid. Until it is replaced, WhatsApp controls show the correctly generated message and a copy option, without opening a fake recipient. With a valid number, the same dialog shows **Open WhatsApp**. Opening WhatsApp does not send anything, place an order, charge money or clear the cart. The customer must press Send themselves.

No delivery fee is invented. The seller confirms availability, delivery, payment and any charges in the conversation.

## Content files

| File                     | Content                                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| `src/data/books.ts`      | Product inventory, prices, availability, descriptions and covers       |
| `src/data/classes.ts`    | Tuition advertisements, schedules, locations and teacher references    |
| `src/data/teachers.ts`   | Teacher profiles, subjects, levels, medium and biographies             |
| `src/data/seminars.ts`   | Events, dates, end times, venues and posters                           |
| `src/data/categories.ts` | Educational levels, 25 districts, subjects, mediums and category links |
| `src/data/banners.ts`    | Smaller homepage promotional cards                                     |
| `src/config/site.ts`     | Shared branding, contact information and navigation                    |
| `src/types/index.ts`     | TypeScript data interfaces                                             |
| `src/app/globals.css`    | Design tokens, component styles and responsive rules                   |

All existing inventory and people are demonstrative. Covers and teacher avatars are original neutral placeholders, not real book covers or teacher photographs. Fictional names are not claims about actual people. No ISBNs, publisher identities, qualifications, ratings or discounts have been invented.

## Add or edit a book

1. Add a licensed cover to `public/images/books/` (3:4 recommended; compressed WebP or SVG works).
2. Add a `Book` object to `src/data/books.ts` with a unique `id` and lowercase hyphenated `slug`.
3. Set the actual `title`, `price`, `subject`, `level`, `medium`, `category`, `inStock` and `description`.
4. Set `image` to `/images/books/your-cover.webp`, not a filesystem path.
5. Set `featured: true` to include it in featured books; set `addedAt` as `YYYY-MM-DD` for newest-first sorting.
6. Add `author`, `publisher` or `isbn` only when verified. These optional fields appear automatically when present.
7. Rebuild. `/shop/your-slug/` is created automatically; do not create a separate page component.

Keep IDs stable when adjusting stock or prices: carts store IDs and quantities, and use the current inventory for totals. Invalid, removed and unavailable products are excluded when the cart is loaded. Quantities are whole numbers between 1 and 99. Cart changes synchronize across tabs; storage failures display a message.

## Add a teacher and tuition class

1. Add the teacher to `src/data/teachers.ts`, with a unique ID/slug, subjects, levels, mediums, district, locations and biography. Optional verified qualifications can be supplied.
2. Store a permitted square portrait in `public/images/teachers/` and update `image`.
3. Add the class to `src/data/classes.ts`. Its `teacherId` must exactly match an existing teacher ID.
4. Supply subject, level, medium, district, type (`Online`, `Physical`, `Hybrid`), format (`Theory`, `Revision`, `Paper Class`, `Group`, `Individual`), schedule, location and description.
5. Add a poster under `public/images/classes/` and point `poster` to it. A 4:5 or 3:4 poster is recommended; the detail page shows the full poster.
6. Set `featured` to control featured advertising placement. This is an advertisement label, not a popularity claim.
7. Rebuild. The directory, detail page, teacher profile and search use the shared data automatically.

All class and teacher inquiries use the site's configured WhatsApp number. No teacher accounts or registration forms exist.

## Add a seminar

Edit `src/data/seminars.ts` with a unique ID/slug and existing `teacherId`. Use a `YYYY-MM-DD` date and an ISO `endAt` with Sri Lanka's `+05:30` offset, for example `2026-12-12T13:00:00+05:30`. This controls the live past-event label. Add a poster under `public/images/seminars/`, plus the exact time, venue, format and description. Past listings remain visible and are marked as past demo events.

## Replacing demonstration content

The current interface intentionally includes sample labels and demo-specific explanatory text. After replacing the entire catalog with verified business content, review demo copy in `Header.tsx`, the card/detail components, seminar status, contact page and homepage. Do not remove sample labels from records that are still fictional. The `sample` field is available for future mixed real/sample catalogs; this first release is intentionally presented throughout as a demo.

Homepage hero books currently reference the first and third inventory entries; keep at least three books or update those references in `src/app/page.tsx`. Featured classes and teachers are selected from the same shared arrays. Update subjects and categories if adding a new subject or content type.

## Images, fonts and performance

All images live in `public/images/`. Small SVG placeholders load without remote services. `next/image` is used with static-export-compatible unoptimized output: replacement raster images should be resized and compressed before adding them, because there is no image-processing backend. Use approximately 600 px-wide book covers, 400 px teacher portraits, and 900 px class posters where possible. Fonts are installed from Fontsource and served locally by the build; there is no Google Fonts request at runtime.

Colors and type are controlled by CSS custom properties in `globals.css`. Tailwind's compiler and utilities are available; reusable semantic component classes provide the main visual system. Every major content section uses a `header` class for its headings and descriptions.

## Privacy and limits

Cart item IDs and quantities are stored in browser `localStorage` under `sandalu-weerasekara-cart-v1`. Contact and class-enrollment forms submit the information entered by the visitor to Web3Forms for delivery to the site owner. The site application does not maintain an inquiry database. The cart's order button opens WhatsApp with a prepared message; the visitor reviews and sends it themselves.

The site has no user accounts or online payment processing. It does not currently implement analytics or advertising tracking. Web3Forms and WhatsApp are third-party services and handle information under their own policies.

## Checks

`npm test` checks data references and images, damaged-cart handling, unavailable stock, quantity limits, order totals, WhatsApp encoding, combined filters and linked-teacher inquiries. `npm run build` includes TypeScript validation and generates every detail route. `npm run typecheck` can also be run independently.

Before using real content, manually test your actual WhatsApp number on both desktop and mobile. The placeholder number deliberately prevents a live handoff in this demo.
