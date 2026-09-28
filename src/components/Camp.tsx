"use client";

import { useRef } from "react";
import { inventory, training } from "@/content/data";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";
import { SectionHead } from "./Sheet";

const icons: Record<string, string> = {
  coffee: "M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM6 2v2M10 2v2M14 2v2",
  "chef's knife": "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7",
  "pair of headphones": "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
  towel: "M6 3h12v18H6zM6 15h12M6 18h12",
};

export default function Camp() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".slot", { opacity: 0, scale: 0.8, stagger: 0.08, duration: 0.5, ease: "back.out(2)", scrollTrigger: { trigger: ".slots", start: "top 85%" } });
    },
    { scope: root },
  );

  return (
    <section id="camp" ref={root} className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Chapter 5 · Training grounds" title="Where the XP started." />
          <ol className="relative space-y-6 border-l border-[var(--line)] pl-6">
            {training.map((t) => (
              <li key={t.school} className="reveal relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rotate-45 border border-[var(--gold)] bg-[var(--bg)]" aria-hidden />
                <p className="font-mono text-xs text-[var(--muted)]">{t.when}</p>
                <h3 className="mt-1 text-xl font-medium">{t.school}</h3>
                <p className="text-[var(--muted)]">
                  {t.degree} · {t.note}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHead eyebrow="Inventory" title="Never leaves camp without." />
          <ul className="slots grid grid-cols-2 gap-4">
            {inventory.map((it) => (
              <li key={it.item} className="slot panel group relative min-h-44 p-5 transition-colors hover:border-[var(--gold)]">
                <span className="absolute right-4 top-3 font-pixel text-lg text-[var(--gold)]">×{it.qty}</span>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--muted)] transition duration-300 group-hover:-translate-y-1 group-hover:text-[var(--gold)]" aria-hidden>
                  <path d={icons[it.item]} />
                </svg>
                <div className="mt-10 flex flex-col justify-end">
                  <p className="font-display text-2xl leading-tight sm:text-3xl">{it.item}</p>
                  <p className="mt-1 font-mono text-xs text-[var(--muted)]">{it.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
