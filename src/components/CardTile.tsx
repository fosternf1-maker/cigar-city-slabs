"use client";

import { useRef, type PointerEvent } from "react";
import type { CardItem } from "@/lib/data";

type Props = {
  card: CardItem;
  relaxed?: boolean;
  onOpen: (card: CardItem) => void;
};

function shouldTilt() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return true;
}

export default function CardTile({ card, relaxed = false, onOpen }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  function onMove(event: PointerEvent<HTMLButtonElement>) {
    if (!shouldTilt()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--tilt-x", `${(0.5 - py) * 10}deg`);
    el.style.setProperty("--tilt-y", `${(px - 0.5) * 14}deg`);
    el.style.setProperty("--holo-x", `${px * 100}%`);
    el.style.setProperty("--holo-y", `${py * 100}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--holo-x", "50%");
    el.style.setProperty("--holo-y", "50%");
  }

  const isGrail = relaxed || card.category === "grails";

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(card)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`card-tile group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-slab text-left shadow-[0_8px_24px_rgba(20,33,61,0.08)] ${
        isGrail ? "is-grail" : ""
      }`}
    >
      <div className="slab-window relative aspect-[3/4] w-full overflow-hidden">
        <div className="holo-sheen" />
        <div className="absolute inset-x-3 top-3 h-1.5 rounded-full bg-gradient-to-r from-teal via-gold to-purple opacity-80" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
              {card.grader || "Card"}
            </p>
            {card.grade && (
              <p
                className={`display mt-1 text-5xl font-extrabold ${
                  isGrail ? "text-purple" : "text-teal"
                }`}
              >
                {card.grade}
              </p>
            )}
          </div>
        </div>

        {card.category === "grails" && (
          <span className="absolute right-2.5 top-6 rounded-full bg-purple px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Grail
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-ink transition group-hover:text-teal">
          {card.title}
        </p>
        <p className="mt-1 text-xs text-muted">
          {card.set} · {card.year}
        </p>
        <p
          className={`mt-auto pt-3 text-sm font-bold ${
            isGrail ? "text-purple" : "text-teal"
          }`}
        >
          ${card.price.toLocaleString()}
        </p>
      </div>
    </button>
  );
}
