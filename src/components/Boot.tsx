"use client";

import { useEffect, useRef, useState } from "react";
import { animate, reducedMotion } from "@/lib/anim";

const lines = [
  "[ ok ] loading curiosity.ko",
  "[ ok ] mounting /dev/coffee",
  "[ ok ] summoning skill tree",
  "[ ok ] hiding bugs from the user",
  "[warn] luck stat below threshold",
];

export function booted() {
  (window as unknown as { __booted: boolean }).__booted = true;
  window.dispatchEvent(new Event("booted"));
}

export function whenBooted(fn: () => void) {
  if ((window as unknown as { __booted?: boolean }).__booted) fn();
  else window.addEventListener("booted", fn, { once: true });
  return () => window.removeEventListener("booted", fn);
}

export default function Boot() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const root = useRef<HTMLDivElement>(null);

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
    let done = false;
    const counter = { v: 0 };
    const load = animate(counter, { v: 100, duration: 1700, ease: "inOut(2)", onUpdate: () => setPct(Math.round(counter.v)), onComplete: () => finish() });
    function finish() {
      if (done) return;
      done = true;
      load.pause();
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      document.documentElement.style.overflow = "";
      booted();
      if (root.current)
        animate(root.current, { translateY: "-100%", duration: 700, ease: "inOut(4)", onComplete: () => setShow(false) });
      else setShow(false);
    }
    const skip = () => finish();
    addEventListener("keydown", skip, { once: true });
    addEventListener("pointerdown", skip, { once: true });
    return () => {
      load.pause();
      removeEventListener("keydown", skip);
      removeEventListener("pointerdown", skip);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!show) return null;
  const visible = Math.min(lines.length, Math.floor((pct / 100) * (lines.length + 1)));
  const blocks = Math.round(pct / 4);

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]" role="status" aria-label="Loading">
      <div className="w-[min(460px,88vw)] font-mono text-sm">
        <p className="mb-4 text-[var(--acc)] glow">ASHKAN.OS v9.0 · tty1</p>
        {lines.slice(0, visible).map((l) => (
          <p key={l} className={l.startsWith("[warn]") ? "text-[var(--warn)]" : "text-[var(--muted)]"}>
            {l}
          </p>
        ))}
        <p className="mt-6 whitespace-pre text-[var(--acc)]">
          [{"█".repeat(blocks)}
          <span className="text-[var(--dim)]">{"░".repeat(25 - blocks)}</span>] {String(pct).padStart(3, " ")}%
        </p>
        <p className="mt-2 text-xs text-[var(--dim)]">{pct === 42 ? "42. the answer." : "press any key to skip"}</p>
      </div>
    </div>
  );
}
