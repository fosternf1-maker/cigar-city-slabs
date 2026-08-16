import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#08080c]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-white">
              Cigar City{" "}
              <span className="text-[var(--neon-cyan)]">Slabs</span>
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              {siteConfig.tagline}
            </p>
            <p className="mt-1 text-sm text-zinc-600">{siteConfig.location}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-zinc-400 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/shows" className="text-zinc-400 hover:text-white">
                  Upcoming Shows
                </Link>
              </li>
              <li>
                <Link href="/live" className="text-zinc-400 hover:text-white">
                  Live Streams
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Shop & Stream
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={siteConfig.ebay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-400 hover:text-[var(--neon-cyan)]"
                >
                  eBay Store
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatnot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-400 hover:text-[var(--neon-magenta)]"
                >
                  Whatnot
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Connect
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={siteConfig.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  @{siteConfig.x.split("/").pop()}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-zinc-400 hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Cigar City Slabs · Tampa, FL · All rights
          reserved
        </div>
      </div>
    </footer>
  );
}
