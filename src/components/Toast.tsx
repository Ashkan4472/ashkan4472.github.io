"use client";

import { useEffect, useRef, useState } from "react";
import { animate, spring } from "@/lib/anim";

type Msg = { title: string; body: string };
let push: (m: Msg) => void = () => {};

/** Show a short notification in the corner. */
export const toast = (title: string, body: string) => push({ title, body });

export default function Toaster() {
  const [msg, setMsg] = useState<Msg | null>(null);
  const el = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    push = (m) => {
      setMsg(m);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (el.current) animate(el.current, { x: [0, 420], opacity: [1, 0], duration: 350, ease: "in(3)", onComplete: () => setMsg(null) });
      }, 2600);
    };
  }, []);

  useEffect(() => {
    if (msg && el.current) animate(el.current, { x: [420, 0], opacity: [0, 1], ease: spring({ stiffness: 300, damping: 22 }) });
  }, [msg]);

  if (!msg) return null;
  return (
    <div ref={el} className="panel fixed bottom-6 right-4 z-[80] flex max-w-sm items-start gap-3 border-[var(--acc)] px-4 py-3 shadow-2xl" role="status">
      <span className="font-mono text-[var(--acc)] glow" aria-hidden>
        [+]
      </span>
      <span>
        <span className="block font-mono text-xs text-[var(--acc)]">{msg.title}</span>
        <span className="text-sm">{msg.body}</span>
      </span>
    </div>
  );
}
