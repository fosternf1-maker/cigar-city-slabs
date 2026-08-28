import Link from "next/link";
import { ExternalLink, Radio, MapPin, ShoppingBag, Sparkles } from "lucide-react";
import { siteConfig, siteHandles } from "@/lib/data";
import LaneGrid from "@/components/LaneGrid";
import DailyHighlight from "@/components/DailyHighlight";

export const revalidate = 86400;

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-20 h-[420px] w-[420px] rounded-full bg-[var(--neon-cyan)]/[0.09] blur-[120px]" />
          <div className="absolute -right-32 top-1/3 h-[360px] w-[360px] rounded-full bg-[var(--neon-magenta)]/[0.07] blur-[110px]" />
          <div className="absolute bottom-0 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-[var(--neon-cyan)]/[0.04] blur-[80px]" />
          <div className="absolute right-8 top-16 hidden h-32 w-32 rotate-12 rounded-2xl border border-[var(--neon-cyan)]/10 sm:block" />
          <div className="absolute right-20 top-28 hidden h-20 w-20 -rotate-6 rounded-xl border border-[var(--neon-magenta)]/15 sm:block" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_8px_var(--neon-cyan)]" />
            Tampa, FL · Est. Cigar City
          </div>

          <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Cigar City{" "}
            <span className="text-[var(--neon-cyan)] neon-text">Slabs</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Buy. Trade. Resell.{" "}
            <span className="text-zinc-200">
              Trading cards in a fun environment — anchored in Tampa.
            </span>
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={siteConfig.ebay}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop on eBay
              <ExternalLink className="h-4 w-4 opacity-80" />
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.07]"
            >
              What we deal in
            </Link>
            <Link
              href="/live"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--neon-magenta)]/25 bg-[var(--neon-magenta)]/10 px-6 py-3.5 text-sm font-semibold text-[var(--neon-magenta)] transition hover:bg-[var(--neon-magenta)]/20"
            >
              <Radio className="h-4 w-4" />
              Watch Live
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 py-5 text-sm sm:justify-between sm:px-6">
          <a
            href={siteConfig.ebay}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 transition hover:text-[var(--neon-cyan)]"
          >
            <ExternalLink className="h-4 w-4" />
            eBay Store
          </a>
          <a
            href={siteConfig.whatnot}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 transition hover:text-[var(--neon-magenta)]"
          >
            <Radio className="h-4 w-4" />
            Whatnot Streams
          </a>
          <Link
            href="/shows"
            className="flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <MapPin className="h-4 w-4" />
            Upcoming Shows
          </Link>
          <a
            href={siteConfig.x}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            @{siteHandles.x}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <DailyHighlight />
      </section>

      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--neon-magenta)]" />
            <span className="label-90s !text-[var(--neon-magenta)]">Higher End</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            Grails
          </h2>
          <p className="mt-3 max-w-xl text-sm text-zinc-500 sm:text-base">
            Serious cards. Cleaner presentation. The ones that make you pause.
            Live grails list on eBay — we don&apos;t park made-up prices on this
            site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/grails"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--neon-magenta)]/30 bg-[var(--neon-magenta)]/10 px-5 py-3 text-sm font-semibold text-[var(--neon-magenta)] transition hover:bg-[var(--neon-magenta)]/20"
            >
              View all grails →
            </Link>
            <a
              href={siteConfig.ebay}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
            >
              eBay store
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-black/15">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
            The shop
          </h2>
          <p className="mt-3 max-w-xl text-sm text-zinc-500 sm:text-base">
            Singles, slabs, sealed wax. Purchases go through eBay. This site is
            the hangout — not a fake inventory grid.
          </p>
          <div className="mt-10">
            <LaneGrid ids={["slabs", "singles", "sealed"]} />
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Full Shop
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-64 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon-cyan)]/[0.05] blur-[90px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to deal?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            Browse the eBay store, catch us live on Whatnot, or hit us up about
            buying or trading.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.ebay}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Shop eBay
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
