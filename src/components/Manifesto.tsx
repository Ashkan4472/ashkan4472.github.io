"use client";

import { useRef } from "react";
import { animate, onScroll, splitText, stagger, useAnime } from "@/lib/anim";

const lines = [
  "My favorite moment is right before something exists.",
  "Need a tool? I write it. A model? I train it. A world? I build it, paint it, score it and ship it.",
  "Some call it curiosity. Some call it a mild god complex. I call it Tuesday.",
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useAnime(root, () => {
    const words = lines.flatMap((_, i) => splitText(`.mf-${i}`, { words: true }).words);
    animate(words, {
      opacity: [0.1, 1],
      delay: stagger(40),
      ease: "linear",
      autoplay: onScroll({ target: root.current!, enter: "top top", leave: "bottom bottom", sync: 0.3 }),
    });
    animate(".mf-sig", {
      opacity: [{ from: 0, to: 0, duration: 700 }, { to: 1, duration: 300 }],
      ease: "linear",
      autoplay: onScroll({ target: root.current!, enter: "top top", leave: "bottom bottom", sync: 0.3 }),
    });
  });

  return (
    <section id="manifesto" ref={root} className="relative h-[260vh] motion-reduce:h-auto">
      <div className="sticky top-0 flex min-h-[100svh] items-center motion-reduce:static">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-8">
          <p className="label mb-10">$ cat lore.txt</p>
          <div className="space-y-8">
            {lines.map((l, i) => (
              <p
                key={i}
                className={`mf-${i} font-sans font-medium leading-[1.1] tracking-[-0.02em] ${i === 1 ? "text-[clamp(1.6rem,4vw,3.3rem)] text-[var(--acc)]" : "text-[clamp(1.9rem,4.8vw,4rem)]"}`}
              >
                {l}
              </p>
            ))}
          </div>
          <p className="mf-sig mt-12 max-w-xl font-mono text-sm leading-relaxed text-[var(--muted)]">
            <span className="text-[var(--dim)]"># </span>I like simple things done well, code that reads like prose, and handing the map to whoever comes next. That&apos;s why I&apos;ve translated a few books along the way.
          </p>
        </div>
      </div>
    </section>
  );
}
