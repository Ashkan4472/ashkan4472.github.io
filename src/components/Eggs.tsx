"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { blip } from "@/lib/sfx";
import Shell from "./Shell";
import { toast } from "./Toast";

export const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** Calls `fn` when the Konami code is typed. */
export function useKonami(fn: () => void) {
  const cb = useRef(fn);
  cb.current = fn;
  useEffect(() => {
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      seq = [...seq, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      if (seq.join() === KONAMI.join()) {
        seq = [];
        cb.current();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);
}

export function MatrixRain({ onDone, duration = 4500 }: { onDone?: () => void; duration?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    const cv = ref.current!;
    const c = cv.getContext("2d")!;
    cv.width = innerWidth;
    cv.height = innerHeight;
    const size = 16;
    const drops = Array.from({ length: Math.ceil(cv.width / size) }, () => Math.random() * -40);
    const glyphs = "アカサタナハマヤラワ0123456789ASHKAN42<>{}";
    let raf = 0;
    const tick = () => {
      c.fillStyle = "rgba(10,13,11,0.1)";
      c.fillRect(0, 0, cv.width, cv.height);
      c.fillStyle = "#39ff88";
      c.font = `${size}px monospace`;
      drops.forEach((d, i) => {
        c.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, d * size);
        drops[i] = d * size > cv.height && Math.random() > 0.975 ? 0 : d + 1;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t = setTimeout(() => done.current?.(), duration);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [duration]);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[90] opacity-90" aria-hidden />;
}

export default function Eggs() {
  const router = useRouter();
  const [shell, setShell] = useState(false);
  const [matrix, setMatrix] = useState(false);

  useKonami(() => {
    blip("secret");
    router.push("/secret");
  });

  useEffect(() => {
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        setShell((s) => !s);
        blip("boot");
        return;
      }
      typed = (typed + e.key).slice(-2);
      if (typed === "42") {
        toast("easter egg found", "42. The answer to life, the universe and everything. The question is still compiling.");
        blip("unlock");
      }
    };
    addEventListener("keydown", onKey);
    console.log("%cDon't Panic.%c\nYou found the console. Try ~ for a shell, or ↑↑↓↓←→←→BA.", "font: 700 20px monospace; color: #39ff88", "color: inherit");
    return () => removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {shell && <Shell onClose={() => setShell(false)} onMatrix={() => setMatrix(true)} />}
      {matrix && <MatrixRain onDone={() => setMatrix(false)} />}
    </>
  );
}
