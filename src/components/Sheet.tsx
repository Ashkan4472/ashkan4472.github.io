"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { sheet, stats } from "@/content/data";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";
import { blip } from "@/lib/sfx";

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="reveal mb-12 max-w-3xl">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] tracking-[-0.01em]">{title}</h2>
      {sub && <p className="mt-4 text-lg text-[var(--muted)]">{sub}</p>}
    </div>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 15 });
  return (
    <motion.div
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="panel frame p-6 sm:p-8"
    >
      {children}
    </motion.div>
  );
}

export default function Sheet() {
  const root = useRef<HTMLElement>(null);
  const years = new Date().getFullYear() - 2017;

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const st = { trigger: ".sheet-grid", start: "top 75%" };
      gsap.from(".sheet-row", { opacity: 0, x: -14, stagger: 0.06, duration: 0.5, ease: "power2.out", scrollTrigger: st });
      gsap.from(".stat-bar", {
        scaleX: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { ...st, onEnter: () => blip("click") },
      });
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const v = { n: 0 };
        gsap.to(v, {
          n: Number(el.dataset.value),
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: st,
          onUpdate: () => (el.textContent = String(Math.round(v.n))),
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="sheet" ref={root} className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHead eyebrow="Chapter 1 · Character sheet" title="Meet the player." sub="Stats are self-reported. The luck stat is painfully honest." />
        <div className="sheet-grid grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <TiltCard>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-pixel text-xs text-[var(--muted)]">character.yaml</span>
              <span className="flex gap-1.5" aria-hidden>
                <i className="h-2.5 w-2.5 rounded-full bg-[var(--hp)]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[var(--jade)]" />
              </span>
            </div>
            <dl className="space-y-2.5 font-mono text-[15px]">
              {sheet.map(([k, v, c]) => (
                <div key={k} className="sheet-row flex flex-wrap gap-x-3">
                  <dt className="w-28 shrink-0 text-[var(--mana)]">{k}:</dt>
                  <dd>
                    {v}
                    {c && <span className="ml-3 text-[var(--muted)]"># {c}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </TiltCard>

          <div className="panel p-6 sm:p-8">
            <p className="mb-6 font-pixel text-xs text-[var(--muted)]">attributes</p>
            <ul className="space-y-5">
              {stats.map((s) => (
                <li key={s.key}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span>
                      <span className="mr-3 font-pixel text-sm text-[var(--gold)]">{s.key}</span>
                      <span className="text-[var(--fg)]">{s.label}</span>
                    </span>
                    <span className="font-mono text-sm text-[var(--muted)]">
                      <span className="stat-num" data-value={s.value}>{s.value}</span>/100
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-sm border border-[var(--line)] p-[2px]">
                    <div className="stat-bar stat-fill h-full" style={{ width: `${s.value}%`, background: s.key === "LCK" ? "repeating-linear-gradient(90deg, var(--hp) 0 8px, transparent 8px 10px)" : undefined }} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-[var(--line)] pt-6">
              <div className="mb-2 flex justify-between font-pixel text-[11px] text-[var(--muted)]">
                <span>XP since 2017</span>
                <span>{years} years · next level loading</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-2)]">
                <div className="stat-bar h-full rounded-full" style={{ width: "92%", background: "linear-gradient(90deg, var(--mana), var(--gold))" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
