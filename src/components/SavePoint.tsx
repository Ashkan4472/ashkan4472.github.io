"use client";

import { useRef } from "react";
import { profile } from "@/content/data";
import { createAnimatable, createTimeline, onScroll, onceInView, scrambleText, stagger, useAnime } from "@/lib/anim";
import { blip } from "@/lib/sfx";

export default function SavePoint() {
  const root = useRef<HTMLElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);

  useAnime(root, () => {
    createTimeline({ autoplay: onScroll(onceInView(".save-title")) })
      .add(".save-title-t", { innerHTML: scrambleText(), duration: 1000 })
      .add(".save-fade", { opacity: [0, 1], y: [14, 0], delay: stagger(90), duration: 600, ease: "out(3)" }, 300);

    const magnet = createAnimatable(cta.current!, { x: 300, y: 300, ease: "out(3)" });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = cta.current!.getBoundingClientRect();
      magnet.x((e.clientX - r.left - r.width / 2) * 0.3);
      magnet.y((e.clientY - r.top - r.height / 2) * 0.3);
    };
    const leave = () => {
      magnet.x(0);
      magnet.y(0);
    };
    cta.current!.addEventListener("pointermove", move);
    cta.current!.addEventListener("pointerleave", leave);
    return () => {
      cta.current?.removeEventListener("pointermove", move);
      cta.current?.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <section id="save" ref={root} className="relative overflow-hidden pb-10 pt-28 sm:pt-36">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <p className="save-fade label mb-6">$ git commit -m &quot;save point&quot;</p>
        <h2 className="save-title font-sans text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.9] tracking-[-0.045em]">
          <span className="save-title-t">Save your game</span>
          <span className="text-[var(--acc)] glow">?</span>
        </h2>
        <p className="save-fade mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
          Open to collaborating on open-source projects. Bring your weirdest idea. These aren&apos;t the bugs you&apos;re looking for, but I&apos;ll fix them anyway.
        </p>
        <div className="save-fade mt-10">
          <a
            ref={cta}
            href={`mailto:${profile.email}`}
            onMouseEnter={() => blip("hover")}
            onClick={() => blip("click")}
            className="inline-flex min-h-14 items-center gap-3 rounded border border-[var(--acc)] bg-[var(--acc)] px-7 py-4 font-mono text-base font-bold text-[var(--bg)] shadow-[0_0_30px_var(--glow)]"
          >
            <span>$ mail {profile.email}</span>
            <span aria-hidden>↵</span>
          </a>
        </div>
        <ul className="save-fade mt-8 flex flex-wrap gap-2">
          {profile.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => blip("hover")}
                className="inline-flex min-h-11 items-center rounded border border-[var(--line)] px-4 font-mono text-sm text-[var(--fg)] transition-colors hover:border-[var(--acc)] hover:text-[var(--acc)]"
              >
                ./{l.label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
        <footer className="mt-28 flex flex-col justify-between gap-3 border-t border-[var(--line)] pt-6 font-mono text-xs text-[var(--dim)] sm:flex-row">
          <p>Not all those who wander are lost. Some of them are just debugging.</p>
          <p>© {new Date().getFullYear()} Ashkan Tofangdar · ↑↑↓↓←→←→BA</p>
        </footer>
      </div>
    </section>
  );
}
