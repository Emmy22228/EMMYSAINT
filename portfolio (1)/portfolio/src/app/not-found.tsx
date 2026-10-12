import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-muted">The page you are looking for does not exist.</p>
      <Link href="/" className="inline-block mt-8 rounded-lg bg-accent text-bg font-semibold px-5 py-3">
        Back to home
      </Link>
    </section>
  );
}
