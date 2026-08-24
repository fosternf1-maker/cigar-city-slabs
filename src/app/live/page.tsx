import { ExternalLink, Radio } from "lucide-react";
import { siteConfig } from "@/lib/data";

export const metadata = {
  title: "Live Streams",
  description: "Catch Cigar City Slabs live on Whatnot — breaks, deals, and card talk.",
};

export default function LivePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="label-90s !text-purple">Live</p>
      <h1 className="display mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        Whatnot Streams
      </h1>
      <p className="mt-4 text-ink-soft">
        Live card action — breaks, singles, slabs, and good conversation. Pull up and hang out.
      </p>

      <div className="surface mt-12 overflow-hidden border-purple/20">
        <div className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple/12">
            <Radio className="h-7 w-7 text-purple" />
          </div>
          <div>
            <p className="display text-2xl font-extrabold text-ink">CigarCitySlab</p>
            <p className="mt-1 text-sm text-muted">on Whatnot</p>
          </div>
          <a
            href={siteConfig.whatnot}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 rounded-xl bg-purple px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(92,61,204,0.28)] transition hover:bg-purple-soft"
          >
            Open Whatnot
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-10 space-y-3 text-sm leading-relaxed text-ink-soft">
        <p>
          Follow the channel so you get notified when we go live. Streams are usually announced
          on X as well.
        </p>
        <p>
          Prefer to shop at your own pace? Everything also lives on our{" "}
          <a
            href={siteConfig.ebay}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal transition hover:underline"
          >
            eBay store
          </a>
          .
        </p>
      </div>
    </div>
  );
}
