import type { Metadata } from "next";
import { profile } from "@/data/content";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Akomolafe Emmanuel (Emmy Saint).",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold">Contact</h1>
      <p className="mt-3 text-muted">The fastest way to reach me is WhatsApp.</p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <WhatsAppButton />
        {profile.linkedinUrl ? (
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-line px-5 py-3 hover:border-accent"
          >
            LinkedIn
          </a>
        ) : (
          <p className="text-sm text-muted">LinkedIn: {profile.linkedinName}</p>
        )}
      </div>

      <h2 className="font-display text-2xl font-semibold mt-16 mb-6">Send a message</h2>
      <ContactForm />
    </section>
  );
}
