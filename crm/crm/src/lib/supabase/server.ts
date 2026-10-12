import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server client that reads the logged-in user's session from cookies.
export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Cookies cannot be set from some server contexts. The middleware refreshes them instead.
          }
        },
      },
    },
  );
}
