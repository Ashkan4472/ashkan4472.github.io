"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, reducedMotion, scrambleText, stagger } from "@/lib/anim";
import { blip, initSfx } from "@/lib/sfx";
import { MatrixRain } from "./Eggs";

const hack = [
  ["$ ssh visitor@ashkan.mainframe", "fg"],
  ["connecting to 42.42.42.42:1337 ...", "dim"],
  ["bypassing firewall ................ [ ok ]", "acc"],
  ["decrypting /classified with rot13(rot13()) ... [ ok ]", "acc"],
  ["brute forcing password: ******** (it was 'coffee')", "warn"],
  ["escalating privileges ............. [ ok ]", "acc"],
  ["mounting /dev/brain (read-only) ... [ ok ]", "acc"],
] as const;

const files = [
  "Has said “it works on my machine.” It was, in fact, the only machine.",
  "Once fixed a bug by deleting a comment. Still doesn't know why.",
  "Has more unfinished side projects than finished ones. Calls it a backlog.",
  "Owns a rubber duck. The duck has strong opinions about naming.",
  "Measures coffee in a single unit: “another one.”",
  "Cooks dinner while the build runs. The build usually finishes first.",
  "Has read the docs. Sometimes even before writing the code.",
  "Knows how to exit vim. Chooses not to.",
  "Trained a language model, then argued with it for an hour. Lost.",
  "Every game hides a secret. You're standing in one.",
];

const color: Record<string, string> = { fg: "var(--fg)", dim: "var(--dim)", acc: "var(--acc)", warn: "var(--warn)" };

export default function Secret() {
  const router = useRouter();
  const [phase, setPhase] = useState<"hack" | "granted">("hack");
  const [shown, setShown] = useState(0);
  const [rain, setRain] = useState(true);
  const grant = useRef<HTMLDivElement>(null);
  const vault = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initSfx();
    if (reducedMotion()) {
      setShown(hack.length);
      setPhase("granted");
      setRain(false);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setShown(i);
      blip("hover");
      if (i >= hack.length) {
        clearInterval(t);
        setTimeout(() => setPhase("granted"), 500);
      }
    }, 380);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && router.push("/");
    addEventListener("keydown", esc);
    return () => {
      clearInterval(t);
      removeEventListener("keydown", esc);
    };
  }, [router]);

  useEffect(() => {
    if (phase !== "granted" || reducedMotion()) return;
    blip("secret");
    const tl = createTimeline({ defaults: { ease: "out(4)" } })
      .add(grant.current!, { scale: [1.4, 1], opacity: [0, 1], duration: 500 })
      .add(".granted-t", { innerHTML: scrambleText({ chars: "blocks" }), duration: 900 }, 0)
      .add(grant.current!, { x: [{ to: -6, duration: 40 }, { to: 6, duration: 40 }, { to: 0, duration: 40 }] }, 900)
      .add(".vault-head", { opacity: [0, 1], y: [16, 0], duration: 600 }, 1100)
      .add(".redact", { scaleX: [1, 0], duration: 500, delay: stagger(140), ease: "inOut(3)" }, 1300)
      .add(".file-text", { innerHTML: scrambleText({ chars: "symbols" }), duration: 700, delay: stagger(140) }, 1300)
      .call(() => setRain(false), 2200);
    return () => {
      tl.pause();
    };
  }, [phase]);

  const rescramble = (el: HTMLElement) => {
    if (!reducedMotion()) animate(el, { innerHTML: scrambleText({ chars: "01" }), duration: 500 });
  };

  return (
    <main className="relative min-h-[100svh] overflow-hidden font-mono">
      {rain && <MatrixRain duration={60000} />}
      <div className="relative z-[91] mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <div className="panel bg-[color-mix(in_srgb,var(--bg)_92%,transparent)]">
          <div className="term-head justify-between">
            <span>visitor@ashkan.mainframe — /classified</span>
            <Link href="/" className="hover:text-[var(--acc)]">
              esc ✕
            </Link>
          </div>
          <div className="space-y-1 p-5 text-sm">
            {hack.slice(0, shown).map(([l, c]) => (
              <p key={l} style={{ color: color[c] }}>
                {l}
              </p>
            ))}
            {phase === "hack" && <p className="cursor" />}
          </div>
        </div>

        {phase === "granted" && (
          <>
            <div ref={grant} className="my-14 text-center">
              <p className="granted-t text-[clamp(2.4rem,9vw,6rem)] font-bold leading-none text-[var(--acc)] glow">ACCESS GRANTED</p>
              <p className="mt-3 text-sm text-[var(--dim)]">clearance level 42 · welcome, player two</p>
            </div>

            <div ref={vault}>
              <div className="vault-head mb-6 flex flex-wrap items-baseline justify-between gap-3">
                <h1 className="font-sans text-3xl font-bold tracking-[-0.03em] text-[var(--fg)]">Classified files</h1>
                <span className="text-xs text-[var(--warn)]">{"// dev confessions · do not distribute (please distribute)"}</span>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {files.map((f, i) => (
                  <li
                    key={i}
                    tabIndex={0}
                    onMouseEnter={(e) => rescramble(e.currentTarget.querySelector(".file-text")!)}
                    onFocus={(e) => rescramble(e.currentTarget.querySelector(".file-text")!)}
                    className="panel p-4 outline-none transition-colors hover:border-[var(--acc)] focus-visible:border-[var(--acc)]"
                  >
                    <p className="mb-2 flex justify-between text-xs text-[var(--dim)]">
                      <span>FILE-{String(i + 1).padStart(4, "0")}</span>
                      <span className="text-[var(--acc)]">declassified</span>
                    </p>
                    <p className="relative text-sm leading-relaxed text-[var(--fg)]">
                      <span className="file-text">{f}</span>
                      <span className="redact absolute inset-0 origin-right bg-[var(--fg)] motion-reduce:hidden" aria-hidden />
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-sm">
                <span className="text-[var(--dim)]">
                  <span className="text-[var(--acc)]">$</span> logout
                </span>
                <Link href="/" className="rounded border border-[var(--acc)] px-4 py-2.5 text-[var(--acc)] transition-colors hover:bg-[var(--acc)] hover:text-[var(--bg)]">
                  ← exit to the main timeline
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
