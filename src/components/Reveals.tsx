"use client";

import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";

// Fades in every `.reveal` element as it scrolls into view.
export default function Reveals() {
  useGSAP(() => {
    if (reducedMotion()) return;
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
      gsap.from(el, { opacity: 0, y: 24, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }),
    );
  });
  return null;
}
