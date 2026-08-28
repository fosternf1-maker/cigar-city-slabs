import { ExternalLink } from "lucide-react";
import { getTracker } from "@/lib/tracker";

export default async function LiveCarousel() {
  const result = await getTracker();
  if (result.status !== "ok" || result.cards.length === 0) {
    return null;
  }

  return (
    <section className="mb-16 w-full">
      <div className="mb-6">
        <p className="label-90s mb-2">On the table</p>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Live listings
        </h2>
        <p className="mt-2 max-w-xl text-sm text-zinc-500 sm:text-base">
          Rows from the shop tracker that are live with a real eBay item URL.
          Tap a card to open that listing.
        </p>
      </div>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory sm:mx-0 sm:px-0">
        {result.cards.map((card) => (
          <a
            key={card.id}
            href={card.ebayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover neon-border group relative w-56 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--card-bg)]"
          >
            <div className="relative aspect-[3/4] bg-gradient-to-br from-[#0d1520] via-[#0c1018] to-[#0a0c12]">
              {card.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.photoUrl}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-contain p-3"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="px-3 text-center font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--neon-cyan)] neon-text">
                    {card.grade || "Live"}
                  </p>
                </div>
              )}
            </div>
            <div className="p-3.5">
              <p className="line-clamp-2 text-sm font-semibold leading-snug text-white transition group-hover:text-[var(--neon-cyan)]">
                {card.title}
              </p>
              {(card.set || card.year) && (
                <p className="mt-1 text-xs text-zinc-500">
                  {[card.set, card.year].filter(Boolean).join(" · ")}
                </p>
              )}
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[var(--neon-cyan)]">
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
