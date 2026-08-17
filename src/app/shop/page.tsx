import { ExternalLink } from "lucide-react";
import { cards, siteConfig } from "@/lib/data";
import CardGrid from "@/components/CardGrid";

export const metadata = {
  title: "Shop",
  description:
    "Browse trading cards, graded slabs, sealed product, and grails from Cigar City Slabs.",
};

export default function ShopPage() {
  const grails = cards.filter((c) => c.category === "grails");
  const slabs = cards.filter((c) => c.category === "slabs");
  const singles = cards.filter((c) => c.category === "singles");
  const sealed = cards.filter((c) => c.category === "sealed");

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-90s mb-2">Inventory</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Shop
          </h1>
          <p className="mt-3 max-w-lg text-zinc-400">
            Scroll the grid, tap a card for a closer look. All purchases currently
            go through our eBay store.
          </p>
        </div>
        <a
          href={siteConfig.ebay}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex shrink-0 items-center gap-2 px-5 py-3 text-sm"
        >
          Full inventory on eBay
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Filter chips – visual only for now */}
      <div className="mb-12 flex flex-wrap gap-2">
        {["All", "Grails", "Slabs", "Singles", "Sealed"].map((label) => (
          <span
            key={label}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              label === "All"
                ? "border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)]"
                : "border border-white/5 bg-white/[0.03] text-zinc-400"
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="space-y-20">
        {grails.length > 0 && (
          <CardGrid
            items={grails}
            title="Grails"
            subtitle="Higher-end cards. Calmer presentation, serious heat."
            relaxed
          />
        )}

        {slabs.length > 0 && (
          <CardGrid
            items={slabs}
            title="Graded Slabs"
            subtitle="PSA, BGS, and more — already protected and ready."
          />
        )}

        {singles.length > 0 && (
          <CardGrid
            items={singles}
            title="Singles"
            subtitle="Raw cards looking for a new home."
          />
        )}

        {sealed.length > 0 && (
          <CardGrid
            items={sealed}
            title="Sealed"
            subtitle="Factory sealed product."
          />
        )}
      </div>

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
