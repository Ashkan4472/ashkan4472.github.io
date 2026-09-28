"use client";

import { useRef } from "react";
import { achievements, artifacts } from "@/content/data";
import { animate, spring, onScroll, onceInView, scrambleText, stagger, useAnime } from "@/lib/anim";
import { blip } from "@/lib/sfx";
import { SectionHead } from "./Sheet";
import { toast } from "./Toast";

const rarityColor: Record<string, string> = {
  Legendary: "var(--warn)",
  Epic: "var(--info)",
  Rare: "var(--acc)",
};

export default function Trophies() {
  const root = useRef<HTMLElement>(null);

  useAnime(root, () => {
    root.current!.querySelectorAll<HTMLElement>(".trophy").forEach((c) => {
      animate(c.querySelector(".t-title")!, {
        innerHTML: scrambleText({ chars: "blocks" }),
        duration: 900,
        autoplay: onScroll({
          ...onceInView(c),
          onEnter: () => {
            c.classList.add("unlocked");
            animate(c, { scale: [0.94, 1], ease: spring({ stiffness: 240, damping: 14 }) });
            toast("achievement unlocked", c.dataset.title!);
            blip("unlock");
          },
        }),
      });
    });
    animate(".artifact", { opacity: [0, 1], y: [24, 0], delay: stagger(120), duration: 700, ease: "out(3)", autoplay: onScroll(onceInView(".artifacts")) });
  });

  return (
    <section id="trophies" ref={root} className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHead cmd="ls ~/achievements" title="Trophy room." sub="Scroll to unlock. Each one comes with a small dopamine hit." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <article
              key={a.title}
              data-title={a.title}
              className={`trophy panel group relative flex flex-col p-6 transition-colors [&.unlocked]:border-[var(--line)] [&:not(.unlocked)_.body]:opacity-30 ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <div className="mb-4 flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--dim)]">
                  <span className="[.unlocked_&]:hidden">[locked]</span>
                  <span className="hidden text-[var(--acc)] [.unlocked_&]:inline">[unlocked]</span>
                </span>
                <span style={{ color: rarityColor[a.rarity] }}>{a.rarity.toLowerCase()}</span>
              </div>
              <div className="body transition-opacity duration-500">
                <h3 className="t-title font-sans text-2xl font-bold tracking-[-0.02em]">{a.title}</h3>
                <p className={`mt-3 leading-relaxed ${i === 0 ? "text-lg text-[var(--fg)]" : "text-[var(--muted)]"}`}>{a.detail}</p>
                <p className="mt-4 font-mono text-xs text-[var(--dim)]">{a.meta}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="artifacts mt-20">
          <p className="label mb-4">$ ls ~/artifacts --legendary</p>
          <div className="grid gap-4 md:grid-cols-2">
            {artifacts.map((a) => (
              <article key={a.name} className="artifact panel p-6">
                <h3 className="font-sans text-2xl font-bold tracking-[-0.02em]">{a.name}</h3>
                <p className="mt-3 leading-relaxed text-[var(--muted)]">{a.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
