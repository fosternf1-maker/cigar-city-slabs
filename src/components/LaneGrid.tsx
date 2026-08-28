import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { shopLanes } from "@/lib/data";

type Props = {
  ids?: Array<(typeof shopLanes)[number]["id"]>;
};

export default function LaneGrid({ ids }: Props) {
  const lanes = ids
    ? shopLanes.filter((lane) => ids.includes(lane.id))
    : shopLanes;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {lanes.map((lane) => {
        const className = `group flex flex-col rounded-2xl border border-white/[0.06] bg-[var(--card-bg)] p-6 text-left transition ${
          lane.accent === "magenta"
            ? "card-hover-grail neon-border-magenta"
            : "card-hover neon-border"
        }`;

        const body = (
          <>
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${
                lane.accent === "magenta"
                  ? "text-[var(--neon-magenta)]"
                  : "text-[var(--neon-cyan)]"
              }`}
            >
              {lane.subtitle}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white">
              {lane.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
              {lane.blurb}
            </p>
            <p
              className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
                lane.accent === "magenta"
                  ? "text-[var(--neon-magenta)]"
                  : "text-[var(--neon-cyan)]"
              }`}
            >
              {lane.external ? "Open eBay" : "View grails"}
              {lane.external && <ExternalLink className="h-3.5 w-3.5" />}
              {!lane.external && <span aria-hidden="true">→</span>}
            </p>
          </>
        );

        if (lane.external) {
          return (
            <a
              key={lane.id}
              href={lane.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {body}
            </a>
          );
        }

        return (
          <Link key={lane.id} href={lane.href} className={className}>
            {body}
          </Link>
        );
      })}
    </div>
  );
}
