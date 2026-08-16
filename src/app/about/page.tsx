import { siteConfig } from "@/lib/data";

export const metadata = {
  title: "About",
  description: "The story behind Cigar City Slabs — Tampa trading cards done right.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-[var(--neon-cyan)]">
        About
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Cigar City Slabs
      </h1>
      <p className="mt-2 text-lg text-zinc-400">
        Tampa roots. Card culture. Fun first.
      </p>

      <div className="mt-10 space-y-6 text-zinc-300 leading-relaxed">
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

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-[#12121a] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            What we do
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-zinc-300">
            <li>• Buy singles, slabs & collections</li>
            <li>• Trade at shows and online</li>
            <li>• Resell via eBay & Whatnot</li>
            <li>• Show up in person around Tampa Bay</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#12121a] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Where to find us
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-zinc-300">
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
