import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { SocialLinks } from "@/components/common/SocialLinks";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            <Image src={site.logo} alt="" width={32} height={32} />
            {site.name}
          </Link>
          <p>{site.description}</p>
          <p className="small">· Sinhala · English</p>
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
          {categories.slice(0, 4).map((item) => (
            <Link key={item.name} href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <h2>We’re here to help</h2>
          <p>
            Book and accessory enquiries — start a conversation.
          </p>
          {site.telephone && (
            <a href={`tel:${site.telephone}`}>{site.telephone}</a>
          )}
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          {site.address && <p>{site.address}</p>}
          <SocialLinks includeWhatsApp={false} />
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
