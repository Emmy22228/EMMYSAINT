import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { setProjectVisibility } from "@/app/actions";
import type { DbProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { saved?: string; deleted?: string };
}) {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  const projects = (data ?? []) as DbProject[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold">Projects</h1>
        <Link href="/projects/new" className="rounded-lg bg-accent text-bg font-semibold px-4 py-2 text-sm">
          New project
        </Link>
      </div>

      {searchParams.saved && <p role="status" className="text-sm text-accent">Project saved.</p>}
      {searchParams.deleted && <p role="status" className="text-sm text-muted">Project deleted.</p>}

      {projects.length === 0 ? (
        <p className="text-muted">No projects yet. Create your first one.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Visibility</th>
                <th className="px-4 py-3 font-medium"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-line">
                  <td className="px-4 py-3">{project.title}</td>
                  <td className="px-4 py-3 text-muted">{project.status.replace("_", " ")}</td>
                  <td className="px-4 py-3 text-muted">{project.visibility}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3 justify-end">
                      <Link href={`/projects/${project.id}`} className="text-accent hover:underline">Edit</Link>
                      <form action={setProjectVisibility}>
                        <input type="hidden" name="id" value={project.id} />
                        <input type="hidden" name="next" value={project.visibility === "published" ? "draft" : "published"} />
                        <button type="submit" className="text-muted hover:text-white">
                          {project.visibility === "published" ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
