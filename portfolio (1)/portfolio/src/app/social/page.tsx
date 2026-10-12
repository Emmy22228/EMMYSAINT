import type { Metadata } from "next";
import { socialAccounts } from "@/data/content";

export const metadata: Metadata = {
  title: "Social Media",
  description: "Social media accounts I manage.",
};

export default function SocialPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold">Social Media</h1>
      <p className="mt-3 text-muted max-w-2xl">
        I manage social media accounts, creating and scheduling content for them.
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {socialAccounts.map((account) => (
          <li key={account.name} className="rounded-xl border border-line bg-surface p-6">
            <p className="text-xs uppercase tracking-wide text-accent">{account.platform}</p>
            <h2 className="font-display text-xl font-semibold mt-2">{account.name}</h2>
            <p className="mt-2 text-sm text-muted">{account.note}</p>
            {account.url ? (
              <a
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-accent hover:underline"
              >
                Visit channel
              </a>
            ) : (
              <p className="mt-4 text-xs text-muted">Link coming soon</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
