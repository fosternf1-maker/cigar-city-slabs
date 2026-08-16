import { Mail, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Cigar City Slabs — buy, sell, trade, or just say hey.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-[var(--neon-cyan)]">
        Contact
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Let’s talk cards
      </h1>
      <p className="mt-3 text-zinc-400">
        Buying, selling, trading, or just curious — drop a line. We actually
        read these.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex items-start gap-4 rounded-xl border border-white/5 bg-[#12121a] p-5 transition hover:border-[var(--neon-cyan)]/30"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--neon-cyan)]/10">
            <Mail className="h-5 w-5 text-[var(--neon-cyan)]" />
          </div>
          <div>
            <p className="font-semibold text-white">Email</p>
            <p className="mt-1 text-sm text-zinc-400">{siteConfig.email}</p>
          </div>
        </a>

        <a
          href={siteConfig.x}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 rounded-xl border border-white/5 bg-[#12121a] p-5 transition hover:border-white/20"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
            <span className="text-sm font-bold text-white">𝕏</span>
          </div>
          <div>
            <p className="font-semibold text-white">X / Twitter</p>
            <p className="mt-1 text-sm text-zinc-400">@CigarCitySlabs</p>
          </div>
        </a>
      </div>

      <div className="mt-8 rounded-xl border border-white/5 bg-[#12121a] p-6">
        <p className="text-sm font-semibold text-white">Prefer to shop?</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={siteConfig.ebay}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--neon-cyan)]/10 px-4 py-2 text-sm font-medium text-[var(--neon-cyan)]"
          >
            eBay Store
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={siteConfig.whatnot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--neon-magenta)]/10 px-4 py-2 text-sm font-medium text-[var(--neon-magenta)]"
          >
            Whatnot
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
