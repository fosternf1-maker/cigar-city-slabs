import Link from "next/link";
import { ExternalLink, Radio, MapPin, ShoppingBag, Sparkles } from "lucide-react";
import { cards, siteConfig } from "@/lib/data";
import CardGrid from "@/components/CardGrid";

export default function HomePage() {
  const grails = cards.filter((c) => c.category === "grails").slice(0, 4);
  const featured = cards.filter((c) => c.category !== "grails").slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-20 h-[420px] w-[420px] rounded-full bg-teal/[0.14] blur-[120px]" />
          <div className="absolute -right-32 top-1/3 h-[360px] w-[360px] rounded-full bg-purple/[0.1] blur-[110px]" />
          <div className="absolute bottom-0 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-gold/[0.1] blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-slab/80 px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Tampa, FL · Est. Cigar City
          </div>

          <h1 className="display mt-6 max-w-3xl text-6xl font-extrabold leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-8xl">
            Cigar City{" "}
            <span className="text-teal">Slabs</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            Buy. Trade. Resell.{" "}
            <span className="text-ink">
              Trading cards in a fun environment — anchored in Tampa.
            </span>
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              <ShoppingBag className="h-4 w-4" />
              Browse Cards
            </Link>
            <a
              href={siteConfig.ebay}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-slab px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-teal/30 hover:text-teal"
            >
              Shop on eBay
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
            <Link
              href="/live"
              className="inline-flex items-center gap-2 rounded-xl border border-purple/20 bg-purple/10 px-6 py-3.5 text-sm font-semibold text-purple transition hover:bg-purple/15"
            >
              <Radio className="h-4 w-4" />
              Watch Live
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-slab/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 py-5 text-sm sm:justify-between sm:px-6">
          <a
            href={siteConfig.ebay}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-soft transition hover:text-teal"
          >
            <ExternalLink className="h-4 w-4" />
            eBay Store
          </a>
          <a
            href={siteConfig.whatnot}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-soft transition hover:text-purple"
          >
            <Radio className="h-4 w-4" />
            Whatnot Streams
          </a>
          <Link href="/shows" className="flex items-center gap-2 text-ink-soft transition hover:text-ink">
            <MapPin className="h-4 w-4" />
            Upcoming Shows
          </Link>
          <a
            href={siteConfig.x}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-soft transition hover:text-ink"
          >
            @{siteConfig.x.split("/").pop()}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple" />
          <span className="label-90s !text-purple">Higher End</span>
        </div>
        <CardGrid
          items={grails}
          title="Grails"
          subtitle="Serious cards. Cleaner presentation. The ones that make you pause."
          relaxed
        />
        <div className="mt-10 text-center">
          <Link href="/shop" className="text-sm font-semibold text-purple transition hover:text-purple-soft">
            View all grails →
          </Link>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-paper-deep/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <CardGrid
            items={featured}
            title="Fresh Stock"
            subtitle="Recent additions — singles, slabs, and sealed product."
          />
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-slab px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:border-teal/30 hover:text-teal"
            >
              Full Shop
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-64 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/[0.08] blur-[90px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Ready to deal?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink-soft">
            Browse the shop, catch us live on Whatnot, or hit us up about buying or trading.
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
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-slab px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-teal/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
