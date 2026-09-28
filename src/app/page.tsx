import Boot from "@/components/Boot";
import Camp from "@/components/Camp";
import Eggs from "@/components/Eggs";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import QuestLog from "@/components/QuestLog";
import Reveals from "@/components/Reveals";
import SavePoint from "@/components/SavePoint";
import Sheet from "@/components/Sheet";
import SkillTree from "@/components/SkillTree";
import TopBar from "@/components/TopBar";
import Trophies from "@/components/Trophies";

export default function Home() {
  return (
    <>
      <Boot />
      <TopBar />
      <main>
        <Hero />
        <Manifesto />
        <Sheet />
        <SkillTree />
        <QuestLog />
        <Trophies />
        <Camp />
        <SavePoint />
      </main>
      <Reveals />
      <Eggs />
    </>
  );
}
