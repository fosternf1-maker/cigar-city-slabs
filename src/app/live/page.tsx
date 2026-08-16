import { ExternalLink, Radio } from "lucide-react";
import { siteConfig } from "@/lib/data";

export const metadata = {
  title: "Live Streams",
  description: "Catch Cigar City Slabs live on Whatnot — breaks, deals, and card talk.",
};

export default function LivePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-[var(--neon-magenta)]">
        Live
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Whatnot Streams
      </h1>
      <p className="mt-3 text-zinc-400">
        Live card action — breaks, singles, slabs, and good conversation. Pull up
        and hang out.
      </p>

      <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--neon-magenta)]/20 bg-[#12121a] glow-magenta">
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--neon-magenta)]/15">
            <Radio className="h-8 w-8 text-[var(--neon-magenta)]" />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">CigarCitySlab</p>
            <p className="mt-1 text-sm text-zinc-500">on Whatnot</p>
          </div>
          <a
            href={siteConfig.whatnot}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[var(--neon-magenta)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--neon-magenta)]/90"
          >
            Open Whatnot
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-8 space-y-3 text-sm text-zinc-400">
        <p>
          Follow the channel so you get notified when we go live. Streams are
          usually announced on X as well.
        </p>
        <p>
          Prefer to shop at your own pace? Everything also lives on our{" "}
          <a
            href={siteConfig.ebay}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--neon-cyan)] hover:underline"
          >
            eBay store
          </a>
          .
        </p>
      </div>
    </div>
  );
}
