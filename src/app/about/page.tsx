import { siteConfig } from "@/lib/data";

export const metadata = {
  title: "About",
  description: "The story behind Cigar City Slabs — Tampa trading cards done right.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="label-90s">About</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Cigar City Slabs
      </h1>
      <p className="mt-3 text-lg text-zinc-400">
        Tampa roots. Card culture. Fun first.
      </p>

      <div className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-300">
        <p>
          We’re a Tampa-based trading card outfit focused on buying, trading, and
          reselling cards in a fun environment. The name nods to the city’s
          nickname — Cigar City — because this is where we’re planted.
        </p>
        <p>
          Whether you’re hunting a modern rookie, a classic slab, or just want
          to flip through some heat, we’re here for the hobby. No gatekeeping,
          no attitude — just cards, conversation, and the occasional good deal.
        </p>
        <p>
          You’ll find us at local shows, streaming on Whatnot, and listing daily
          on eBay. If you’ve got a collection to move or you’re looking for
          something specific, reach out. We’re always down to talk cards.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.06] bg-[var(--card-bg)] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
            What we do
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>• Buy singles, slabs & collections</li>
            <li>• Trade at shows and online</li>
            <li>• Resell via eBay & Whatnot</li>
            <li>• Show up in person around Tampa Bay</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-[var(--card-bg)] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
            Where to find us
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>• eBay: cigar_city_slabs</li>
            <li>• Whatnot: CigarCitySlab</li>
            <li>• X: @CigarCitySlabs</li>
            <li>• Email: {siteConfig.email}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
