import Boot from "@/components/Boot";
import Camp from "@/components/Camp";
import Eggs from "@/components/Eggs";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import QuestLog from "@/components/QuestLog";
import SavePoint from "@/components/SavePoint";
import Sheet from "@/components/Sheet";
import SideRail from "@/components/SideRail";
import SkillTree from "@/components/SkillTree";
import Toaster from "@/components/Toast";
import Trophies from "@/components/Trophies";

export default function Home() {
  return (
    <>
      <Boot />
      <SideRail />
      <main className="lg:pl-40">
        <Hero />
        <Manifesto />
        <Sheet />
        <SkillTree />
        <QuestLog />
        <Trophies />
        <Camp />
        <SavePoint />
      </main>
      <Toaster />
      <Eggs />
    </>
  );
}
