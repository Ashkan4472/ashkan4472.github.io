"use client";

import { useRef } from "react";
import { quests } from "@/content/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { blip } from "@/lib/sfx";

export default function QuestLog() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: pinned horizontal scroll through the quests.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const dist = () => el.scrollWidth - window.innerWidth + 64;
        const tween = gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${dist()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(".quest-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".quest").forEach((q) => {
          gsap.from(q.querySelectorAll(".loot"), {
            opacity: 0,
            x: 20,
            stagger: 0.08,
            duration: 0.5,
            scrollTrigger: { trigger: q, containerAnimation: tween, start: "left 85%" },
          });
        });
      });
      // Mobile / tablet: vertical reveal.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".quest").forEach((q) => {
          gsap.from(q, { opacity: 0, y: 30, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: q, start: "top 88%" } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="quests" ref={root} className="relative overflow-hidden py-28 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <p className="eyebrow mb-4">Chapter 3 · Quest log</p>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95]">Nine years of side quests.</h2>
          <p className="font-pixel text-[11px] text-[var(--muted)]">{quests.length} quests · 1 active</p>
        </div>
        <div className="mb-8 hidden h-px w-full bg-[var(--line)] lg:block">
          <div className="quest-progress stat-fill h-[3px] -translate-y-px scale-x-0" />
        </div>
      </div>
      <div ref={track} className="flex flex-col gap-5 px-4 sm:px-8 lg:w-max lg:flex-row lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {quests.map((q, i) => {
          const active = q.to === "Present";
          return (
            <article
              key={q.company}
              onMouseEnter={() => blip("hover")}
              className={`quest panel relative flex flex-col p-6 transition-colors duration-300 hover:border-[var(--gold)] lg:w-[400px] lg:shrink-0 ${active ? "frame" : ""}`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-pixel text-[11px] text-[var(--muted)]">Quest {String(quests.length - i).padStart(2, "0")}</span>
                <span
                  className={`rounded px-2 py-1 font-pixel text-[10px] ${active ? "bg-[var(--jade)] text-[var(--bg)]" : "border border-[var(--line)] text-[var(--muted)]"}`}
                >
                  {active ? "● Active" : "✓ Completed"}
                </span>
              </div>
              <h3 className="font-display text-4xl leading-none">
                {q.url ? (
                  <a href={q.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)]">
                    {q.company}
                  </a>
                ) : (
                  q.company
                )}
              </h3>
              <p className="mt-2 text-[var(--fg)]">{q.role}</p>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                {q.from} → {q.to}
                {q.where && ` · ${q.where}`}
              </p>
              <p className="mt-6 font-pixel text-[10px] text-[var(--gold)]">Loot</p>
              <ul className="mt-2 space-y-2 text-sm text-[var(--muted)]">
                {q.loot.map((l) => (
                  <li key={l} className="loot flex gap-2">
                    <span className="text-[var(--gold)]" aria-hidden>
                      ▸
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
        <div className="hidden w-[30vw] shrink-0 items-center lg:flex" aria-hidden>
          <p className="font-display text-3xl italic text-[var(--muted)]">To be continued…</p>
        </div>
      </div>
    </section>
  );
}
