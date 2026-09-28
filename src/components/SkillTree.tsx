"use client";

import { useRef } from "react";
import { skillTree } from "@/content/data";
import { spring, createTimeline, onScroll, onceInView, stagger, svg, useAnime } from "@/lib/anim";
import { blip } from "@/lib/sfx";
import { SectionHead } from "./Sheet";

const pop = spring({ stiffness: 260, damping: 12 });

export default function SkillTree() {
  const root = useRef<HTMLElement>(null);

  useAnime(root, () => {
    root.current!.querySelectorAll<HTMLElement>(".branch").forEach((b) => {
      createTimeline({ autoplay: onScroll(onceInView(b)) })
        .add(b, { opacity: [0, 1], y: [24, 0], duration: 500, ease: "out(3)" })
        .add(svg.createDrawable(b.querySelectorAll(".trace")), { draw: ["0 0", "0 1"], duration: 700, ease: "inOut(3)" }, 100)
        .add(b.querySelectorAll(".node"), { scale: [0, 1], opacity: [0, 1], ease: pop, delay: stagger(22) }, 350);
    });
  });

  return (
    <section id="skills" ref={root} className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHead cmd="tree ./skills --depth 2" title="Every branch, unlocked." sub="Nine schools, one player." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillTree.map((b) => (
            <article key={b.branch} onMouseEnter={() => blip("hover")} className="branch panel group relative overflow-hidden p-5 transition-colors hover:border-[var(--acc)]">
              <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
                <path className="trace" d="M0 0 H100" stroke="var(--acc)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" fill="none" />
                <path className="trace" d="M0 0 V100" stroke="var(--acc)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" fill="none" opacity="0.5" />
              </svg>
              <div className="mb-4 flex items-baseline justify-between font-mono">
                <h3 className="text-base font-bold text-[var(--fg)] group-hover:text-[var(--acc)]">
                  <span className="text-[var(--dim)]">├─ </span>
                  {b.branch.toLowerCase().replace(/ /g, "_")}/
                </h3>
                <span className="text-xs text-[var(--dim)]">{b.skills.length} nodes</span>
              </div>
              {b.note && <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">{b.note}</p>}
              <ul className="flex flex-wrap gap-1.5">
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
