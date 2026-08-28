import { ExternalLink } from "lucide-react";
import { cards, isLiveEbayItem, siteConfig } from "@/lib/data";
import CardGrid from "@/components/CardGrid";
import LaneGrid from "@/components/LaneGrid";
import DailyHighlight from "@/components/DailyHighlight";

export const metadata = {
  title: "Shop",
  description:
    "Cigar City Slabs sells on eBay — graded slabs, raw singles, sealed wax, and grails from Tampa.",
};

export const revalidate = 86400;

export default function ShopPage() {
  const liveGrails = cards.filter(
    (c) => c.category === "grails" && isLiveEbayItem(c.ebayUrl),
  );
  const liveSlabs = cards.filter(
    (c) => c.category === "slabs" && isLiveEbayItem(c.ebayUrl),
  );
  const liveSingles = cards.filter(
    (c) => c.category === "singles" && isLiveEbayItem(c.ebayUrl),
  );
  const liveSealed = cards.filter(
    (c) => c.category === "sealed" && isLiveEbayItem(c.ebayUrl),
  );
  const hasLiveListings =
    liveGrails.length + liveSlabs.length + liveSingles.length + liveSealed.length >
    0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-90s mb-2">The case is on eBay</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Shop
          </h1>
          <p className="mt-3 max-w-lg text-zinc-400">
            All purchases currently go through our eBay store. This page is the
            shop desk — not a live catalog of tappable cards.
          </p>
        </div>
        <a
          href={siteConfig.ebay}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex shrink-0 items-center gap-2 px-5 py-3 text-sm"
        >
          Shop the eBay store
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mb-12">
        <DailyHighlight />
      </div>

      <div className="mb-16 rounded-2xl border border-[var(--neon-cyan)]/20 bg-[var(--neon-cyan)]/[0.06] p-5 text-sm text-zinc-300">
        Live inventory lives on eBay. Today&apos;s highlight is the highest-priced
        current listing from that store — we don&apos;t post sample SKUs or
        made-up prices here.
      </div>

      <LaneGrid />

      {hasLiveListings && (
        <div className="mt-20 space-y-20">
          <CardGrid
            items={liveGrails}
            title="Grails on eBay"
            subtitle="Live listings only — each card goes to its eBay item."
            relaxed
          />
          <CardGrid
            items={liveSlabs}
            title="Graded slabs on eBay"
            subtitle="PSA, BGS, and more — already protected."
          />
          <CardGrid
            items={liveSingles}
            title="Raw singles on eBay"
            subtitle="Ungraded cards. Graded slabs stay in the slab lane."
          />
          <CardGrid
            items={liveSealed}
            title="Sealed on eBay"
            subtitle="Factory sealed product."
          />
        </div>
      )}

      <div className="mt-20 rounded-2xl border border-white/[0.06] bg-[var(--card-bg)] p-8 text-center">
        <p className="text-zinc-300">
          Looking for something specific or want to sell / trade?
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-3 inline-block text-sm font-medium text-[var(--neon-cyan)] transition hover:underline"
        >
          {siteConfig.email}
        </a>
      </div>
    </div>
  );
}
