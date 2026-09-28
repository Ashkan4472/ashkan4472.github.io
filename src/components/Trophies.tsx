"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { achievements, artifacts } from "@/content/data";
import { gsap, reducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { blip } from "@/lib/sfx";
import { SectionHead } from "./Sheet";

const rarityColor: Record<string, string> = {
  Legendary: "var(--gold)",
  Epic: "var(--mana)",
  Rare: "var(--jade)",
};

export default function Trophies() {
  const root = useRef<HTMLElement>(null);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".trophy");
      if (reducedMotion()) {
        cards.forEach((c) => c.classList.add("unlocked"));
        return;
      }
      cards.forEach((c) => {
        ScrollTrigger.create({
          trigger: c,
          start: "top 80%",
          once: true,
          onEnter: () => {
            c.classList.add("unlocked");
            gsap.fromTo(c, { rotateY: -90, opacity: 0.4 }, { rotateY: 0, opacity: 1, duration: 0.8, ease: "back.out(1.6)" });
            setToast(c.dataset.title!);
            blip("unlock");
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setToast(null), 2600);
          },
        });
      });
      gsap.from(".artifact", { opacity: 0, y: 30, stagger: 0.15, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".artifacts", start: "top 80%" } });
    },
    { scope: root },
  );

  return (
    <section id="trophies" ref={root} className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHead eyebrow="Chapter 4 · Achievements" title="Trophy room." sub="Scroll to unlock. Each one comes with a small dopamine hit." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {achievements.map((a, i) => (
            <article
              key={a.title}
              data-title={a.title}
              className={`trophy panel group relative flex flex-col p-6 [&.unlocked_.lock]:hidden [&:not(.unlocked)_.body]:blur-sm ${i === 0 ? "frame md:col-span-2" : ""}`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-lg border" style={{ borderColor: rarityColor[a.rarity], color: rarityColor[a.rarity] }} aria-hidden>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
                  </svg>
                </span>
                <span className="font-pixel text-[10px]" style={{ color: rarityColor[a.rarity] }}>
                  {a.rarity}
                </span>
              </div>
              <p className="lock absolute inset-0 grid place-items-center font-pixel text-xs text-[var(--muted)]">??? locked</p>
              <div className="body transition duration-500">
                <h3 className="font-display text-3xl leading-tight">{a.title}</h3>
                <p className={`mt-3 ${i === 0 ? "text-lg italic text-[var(--fg)]" : "text-[var(--muted)]"}`}>{a.detail}</p>
                <p className="mt-4 font-mono text-xs text-[var(--muted)]">{a.meta}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="artifacts mt-24">
          <p className="eyebrow mb-4">Legendary artifacts</p>
          <div className="grid gap-5 md:grid-cols-2">
            {artifacts.map((a) => (
              <article key={a.name} className="artifact panel p-6 sm:p-8">
                <h3 className="font-display text-3xl">{a.name}</h3>
                <p className="mt-3 text-[var(--muted)]">{a.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="panel fixed right-4 top-20 z-50 flex items-center gap-3 px-4 py-3 shadow-2xl"
            role="status"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--gold)] text-[var(--bg)]" aria-hidden>
              ★
            </span>
            <span>
              <span className="block font-pixel text-[10px] text-[var(--gold)]">Achievement unlocked</span>
              <span className="text-sm">{toast}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
