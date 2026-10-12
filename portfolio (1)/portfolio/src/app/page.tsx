import Link from "next/link";
import { profile } from "@/data/content";
import { getPublishedProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export const revalidate = 60;

export default async function HomePage() {
  const projects = await getPublishedProjects();
  const featured = projects?.filter((project) => project.featured) ?? [];

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-16">
        <p className="text-accent text-sm font-medium tracking-wide uppercase">{profile.roles.join(" · ")}</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mt-4">{profile.name}</h1>
        <p className="mt-4 text-muted text-lg max-w-2xl">{profile.intro}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/projects" className="rounded-lg bg-accent text-bg font-semibold px-5 py-3 hover:opacity-90">
            View projects
          </Link>
          <Link href="/contact" className="rounded-lg border border-line px-5 py-3 hover:border-accent">
            Contact me
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="font-display text-2xl font-semibold mb-6">
          Featured work
        </h2>
        {projects === null ? (
          <p role="alert" className="text-muted">Projects are unavailable right now. Please try again shortly.</p>
        ) : featured.length === 0 ? (
          <p className="text-muted">Featured projects will appear here soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
