"use client";
import { useState } from "react";
import { WhatsAppButton } from "./WhatsAppButton";
export function ContactForm() {
  const [prepared, setPrepared] = useState("");
  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setPrepared(
          `Hello, I have an inquiry.\n\nName: ${data.get("name")}\nContact number: ${data.get("phone")}\nInquiry type: ${data.get("type")}\n\n${data.get("message")}\n\nThank you.`,
        );
      }}
      onChange={() => setPrepared("")}
    >
      <h2>Send an inquiry</h2>
      <p className="muted">
        Prepare a message to send yourself through WhatsApp.
      </p>
      <label>
        Your name
        <input name="name" autoComplete="name" required maxLength={100} />
      </label>
      <label>
        Contact number
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          maxLength={25}
          pattern="[+0-9 ()-]{7,25}"
          title="Enter a phone number using digits, spaces, +, parentheses or hyphens."
        />
      </label>
      <label>
        Inquiry type
        <select name="type">
          <option>Book order</option>
          <option>Accessories order</option>
          <option>Tuition class</option>
          <option>Advertising</option>
          <option>Seminar</option>
          <option>Other inquiry</option>
        </select>
      </label>
      <label>
        Your message
        <textarea name="message" rows={5} required maxLength={2000} />
      </label>
      <button type="submit" className="button primary">
        Prepare WhatsApp message
      </button>
      {prepared && (
        <div className="prepared-message">
          <p role="status">
            Your message is ready to review. Nothing has been sent.
          </p>
          <WhatsAppButton message={prepared}>
            Review and open WhatsApp
          </WhatsAppButton>
        </div>
      )}
    </form>
  );
}
