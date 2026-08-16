import Link from "next/link";
import { ExternalLink, Radio, MapPin, ShoppingBag } from "lucide-react";
import { cards, siteConfig } from "@/lib/data";
import CardGrid from "@/components/CardGrid";

export default function HomePage() {
  const grails = cards.filter((c) => c.category === "grails").slice(0, 4);
  const featured = cards.filter((c) => c.category !== "grails").slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[var(--neon-cyan)]/10 blur-[100px]" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[var(--neon-magenta)]/10 blur-[90px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--neon-cyan)]">
            Tampa, FL
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Cigar City{" "}
            <span className="text-[var(--neon-cyan)] neon-text">Slabs</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-zinc-400">
            Buy. Trade. Resell.{" "}
            <span className="text-zinc-300">
              Trading cards in a fun environment — anchored in Tampa.
            </span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--neon-cyan)] px-5 py-3 text-sm font-bold text-black transition hover:bg-[var(--neon-cyan)]/90"
            >
              <ShoppingBag className="h-4 w-4" />
              Browse Cards
            </Link>
            <a
              href={siteConfig.ebay}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Shop on eBay
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/live"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--neon-magenta)]/30 bg-[var(--neon-magenta)]/10 px-5 py-3 text-sm font-semibold text-[var(--neon-magenta)] transition hover:bg-[var(--neon-magenta)]/20"
            >
              <Radio className="h-4 w-4" />
              Watch Live
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 bg-[#0c0c12]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-5 text-sm sm:justify-between sm:px-6">
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
            @{siteConfig.x.split("/").pop()}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <CardGrid
          items={grails}
          title="Grails"
          subtitle="Higher-end pieces. Clean presentation, serious cards."
          relaxed
        />
        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="text-sm font-medium text-[var(--neon-magenta)] hover:underline"
          >
            View all grails →
          </Link>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#0c0c12]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <CardGrid
            items={featured}
            title="Fresh Stock"
            subtitle="Recent additions — singles, slabs, and sealed."
          />
          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Full Shop
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to deal?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            Browse the shop, catch us live on Whatnot, or hit us up about buying
            or trading.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.ebay}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--neon-cyan)] px-5 py-3 text-sm font-bold text-black"
            >
              Shop eBay
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
