import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const projects = await getPublishedProjects();
  const project = projects?.find((p) => p.slug === params.slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const projects = await getPublishedProjects();
  if (projects === null) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p role="alert" className="text-muted">This project is unavailable right now. Please try again shortly.</p>
      </section>
    );
  }

  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const statusText = project.status === "live" ? "Live" : "In development";

  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <Link href="/projects" className="text-sm text-muted hover:text-white">
        ← Back to projects
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-line px-2 py-1 text-muted">{project.category}</span>
          <span className="rounded-full bg-accent/15 text-accent px-2 py-1">{statusText}</span>
          {project.clientWork && (
            <span className="rounded-full border border-line px-2 py-1 text-muted">Client work</span>
          )}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-4">{project.title}</h1>
        <p className="mt-4 text-lg text-muted">{project.summary}</p>
      </header>

      <div className="mt-10 aspect-video rounded-xl border border-line bg-surface flex items-center justify-center overflow-hidden">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={`${project.title} screenshot`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-muted">Screenshot coming soon</span>
        )}
      </div>

      {project.description && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">About this project</h2>
          <p className="mt-3 text-muted leading-relaxed whitespace-pre-line">{project.description}</p>
        </section>
      )}

      {project.technologies.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Technologies</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="rounded-full border border-line px-3 py-1 text-sm">
                {tech}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.liveUrl && (
        <div className="mt-10">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-accent text-bg font-semibold px-5 py-3 hover:opacity-90"
          >
            Visit live site
          </a>
        </div>
      )}
    </article>
  );
}
