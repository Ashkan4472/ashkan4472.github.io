"use client";

import { useRef } from "react";
import { inventory, training } from "@/content/data";
import { animate, spring, onScroll, onceInView, stagger, useAnime } from "@/lib/anim";
import { SectionHead } from "./Sheet";

const icons: Record<string, string> = {
  coffee: "M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM6 2v2M10 2v2M14 2v2",
  "chef's knife": "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7",
  "pair of headphones": "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
  towel: "M6 3h12v18H6zM6 15h12M6 18h12",
};

export default function Camp() {
  const root = useRef<HTMLElement>(null);

  useAnime(root, () => {
    animate(".edu", { opacity: [0, 1], x: [-16, 0], delay: stagger(120), duration: 600, ease: "out(3)", autoplay: onScroll(onceInView(".edus")) });
    animate(".slot", {
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: stagger(80, { grid: [2, 2], from: "first" }),
      ease: spring({ stiffness: 220, damping: 13 }),
      autoplay: onScroll(onceInView(".slots")),
    });
  });

  return (
    <section id="camp" ref={root} className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHead cmd="history | grep school" title="Where the XP started." />
          <ol className="edus relative space-y-6 border-l border-[var(--line)] pl-6">
            {training.map((t) => (
              <li key={t.school} className="edu relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 bg-[var(--acc)]" aria-hidden />
                <p className="font-mono text-xs text-[var(--dim)]">{t.when}</p>
                <h3 className="mt-1 text-xl font-bold tracking-[-0.02em]">{t.school}</h3>
                <p className="text-[var(--muted)]">
                  {t.degree} · {t.note}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHead cmd="ls ~/inventory" title="Never leaves camp without." />
          <ul className="slots grid grid-cols-2 gap-3">
            {inventory.map((it) => (
              <li key={it.item} className="slot panel group relative p-5 transition-colors hover:border-[var(--acc)]">
                <span className="absolute right-4 top-4 font-mono text-sm text-[var(--acc)]">×{it.qty}</span>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--dim)] transition-colors group-hover:text-[var(--acc)]" aria-hidden>
                  <path d={icons[it.item]} />
                </svg>
                <p className="mt-8 text-lg font-bold leading-tight tracking-[-0.02em] sm:text-xl">{it.item}</p>
                <p className="mt-1 font-mono text-xs text-[var(--dim)]">{it.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
