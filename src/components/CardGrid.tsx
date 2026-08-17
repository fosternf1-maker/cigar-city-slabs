"use client";

import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { CardItem, siteConfig } from "@/lib/data";

type Props = {
  items: CardItem[];
  title?: string;
  subtitle?: string;
  relaxed?: boolean; // for Grails section – calmer feel
};

export default function CardGrid({ items, title, subtitle, relaxed = false }: Props) {
  const [selected, setSelected] = useState<CardItem | null>(null);

  return (
    <section className="w-full">
      {(title || subtitle) && (
        <div className="mb-9">
          {title && (
            <h2
              className={`font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl ${
                relaxed ? "text-zinc-100" : "text-white"
              }`}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 max-w-xl text-sm text-zinc-500 sm:text-base">{subtitle}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {items.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setSelected(card)}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--card-bg)] text-left ${
              relaxed ? "card-hover-grail neon-border-magenta" : "card-hover neon-border"
            }`}
          >
            {/* Placeholder image / slab area */}
            <div
              className={`relative aspect-[3/4] w-full overflow-hidden ${
                relaxed
                  ? "bg-gradient-to-br from-[#1a1218] via-[#141018] to-[#0e0c12]"
                  : "bg-gradient-to-br from-[#0d1520] via-[#0c1018] to-[#0a0c12]"
              }`}
            >
              {/* Subtle inner sheen */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/[0.03]" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                    {card.grader || "Card"}
                  </p>
                  {card.grade && (
                    <p
                      className={`mt-1.5 font-[family-name:var(--font-display)] text-3xl font-bold ${
                        relaxed ? "text-[var(--neon-magenta)] neon-text-magenta" : "text-[var(--neon-cyan)] neon-text"
                      }`}
                    >
                      {card.grade}
                    </p>
                  )}
                </div>
              </div>

              {card.category === "grails" && (
                <span className="absolute left-2.5 top-2.5 rounded-full border border-[var(--neon-magenta)]/30 bg-[var(--neon-magenta)]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--neon-magenta)]">
                  Grail
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-3.5">
              <p className="line-clamp-2 text-sm font-semibold leading-snug text-white transition group-hover:text-[var(--neon-cyan)]">
                {card.title}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {card.set} · {card.year}
              </p>
              <p
                className={`mt-auto pt-3 text-sm font-bold ${
                  relaxed ? "text-[var(--neon-magenta)]" : "text-[var(--neon-cyan)]"
                }`}
              >
                ${card.price.toLocaleString()}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e16] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-zinc-400 transition hover:bg-black/80 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-[#0d1520] to-[#0a0c12]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/[0.03]" />
              <div className="relative flex h-full flex-col items-center justify-center gap-2">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                  {selected.grader}
                </p>
                {selected.grade && (
                  <p className="font-[family-name:var(--font-display)] text-6xl font-bold text-[var(--neon-cyan)] neon-text">
                    {selected.grade}
                  </p>
                )}
                <p className="mt-2 text-sm text-zinc-600">Image coming soon</p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{selected.title}</h3>
              <p className="mt-1.5 text-sm text-zinc-400">
                {selected.set} · {selected.year}
                {selected.player ? ` · ${selected.player}` : ""}
              </p>
              {selected.description && (
                <p className="mt-4 text-sm leading-relaxed text-zinc-500">{selected.description}</p>
              )}
              <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--neon-cyan)]">
                ${selected.price.toLocaleString()}
              </p>

              <a
                href={selected.ebayUrl || siteConfig.ebay}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 flex w-full items-center justify-center gap-2 px-4 py-3.5 text-sm"
              >
                View / Buy on eBay
                <ExternalLink className="h-4 w-4" />
              </a>
              <p className="mt-3 text-center text-xs text-zinc-600">
                All purchases currently handled through our eBay store
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
