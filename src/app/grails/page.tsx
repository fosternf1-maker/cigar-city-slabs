import { ExternalLink, Sparkles } from "lucide-react";
import { cards, isLiveEbayItem, siteConfig } from "@/lib/data";
import CardGrid from "@/components/CardGrid";
import DailyHighlight from "@/components/DailyHighlight";

export const metadata = {
  title: "Grails",
  description:
    "Higher-end cards from Cigar City Slabs. Live grails list on eBay — this isn’t a fake catalog.",
};

export const revalidate = 86400;

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
        The desk for cards that make you pause. Today&apos;s highlight is the
        highest-priced listing currently on eBay — not a made-up grail card.
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

      <div className="mt-12">
        <DailyHighlight />
      </div>

      {liveGrails.length > 0 && (
        <div className="mt-16">
          <CardGrid
            items={liveGrails}
            title="Live grails"
            subtitle="Each tile is a real eBay item, not a sample."
            relaxed
          />
        </div>
      )}
    </div>
  );
}
