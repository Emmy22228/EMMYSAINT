import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";

// Checks that a user is logged in AND listed in admin_users. Redirects otherwise.
export async function requireAdmin() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    await supabase.auth.signOut();
    redirect("/login?error=not-authorized");
  }

  return { supabase, user };
}
