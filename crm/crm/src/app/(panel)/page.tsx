import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CLOSED_STATUSES, statusLabel } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const today = new Date().toISOString().slice(0, 10);
  const openFilter = `(${CLOSED_STATUSES.join(",")})`;

  const [total, fresh, active, due, recent] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("leads").select("*", { count: "exact", head: true }).in("status", ["contacted", "in_progress"]),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .not("status", "in", openFilter)
      .lte("follow_up_on", today),
    supabase
      .from("leads")
      .select("id, name, subject, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "Total leads", value: total.count ?? 0 },
    { label: "New", value: fresh.count ?? 0 },
    { label: "Active", value: active.count ?? 0 },
    { label: "Follow-ups due", value: due.count ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <div className="mt-4">
          <Link href="/leads" className="rounded-lg bg-accent text-bg font-semibold px-4 py-2 text-sm">
            View all leads
          </Link>
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

      <section>
        <h2 className="font-display text-xl font-semibold mb-4">Recent leads</h2>
        {!recent.data || recent.data.length === 0 ? (
          <p className="text-muted text-sm">No leads yet. Messages from the portfolio contact form appear here.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {recent.data.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/leads/${lead.id}`}
                  className="rounded-lg border border-line bg-surface px-4 py-3 text-sm flex justify-between gap-4 hover:border-accent"
                >
                  <span>
                    {lead.name}: {lead.subject}
                  </span>
                  <span className="text-muted shrink-0">{statusLabel(lead.status)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
