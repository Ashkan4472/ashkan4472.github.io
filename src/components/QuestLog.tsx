"use client";

import { useRef } from "react";
import { quests } from "@/content/data";
import { animate, onScroll, onceInView, stagger, useAnime } from "@/lib/anim";
import { blip } from "@/lib/sfx";

export default function QuestLog() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useAnime(root, () => {
    const section = root.current!;
    if (!matchMedia("(min-width: 1024px)").matches) {
      section.querySelectorAll(".quest").forEach((q) =>
        animate(q, { opacity: [0, 1], y: [24, 0], duration: 600, ease: "out(3)", autoplay: onScroll(onceInView(q)) }),
      );
      return;
    }
    // Desktop: sticky stage, vertical scroll drives the track sideways.
    const dist = () => track.current!.scrollWidth - innerWidth + 96;
    const size = () => (section.style.height = `${dist() + innerHeight}px`);
    size();
    const slide = animate(track.current!, {
      x: () => -dist(),
      ease: "linear",
      autoplay: onScroll({ target: section, enter: "top top", leave: "bottom bottom", sync: 0.4 }),
    });
    animate(".quest-progress", {
      scaleX: [0, 1],
      ease: "linear",
      autoplay: onScroll({ target: section, enter: "top top", leave: "bottom bottom", sync: true }),
    });
    animate(".quest", { opacity: [0, 1], y: [30, 0], delay: stagger(80), duration: 700, ease: "out(3)", autoplay: onScroll(onceInView(section)) });
    const onResize = () => {
      size();
      slide.refresh();
    };
    addEventListener("resize", onResize);
    return () => {
      removeEventListener("resize", onResize);
      section.style.height = "";
    };
  });

  return (
    <section id="quests" ref={root} className="relative py-24 lg:py-0">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <p className="label mb-4">$ tail -f quests.log</p>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-sans text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.035em]">Nine years of side quests.</h2>
            <p className="font-mono text-xs text-[var(--dim)]">
              {quests.length} quests · <span className="text-[var(--acc)]">1 running</span>
            </p>
          </div>
          <div className="mb-8 hidden h-px w-full bg-[var(--line)] lg:block">
            <div className="quest-progress h-px origin-left bg-[var(--acc)]" />
          </div>
        </div>
        <div ref={track} className="flex flex-col gap-4 px-4 sm:px-8 lg:w-max lg:flex-row lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          {quests.map((q, i) => {
            const active = q.to === "Present";
            return (
              <article
                key={q.company}
                onMouseEnter={() => blip("hover")}
                className={`quest panel flex flex-col transition-colors hover:border-[var(--acc)] lg:w-[380px] lg:shrink-0 ${active ? "border-[var(--acc)]" : ""}`}
              >
                <div className="term-head justify-between">
                  <span>pid {String(1000 + quests.length - i)}</span>
                  <span className={active ? "text-[var(--acc)] glow" : "text-[var(--dim)]"}>{active ? "● running" : "✓ exited 0"}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-sans text-3xl font-bold tracking-[-0.03em]">
                    {q.url ? (
                      <a href={q.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--acc)]">
                        {q.company}
                      </a>
                    ) : (
                      q.company
                    )}
                  </h3>
                  <p className="mt-1 text-[var(--fg)]">{q.role}</p>
                  <p className="mt-1 font-mono text-xs text-[var(--dim)]">
                    {q.from} → {q.to}
                    {q.where && ` · ${q.where}`}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                    {q.loot.map((l) => (
                      <li key={l} className="flex gap-2">
                        <span className="font-mono text-[var(--acc)]" aria-hidden>
                          +
                        </span>
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
          <div className="hidden w-[24vw] shrink-0 items-center lg:flex" aria-hidden>
            <p className="font-mono text-sm text-[var(--dim)]">
              <span className="cursor">to be continued</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
