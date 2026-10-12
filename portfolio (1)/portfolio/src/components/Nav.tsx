import Link from "next/link";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/social", label: "Social" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="border-b border-line sticky top-0 z-40 bg-bg">
      <nav aria-label="Main" className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-lg tracking-tight">
          Emmy Saint
        </Link>

        <ul className="hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-muted hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu uses <details>, so it works without JavaScript */}
        <details className="md:hidden relative">
          <summary className="cursor-pointer list-none px-3 py-2 border border-line rounded-md text-sm">
            Menu
          </summary>
          <ul className="absolute right-0 mt-2 w-44 bg-surface border border-line rounded-md p-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block px-3 py-2 rounded hover:bg-line">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}
