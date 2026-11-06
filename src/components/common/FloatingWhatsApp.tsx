import { siWhatsapp } from "simple-icons";
import { site } from "@/config/site";

const whatsappHref =
  /^94\d{9}$/.test(site.whatsappNumber)
    ? `https://wa.me/${site.whatsappNumber}`
    : "https://wa.me/";

export function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        width="34"
        height="34"
        role="img"
        aria-hidden="true"
      >
        <path fill="currentColor" d={siWhatsapp.path} />
      </svg>
    </a>
  );
}
