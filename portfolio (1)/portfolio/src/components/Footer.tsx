import Link from "next/link";
import { profile, socialAccounts } from "@/data/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-4 md:flex-row md:justify-between text-sm text-muted">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-4">
          <li>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </li>
          {socialAccounts
            .filter((account) => account.url)
            .map((account) => (
              <li key={account.name}>
                <a href={account.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {account.platform}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </footer>
  );
}
