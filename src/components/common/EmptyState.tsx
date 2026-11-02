import Link from "next/link";
import { Search } from "lucide-react";
export function EmptyState({
  title = "No matches found",
  description = "Try another subject or remove a filter to see more results.",
  href,
  action = "Browse books",
}: {
  title?: string;
  description?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="empty-state">
      <Search size={32} aria-hidden="true" />
      <h2>{title}</h2>
      <p>{description}</p>
      {href && (
        <Link className="button primary" href={href}>
          {action}
        </Link>
      )}
    </div>
  );
}
