# Blue-and-white commerce theme — design update

This update applies the reference image’s soft ice-blue gradients, navy typography, royal-blue buttons, rounded product cards, floating badges and spacious layout throughout the existing storefront.

## What is preserved

- Existing App Router pages, books, accessories, classes, teachers, seminars, advertising, contact and registration.
- Product links still use `/shop/[slug]/`; `/books/` remains the book catalogue.
- Client-side shopping cart, quantity controls, WhatsApp order enquiries and existing sample inventory.
- Search, catalogue filters, responsive navigation, SEO metadata and accessible skip link.

## What changed

- Rebuilt shared top navigation with initials logo, responsive menu, search panel, registration CTA and live cart count.
- Rebuilt homepage around commerce: book shopping, study accessories, class discovery, about and contact.
- Added a cohesive stylesheet `src/app/reference-theme.css` for homepage, catalogues, product details, cart, forms, cards, footer and mobile layouts.
- Added cropped, softly retouched reference portrait illustration `public/images/hero-educator.png` for the homepage visual. Replace with a licensed original portrait if this site goes public.
- Original `globals.css` is kept for established component behavior; the new stylesheet overrides its aesthetic styles rather than removing functionality.

## Run

```bash
npm install
npm run dev
```

## Before launching

Sample data and contact details must be replaced with real, authorized information. The store remains enquiry-based: online checkout/payment is not implemented. Build and test with your installed dependencies before deploying.
