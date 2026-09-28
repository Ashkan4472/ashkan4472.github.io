import type { Metadata } from "next";
import CoffeeDate from "@/components/CoffeeDate";

// Secret page: not linked from anywhere on the site, reachable only by direct URL.
export const metadata: Metadata = {
  title: "A little question ☕",
  description: "Just for you, Sana.",
  robots: { index: false, follow: false },
};

export default function ForSana() {
  return <CoffeeDate />;
}
