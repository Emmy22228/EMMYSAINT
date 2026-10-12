"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        setStatus("success");
        setMessage("Thanks. Your message has been sent.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(result.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  const fieldClass = "w-full rounded-md bg-surface border border-line px-3 py-2 focus:border-accent outline-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot: hidden from people, often filled in by spam bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        Name
        <input name="name" required maxLength={100} className={fieldClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input name="email" type="email" required maxLength={200} className={fieldClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Phone (optional, so I can reply on WhatsApp)
        <input name="phone" type="tel" maxLength={30} className={fieldClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Subject
        <input name="subject" required maxLength={150} className={fieldClass} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Message
        <textarea name="message" required rows={5} maxLength={2000} className={fieldClass} />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg border border-accent text-accent font-semibold px-5 py-3 hover:bg-accent hover:text-bg disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      <p role="status" aria-live="polite" className={status === "error" ? "text-red-400 text-sm" : "text-sm text-muted"}>
        {message}
      </p>

      <p className="text-xs text-muted">Your message is used only to reply to you. It is not shared publicly.</p>
    </form>
  );
}
