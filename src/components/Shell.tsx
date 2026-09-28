"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { profile, quests, sheet, skillTree } from "@/content/data";
import { animate } from "@/lib/anim";
import { blip, setSfx } from "@/lib/sfx";
import { isLight, setTheme } from "@/lib/theme";
import { sections } from "./SideRail";

type Ctx = { close: () => void; matrix: () => void; go: (path: string) => void; history: string[] };
type Cmd = { desc: string; args?: string[]; run: (args: string[], ctx: Ctx) => ReactNode | void };

const G = ({ children }: { children: ReactNode }) => <span className="text-[var(--acc)]">{children}</span>;
const D = ({ children }: { children: ReactNode }) => <span className="text-[var(--dim)]">{children}</span>;
const Y = ({ children }: { children: ReactNode }) => <span className="text-[var(--warn)]">{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className="text-[var(--info)]">{children}</span>;

const files: Record<string, () => ReactNode> = {
  "lore.txt": () => "My favorite moment is right before something exists.\nNeed a tool? I write it. A model? I train it. A world? I build it.",
  "character.yaml": () => sheet.map(([k, v, c]) => (
    <div key={k}>
      <C>{k}:</C> <Y>{v}</Y> {c && <D># {c}</D>}
    </div>
  )),
  "skills.md": () => skillTree.map((b) => `## ${b.branch}\n${b.skills.join(", ")}`).join("\n\n"),
  "quests.log": () => quests.map((q) => `${q.to === "Present" ? "[running]" : "[exited ]"} ${q.company.padEnd(20)} ${q.from} → ${q.to}  ${q.role}`).join("\n"),
  "todo.txt": () => "1. build everything\n2. ship it\n3. repeat\n4. sleep (optional)",
  "contact.txt": () => [profile.email, ...profile.links.map((l) => l.href)].join("\n"),
  ".secret": () => "↑ ↑ ↓ ↓ ← → ← → B A",
};

const links = Object.fromEntries(profile.links.map((l) => [l.label.toLowerCase(), l.href]));
const sectionIds = sections.map(([, label]) => label);

const commands: Record<string, Cmd> = {
  help: {
    desc: "list commands",
    run: () => (
      <div className="grid grid-cols-[9rem_1fr] gap-x-4">
        {Object.entries(commands).map(([n, c]) => (
          <div key={n} className="contents">
            <G>{n}</G>
            <D>{c.desc}</D>
          </div>
        ))}
        <div className="col-span-2 mt-2">
          <D>tab completes · → accepts suggestion · ↑↓ history · ctrl+l clears · esc closes</D>
        </div>
      </div>
    ),
  },
  whoami: { desc: "who is this", run: () => "software developer. always have been, always will be." },
  neofetch: {
    desc: "system info",
    run: () => (
      <div className="flex flex-wrap gap-6">
        <pre className="text-[var(--acc)] glow">{`   ▄▄▄▄
  █▀  ▀█
  █▄▄▄▄█
  █    █
  ▀    ▀`}</pre>
        <div>
          <div>
            <G>ashkan</G>@<G>is-a-dev</G>
          </div>
          <D>-----------------</D>
          {[
            ["OS", "ashkan.os v9.0 (since 2017)"],
            ["Shell", "zsh (with too many aliases)"],
            ["Editor", "neovim (btw)"],
            ["Uptime", `${new Date().getFullYear() - 2017} years`],
            ["Packages", `${skillTree.reduce((n, b) => n + b.skills.length, 0)} skills`],
            ["Fuel", "coffee, ∞ cups"],
            ["Location", "Tehran, Iran"],
          ].map(([k, v]) => (
            <div key={k}>
              <C>{k}</C>: {v}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  ls: {
    desc: "list files",
    args: ["-a", "-la"],
    run: (a) =>
      Object.keys(files)
        .filter((f) => !f.startsWith(".") || a[0]?.includes("a"))
        .join("   "),
  },
  cat: { desc: "print a file", args: Object.keys(files), run: (a) => (a[0] ? (files[a[0]]?.() ?? `cat: ${a[0]}: No such file or directory`) : "usage: cat <file>") },
  cd: {
    desc: "jump to a section",
    args: sectionIds,
    run: (a, ctx) => {
      const i = sectionIds.indexOf(a[0] as (typeof sectionIds)[number]);
      if (i < 0) return `cd: no such section: ${a[0] ?? ""}. try: ${sectionIds.join(" ")}`;
      ctx.close();
      setTimeout(() => document.getElementById(sections[i][0])?.scrollIntoView({ behavior: "smooth" }), 250);
    },
  },
  open: {
    desc: "open a link",
    args: Object.keys(links),
    run: (a) => {
      const href = links[a[0]];
      if (!href) return `open: unknown target. try: ${Object.keys(links).join(" ")}`;
      window.open(href, "_blank", "noopener");
      return `opening ${href}`;
    },
  },
  mail: { desc: "write to me", run: () => ((location.href = `mailto:${profile.email}`), `composing to ${profile.email}…`) },
  theme: {
    desc: "switch theme",
    args: ["dark", "light"],
    run: (a) => {
      const light = a[0] ? a[0] === "light" : !isLight();
      setTheme(light);
      return `theme: ${light ? "light" : "dark"}`;
    },
  },
  sound: {
    desc: "toggle sound fx",
    args: ["on", "off"],
    run: (a) => {
      setSfx(a[0] !== "off");
      return `sound: ${a[0] === "off" ? "off" : "on"}`;
    },
  },
  history: { desc: "command history", run: (_, ctx) => ctx.history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n") || "empty" },
  echo: { desc: "print text", run: (a) => a.join(" ") },
  date: { desc: "current date", run: () => new Date().toString() },
  sudo: {
    desc: "do it as root",
    args: ["make", "rm"],
    run: (a) => (a.join(" ") === "make coffee" ? "☕ brewing... done. productivity +42%." : a[0] === "rm" ? "nice try." : `[sudo] password for visitor: ******\nvisitor is not in the sudoers file. This incident will be reported.`),
  },
  make: { desc: "build something", args: ["coffee", "game", "world"], run: (a) => (a[0] === "coffee" ? "make: *** permission denied. try sudo." : `make: building ${a[0] ?? "everything"}... ✓ done (it compiled on the first try, suspicious)`) },
  matrix: { desc: "follow the white rabbit", run: (_, ctx) => (ctx.matrix(), "wake up, neo...") },
  secret: { desc: "???", run: (_, ctx) => (ctx.go("/secret"), "decrypting… access granted.") },
  vim: { desc: "the editor", run: () => "you're already in my heart. :q won't help you here." },
  exit: { desc: "close shell", run: (_, ctx) => ctx.close() },
  clear: { desc: "clear screen", run: () => undefined },
};

const names = Object.keys(commands);

function tokens(s: string) {
  return s.match(/"[^"]*"?|'[^']*'?|\S+|\s+/g) ?? [];
}

/** zsh-syntax-highlighting, roughly: known command green, unknown red, flags cyan, strings yellow. */
function Highlight({ value }: { value: string }) {
  let first = true;
  return (
    <>
      {tokens(value).map((t, i) => {
        if (/^\s+$/.test(t)) return <span key={i}>{t}</span>;
        let cls = "text-[var(--fg)]";
        if (first) {
          const partial = names.some((n) => n.startsWith(t));
          cls = names.includes(t) ? "text-[var(--acc)]" : partial ? "text-[var(--fg)] underline decoration-dotted" : "text-[var(--err)]";
          first = false;
        } else if (/^["']/.test(t)) cls = "text-[var(--warn)]";
        else if (t.startsWith("-")) cls = "text-[var(--info)]";
        else if (/^(\||&&|;)$/.test(t)) cls = "text-[var(--warn)]";
        return (
          <span key={i} className={cls}>
            {t}
          </span>
        );
      })}
    </>
  );
}

function candidates(value: string) {
  const parts = value.split(/\s+/);
  const cur = parts[parts.length - 1];
  const pool = parts.length === 1 ? names : (commands[parts[0]]?.args ?? []);
  return { cur, items: pool.filter((p) => p.startsWith(cur)) };
}

function commonPrefix(xs: string[]) {
  let p = xs[0];
  for (const x of xs) while (!x.startsWith(p)) p = p.slice(0, -1);
  return p;
}

type Entry = { cmd: string; out: ReactNode };

export default function Shell({ onClose, onMatrix }: { onClose: () => void; onMatrix: () => void }) {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([
    { cmd: "", out: <D>zsh 5.9 · ashkan.os — type <G>help</G>, or hit tab to autocomplete</D> },
  ]);
  const [val, setVal] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const [menu, setMenu] = useState<{ items: string[]; i: number; base: string } | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const close = () => {
    if (box.current) animate(box.current, { translateY: "-105%", duration: 300, ease: "in(3)", onComplete: onClose });
    else onClose();
  };

  useLayoutEffect(() => {
    if (box.current) animate(box.current, { translateY: ["-105%", "0%"], duration: 420, ease: "out(4)" });
    input.current?.focus();
  }, []);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [entries, menu]);

  const suggestion = val && !menu ? [...hist].reverse().find((h) => h.startsWith(val) && h !== val) ?? names.find((n) => n.startsWith(val) && n !== val && !val.includes(" ")) : undefined;

  const run = (raw: string) => {
    const line = raw.trim();
    setMenu(null);
    setHi(-1);
    setVal("");
    if (!line) return setEntries((e) => [...e, { cmd: "", out: null }]);
    blip("click");
    const nextHist = [...hist, line];
    setHist(nextHist);
    const [name, ...args] = line.split(/\s+/);
    if (name === "clear") return setEntries([]);
    const cmd = commands[name];
    const ctx: Ctx = { close, matrix: onMatrix, go: (p) => setTimeout(() => router.push(p), 500), history: nextHist };
    const out = cmd ? cmd.run(args, ctx) : <span className="text-[var(--err)]">zsh: command not found: {name}</span>;
    setEntries((e) => [...e, { cmd: line, out: out ?? null }]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (menu) {
        const i = (menu.i + (e.shiftKey ? -1 : 1) + menu.items.length) % menu.items.length;
        setMenu({ ...menu, i });
        setVal(menu.base + menu.items[i]);
        return;
      }
      const { cur, items } = candidates(val);
      const base = val.slice(0, val.length - cur.length);
      if (items.length === 1) setVal(base + items[0] + " ");
      else if (items.length > 1) {
        const pre = commonPrefix(items);
        if (pre.length > cur.length) setVal(base + pre);
        else setMenu({ items, i: -1, base });
      } else blip("hover");
      return;
    }
    if (menu && e.key !== "Shift") setMenu(null);
    if (e.key === "Enter") return run(val);
    if (e.key === "Escape") return close();
    if ((e.key === "ArrowRight" || e.key === "End") && suggestion && input.current?.selectionStart === val.length) {
      e.preventDefault();
      return setVal(suggestion);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      if (!hist.length) return;
      const next = e.key === "ArrowUp" ? (hi < 0 ? hist.length - 1 : Math.max(0, hi - 1)) : hi < 0 ? -1 : hi + 1;
      if (next >= hist.length || next < 0) {
        setHi(-1);
        setVal("");
      } else {
        setHi(next);
        setVal(hist[next]);
      }
      return;
    }
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      return setEntries([]);
    }
    if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      setEntries((x) => [...x, { cmd: val + "^C", out: null }]);
      setVal("");
    }
  };

  const Prompt = () => (
    <span className="shrink-0 select-none">
      <G>ashkan@is-a-dev</G> <C>~</C> <span className="text-[var(--fg)]">%</span>{" "}
    </span>
  );

  return (
    <div
      ref={box}
      className="fixed inset-x-0 top-0 z-[95] border-b border-[var(--acc)] bg-[color-mix(in_srgb,var(--bg)_96%,transparent)] shadow-[0_10px_60px_rgba(0,0,0,0.5)] backdrop-blur"
      style={{ transform: "translateY(-105%)" }}
      role="dialog"
      aria-label="Terminal"
      onClick={() => input.current?.focus()}
    >
      <div className="mx-auto max-w-5xl px-4 py-3 font-mono text-[13px] leading-6 sm:px-8 lg:pl-48">
        <div className="mb-1 flex justify-between text-xs text-[var(--dim)]">
          <span>zsh — ashkan@is-a-dev — 120×40</span>
          <button onClick={close} className="cursor-pointer hover:text-[var(--acc)]" aria-label="Close terminal">
            esc ✕
          </button>
        </div>
        <div ref={body} className="max-h-[52vh] overflow-y-auto whitespace-pre-wrap break-words">
          {entries.map((en, i) => (
            <div key={i}>
              {en.cmd !== "" && (
                <div className="flex">
                  <Prompt />
                  <span>
                    <Highlight value={en.cmd} />
                  </span>
                </div>
              )}
              {en.out && <div className="text-[var(--fg)]">{en.out}</div>}
            </div>
          ))}
          <div className="flex">
            <Prompt />
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-0 whitespace-pre" aria-hidden>
                <Highlight value={val} />
                {suggestion && <span className="text-[var(--dim)] opacity-70">{suggestion.slice(val.length)}</span>}
              </div>
              <input
                ref={input}
                value={val}
                onChange={(e) => {
                  setVal(e.target.value);
                  setHi(-1);
                }}
                onKeyDown={onKey}
                className="relative w-full bg-transparent text-transparent caret-[var(--acc)] outline-none focus-visible:outline-none"
                aria-label="Terminal command"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </div>
          {menu && (
            <div className="mt-1 flex flex-wrap gap-x-6">
              {menu.items.map((m, i) => (
                <span key={m} className={i === menu.i ? "bg-[var(--acc)] px-1 text-[var(--bg)]" : "px-1 text-[var(--fg)]"}>
                  {m}
                  {commands[m] && <D> -- {commands[m].desc}</D>}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
