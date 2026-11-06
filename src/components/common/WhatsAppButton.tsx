"use client";
import { PackageCheck } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppButton({
  message,
  children = "Order via WhatsApp",
  className = "button whatsapp",
  disabled = false,
  onClick,
}: {
  message: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const url = whatsappUrl(message);

  if (disabled || !url) {
    return (
      <button type="button" className={className} disabled>
        <PackageCheck size={17} aria-hidden="true" />
        {children}
      </button>
    );
  }

  return (
    <a
      className={className}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      <PackageCheck size={17} aria-hidden="true" />
      {children}
    </a>
  );
}
