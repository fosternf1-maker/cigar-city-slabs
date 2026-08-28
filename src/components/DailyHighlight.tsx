import { ExternalLink, Sparkles } from "lucide-react";
import { siteConfig, siteHandles } from "@/lib/data";
import { getDailyHighlight } from "@/lib/ebay";

function formatPrice(price: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    return `$${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}

function Fallback({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--card-bg)] p-8 sm:p-10 neon-border-magenta">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[var(--neon-magenta)]" />
        <p className="label-90s !text-[var(--neon-magenta)]">Today&apos;s highlight</p>
      </div>
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {headline}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
        {body}
      </p>
      <a
        href={siteConfig.ebay}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-8 inline-flex items-center gap-2 px-5 py-3 text-sm"
      >
        Open @{siteHandles.ebay} on eBay
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

export default async function DailyHighlight() {
  const result = await getDailyHighlight();

  if (result.status === "empty") {
    return (
      <Fallback
        headline="No live listings to highlight"
        body="The eBay store has nothing we can show as today's highest listing. When something is up, it will appear here — until then, the store itself is the source of truth."
      />
    );
  }

  if (result.status === "unavailable") {
    return (
      <Fallback
        headline="Couldn't load the eBay feed"
        body="We didn't invent a card, price, or item while the live inventory feed was unreachable. Shop the eBay store for what's actually listed."
      />
    );
  }

  const { listing } = result;

  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--card-bg)] neon-border-magenta">
      <div className="grid md:grid-cols-[minmax(0,280px)_1fr]">
        <div className="relative aspect-[3/4] bg-gradient-to-br from-[#1a1218] via-[#141018] to-[#0e0c12] md:aspect-auto md:min-h-[320px]">
          {listing.imageUrl ? (
            // eBay CDN URLs are listing photos, not something we host.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="absolute inset-0 h-full w-full object-contain p-4"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                No listing photo
              </p>
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full border border-[var(--neon-magenta)]/30 bg-[var(--neon-magenta)]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--neon-magenta)]">
            Today
          </span>
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--neon-magenta)]" />
            <p className="label-90s !text-[var(--neon-magenta)]">
              Today&apos;s highlight
            </p>
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {listing.title}
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Highest current listing on @{siteHandles.ebay} · refreshed daily from
            live eBay inventory
          </p>
          <p className="mt-6 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--neon-magenta)] neon-text-magenta">
            {formatPrice(listing.price, listing.currency)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={listing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              View this listing on eBay
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.ebay}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
            >
              Full store
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
