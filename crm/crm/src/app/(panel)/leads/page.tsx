import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LEAD_STATUSES, statusLabel } from "@/lib/constants";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  source: string;
  follow_up_on: string | null;
  created_at: string;
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { status?: string; deleted?: string };
}) {
  const supabase = createSupabaseServerClient();
  const filter = LEAD_STATUSES.some((s) => s.value === searchParams.status) ? searchParams.status : undefined;

  const base = supabase
    .from("leads")
    .select("id, name, email, subject, status, source, follow_up_on, created_at")
    .order("created_at", { ascending: false });
  const { data } = filter ? await base.eq("status", filter) : await base;
  const leads = (data ?? []) as Lead[];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-3xl font-bold">Leads</h1>

      <nav aria-label="Filter by status" className="flex flex-wrap gap-2 text-sm">
        <Link
          href="/leads"
          className={`rounded-full border px-3 py-1 ${!filter ? "border-accent text-accent" : "border-line text-muted"}`}
        >
          All
        </Link>
        {LEAD_STATUSES.map((s) => (
          <Link
            key={s.value}
            href={`/leads?status=${s.value}`}
            className={`rounded-full border px-3 py-1 ${filter === s.value ? "border-accent text-accent" : "border-line text-muted"}`}
          >
            {s.label}
          </Link>
        ))}
      </nav>

      {searchParams.deleted && <p role="status" className="text-sm text-muted">Lead deleted.</p>}

      {leads.length === 0 ? (
        <p className="text-muted">No leads here yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Follow-up</th>
                <th className="px-4 py-3 font-medium">Received</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-line hover:bg-surface">
                  <td className="px-4 py-3">
                    <Link href={`/leads/${lead.id}`} className="text-accent hover:underline">{lead.name}</Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{lead.subject}</td>
                  <td className="px-4 py-3">{statusLabel(lead.status)}</td>
                  <td className="px-4 py-3 text-muted">{lead.follow_up_on ?? "-"}</td>
                  <td className="px-4 py-3 text-muted">{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
