import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { signOut } from "@/app/actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div>
      <header className="border-b border-line">
        <nav aria-label="CRM" className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="font-display font-bold">CRM</Link>
            <Link href="/leads" className="text-muted hover:text-white">Leads</Link>
            <a href={process.env.NEXT_PUBLIC_ADMIN_URL ?? "#"} className="text-muted hover:text-white">Projects admin</a>
            <a href={process.env.NEXT_PUBLIC_SITE_URL ?? "/"} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white">
              View site
            </a>
          </div>
          <form action={signOut}>
            <button type="submit" className="text-sm text-muted hover:text-white">Log out</button>
          </form>
        </nav>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
    </div>
  );
}
