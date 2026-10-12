import { createClient } from "@supabase/supabase-js";

// Anonymous client for public reads. Row-level security limits it to published content.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    { auth: { persistSession: false } },
  );
}
