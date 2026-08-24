import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="jersey-stripes" />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="display text-xl font-extrabold tracking-tight">
              Cigar City <span className="text-gold">Slabs</span>
            </p>
            <p className="mt-2 text-sm text-white/55">{siteConfig.tagline}</p>
            <p className="mt-1 text-sm text-white/40">{siteConfig.location}</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="text-white/65 transition hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/shows" className="text-white/65 transition hover:text-white">
                  Upcoming Shows
                </Link>
              </li>
              <li>
                <Link href="/live" className="text-white/65 transition hover:text-white">
                  Live Streams
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/65 transition hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
              Shop & Stream
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.ebay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/65 transition hover:text-teal-bright"
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
                  className="inline-flex items-center gap-1.5 text-white/65 transition hover:text-gold"
                >
                  Whatnot
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/65 transition hover:text-white"
                >
                  @{siteConfig.x.split("/").pop()}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white/65 transition hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/35">
          © {new Date().getFullYear()} Cigar City Slabs · Tampa, FL · All rights
          reserved
        </div>
      </div>
    </footer>
  );
}
