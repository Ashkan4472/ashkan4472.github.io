"use client";

import { useEffect, useRef, useState } from "react";
import { animate, spring, reducedMotion } from "@/lib/anim";
import { blip, initSfx, onSfx, setSfx, sfxEnabled } from "@/lib/sfx";
import { isLight, onTheme, setTheme } from "@/lib/theme";

export const sections = [
  ["top", "init"],
  ["manifesto", "lore"],
  ["sheet", "sheet"],
  ["skills", "skills"],
  ["quests", "quests"],
  ["trophies", "trophies"],
  ["camp", "camp"],
  ["save", "save"],
] as const;

const railSpring = spring({ stiffness: 220, damping: 16 });

export default function SideRail() {
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  const [light, setLight] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const ticks = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const offS = onSfx(setSound);
    const offT = onTheme(setLight);
    initSfx();
    setLight(isLight());

    const els = sections.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement));
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleY(${max > 0 ? scrollY / max : 0})`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      offS();
      offT();
      io.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    ticks.current.forEach((t, i) => {
      if (!t) return;
      const on = i === active;
      if (reducedMotion()) t.style.width = on ? "28px" : "10px";
      else animate(t, { width: on ? 28 : 10, ease: railSpring });
    });
  }, [active]);

  const btn =
    "grid h-9 w-9 cursor-pointer place-items-center rounded border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition-colors hover:border-[var(--acc)] hover:text-[var(--acc)]";

  const controls = (
    <>
      <button onClick={() => setSfx(!sfxEnabled())} aria-pressed={sound} aria-label={sound ? "Mute sound effects" : "Enable sound effects"} className={btn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M11 5 6 9H2v6h4l5 4V5z" />
          {sound ? <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /> : <path d="m22 9-6 6M16 9l6 6" />}
        </svg>
      </button>
      <button
        onClick={() => {
          setTheme(!isLight());
          blip("click");
        }}
        aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
        className={btn}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {light ? (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </>
          )}
        </svg>
      </button>
    </>
  );

  return (
    <>
      {/* desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-40 flex-col justify-between py-8 pl-8 lg:flex" aria-label="Page sections">
        <a href="#top" className="font-mono text-sm text-[var(--acc)] glow" onMouseEnter={() => blip("hover")}>
          ~/ashkan
        </a>
        <nav className="relative">
          <div className="absolute -left-4 top-0 h-full w-px bg-[var(--line)]" aria-hidden>
            <div ref={progress} className="h-full w-px origin-top bg-[var(--acc)]" />
          </div>
          <ul className="space-y-3">
            {sections.map(([id, label], i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onMouseEnter={() => blip("hover")}
                  aria-current={i === active ? "true" : undefined}
                  className={`group flex items-center gap-3 font-mono text-xs transition-colors ${i === active ? "text-[var(--acc)]" : "text-[var(--dim)] hover:text-[var(--fg)]"}`}
                >
                  <span className="w-5 tabular-nums">{String(i).padStart(2, "0")}</span>
                  <span
                    ref={(el) => {
                      ticks.current[i] = el;
                    }}
                    className="block h-px w-[10px] bg-current"
                    aria-hidden
                  />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">{controls}</div>
      </aside>

      {/* mobile: controls top-right, ticks on the right edge */}
      <div className="fixed right-3 top-3 z-50 flex gap-2 lg:hidden">{controls}</div>
      <nav className="fixed right-2 top-1/2 z-50 flex -translate-y-1/2 flex-col items-end gap-2.5 lg:hidden" aria-label="Page sections">
        {sections.map(([id, label], i) => (
          <a key={id} href={`#${id}`} aria-label={label} className="flex h-4 items-center">
            <span className={`block h-px transition-all duration-300 ${i === active ? "w-5 bg-[var(--acc)]" : "w-2 bg-[var(--dim)]"}`} />
          </a>
        ))}
      </nav>
    </>
  );
}
