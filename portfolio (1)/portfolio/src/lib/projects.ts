import { projects as staticProjects, type Project } from "@/data/content";
import { supabaseConfigured } from "./env";
import { createPublicClient } from "./supabase/public";

// Row shape from the Supabase "projects" table.
export type DbProject = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  status: "live" | "in_development" | "planned";
  visibility: "draft" | "published" | "archived";
  featured: boolean;
  client_work: boolean;
  live_url: string | null;
  cover_image_path: string | null;
  technologies: string[];
  created_at: string;
};

export function projectImageUrl(path: string | null): string | undefined {
  if (!path || !supabaseConfigured()) return undefined;
  const { data } = createPublicClient().storage.from("project-images").getPublicUrl(path);
  return data.publicUrl;
}

export function toProject(row: DbProject): Project {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category as Project["category"],
    status: row.status === "live" ? "live" : "in_development",
    summary: row.summary,
    description: row.description,
    technologies: row.technologies ?? [],
    clientWork: row.client_work,
    featured: row.featured,
    liveUrl: row.live_url ?? undefined,
    image: projectImageUrl(row.cover_image_path),
  };
}

// Returns published projects, or null if the database could not be read.
// If Supabase is not configured yet, falls back to the static list in src/data/content.ts.
export async function getPublishedProjects(): Promise<Project[] | null> {
  if (!supabaseConfigured()) return staticProjects;

  const { data, error } = await createPublicClient()
    .from("projects")
    .select("*")
    .eq("visibility", "published")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load projects:", error.message);
    return null;
  }
  return (data as DbProject[]).map(toProject);
}
