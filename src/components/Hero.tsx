"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion, SplitText, useGSAP } from "@/lib/gsap";

function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const c = canvas.getContext("2d")!;
    const still = reducedMotion();
    let w = 0, h = 0, raf = 0;
    let mx = 0, my = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2,
      tw: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };

    const draw = (t: number) => {
      const s = getComputedStyle(document.documentElement);
      const fg = s.getPropertyValue("--fg").trim();
      const gold = s.getPropertyValue("--gold").trim();
      c.clearRect(0, 0, w, h);
      for (const st of stars) {
        if (!still) st.y -= 0.00004 * st.z * 16;
        if (st.y < 0) st.y = 1;
        const x = st.x * w + mx * 40 * st.z;
        const y = st.y * h + my * 40 * st.z;
        const a = 0.25 + 0.55 * st.z * (0.6 + 0.4 * Math.sin(t / 700 + st.tw));
        c.globalAlpha = a;
        c.fillStyle = st.z > 0.93 ? gold : fg;
        const size = st.z * 1.8;
        c.fillRect(x, y, size, size);
      }
      c.globalAlpha = 1;
      if (!still) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const split = new SplitText(".hero-title", { type: "chars,words", charsClass: "inline-block" });
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(split.chars, { yPercent: 110, rotateX: -60, opacity: 0, duration: 1.1, stagger: 0.035 })
        .from(".hero-fade", { y: 16, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.7")
        .from(".hero-line", { scaleX: 0, duration: 1, ease: "power3.inOut" }, "<");

      const play = () => tl.play();
      if ((window as unknown as { __booted?: boolean }).__booted) play();
      else window.addEventListener("booted", play, { once: true });

      gsap.to(".hero-inner", {
        yPercent: -18,
        opacity: 0,
        scale: 0.94,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      return () => {
        window.removeEventListener("booted", play);
        split.revert();
      };
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <Starfield />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow), transparent 65%)" }}
        aria-hidden
      />
      <div className="hero-inner relative mx-auto w-full max-w-7xl px-4 pt-24 sm:px-8">
        <p className="hero-fade eyebrow mb-6">Player one · Level 9+ · Class: Software Developer</p>
        <h1 className="hero-title font-display text-[clamp(3.6rem,13vw,11.5rem)] leading-[0.88] tracking-[-0.02em]" style={{ perspective: 600 }}>
          <span className="block italic text-[var(--muted)]">Software</span>
          <span className="block">Developer.</span>
        </h1>
        <div className="hero-line mt-8 h-px w-full origin-left bg-[var(--line)]" />
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="hero-fade max-w-md text-lg text-[var(--muted)]">
            I&apos;m <span className="text-[var(--fg)]">Ashkan Tofangdar</span>. Always have been one. Always will be. I build the things that don&apos;t exist yet.
          </p>
          <div className="hero-fade flex items-center gap-3">
            <span className="rounded-md border border-[var(--gold)] px-3 py-1.5 font-pixel text-xs text-[var(--gold)]">Don&apos;t Panic</span>
            <span className="hidden font-mono text-xs text-[var(--muted)] sm:inline">press <kbd className="rounded border border-[var(--line)] px-1.5">~</kbd> for a terminal</span>
          </div>
        </div>
        <a href="#manifesto" className="hero-fade mt-16 inline-flex items-center gap-3 font-pixel text-[11px] text-[var(--muted)] hover:text-[var(--gold)]">
          <span className="relative block h-9 w-5 rounded-full border border-current">
            <span className="absolute left-1/2 top-2 h-1.5 w-1 -translate-x-1/2 animate-bounce rounded-full bg-current" />
          </span>
          scroll to start the quest
        </a>
      </div>
    </section>
  );
}
