const listeners = new Set<(light: boolean) => void>();

export const isLight = () => typeof document !== "undefined" && document.documentElement.dataset.theme === "light";

export function setTheme(light: boolean) {
  if (light) document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem("theme", light ? "light" : "dark");
  } catch {}
  listeners.forEach((l) => l(light));
}

export function onTheme(l: (light: boolean) => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
