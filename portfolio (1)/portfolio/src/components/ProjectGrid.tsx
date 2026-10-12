"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/content";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [projects]);
  const [active, setActive] = useState<string>("All");

  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);
  const options = ["All", ...categories];

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={active === option}
            onClick={() => setActive(option)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active === option
                ? "border-accent bg-accent text-bg"
                : "border-line text-muted hover:text-white hover:border-muted"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-muted">No projects in this category yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
