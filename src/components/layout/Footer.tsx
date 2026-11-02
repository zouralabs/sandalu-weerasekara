import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            <BookOpen size={27} />
            {site.name}
          </Link>
          <p>{site.description}</p>
          <p className="small">Sinhala · English · Tamil</p>
        </div>
        <div>
          <h2>Explore</h2>
          {site.navigation.slice(1).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h2>Book categories</h2>
          {categories.slice(0, 6).map((item) => (
            <Link key={item.name} href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <h2>We’re here to help</h2>
          <p>
            Book orders, class inquiries and advertising — start a conversation.
          </p>
          <WhatsAppButton
            message="Hello, I would like to contact your team."
            className="footer-contact"
          >
            Chat on WhatsApp
          </WhatsAppButton>
          {site.telephone && (
            <a href={`tel:${site.telephone}`}>{site.telephone}</a>
          )}
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          {site.address && <p>{site.address}</p>}
          {site.socialLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>Orders confirmed personally through WhatsApp.</span>
      </div>
    </footer>
  );
}
