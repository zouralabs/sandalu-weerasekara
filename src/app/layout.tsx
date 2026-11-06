import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "@fontsource-variable/noto-sans-sinhala";
import "@fontsource-variable/noto-sans-tamil";
import "./globals.css";
import "./reference-theme.css";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { CartProvider } from "@/context/CartContext";
export const metadata: Metadata = {
  title: {
    default: `${site.name} | Educational Books & Study Accessories in Sri Lanka`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Books & Study Accessories`,
    description: site.description,
    locale: "en_LK",
    type: "website",
  },
  icons: { icon: site.logo },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main-content">{children}</main>
          <ScrollReveal />
          <Footer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
