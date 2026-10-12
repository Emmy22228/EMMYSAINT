import type { Metadata } from "next";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products",
  description: "Products in development.",
};

export default async function ProductsPage() {
  const projects = await getPublishedProjects();
  const inDevelopment = projects?.filter((project) => project.status === "in_development") ?? [];

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold">Products</h1>
      <p className="mt-3 text-muted max-w-2xl">
        Products I am still building. None of these are publicly available yet.
      </p>

      {projects === null ? (
        <p role="alert" className="mt-10 text-muted">Products are unavailable right now. Please try again shortly.</p>
      ) : (
        <ul className="mt-10 flex flex-col gap-4">
          {inDevelopment.map((product) => (
            <li key={product.slug} className="rounded-xl border border-line bg-surface p-6">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-xl font-semibold">{product.title}</h2>
                <span className="rounded-full bg-accent2/15 text-accent2 px-2 py-1 text-xs">In development</span>
              </div>
              <p className="mt-2 text-sm text-muted">{product.description}</p>
              <p className="mt-3 text-xs text-muted">No download or store link available yet.</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
