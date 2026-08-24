"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { CardItem, siteConfig } from "@/lib/data";
import CardTile from "@/components/CardTile";

type Props = {
  items: CardItem[];
  title?: string;
  subtitle?: string;
  relaxed?: boolean;
};

export default function CardGrid({ items, title, subtitle, relaxed = false }: Props) {
  const [selected, setSelected] = useState<CardItem | null>(null);

  useEffect(() => {
    if (!selected) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <section className="w-full">
      {(title || subtitle) && (
        <div className="mb-9">
          {title && (
            <h2 className="display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">{subtitle}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {items.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: Math.min(index * 0.04, 0.28),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <CardTile card={card} relaxed={relaxed} onOpen={setSelected} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/55 p-4 backdrop-blur-md"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="card-detail-title"
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border)] bg-slab shadow-[0_24px_60px_rgba(20,33,61,0.28)]"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-navy/70 p-2 text-white transition hover:bg-navy"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="slab-window relative aspect-[3/4] w-full">
                <div className="absolute inset-x-4 top-4 h-1.5 rounded-full bg-gradient-to-r from-teal via-gold to-purple" />
                <div className="relative flex h-full flex-col items-center justify-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {selected.grader}
                  </p>
                  {selected.grade && (
                    <p className="display text-7xl font-extrabold text-teal">{selected.grade}</p>
                  )}
                  <p className="mt-2 text-sm text-muted">Image coming soon</p>
                </div>
              </div>

              <div className="p-6">
                <h3 id="card-detail-title" className="text-xl font-bold text-ink">
                  {selected.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-soft">
                  {selected.set} · {selected.year}
                  {selected.player ? ` · ${selected.player}` : ""}
                </p>
                {selected.description && (
                  <p className="mt-4 text-sm leading-relaxed text-muted">{selected.description}</p>
                )}
                <p className="display mt-5 text-3xl font-extrabold text-teal">
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
                <p className="mt-3 text-center text-xs text-muted">
                  All purchases currently handled through our eBay store
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
