import { MapPin, Calendar } from "lucide-react";
import { upcomingShows, siteConfig } from "@/lib/data";

export const metadata = {
  title: "Upcoming Shows",
  description: "Find Cigar City Slabs at in-person card shows around Tampa and beyond.",
};

export default function ShowsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="label-90s">In Person</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Upcoming Shows
      </h1>
      <p className="mt-4 text-zinc-400">
        Catch us at card shows around the Tampa Bay area and beyond. Dates and
        details get updated here as we lock them in.
      </p>

      <div className="mt-12 space-y-4">
        {upcomingShows.map((show) => (
          <div
            key={show.id}
            className="rounded-2xl border border-white/[0.06] bg-[var(--card-bg)] p-6 neon-border"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">{show.name}</h2>
                <div className="mt-3 flex flex-wrap gap-5 text-sm text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-[var(--neon-cyan)]" />
                    {show.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[var(--neon-cyan)]" />
                    {show.location}
                  </span>
                </div>
                {show.notes && (
                  <p className="mt-4 text-sm text-zinc-500">{show.notes}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
        <p className="text-sm text-zinc-400">
          More shows coming. Follow{" "}
          <a
            href={siteConfig.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--neon-cyan)] transition hover:underline"
          >
            @CigarCitySlabs
          </a>{" "}
          for the latest drops and locations.
        </p>
      </div>
    </div>
  );
}
