import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteProject, saveProject } from "@/app/actions";
import ProjectForm from "@/components/ProjectForm";
import ConfirmDeleteForm from "@/components/ConfirmDeleteForm";
import { projectImageUrl, type DbProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("projects").select("*").eq("id", params.id).maybeSingle();
  if (!data) notFound();

  const project = data as DbProject;

  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-display text-3xl font-bold">Edit project</h1>
      <ProjectForm
        action={saveProject}
        project={project}
        imageUrl={projectImageUrl(project.cover_image_path)}
        error={searchParams.error}
      />

      <section className="border-t border-line pt-8 max-w-3xl">
        <h2 className="font-display text-lg font-semibold text-red-300">Delete project</h2>
        <p className="text-sm text-muted mt-1">Permanently removes this project from the portfolio.</p>
        <div className="mt-4">
          <ConfirmDeleteForm action={deleteProject} id={project.id}>
            <button type="submit" className="rounded-lg border border-red-500/50 text-red-300 px-4 py-2 text-sm hover:bg-red-500/10">
              Delete project
            </button>
          </ConfirmDeleteForm>
        </div>
      </section>
    </div>
  );
}
