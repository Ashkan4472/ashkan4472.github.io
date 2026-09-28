"use client";

import { useRef } from "react";
import { animate, createTimeline, onScroll, scrambleText, stagger, useAnime, utils } from "@/lib/anim";
import { whenBooted } from "./Boot";

const COLS = 22;
const ROWS = 13;

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useAnime(root, () => {
    const ripple = (from: number) =>
      animate(".dot", {
        scale: [{ to: 2.6, duration: 260 }, { to: 1, duration: 700 }],
        opacity: [{ to: 1, duration: 260 }, { to: 0.35, duration: 700 }],
        backgroundColor: [{ to: "var(--acc)", duration: 260 }, { to: "var(--dim)", duration: 700 }],
        delay: stagger(45, { grid: [COLS, ROWS], from }),
        ease: "out(3)",
      });

    const intro = createTimeline({ autoplay: false, defaults: { ease: "out(4)" } })
      .add(".dot", { opacity: [0, 0.35], scale: [0, 1], delay: stagger(18, { grid: [COLS, ROWS], from: "center" }), duration: 600 })
      .add(".hero-cmd", { innerHTML: scrambleText({ chars: "01" }), duration: 700 }, 0)
      .add(".hero-title-line", { opacity: [0, 1], duration: 10 }, 200)
      .add(".hero-title-line", { innerHTML: scrambleText({ chars: "!<>-_\\/[]{}=+*^?#" }), duration: 1100, delay: stagger(180) }, 200)
      .add(".hero-fade", { opacity: [0, 1], y: [14, 0], delay: stagger(100), duration: 700 }, 900)
      .call(() => ripple(Math.floor((COLS * ROWS) / 2)), 1200);

    const off = whenBooted(() => intro.play());
    const loop = setInterval(() => ripple(utils.random(0, COLS * ROWS - 1)), 4200);

    const click = (e: Event) => {
      const i = [...root.current!.querySelectorAll(".dot")].indexOf(e.target as Element);
      ripple(i >= 0 ? i : utils.random(0, COLS * ROWS - 1));
    };
    root.current!.querySelector(".dots")!.addEventListener("pointerdown", click);

    animate(".hero-inner", {
      opacity: [1, 0],
      y: [0, -120],
      ease: "linear",
      autoplay: onScroll({ target: root.current!, enter: "top top", leave: "top bottom", sync: true }),
    });

    return () => {
      off();
      clearInterval(loop);
    };
  });

  return (
    <section id="top" ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div
        className="dots absolute right-[-4%] top-1/2 grid -translate-y-1/2 cursor-crosshair gap-[clamp(14px,2.2vw,30px)] opacity-80 max-lg:right-[-40%] max-lg:opacity-50"
        style={{ gridTemplateColumns: `repeat(${COLS}, 4px)` }}
        aria-hidden
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <span key={i} className="dot" />
        ))}
      </div>
      <div className="hero-inner relative mx-auto w-full max-w-6xl px-4 pt-20 sm:px-8">
        <p className="font-mono text-sm text-[var(--muted)]">
          <span className="text-[var(--acc)]">ashkan@is-a-dev</span> <span className="text-[var(--info)]">~</span> %{" "}
          <span className="hero-cmd text-[var(--fg)]">whoami</span>
        </p>
        <h1 className="mt-6 font-sans text-[clamp(3.2rem,11vw,9.5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
          <span className="hero-title-line block text-[var(--dim)]">Software</span>
          <span className="block">
            <span className="hero-title-line">Developer</span>
            <span className="text-[var(--acc)] glow">.</span>
          </span>
        </h1>
        <div className="mt-10 flex max-w-2xl flex-col gap-6">
          <p className="hero-fade text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
            I&apos;m <span className="text-[var(--fg)]">Ashkan Tofangdar</span>. Always have been a software developer, always will be. I build the things that don&apos;t exist yet.
          </p>
          <div className="hero-fade flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="rounded border border-[var(--acc)] px-2.5 py-1.5 text-[var(--acc)] glow">DON&apos;T PANIC</span>
            <span className="hidden text-[var(--dim)] sm:inline">
              press <kbd className="rounded border border-[var(--line)] px-1.5 text-[var(--fg)]">~</kbd> for a shell · click the dots
            </span>
          </div>
        </div>
        <a href="#manifesto" className="hero-fade mt-16 inline-block font-mono text-xs text-[var(--dim)] hover:text-[var(--acc)]">
          <span className="cursor">cd ./quest</span>
        </a>
      </div>
    </section>
  );
}
