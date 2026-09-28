"use client";

import { createScope, type Scope } from "animejs";
import { type RefObject, useEffect } from "react";

export * from "animejs";

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Runs anime.js code scoped to `root`; everything created inside is reverted on unmount. */
export function useAnime(root: RefObject<HTMLElement | null>, setup: (scope?: Scope) => void | (() => void)) {
  useEffect(() => {
    if (reducedMotion()) return;
    const scope = createScope({ root: root as { current: HTMLElement } }).add(setup);
    return () => {
      scope.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Scroll trigger that plays once when the target enters the lower part of the viewport. */
export const onceInView = (target: Element | string) => ({ target, enter: "bottom-=12% top", repeat: false });
