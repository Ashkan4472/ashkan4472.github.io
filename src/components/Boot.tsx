"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

const lines = [
  "ASHKAN.OS  v9.0",
  "[ ok ] loading curiosity.ko",
  "[ ok ] mounting /dev/coffee",
  "[ ok ] summoning skill tree",
  "[ ok ] hiding bugs from the user",
];

export function booted() {
  window.dispatchEvent(new Event("booted"));
  (window as unknown as { __booted: boolean }).__booted = true;
}

export default function Boot() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("booted") === "1";
    } catch {}
    if (seen || reducedMotion()) {
      setShow(false);
      booted();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1700);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    const finish = () => {
      cancelAnimationFrame(raf);
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      document.documentElement.style.overflow = "";
      setShow(false);
      booted();
    };
    raf = requestAnimationFrame(tick);
    const skip = () => finish();
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const visible = Math.min(lines.length, Math.floor((pct / 100) * (lines.length + 1)));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading"
        >
          <div className="w-[min(420px,86vw)] font-mono text-sm">
            {lines.slice(0, visible).map((l, i) => (
              <motion.p
                key={l}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={i === 0 ? "mb-3 font-pixel text-[var(--gold)]" : "text-[var(--muted)]"}
              >
                {l}
              </motion.p>
            ))}
            <div className="mt-6 h-3 w-full border border-[var(--line)] p-[2px]">
              <div className="stat-fill h-full" style={{ transform: `scaleX(${pct / 100})` }} />
            </div>
            <div className="mt-2 flex justify-between font-pixel text-[11px] text-[var(--muted)]">
              <span>{pct === 42 ? "42. the answer." : "loading"}</span>
              <span>{pct}%</span>
            </div>
            <p className="mt-8 text-center font-pixel text-[11px] text-[var(--muted)] opacity-70">press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
