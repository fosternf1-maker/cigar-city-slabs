"use client";

import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { CardItem, siteConfig } from "@/lib/data";

type Props = {
  items: CardItem[];
  title?: string;
  subtitle?: string;
  relaxed?: boolean;
};

export default function CardGrid({ items, title, subtitle, relaxed = false }: Props) {
  const [selected, setSelected] = useState<CardItem | null>(null);

  return (
    <section className="w-full">
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2
              className={`text-2xl font-bold tracking-tight sm:text-3xl ${
                relaxed ? "text-zinc-100" : "text-white"
              }`}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-zinc-500 sm:text-base">{subtitle}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setSelected(card)}
            className={`card-hover group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[var(--card-bg)] text-left ${
              relaxed ? "neon-border-magenta" : "neon-border"
            }`}
          >
            <div
              className={`relative aspect-[3/4] w-full ${
                relaxed
                  ? "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
                  : "bg-gradient-to-br from-zinc-900 via-[#0d1520] to-zinc-900"
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600">
                    {card.grader || "Card"}
                  </p>
                  {card.grade && (
                    <p
                      className={`mt-1 text-2xl font-bold ${
                        relaxed ? "text-[var(--neon-magenta)]" : "text-[var(--neon-cyan)]"
                      }`}
                    >
                      {card.grade}
                    </p>
                  )}
                </div>
              </div>
              {card.category === "grails" && (
                <span className="absolute left-2 top-2 rounded-full bg-[var(--neon-magenta)]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--neon-magenta)]">
                  Grail
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-3">
              <p className="line-clamp-2 text-sm font-semibold text-white group-hover:text-[var(--neon-cyan)]">
                {card.title}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                {card.set} · {card.year}
              </p>
              <p
                className={`mt-auto pt-2 text-sm font-bold ${
                  relaxed ? "text-[var(--neon-magenta)]" : "text-[var(--neon-cyan)]"
                }`}
              >
                ${card.price.toLocaleString()}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#12121a] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-1.5 text-zinc-400 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-[3/4] w-full bg-gradient-to-br from-zinc-900 to-zinc-800">
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  {selected.grader}
                </p>
                {selected.grade && (
                  <p className="text-5xl font-bold text-[var(--neon-cyan)]">
                    {selected.grade}
                  </p>
                )}
                <p className="text-sm text-zinc-600">Image coming soon</p>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-white">{selected.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">
                {selected.set} · {selected.year}
                {selected.player ? ` · ${selected.player}` : ""}
              </p>
              {selected.description && (
                <p className="mt-3 text-sm text-zinc-500">{selected.description}</p>
              )}
              <p className="mt-4 text-2xl font-bold text-[var(--neon-cyan)]">
                ${selected.price.toLocaleString()}
              </p>

              <a
                href={selected.ebayUrl || siteConfig.ebay}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--neon-cyan)] px-4 py-3 text-sm font-bold text-black transition hover:bg-[var(--neon-cyan)]/90"
              >
                View / Buy on eBay
                <ExternalLink className="h-4 w-4" />
              </a>
              <p className="mt-2 text-center text-xs text-zinc-600">
                All purchases currently handled through our eBay store
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
