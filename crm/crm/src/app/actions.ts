"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LEAD_STATUSES } from "@/lib/constants";

function str(value: FormDataEntryValue | null, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

const PHONE_PATTERN = /^\+?[0-9 ()-]{6,30}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

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

export async function updateLead(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = str(formData.get("id"), 60);
  const status = str(formData.get("status"), 20);
  const phone = str(formData.get("phone"), 30);
  const followUpOn = str(formData.get("followUpOn"), 10);

  if (!id) redirect("/leads");
  if (!LEAD_STATUSES.some((s) => s.value === status)) {
    redirect(`/leads/${id}?error=${encodeURIComponent("Please choose a valid status.")}`);
  }
  if (phone && !PHONE_PATTERN.test(phone)) {
    redirect(`/leads/${id}?error=${encodeURIComponent("Please enter a valid phone number or leave it empty.")}`);
  }
  if (followUpOn && !DATE_PATTERN.test(followUpOn)) {
    redirect(`/leads/${id}?error=${encodeURIComponent("Please enter a valid follow-up date.")}`);
  }

  const { error } = await supabase
    .from("leads")
    .update({
      status,
      phone: phone || null,
      follow_up_on: followUpOn || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(`/leads/${id}?error=${encodeURIComponent(error.message)}`);
  }
  redirect(`/leads/${id}?saved=1`);
}

export async function addNote(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = str(formData.get("id"), 60);
  const body = str(formData.get("body"), 2000);
  if (!id) redirect("/leads");
  if (!body) redirect(`/leads/${id}?error=${encodeURIComponent("Note cannot be empty.")}`);

  const { error } = await supabase.from("lead_notes").insert({ lead_id: id, body });
  if (error) {
    redirect(`/leads/${id}?error=${encodeURIComponent(error.message)}`);
  }
  redirect(`/leads/${id}?noted=1`);
}

export async function deleteLead(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData.get("id"), 60);
  if (id) {
    await supabase.from("leads").delete().eq("id", id);
  }
  redirect("/leads?deleted=1");
}
