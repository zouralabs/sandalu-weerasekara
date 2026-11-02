import Link from "next/link";
import { ArrowRight } from "lucide-react";
export function SectionHeader({
  title,
  description,
  href,
  action = "View all",
  eyebrow,
  page = false,
}: {
  title: string;
  description?: string;
  href?: string;
  action?: string;
  eyebrow?: string;
  page?: boolean;
}) {
  const Heading = page ? "h1" : "h2";
  return (
    <header className={`header ${page ? "page-header" : "section-header"}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading>{title}</Heading>
        {description && <p>{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {action}
          <ArrowRight size={16} />
        </Link>
      )}
    </header>
  );
}
