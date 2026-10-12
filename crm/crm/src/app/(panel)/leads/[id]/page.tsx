import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { addNote, deleteLead, updateLead } from "@/app/actions";
import { LEAD_STATUSES } from "@/lib/constants";
import ConfirmDeleteForm from "@/components/ConfirmDeleteForm";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  source: string;
  status: string;
  follow_up_on: string | null;
  created_at: string;
};

type Note = { id: string; body: string; created_at: string };

const fieldClass = "w-full rounded-md bg-surface border border-line px-3 py-2 focus:border-accent outline-none";

export default async function LeadPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string; noted?: string; error?: string };
}) {
  const supabase = createSupabaseServerClient();

  const { data: leadData } = await supabase.from("leads").select("*").eq("id", params.id).maybeSingle();
  if (!leadData) notFound();
  const lead = leadData as Lead;

  const { data: noteData } = await supabase
    .from("lead_notes")
    .select("id, body, created_at")
    .eq("lead_id", lead.id)
    .order("created_at", { ascending: false });
  const notes = (noteData ?? []) as Note[];

  const whatsappDigits = lead.phone ? lead.phone.replace(/\D/g, "") : "";

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link href="/leads" className="text-sm text-muted hover:text-white">← Back to leads</Link>
        <h1 className="font-display text-3xl font-bold mt-4">{lead.name}</h1>
        <p className="text-muted mt-1">{lead.subject}</p>
      </div>

      {searchParams.saved && <p role="status" className="text-sm text-accent">Lead updated.</p>}
      {searchParams.noted && <p role="status" className="text-sm text-accent">Note added.</p>}
      {searchParams.error && (
        <p role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
          {searchParams.error}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-xs text-muted">Message received {new Date(lead.created_at).toLocaleString()} from {lead.source}</p>
            <p className="mt-3 whitespace-pre-wrap text-sm">{lead.message}</p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <a href={`mailto:${lead.email}?subject=${encodeURIComponent(`Re: ${lead.subject}`)}`} className="rounded-lg border border-line px-4 py-2 hover:border-accent">
              Reply by email
            </a>
            {whatsappDigits && (
              <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-line px-4 py-2 hover:border-accent">
                Message on WhatsApp
              </a>
            )}
          </div>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4">Notes</h2>
            <form action={addNote} className="flex flex-col gap-3">
              <input type="hidden" name="id" value={lead.id} />
              <label className="flex flex-col gap-1 text-sm">
                Add a note (private)
                <textarea name="body" rows={3} maxLength={2000} required className={fieldClass} />
              </label>
              <button type="submit" className="self-start rounded-lg border border-accent text-accent px-4 py-2 text-sm hover:bg-accent hover:text-bg">
                Add note
              </button>
            </form>

            {notes.length === 0 ? (
              <p className="text-muted text-sm mt-6">No notes yet.</p>
            ) : (
              <ul className="mt-6 flex flex-col gap-3">
                {notes.map((note) => (
                  <li key={note.id} className="rounded-lg border border-line bg-surface px-4 py-3 text-sm">
                    <p className="whitespace-pre-wrap">{note.body}</p>
                    <p className="text-xs text-muted mt-2">{new Date(note.created_at).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </section>

        <aside className="flex flex-col gap-8">
          <form action={updateLead} className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-lg font-semibold">Details</h2>
            <input type="hidden" name="id" value={lead.id} />

            <label className="flex flex-col gap-1 text-sm">
              Status
              <select name="status" defaultValue={lead.status} className={fieldClass}>
                {LEAD_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Follow-up date
              <input type="date" name="followUpOn" defaultValue={lead.follow_up_on ?? ""} className={fieldClass} />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Email
              <span className="text-muted">{lead.email}</span>
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Phone (optional)
              <input name="phone" defaultValue={lead.phone ?? ""} maxLength={30} className={fieldClass} />
            </label>

            <button type="submit" className="rounded-lg bg-accent text-bg font-semibold px-4 py-2 text-sm hover:opacity-90">
              Save details
            </button>
          </form>

          <section className="border-t border-line pt-6">
            <ConfirmDeleteForm action={deleteLead} id={lead.id} label="Delete this lead permanently? This cannot be undone.">
              <button type="submit" className="rounded-lg border border-red-500/50 text-red-300 px-4 py-2 text-sm hover:bg-red-500/10">
                Delete lead
              </button>
            </ConfirmDeleteForm>
          </section>
        </aside>
      </div>
    </div>
  );
}
