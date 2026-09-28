// Tiny synthesized UI sounds. Off by default; no audio files to load.
let ctx: AudioContext | null = null;
let enabled = false;
const listeners = new Set<(on: boolean) => void>();

export function sfxEnabled() {
  return enabled;
}

export function setSfx(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem("sfx", on ? "1" : "0");
  } catch {}
  listeners.forEach((l) => l(on));
  if (on) blip("unlock");
}

export function onSfx(l: (on: boolean) => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function initSfx() {
  try {
    enabled = localStorage.getItem("sfx") === "1";
  } catch {}
  listeners.forEach((l) => l(enabled));
}

type Kind = "hover" | "click" | "unlock" | "boot" | "secret";

const notes: Record<Kind, [number, number, OscillatorType][]> = {
  hover: [[880, 0.04, "square"]],
  click: [[523, 0.06, "square"], [784, 0.06, "square"]],
  unlock: [[523, 0.08, "triangle"], [659, 0.08, "triangle"], [784, 0.08, "triangle"], [1047, 0.16, "triangle"]],
  boot: [[196, 0.1, "sawtooth"], [392, 0.14, "triangle"]],
  secret: [[392, 0.09, "square"], [523, 0.09, "square"], [659, 0.09, "square"], [784, 0.09, "square"], [1047, 0.25, "square"]],
};

export function blip(kind: Kind) {
  if (!enabled || typeof window === "undefined") return;
  ctx ??= new AudioContext();
  let t = ctx.currentTime;
  for (const [freq, dur, type] of notes[kind]) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(kind === "hover" ? 0.02 : 0.05, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
    t += dur * 0.9;
  }
}
