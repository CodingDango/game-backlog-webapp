"use client";

import PopularGames from "@/components/PopularGames";
import AnticipatedGames from "@/components/AnticipatedGames";
import RecentGames from "@/components/RecentGames";

// TODO: Add carousel to anticipated games

export default function Home() {
  return (
    <div className="space-y-20">
      <PopularGames />
      <AnticipatedGames/>
      <RecentGames/>
    </div>
  );
}
