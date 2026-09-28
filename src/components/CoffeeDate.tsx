"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/data";

const PINK = "#F7A8C4";

// Answers are pushed to Ashkan's phone via ntfy.sh (the page tells her so on the first screen).
// ponytail: topic sits in the public bundle, so anyone who finds it can subscribe; move behind a relay if that matters.
const NTFY_TOPIC = "coffee-68e434c14740464d";

function notify(title: string, message: string) {
  return fetch("https://ntfy.sh/", {
    method: "POST",
    keepalive: true,
    body: JSON.stringify({ topic: NTFY_TOPIC, title, message, priority: 5 }),
  }).then((r) => {
    if (!r.ok) throw new Error(String(r.status));
  });
}

type Answers = { place: string; day: string; time: string; coffee: string; note: string };

const places = ["a cozy little café", "somewhere with a view", "a bookstore café", "surprise me"];
const times = ["morning ☀️", "afternoon 🌤️", "evening 🌙"];
const coffees = ["latte 🥛", "espresso ☕", "cappuccino 🤎", "iced something 🧊", "tea, actually 🍵", "hot chocolate 🍫"];

function Btn({ children, onClick, ghost, disabled }: { children: React.ReactNode; onClick: () => void; ghost?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`min-h-12 rounded-full px-7 py-3 text-base font-medium transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${
        ghost ? "border border-[var(--line)] text-[var(--muted)]" : "text-[#2a1320] shadow-[0_0_40px_rgba(247,168,196,0.35)]"
      }`}
      style={ghost ? undefined : { background: PINK }}
    >
      {children}
    </button>
  );
}

