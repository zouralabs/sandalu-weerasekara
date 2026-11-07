import { site } from "@/config/site";
import { Mail, Phone } from "lucide-react";
import { siWhatsapp } from "simple-icons";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ContactForm } from "@/components/common/ContactForm";
import { SocialLinks } from "@/components/common/SocialLinks";
export const metadata = {
  title: "Contact Us",
  description:
    "Contact us about books, classes, and study accessories.",
};
export default function Page() {
  return (
    <div className="commerce-contact-band contact-page-band">
      <div className="container">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />
      </div>
      <div className="container commerce-contact">
        <div className="commerce-contact-copy">
          <header className="header">
            <span className="eyebrow">CONTACT</span>
            <h1 id="contact-title">Let’s talk about your next step.</h1>
            <p>
              Need help with books, classes, or accessories? Reach out directly.
            </p>
          </header>
          <div className="commerce-contact-points">
            {site.email && (
              <a href={`mailto:${site.email}`}>
                <span className="commerce-contact-icon" aria-hidden="true">
                  <Mail size={20} />
                </span>
                <span>
                  <small>Email us</small>
                  <strong>{site.email}</strong>
                </span>
              </a>
            )}
            {site.telephone && (
              <a href={`tel:${site.telephone.replace(/\s+/g, "")}`}>
                <span className="commerce-contact-icon" aria-hidden="true">
                  <Phone size={20} />
                </span>
                <span>
                  <small>Call us</small>
                  <strong>{site.telephone}</strong>
                </span>
              </a>
            )}
            {site.whatsappNumber && (
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="commerce-contact-icon whatsapp"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d={siWhatsapp.path} />
                  </svg>
                </span>
                <span>
                  <small>WhatsApp</small>
                  <strong>{site.telephone}</strong>
                </span>
              </a>
            )}
          </div>
          <div className="commerce-contact-social">
            <span className="eyebrow">FOLLOW ALONG</span>
            <SocialLinks includeWhatsApp={false} />
          </div>
          <p className="commerce-contact-ordering">
            Orders are confirmed personally. Add books to your cart to include
            titles and quantities in your inquiry.
          </p>
        </div>
        <div className="commerce-contact-form">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
