import { ExternalLink } from "lucide-react";
import { cards, siteConfig } from "@/lib/data";
import CardGrid from "@/components/CardGrid";

export const metadata = {
  title: "Shop",
  description: "Browse trading cards, graded slabs, sealed product, and grails from Cigar City Slabs.",
};

export default function ShopPage() {
  const grails = cards.filter((c) => c.category === "grails");
  const slabs = cards.filter((c) => c.category === "slabs");
  const singles = cards.filter((c) => c.category === "singles");
  const sealed = cards.filter((c) => c.category === "sealed");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Shop
          </h1>
          <p className="mt-2 max-w-lg text-zinc-400">
            Scroll the grid, tap a card for a closer look. All purchases currently
            go through our eBay store.
          </p>
        </div>
        <a
          href={siteConfig.ebay}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--neon-cyan)] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[var(--neon-cyan)]/90"
        >
          Full inventory on eBay
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {["All", "Grails", "Slabs", "Singles", "Sealed"].map((label) => (
          <span
            key={label}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              label === "All"
                ? "bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)]"
                : "bg-white/5 text-zinc-400"
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="space-y-16">
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

      <div className="mt-16 rounded-2xl border border-white/5 bg-[#12121a] p-6 text-center sm:p-8">
        <p className="text-zinc-300">
          Looking for something specific or want to sell / trade?
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-3 inline-block text-sm font-medium text-[var(--neon-cyan)] hover:underline"
        >
          {siteConfig.email}
        </a>
      </div>
    </div>
  );
}