function Chips({ options, value, onPick }: { options: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onPick(o)}
          aria-pressed={value === o}
          className="rounded-full border px-4 py-2 text-sm transition-colors"
          style={value === o ? { background: PINK, borderColor: PINK, color: "#2a1320" } : { borderColor: "var(--line)" }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

const field = "w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-center text-base outline-none focus:border-[#F7A8C4]";

export default function CoffeeDate() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({ place: "", day: "", time: "", coffee: "", note: "" });
  const set = (k: keyof Answers) => (v: string) => setA((p) => ({ ...p, [k]: v }));
  const next = () => setStep((s) => s + 1);
  const today = new Date().toISOString().slice(0, 10);

  const body = [
    "Hi Ashkan, I answered your little questions 🎀",
    "",
    `Coffee date: yes ☕`,
    `Place: ${a.place}`,
    `Day: ${a.day} (${a.time})`,
    `My order: ${a.coffee}`,
    ...(a.note ? [`Also: ${a.note}`] : []),
  ].join("\n");
  const [sent, setSent] = useState<"sending" | "sent" | "failed">("sending");
  const notified = useRef(new Set<number>());
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent("Coffee date? Yes ☕")}&body=${encodeURIComponent(body)}`;

  // Each step: [emoji, question, content]. "No" answers jump to the goodbye screens at the end.
  const steps: [string, React.ReactNode, React.ReactNode][] = [
    [
      "🎀",
      <>Hi Sana.<br />Can I ask you a few questions?</>,
      <div key="s" className="flex flex-col items-center gap-4">
        <Btn onClick={next}>of course</Btn>
        <p className="text-sm text-[var(--muted)]">heads up: your answers go straight to Ashkan&apos;s phone 📱</p>
      </div>,
    ],
    [
      "🤔",
      "Okay, first one. Do you have a boyfriend?",
      <div key="b" className="flex flex-wrap justify-center gap-3">
        <Btn onClick={next}>no, I don&apos;t</Btn>
        <Btn ghost onClick={() => setStep(-1)}>yes, I do</Btn>
      </div>,
    ],
    [
      "☕",
      "Then... can I ask you out for a coffee date?",
      <div key="c" className="flex flex-wrap justify-center gap-3">
        <Btn onClick={next}>yes 💖</Btn>
        <Btn ghost onClick={() => setStep(-2)}>not really</Btn>
      </div>,
    ],
    [
      "📍",
      "Yay! Is there any place you like to go?",
      <div key="p" className="flex w-full flex-col items-center gap-5">
        <Chips options={places} value={a.place} onPick={set("place")} />
        <input className={field} placeholder="or tell me your favorite spot…" value={places.includes(a.place) ? "" : a.place} onChange={(e) => set("place")(e.target.value)} />
        <Btn onClick={next} disabled={!a.place.trim()}>next</Btn>
      </div>,
    ],
    [
      "📅",
      "What day suits you best?",
      <div key="d" className="flex w-full flex-col items-center gap-5">
        <input type="date" min={today} className={field} value={a.day} onChange={(e) => set("day")(e.target.value)} />
        <Chips options={times} value={a.time} onPick={set("time")} />
        <Btn onClick={next} disabled={!a.day || !a.time}>next</Btn>
      </div>,
    ],
    [
      "🧋",
      "How do you take your coffee? (so I get it right)",
      <div key="o" className="flex w-full flex-col items-center gap-5">
        <Chips options={coffees} value={a.coffee} onPick={set("coffee")} />
        <Btn onClick={next} disabled={!a.coffee}>next</Btn>
      </div>,
    ],
    [
      "💌",
      "Anything else I should know?",
      <div key="n" className="flex w-full flex-col items-center gap-5">
        <textarea rows={3} className={field} placeholder="favorite dessert, a song, anything… (optional)" value={a.note} onChange={(e) => set("note")(e.target.value)} />
        <Btn onClick={next}>done</Btn>
      </div>,
    ],
    [
      "🥹",
      "It's a date!",
      <div key="f" className="flex w-full flex-col items-center gap-6">
        <ul className="w-full space-y-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 text-left text-sm">
          <li>📍 {a.place}</li>
          <li>📅 {a.day} · {a.time}</li>
          <li>☕ {a.coffee}</li>
          {a.note && <li>💌 {a.note}</li>}
        </ul>
        {sent === "failed" ? (
          <a href={mailto} className="min-h-12 rounded-full px-7 py-3 font-medium text-[#2a1320] shadow-[0_0_40px_rgba(247,168,196,0.35)]" style={{ background: PINK }}>
            couldn&apos;t reach his phone, send by email ✉️
          </a>
        ) : (
          <p className="text-sm text-[var(--muted)]" aria-live="polite">{sent === "sent" ? "sent to Ashkan's phone ✓" : "sending to Ashkan…"}</p>
        )}
        <p className="text-sm text-[var(--muted)]">thank you for saying yes. I&apos;m smiling like an idiot right now.</p>
      </div>,
    ],
  ];

  const goodbye: Record<number, [string, string]> = {
    [-1]: ["🌷", "Ah, he's a lucky guy. Thanks for being honest, and no hard feelings at all. Have a lovely day, Sana."],
    [-2]: ["🌷", "That's completely okay. Thank you for reading this far, and have a lovely day, Sana."],
  };
  const last = steps.length - 1;
  useEffect(() => {
    if (notified.current.has(step)) return;
    const msg: Record<number, [string, string]> = {
      1: ["👀 Sana opened it", "She's answering your questions."],
      2: ["🙌 No boyfriend", "She said she doesn't have one."],
      3: ["💖 YES to coffee!", "She said yes to a coffee date."],
      [last]: ["☕ It's a date!", body],
      [-1]: ["🌷 She has a boyfriend", "She said yes, she has one."],
      [-2]: ["🌷 Not really", "She said no to the coffee date."],
    };
    if (!msg[step]) return;
    notified.current.add(step);
    const done = notify(...msg[step]);
    if (step === last) done.then(() => setSent("sent"), () => setSent("failed"));
    else done.catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const [emoji, question, content] = step < 0 ? [...goodbye[step], null] : steps[step];
  const progress = step < 0 ? 1 : step / (steps.length - 1);

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(247,168,196,0.16), transparent 65%)" }} aria-hidden />
      <div className="fixed inset-x-0 top-0 h-1 bg-[var(--line)]" aria-hidden>
        <div className="h-full transition-[width] duration-500" style={{ background: PINK, width: `${progress * 100}%` }} />
      </div>
      <style>{`@keyframes step-in{from{opacity:0;transform:translateY(24px);filter:blur(6px)}}@media (prefers-reduced-motion:reduce){.step-in,.animate-float{animation:none!important}}`}</style>
      <section
        key={step}
        className="step-in relative flex w-full max-w-md flex-col items-center gap-8 text-center"
        style={{ animation: "step-in .5s cubic-bezier(.22,1,.36,1)" }}
      >
          <div className="animate-float text-6xl" aria-hidden>
            {emoji}
          </div>
          <h1 className="text-4xl font-medium leading-tight sm:text-5xl">{question}</h1>
          {content}
          {step > 0 && step < steps.length - 1 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="text-sm text-[var(--muted)] underline-offset-4 hover:underline">
              ← back
            </button>
          )}
      </section>
    </main>
  );
}
