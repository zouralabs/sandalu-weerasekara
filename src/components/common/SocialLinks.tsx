import {
  siFacebook,
  siInstagram,
  siTiktok,
  siWhatsapp,
  siYoutube,
} from "simple-icons";
import { site } from "@/config/site";

const platforms = [
  { label: "YouTube", icon: siYoutube },
  { label: "TikTok", icon: siTiktok },
  { label: "Instagram", icon: siInstagram },
  { label: "Facebook", icon: siFacebook },
];

const whatsappHref = /^94\d{9}$/.test(site.whatsappNumber)
  ? `https://wa.me/${site.whatsappNumber}`
  : null;

function Icon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
      <path fill="currentColor" d={path} />
    </svg>
  );
}

export function SocialLinks({ includeWhatsApp = true }: { includeWhatsApp?: boolean }) {
  return (
    <nav className="social-links" aria-label="Social media">
      {platforms.map(({ label, icon }) => {
        const profile = site.socialLinks.find(
          (link) => link.label.toLowerCase() === label.toLowerCase(),
        );

        return profile ? (
          <a
            className="social-link"
            key={label}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
          >
            <Icon path={icon.path} />
          </a>
        ) : (
          <span
            className="social-link is-pending"
            key={label}
            role="img"
            aria-label={`${label} link coming soon`}
            title={`${label} link coming soon`}
          >
            <Icon path={icon.path} />
          </span>
        );
      })}
      {includeWhatsApp && (whatsappHref ? (
        <a
          className="social-link whatsapp"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${site.telephone}`}
          title={`WhatsApp ${site.telephone}`}
        >
          <Icon path={siWhatsapp.path} />
        </a>
      ) : (
        <span
          className="social-link is-pending"
          role="img"
          aria-label="WhatsApp link unavailable"
          title="WhatsApp link unavailable"
        >
          <Icon path={siWhatsapp.path} />
        </span>
      ))}
    </nav>
  );
}