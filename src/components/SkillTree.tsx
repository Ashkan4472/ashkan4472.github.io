"use client";

import { useRef } from "react";
import { skillTree } from "@/content/data";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";
import { blip } from "@/lib/sfx";
import { SectionHead } from "./Sheet";

export default function SkillTree() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".branch").forEach((b) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: b, start: "top 85%" } });
        tl.from(b, { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" })
          .from(b.querySelector(".rune-wrap"), { scale: 0, rotate: -180, duration: 0.7, ease: "back.out(2)" }, "<0.1")
          .from(b.querySelector(".branch-line"), { scaleY: 0, duration: 0.5, ease: "power2.out" }, "<0.2")
          .from(b.querySelectorAll(".node"), { opacity: 0, scale: 0.6, y: 8, stagger: 0.025, duration: 0.35, ease: "back.out(2)" }, "<0.1");
      });
    },
    { scope: root },
  );

  return (
    <section id="skills" ref={root} className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHead eyebrow="Chapter 2 · Skill tree" title="Every branch, unlocked." sub="Nine schools, one player. Hover a node to feel its power." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillTree.map((b) => (
            <article
              key={b.branch}
              onMouseEnter={() => blip("hover")}
              className="branch panel group relative overflow-hidden p-6 transition-colors duration-300 hover:border-[var(--gold)]"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--glow)" }}
                aria-hidden
              />
              <div className="relative flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <span className="rune-wrap block"><span className="rune grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)] text-xl text-[var(--gold)] transition-transform duration-500 group-hover:rotate-[360deg]" aria-hidden>
                    {b.glyph}
                  </span></span>
                  <span className="branch-line mt-2 h-10 w-px origin-top bg-gradient-to-b from-[var(--gold)] to-transparent" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-medium">{b.branch}</h3>
                  <p className="font-pixel text-[11px] text-[var(--muted)]">{b.skills.length} nodes unlocked</p>
                </div>
              </div>
              {b.note && <p className="relative mb-4 text-sm text-[var(--muted)]">{b.note}</p>}
              <ul className="relative flex flex-wrap gap-2">
                {b.skills.map((s) => (
                  <li key={s} className="node">
                    <span className="chip">{s}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
