import Link from "next/link";
import type { Project } from "@/data/content";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  in_development: "In development",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-xl border border-line bg-surface overflow-hidden hover:border-accent focus-within:border-accent transition-colors">
      <Link href={`/projects/${project.slug}`} className="flex flex-col h-full">
        <div className="aspect-video bg-line flex items-center justify-center">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={`${project.title} screenshot`} className="w-full h-full object-cover" />
          ) : (
            <span className="font-display text-2xl text-muted px-4 text-center">{project.title}</span>
          )}
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-line px-2 py-1 text-muted">{project.category}</span>
            <span
              className={`rounded-full px-2 py-1 ${
                project.status === "live" ? "bg-accent/15 text-accent" : "bg-accent2/15 text-accent2"
              }`}
            >
              {statusLabel[project.status]}
            </span>
            {project.clientWork && (
              <span className="rounded-full border border-line px-2 py-1 text-muted">Client work</span>
            )}
          </div>
          <h3 className="font-display text-xl font-semibold">{project.title}</h3>
          <p className="text-sm text-muted">{project.summary}</p>
        </div>
      </Link>
    </article>
  );
}
