import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  const [total, published, drafts, inDevelopment] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("visibility", "published"),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("visibility", "draft"),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "in_development"),
  ]);

  const stats = [
    { label: "Total projects", value: total.count ?? 0 },
    { label: "Published", value: published.count ?? 0 },
    { label: "Drafts", value: drafts.count ?? 0 },
    { label: "In development", value: inDevelopment.count ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/projects/new" className="rounded-lg bg-accent text-bg font-semibold px-4 py-2">New project</Link>
          <Link href="/projects" className="rounded-lg border border-line px-4 py-2">Manage projects</Link>
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label} className="rounded-xl border border-line bg-surface p-5">
            <p className="text-3xl font-display font-bold">{stat.value}</p>
            <p className="text-sm text-muted mt-1">{stat.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
