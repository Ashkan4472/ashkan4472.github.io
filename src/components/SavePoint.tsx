"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { profile } from "@/content/data";
import { gsap, reducedMotion, SplitText, useGSAP } from "@/lib/gsap";
import { blip } from "@/lib/sfx";

function Magnetic({ children, href }: { children: React.ReactNode; href: string }) {
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.a
      href={href}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onMouseEnter={() => blip("hover")}
      onClick={() => blip("click")}
      className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[var(--gold)] px-8 py-4 text-lg font-medium text-[var(--bg)] shadow-[0_0_40px_var(--glow)]"
    >
      {children}
    </motion.a>
  );
}

export default function SavePoint() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const split = new SplitText(".save-title", { type: "chars", charsClass: "inline-block" });
      gsap.from(split.chars, {
        opacity: 0,
        yPercent: 80,
        rotate: 8,
        stagger: 0.03,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      gsap.from(".save-fade", { opacity: 0, y: 16, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: root.current, start: "top 55%" } });
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section id="save" ref={root} className="relative overflow-hidden pb-12 pt-28 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]" style={{ background: "radial-gradient(ellipse at 50% 100%, var(--glow), transparent 70%)" }} aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-8">
        <p className="save-fade eyebrow mb-6">Save point · Side quests welcome</p>
        <h2 className="save-title font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
          Save your <span className="italic text-[var(--gold)]">game?</span>
        </h2>
        <p className="save-fade mx-auto mt-6 max-w-xl text-lg text-[var(--muted)]">
          Open to collaborating on open-source projects. Bring your weirdest idea. These aren&apos;t the bugs you&apos;re looking for, but I&apos;ll fix them anyway.
        </p>
        <div className="save-fade mt-10">
          <Magnetic href={`mailto:${profile.email}`}>
            {profile.email}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Magnetic>
        </div>
        <ul className="save-fade mt-10 flex flex-wrap justify-center gap-3">
          {profile.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => blip("hover")}
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 text-[var(--fg)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <footer className="mt-32 flex flex-col items-center justify-between gap-3 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)] sm:flex-row">
          <p className="font-display italic">Not all those who wander are lost. Some of them are just debugging.</p>
          <p className="font-pixel text-[10px]">© {new Date().getFullYear()} Ashkan Tofangdar · ↑↑↓↓←→←→BA</p>
        </footer>
      </div>
    </section>
  );
}
