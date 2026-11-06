"use client";
import { useState } from "react";

export function ContactForm() {
  const [prepared, setPrepared] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  return (
    <form
      className="contact-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        data.set("subject", `Website inquiry: ${data.get("type")}`);
        data.set("from_name", "Sandalu Isiwara Website");
        data.set("replyto", String(data.get("email") || data.get("phone")));

        setPrepared("");
        setStatus("sending");

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: data,
          });
          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(result.message || "Submission failed.");
          }

          form.reset();
          setStatus("success");
          setPrepared("Your message has been sent successfully.");
        } catch {
          setStatus("error");
          setPrepared("Sorry, your message could not be sent. Please try again.");
        }
      }}
      onChange={() => {
        if (status !== "idle") setStatus("idle");
        if (prepared) setPrepared("");
      }}
    >
      <input type="hidden" name="access_key" value="c1ece75d-1795-40d7-a541-97b3cc2a3318" />
      <input type="hidden" name="redirect" value="false" />
      <h2>Send an inquiry</h2>
      <p className="muted">
        Send your inquiry by email.
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
          <option>Class inquiry</option>
          <option>Book order</option>
          <option>Accessory inquiry</option>
          <option>Seminar inquiry</option>
          <option>General inquiry</option>
        </select>
      </label>
      <label>
        Your message
        <textarea name="message" rows={5} required maxLength={2000} />
      </label>
      <button type="submit" className="button primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {prepared && (
        <div className="prepared-message">
          <p role="status">
            {prepared}
          </p>
        </div>
      )}
    </form>
  );
}
