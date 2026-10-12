"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CATEGORIES, IMAGE_TYPES, MAX_IMAGE_BYTES, STATUSES, VISIBILITIES } from "@/lib/constants";

function str(value: FormDataEntryValue | null, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function fail(id: string | null, message: string): never {
  const base = id ? `/projects/${id}` : "/projects/new";
  redirect(`${base}?error=${encodeURIComponent(message)}`);
}

// ---------- Auth ----------

export async function signIn(formData: FormData) {
  const email = str(formData.get("email"), 200);
  const password = typeof formData.get("password") === "string" ? (formData.get("password") as string) : "";

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=invalid");
  }
  redirect("/");
}

export async function signOut() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// ---------- Projects ----------

export async function saveProject(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = str(formData.get("id"), 60) || null;
  const title = str(formData.get("title"), 120);
  const slug = str(formData.get("slug"), 80).toLowerCase();
  const summary = str(formData.get("summary"), 200);
  const description = str(formData.get("description"), 5000);
  const category = str(formData.get("category"), 50);
  const status = str(formData.get("status"), 20);
  const visibility = str(formData.get("visibility"), 20);
  const liveUrl = str(formData.get("liveUrl"), 300);
  const technologies = str(formData.get("technologies"), 500)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 30);
  const featured = formData.get("featured") === "on";
  const clientWork = formData.get("clientWork") === "on";
  const existingImage = str(formData.get("existingImage"), 300) || null;
  const file = formData.get("image");

  if (!title) fail(id, "Title is required.");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    fail(id, "Slug must use lowercase letters, numbers and hyphens only (for example, resto-pos-pro).");
  }
  if (!summary) fail(id, "Short summary is required.");
  if (!CATEGORIES.includes(category)) fail(id, "Please choose a valid category.");
  if (!STATUSES.includes(status)) fail(id, "Please choose a valid status.");
  if (!VISIBILITIES.includes(visibility)) fail(id, "Please choose a valid visibility.");
  if (liveUrl && !/^https:\/\//.test(liveUrl)) fail(id, "Live URL must start with https://");

  let coverPath = existingImage;
  if (file instanceof File && file.size > 0) {
    const extension = IMAGE_TYPES[file.type];
    if (!extension) fail(id, "Image must be a JPG, PNG or WebP file.");
    if (file.size > MAX_IMAGE_BYTES) fail(id, "Image must be 5 MB or smaller.");

    const path = `${slug}-${Date.now()}.${extension}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(path, bytes, { contentType: file.type, upsert: false });
    if (uploadError) fail(id, `Image upload failed: ${uploadError.message}`);
    coverPath = path;
  }

  const row = {
    slug,
    title,
    summary,
    description,
    category,
    status,
    visibility,
    featured,
    client_work: clientWork,
    live_url: liveUrl || null,
    technologies,
    cover_image_path: coverPath,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("projects").update(row).eq("id", id);
    if (error) fail(id, error.message);
  } else {
    const { error } = await supabase.from("projects").insert(row);
    if (error) fail(null, error.message);
  }

  redirect("/projects?saved=1");
}

export async function setProjectVisibility(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData.get("id"), 60);
  const next = str(formData.get("next"), 20);
  if (!id || !VISIBILITIES.includes(next)) redirect("/projects");

  await supabase.from("projects").update({ visibility: next }).eq("id", id);
  redirect("/projects");
}

export async function deleteProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData.get("id"), 60);
  if (id) {
    await supabase.from("projects").delete().eq("id", id);
  }
  redirect("/projects?deleted=1");
}
