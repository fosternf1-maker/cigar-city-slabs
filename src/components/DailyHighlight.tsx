import { ExternalLink, Sparkles } from "lucide-react";
import { siteConfig, siteHandles } from "@/lib/data";
import { getTracker } from "@/lib/tracker";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
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
  const result = await getTracker();

  if (result.status === "empty") {
    return (
      <Fallback
        headline="No live listings to highlight"
        body="Nothing on the shop tracker is live with a real eBay item URL yet. When a listing is up, it shows here — until then the eBay store is the buy path. We don't invent cards or prices."
      />
    );
  }

  if (result.status === "unavailable") {
    return (
      <Fallback
        headline="Couldn't load the shop tracker"
        body="We didn't invent a card, price, or item while the tracker was unreachable. Shop the eBay store for what's actually listed."
      />
    );
  }

  const { highlight } = result;
  const meta = [highlight.set, highlight.year, highlight.grade]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--card-bg)] neon-border-magenta">
      <div className="grid md:grid-cols-[minmax(0,280px)_1fr]">
        <div className="relative aspect-[3/4] bg-gradient-to-br from-[#1a1218] via-[#141018] to-[#0e0c12] md:aspect-auto md:min-h-[320px]">
          {highlight.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={highlight.photoUrl}
              alt={highlight.title}
              className="absolute inset-0 h-full w-full object-contain p-4"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div>
                {highlight.grade ? (
                  <p className="font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--neon-magenta)] neon-text-magenta">
                    {highlight.grade}
                  </p>
                ) : (
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                    No listing photo
                  </p>
                )}
              </div>
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
            {highlight.title}
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            {meta ||
              `Live on @${siteHandles.ebay} · from the shop tracker`}
          </p>
          {typeof highlight.price === "number" && (
            <p className="mt-6 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--neon-magenta)] neon-text-magenta">
              {formatPrice(highlight.price)}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={highlight.ebayUrl}
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
