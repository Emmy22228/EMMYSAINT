import { createPublicClient } from "./supabase/public";

// Row shape from the shared "projects" table.
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
  if (!path) return undefined;
  const { data } = createPublicClient().storage.from("project-images").getPublicUrl(path);
  return data.publicUrl;
}
