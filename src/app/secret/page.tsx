import type { Metadata } from "next";
import Secret from "@/components/Secret";

export const metadata: Metadata = {
  title: "ACCESS GRANTED · ashkan.mainframe",
  robots: { index: false },
};

export default function Page() {
  return <Secret />;
}
