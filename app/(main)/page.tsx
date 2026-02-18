"use client";

import PopularGames from "@/components/PopularGames";
import AnticipatedGames from "@/components/AnticipatedGames";
import RecentGames from "@/components/RecentGames";

export default function Home() {
  return (
    <div className="space-y-20">
      <PopularGames />
      <AnticipatedGames />
      <RecentGames />
    </div>
  );
}
