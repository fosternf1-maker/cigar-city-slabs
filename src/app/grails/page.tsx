import { ExternalLink, Sparkles } from "lucide-react";
import { cards, isLiveEbayItem, siteConfig } from "@/lib/data";
import CardGrid from "@/components/CardGrid";

export const metadata = {
  title: "Grails",
  description:
    "Higher-end cards from Cigar City Slabs. Live grails list on eBay — this isn’t a fake catalog.",
};

export default function GrailsPage() {
  const liveGrails = cards.filter(
    (c) => c.category === "grails" && isLiveEbayItem(c.ebayUrl),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[var(--neon-magenta)]" />
        <p className="label-90s !text-[var(--neon-magenta)]">Higher End</p>
      </div>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Grails
      </h1>
      <p className="mt-4 max-w-xl text-zinc-400">
        The desk for cards that make you pause. When we&apos;ve got heat, it
        goes up on eBay — we don&apos;t park dummy prices on this page.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={siteConfig.ebay}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm"
        >
          Hunt grails on eBay
          <ExternalLink className="h-4 w-4" />
        </a>
        <a
          href={`mailto:${siteConfig.email}?subject=Grail hunt`}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
        >
          Looking for something specific?
        </a>
      </div>

      {liveGrails.length > 0 ? (
        <div className="mt-16">
          <CardGrid
            items={liveGrails}
            title="Live grails"
            subtitle="Each tile is a real eBay item, not a sample."
            relaxed
          />
        </div>
      ) : (
        <div className="mt-16 overflow-hidden rounded-2xl border border-[var(--neon-magenta)]/25 bg-[var(--card-bg)] p-8 sm:p-12 neon-border-magenta">
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
            No live grail listings wired here yet
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400">
            This route is real so “View all grails” isn&apos;t a dead button.
            The buy path is still the eBay store until we plug in actual item
            URLs.
          </p>
        </div>
      )}
    </div>
  );
}
