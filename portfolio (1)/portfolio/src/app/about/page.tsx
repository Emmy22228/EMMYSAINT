import type { Metadata } from "next";
import { profile } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold">About</h1>
      <p className="mt-6 text-lg text-muted leading-relaxed">{profile.about}</p>

      <h2 className="font-display text-2xl font-semibold mt-12">What I do</h2>
      <ul className="mt-4 flex flex-col gap-3 text-muted">
        <li>Build web applications, including a restaurant point-of-sale system and client online stores.</li>
        <li>Develop application ideas from planning through to a working product.</li>
        <li>Manage social media accounts, including creating and scheduling content.</li>
      </ul>
    </section>
  );
}
