import type { Metadata } from "next";
import { getPublishedProjects } from "@/lib/projects";
import ProjectGrid from "@/components/ProjectGrid";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: "Web applications, client work and community projects by Akomolafe Emmanuel (Emmy Saint).",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold">Projects</h1>
      <p className="mt-3 text-muted max-w-2xl">
        A selection of live work, client projects, and projects still in development.
      </p>
      <div className="mt-10">
        {projects === null ? (
          <p role="alert" className="text-muted">Projects are unavailable right now. Please try again shortly.</p>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </section>
  );
}
