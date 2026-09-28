"use client";

import { useRef } from "react";
import { sheet, stats } from "@/content/data";
import { animate, createAnimatable, createTimeline, onScroll, onceInView, scrambleText, stagger, useAnime } from "@/lib/anim";
import { blip } from "@/lib/sfx";

export function SectionHead({ cmd, title, sub }: { cmd: string; title: string; sub?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useAnime(root, () => {
    const tl = createTimeline({ autoplay: onScroll(onceInView(root.current!)) })
      .add(".sh-cmd", { innerHTML: scrambleText({ chars: "01" }), duration: 500 })
      .add(".sh-title", { innerHTML: scrambleText(), duration: 900, opacity: [0, 1] }, 100);
    if (sub) tl.add(".sh-sub", { opacity: [0, 1], y: [10, 0], duration: 600, ease: "out(3)" }, 400);
  });
  return (
    <div ref={root} className="mb-12 max-w-3xl">
      <p className="sh-cmd label mb-4">$ {cmd}</p>
      <h2 className="sh-title font-sans text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.035em]">{title}</h2>
      {sub && <p className="sh-sub mt-4 text-lg text-[var(--muted)]">{sub}</p>}
    </div>
  );
}

export default function Sheet() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const years = new Date().getFullYear() - 2017;

  useAnime(root, () => {
    const trigger = () => onScroll(onceInView(".sheet-grid"));
    animate(".sheet-row", { opacity: [0, 1], x: [-12, 0], delay: stagger(55), duration: 500, ease: "out(3)", autoplay: trigger() });
    animate(".stat-bar", {
      scaleX: [0, 1],
      delay: stagger(110),
      duration: 1300,
      ease: "out(4)",
      autoplay: onScroll({ ...onceInView(".sheet-grid"), onEnter: () => blip("click") }),
    });
    root.current!.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
      const v = { n: 0 };
      animate(v, { n: Number(el.dataset.value), duration: 1300, ease: "out(4)", modifier: Math.round, onUpdate: () => (el.textContent = String(v.n)), autoplay: trigger() });
    });

    const tilt = createAnimatable(card.current!, { rotateX: 400, rotateY: 400, ease: "out(3)" });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = card.current!.getBoundingClientRect();
      tilt.rotateY(((e.clientX - r.left) / r.width - 0.5) * 12);
      tilt.rotateX(-((e.clientY - r.top) / r.height - 0.5) * 10);
    };
    const leave = () => {
      tilt.rotateX(0);
      tilt.rotateY(0);
    };
    card.current!.addEventListener("pointermove", move);
    card.current!.addEventListener("pointerleave", leave);
    return () => {
      card.current?.removeEventListener("pointermove", move);
      card.current?.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <section id="sheet" ref={root} className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHead cmd="cat character.yaml" title="Meet the player." sub="Stats are self-reported. The luck stat is painfully honest." />
        <div className="sheet-grid grid gap-6 lg:grid-cols-[1.1fr_1fr]" style={{ perspective: 900 }}>
          <div ref={card} className="panel">
            <div className="term-head">
              <span className="flex gap-1.5" aria-hidden>
                <i className="h-2.5 w-2.5 rounded-full bg-[var(--err)]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[var(--warn)]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[var(--acc)]" />
              </span>
              <span className="ml-2">character.yaml</span>
            </div>
            <dl className="space-y-2.5 p-6 font-mono text-sm sm:p-8 sm:text-[15px]">
              {sheet.map(([k, v, c]) => (
                <div key={k} className="sheet-row flex flex-wrap gap-x-3">
                  <dt className="w-28 shrink-0 text-[var(--info)]">{k}:</dt>
                  <dd>
                    <span className="text-[var(--warn)]">{v}</span>
                    {c && <span className="ml-3 text-[var(--dim)]"># {c}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="panel">
            <div className="term-head">
              <span>$ htop --player</span>
            </div>
            <ul className="space-y-5 p-6 sm:p-8">
              {stats.map((s) => (
                <li key={s.key}>
                  <div className="mb-2 flex items-baseline justify-between font-mono text-sm">
                    <span>
                      <span className="mr-3 font-bold text-[var(--acc)]">{s.key}</span>
                      <span className="text-[var(--fg)]">{s.label}</span>
                    </span>
                    <span className="text-[var(--dim)]">
                      <span className="stat-num" data-value={s.value}>
                        {s.value}
                      </span>
                      /100
                    </span>
                  </div>
                  <div className="h-2.5 w-full border border-[var(--line)] p-[2px]">
                    <div
                      className="stat-bar bar h-full"
                      style={{ width: `${s.value}%`, background: s.key === "LCK" ? "repeating-linear-gradient(90deg, var(--err) 0 6px, transparent 6px 8px)" : undefined }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mx-6 border-t border-[var(--line)] pb-6 pt-5 sm:mx-8 sm:pb-8">
              <div className="mb-2 flex justify-between font-mono text-xs text-[var(--dim)]">
                <span>xp since 2017</span>
                <span>{years}y · next level loading</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--bg-2)]">
                <div className="stat-bar h-full bg-[var(--acc)]" style={{ width: "92%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
