import { ExternalLink } from "lucide-react";
import { CardItem, isLiveEbayItem } from "@/lib/data";

type Props = {
  items: CardItem[];
  title?: string;
  subtitle?: string;
  relaxed?: boolean;
};

/**
 * Product grid for *live* listings only.
 * A card must have its own eBay item URL — store homepages don't count.
 */
export default function CardGrid({
  items,
  title,
  subtitle,
  relaxed = false,
}: Props) {
  const listings = items.filter((card) => isLiveEbayItem(card.ebayUrl));

  if (listings.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      {(title || subtitle) && (
        <div className="mb-9">
          {title && (
            <h2
              className={`font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl ${
                relaxed ? "text-zinc-100" : "text-white"
              }`}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 max-w-xl text-sm text-zinc-500 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {listings.map((card) => (
          <a
            key={card.id}
            href={card.ebayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--card-bg)] text-left ${
              relaxed
                ? "card-hover-grail neon-border-magenta"
                : "card-hover neon-border"
            }`}
          >
            <div
              className={`relative aspect-[3/4] w-full overflow-hidden ${
                relaxed
                  ? "bg-gradient-to-br from-[#1a1218] via-[#141018] to-[#0e0c12]"
                  : "bg-gradient-to-br from-[#0d1520] via-[#0c1018] to-[#0a0c12]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/[0.03]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                    {card.grader || "Card"}
                  </p>
                  {card.grade && (
                    <p
                      className={`mt-1.5 font-[family-name:var(--font-display)] text-3xl font-bold ${
                        relaxed
                          ? "text-[var(--neon-magenta)] neon-text-magenta"
                          : "text-[var(--neon-cyan)] neon-text"
                      }`}
                    >
                      {card.grade}
                    </p>
                  )}
                </div>
              </div>
              {card.category === "grails" && (
                <span className="absolute left-2.5 top-2.5 rounded-full border border-[var(--neon-magenta)]/30 bg-[var(--neon-magenta)]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--neon-magenta)]">
                  Grail
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-3.5">
              <p className="line-clamp-2 text-sm font-semibold leading-snug text-white transition group-hover:text-[var(--neon-cyan)]">
                {card.title}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {card.set} · {card.year}
              </p>
              <p
                className={`mt-auto inline-flex items-center gap-1 pt-3 text-sm font-bold ${
                  relaxed
                    ? "text-[var(--neon-magenta)]"
                    : "text-[var(--neon-cyan)]"
                }`}
              >
                View on eBay
                <ExternalLink className="h-3.5 w-3.5" />
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
