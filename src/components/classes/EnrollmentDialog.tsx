"use client";

import { useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { classes } from "@/data/classes";

type EnrollmentDialogProps = {
  initialClassId?: string;
  label?: string;
  className?: string;
  onOpen?: () => void;
};

export function EnrollmentDialog({
  initialClassId,
  label = "Enroll class",
  className = "reference-register",
  onOpen,
}: EnrollmentDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const formId = useId();
  const [selectedClassId, setSelectedClassId] = useState(initialClassId ?? "");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function openDialog() {
    setSelectedClassId(initialClassId ?? "");
    setStatus("idle");
    setMessage("");
    onOpen?.();
    dialog.current?.showModal();
  }

  async function submitEnrollment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const selectedClass = classes.find((item) => item.id === selectedClassId);
    data.set("class", selectedClass?.title ?? "");
    data.set("subject", `Class enrollment: ${selectedClass?.title ?? "Selected class"}`);
    data.set("from_name", "Sandalu Isiwara Website");
    data.set(
      "replyto",
      String(data.get("student_email") || data.get("student_contact")),
    );

    setStatus("sending");
    setMessage("");

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
      setSelectedClassId(initialClassId ?? "");
      setStatus("success");
      setMessage("Your enrollment request has been sent successfully.");
    } catch {
      setStatus("error");
      setMessage("Sorry, your request could not be sent. Please try again.");
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={openDialog}>
        {label}
      </button>
      <dialog
        ref={dialog}
        className="enrollment-dialog"
        aria-labelledby={`${formId}-title`}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="enrollment-dialog-top">
          <div>
            <h2 id={`${formId}-title`}>Enroll in a class</h2>
            <p>Send your details and we will get back to you.</p>
          </div>
          <button
            type="button"
            className="reference-icon-button"
            aria-label="Close enrollment form"
            onClick={() => dialog.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <form className="enrollment-form" onSubmit={submitEnrollment}>
          <input type="hidden" name="access_key" value="c1ece75d-1795-40d7-a541-97b3cc2a3318" />
          <input type="hidden" name="redirect" value="false" />
          <label htmlFor={`${formId}-name`}>
            Student name
            <input
              id={`${formId}-name`}
              name="student_name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label htmlFor={`${formId}-phone`}>
            Student contact number
            <input
              id={`${formId}-phone`}
              name="student_contact"
              type="tel"
              autoComplete="tel"
              required
              maxLength={25}
              pattern="[+0-9 ()-]{7,25}"
              title="Enter a phone number using digits, spaces, +, parentheses or hyphens."
            />
          </label>
          <label htmlFor={`${formId}-email`}>
            Student email
            <input
              id={`${formId}-email`}
              name="student_email"
              type="email"
              autoComplete="email"
              required
              maxLength={150}
            />
          </label>
          <label htmlFor={`${formId}-parent-name`}>
            Parent's name
            <input
              id={`${formId}-parent-name`}
              name="parent_name"
              autoComplete="section-parent name"
              required
              maxLength={100}
            />
          </label>
          <label htmlFor={`${formId}-parent-contact`}>
            Parent's contact number
            <input
              id={`${formId}-parent-contact`}
              name="parent_contact"
              type="tel"
              autoComplete="section-parent tel"
              required
              maxLength={25}
              pattern="[+0-9 ()-]{7,25}"
              title="Enter a phone number using digits, spaces, +, parentheses or hyphens."
            />
          </label>
          <label htmlFor={`${formId}-home-address`}>
            Home address
            <textarea
              id={`${formId}-home-address`}
              name="home_address"
              autoComplete="street-address"
              rows={3}
              required
              maxLength={500}
            />
          </label>
          <label htmlFor={`${formId}-class`}>
            Select a class
            <select
              id={`${formId}-class`}
              name="class"
              value={selectedClassId}
              onChange={(event) => setSelectedClassId(event.target.value)}
              required
            >
              <option value="" disabled>
                Choose a class
              </option>
              {classes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor={`${formId}-message`}>
            Message <span>(optional)</span>
            <textarea id={`${formId}-message`} name="message" rows={3} maxLength={1000} />
          </label>
          <button type="submit" className="button primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send enrollment request"}
          </button>
          {message && <p className="enrollment-status" role="status">{message}</p>}
        </form>
      </dialog>
    </>
  );
}