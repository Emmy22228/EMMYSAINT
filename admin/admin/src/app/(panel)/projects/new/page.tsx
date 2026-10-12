import { saveProject } from "@/app/actions";
import ProjectForm from "@/components/ProjectForm";

export const dynamic = "force-dynamic";

export default function NewProjectPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl font-bold">New project</h1>
      <ProjectForm action={saveProject} error={searchParams.error} />
    </div>
  );
}
