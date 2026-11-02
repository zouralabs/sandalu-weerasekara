"use client";
import { useRef, useState } from "react";
import { MessageCircle, Copy, X } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
export function WhatsAppButton({
  message,
  children = "Order via WhatsApp",
  className = "button whatsapp",
  disabled = false,
}: {
  message: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState("");
  const url = whatsappUrl(message);
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied("Message copied.");
    } catch {
      setCopied("Select and copy the message below.");
    }
  }
  return (
    <>
      <button
        type="button"
        className={className}
        disabled={disabled}
        onClick={() => {
          setCopied("");
          dialog.current?.showModal();
        }}
      >
        <MessageCircle size={17} aria-hidden="true" />
        {children}
      </button>
      <dialog
        ref={dialog}
        className="message-dialog"
        aria-label="WhatsApp message preview"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-top">
          <h2>Your WhatsApp message</h2>
          <button
            type="button"
            className="icon-button"
            aria-label="Close message preview"
            onClick={() => dialog.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <p>
          {url
            ? "Review your message, then open WhatsApp and send it manually. Availability, delivery and payment will be confirmed in the chat."
            : "Demo mode: the store’s WhatsApp number has not been configured. You can preview and copy this message."}
        </p>
        <textarea
          aria-label="Message to send"
          readOnly
          value={message}
          rows={12}
        />
        <div className="button-row">
          <button type="button" className="button secondary" onClick={copy}>
            <Copy size={16} />
            Copy message
          </button>
          {url && (
            <a
              className="button whatsapp"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp
            </a>
          )}
        </div>
        <p role="status" className="small">
          {copied}
        </p>
        <p className="small muted">
          Opening WhatsApp does not place an order or clear your cart.
        </p>
      </dialog>
    </>
  );
}
