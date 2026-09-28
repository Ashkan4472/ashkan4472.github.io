"use client";

import { useRef } from "react";
import { gsap, reducedMotion, SplitText, useGSAP } from "@/lib/gsap";

const lines = [
  "My favorite moment is right before something exists.",
  "Need a tool? I write it. A model? I train it. A world? I build it, paint it, score it and ship it.",
  "Some call it curiosity. Some call it a mild god complex. I call it Tuesday.",
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const split = new SplitText(".mf-line", { type: "words" });
      gsap.set(split.words, { opacity: 0.12 });
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=180%", scrub: 0.8, pin: true },
        })
        .to(split.words, { opacity: 1, stagger: 0.1, ease: "none" })
        .to(".mf-sig", { opacity: 1, y: 0, duration: 1 }, "-=0.5");
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section id="manifesto" ref={root} className="relative flex min-h-[100svh] items-center">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-8">
        <p className="eyebrow mb-10">Chapter 0 · The lore</p>
        <div className="space-y-8">
          {lines.map((l, i) => (
            <p
              key={i}
              className={`mf-line font-display leading-[1.08] tracking-[-0.01em] ${i === 1 ? "text-[clamp(1.8rem,4.6vw,3.8rem)] italic" : "text-[clamp(2rem,5.4vw,4.4rem)]"}`}
            >
              {l}
            </p>
          ))}
        </div>
        <p className="mf-sig mt-12 max-w-xl translate-y-4 text-[var(--muted)] opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100">
          I like simple things done well, code that reads like prose, and handing the map to whoever comes next. That&apos;s why I&apos;ve translated a few books along the way.
        </p>
      </div>
    </section>
  );
}
