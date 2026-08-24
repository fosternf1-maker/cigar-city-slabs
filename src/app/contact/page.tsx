import { Mail, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Cigar City Slabs — buy, sell, trade, or just say hey.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="label-90s">Contact</p>
      <h1 className="display mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        Let’s talk cards
      </h1>
      <p className="mt-4 text-ink-soft">
        Buying, selling, trading, or just curious — drop a line. We actually read these.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-slab p-6 shadow-[0_8px_24px_rgba(20,33,61,0.06)] transition hover:border-teal/40"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10">
            <Mail className="h-5 w-5 text-teal" />
          </div>
          <div>
            <p className="font-semibold text-ink">Email</p>
            <p className="mt-1 text-sm text-muted">{siteConfig.email}</p>
          </div>
        </a>

        <a
          href={siteConfig.x}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-slab p-6 shadow-[0_8px_24px_rgba(20,33,61,0.06)] transition hover:border-navy/20"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/5">
            <span className="text-sm font-bold text-ink">𝕏</span>
          </div>
          <div>
            <p className="font-semibold text-ink">X / Twitter</p>
            <p className="mt-1 text-sm text-muted">@CigarCitySlabs</p>
          </div>
        </a>
      </div>

      <div className="surface mt-8 p-6">
        <p className="text-sm font-semibold text-ink">Prefer to shop?</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={siteConfig.ebay}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-teal/10 px-4 py-2.5 text-sm font-semibold text-teal transition hover:bg-teal/15"
          >
            eBay Store
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={siteConfig.whatnot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-purple/10 px-4 py-2.5 text-sm font-semibold text-purple transition hover:bg-purple/15"
          >
            Whatnot
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
