"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile, quests, skillTree } from "@/content/data";
import { blip } from "@/lib/sfx";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function MatrixRain({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const c = cv.getContext("2d")!;
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    const size = 16;
    const cols = Math.ceil(cv.width / size);
    const drops = Array.from({ length: cols }, () => Math.random() * -40);
    const glyphs = "アカサタナハマヤラワ0123456789ASHKAN42";
    let raf = 0;
    const tick = () => {
      c.fillStyle = "rgba(0,0,0,0.08)";
      c.fillRect(0, 0, cv.width, cv.height);
      c.fillStyle = "#5ee6a8";
      c.font = `${size}px monospace`;
      drops.forEach((d, i) => {
        c.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, d * size);
        drops[i] = d * size > cv.height && Math.random() > 0.975 ? 0 : d + 1;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t = setTimeout(onDone, 4500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [onDone]);
  return (
    <motion.canvas
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-[90]"
      aria-hidden
    />
  );
}

type Line = { t: "in" | "out"; s: string };

const commands: Record<string, () => string> = {
  help: () => "commands: whoami, skills, quests, contact, sudo make coffee, 42, matrix, theme, clear, exit",
  whoami: () => "software developer. always have been, always will be.",
  skills: () => skillTree.map((b) => `├─ ${b.branch.toLowerCase()} (${b.skills.length})`).join("\n"),
  quests: () => quests.map((q) => `${q.to === "Present" ? "●" : "✓"} ${q.company.padEnd(20)} ${q.from} → ${q.to}`).join("\n"),
  contact: () => `${profile.email}\n${profile.links.map((l) => l.href).join("\n")}`,
  "sudo make coffee": () => "☕ brewing... done. productivity +42%.",
  "make coffee": () => "permission denied. try sudo.",
  "42": () => "the answer. the question is still loading.",
  "rm -rf /": () => "nice try.",
  vim: () => "you're already in my heart. :q to exit (it won't work).",
  ls: () => "curiosity/  coffee/  worlds/  models/  todo.txt",
  "cat todo.txt": () => "1. build everything\n2. ship it\n3. repeat",
};

function Terminal({ onClose, onMatrix }: { onClose: () => void; onMatrix: () => void }) {
  const [lines, setLines] = useState<Line[]>([{ t: "out", s: "ashkan.os terminal. type 'help'." }]);
  const [val, setVal] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => input.current?.focus(), []);
  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    blip("click");
    if (cmd === "clear") return setLines([]);
    if (cmd === "exit") return onClose();
    if (cmd === "matrix") {
      onMatrix();
      return setLines((l) => [...l, { t: "in", s: raw }, { t: "out", s: "wake up, neo..." }]);
    }
    if (cmd === "theme") {
      document.getElementById("theme-toggle")?.click();
    }
    const out = commands[cmd]?.() ?? (cmd === "theme" ? "toggled." : `command not found: ${cmd}. these aren't the commands you're looking for.`);
    setLines((l) => [...l, { t: "in", s: raw }, { t: "out", s: out }]);
  };

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed inset-x-0 top-0 z-[95] border-b border-[var(--gold)] bg-[color-mix(in_srgb,var(--bg)_94%,transparent)] backdrop-blur"
      role="dialog"
      aria-label="Terminal"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="mx-auto max-w-4xl px-4 py-4 font-mono text-sm sm:px-8">
        <div className="mb-2 flex justify-between text-[var(--muted)]">
          <span>~/ashkan</span>
          <button onClick={onClose} className="cursor-pointer hover:text-[var(--gold)]" aria-label="Close terminal">
            esc ✕
          </button>
        </div>
        <div ref={body} className="max-h-[40vh] overflow-y-auto whitespace-pre-wrap">
          {lines.map((l, i) => (
            <p key={i} className={l.t === "in" ? "text-[var(--gold)]" : "text-[var(--fg)]"}>
              {l.t === "in" ? `$ ${l.s}` : l.s}
            </p>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(val);
            setVal("");
          }}
          className="mt-2 flex items-center gap-2"
        >
          <span className="text-[var(--gold)]">$</span>
          <input
            ref={input}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="flex-1 bg-transparent outline-none focus-visible:outline-none"
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </motion.div>
  );
}

export default function Eggs() {
  const [term, setTerm] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [god, setGod] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let seq: string[] = [];
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        setTerm((t) => !t);
        blip("boot");
        return;
      }
      seq = [...seq, e.key].slice(-KONAMI.length);
      if (seq.join() === KONAMI.join()) {
        seq = [];
        setGod(true);
        setMatrix(true);
        blip("secret");
        document.documentElement.classList.add("god");
        setTimeout(() => setGod(false), 4500);
        setTimeout(() => document.documentElement.classList.remove("god"), 12000);
      }
      typed = (typed + e.key).slice(-2);
      if (typed === "42") {
        setMsg("42. The answer to life, the universe and everything. The question is still compiling.");
        blip("unlock");
        setTimeout(() => setMsg(null), 3500);
      }
    };
    window.addEventListener("keydown", onKey);
    console.log(
      "%cDon't Panic.%c\nYou found the console. Try ~ for a terminal, or ↑↑↓↓←→←→BA.",
      "font: 700 20px serif; color: #f2c14e",
      "color: inherit",
    );
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnimatePresence>{term && <Terminal onClose={() => setTerm(false)} onMatrix={() => setMatrix(true)} />}</AnimatePresence>
      <AnimatePresence>{matrix && <MatrixRain onDone={() => setMatrix(false)} />}</AnimatePresence>
      <AnimatePresence>
        {(god || msg) && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="pointer-events-none fixed inset-0 z-[96] grid place-items-center px-6"
            role="status"
          >
            <div className="panel frame max-w-lg p-8 text-center shadow-2xl">
              <p className="font-pixel text-xs text-[var(--gold)]">{god ? "Cheat code accepted" : "Easter egg found"}</p>
              <p className={`mt-3 font-display ${god ? "text-4xl" : "text-2xl"}`}>{god ? "God mode enabled." : msg}</p>
              {god && <p className="mt-2 text-[var(--muted)]">All stats set to 99. Even luck. Deploy on Friday at your own risk.</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
