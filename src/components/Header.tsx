"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shows", label: "Shows" },
  { href: "/live", label: "Live" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07070c]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white sm:text-xl">
            Cigar City{" "}
            <span className="text-[var(--neon-cyan)] neon-text">Slabs</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-[var(--neon-cyan)]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={siteConfig.ebay}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-[var(--neon-cyan)]/25 bg-[var(--neon-cyan)]/10 px-3 py-2 text-sm font-semibold text-[var(--neon-cyan)] transition hover:bg-[var(--neon-cyan)]/20"
          >
            eBay
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/[0.06] bg-[#07070c] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active
                      ? "bg-white/10 text-[var(--neon-cyan)]"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={siteConfig.ebay}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-[var(--neon-cyan)]/25 bg-[var(--neon-cyan)]/10 px-3 py-2.5 text-sm font-semibold text-[var(--neon-cyan)]"
            >
              Shop on eBay
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
