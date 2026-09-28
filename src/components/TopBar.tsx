"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { blip, initSfx, onSfx, setSfx, sfxEnabled } from "@/lib/sfx";

const nav = [
  ["Sheet", "#sheet"],
  ["Skills", "#skills"],
  ["Quests", "#quests"],
  ["Trophies", "#trophies"],
  ["Save", "#save"],
];

export default function TopBar() {
  const { scrollYProgress } = useScroll();
  const xp = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [sound, setSound] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const off = onSfx(setSound);
    initSfx();
    setLight(document.documentElement.dataset.theme === "light");
    return () => {
      off();
    };
  }, []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    if (next) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
    blip("click");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-md">
      <motion.div className="stat-fill h-[3px]" style={{ scaleX: xp }} aria-hidden />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" onMouseEnter={() => blip("hover")}>
          <span className="grid h-9 w-9 place-items-center rounded-md border border-[var(--line)] bg-[var(--surface)] font-pixel text-xs text-[var(--gold)] transition group-hover:border-[var(--gold)]">
            AT
          </span>
          <span className="hidden font-pixel text-[11px] text-[var(--muted)] sm:block">LVL 9+ · XP</span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] px-2 py-1 backdrop-blur md:flex">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onMouseEnter={() => blip("hover")}
              className="rounded-full px-3 py-1.5 text-sm text-[var(--muted)] transition hover:bg-[var(--bg-2)] hover:text-[var(--fg)]"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSfx(!sfxEnabled())}
            aria-pressed={sound}
            aria-label={sound ? "Mute sound effects" : "Enable sound effects"}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              {sound ? (
                <>
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M19 5a10 10 0 0 1 0 14" />
                </>
              ) : (
                <path d="m22 9-6 6M16 9l6 6" />
              )}
            </svg>
          </button>
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
        </div>
      </div>
    </header>
  );
}
