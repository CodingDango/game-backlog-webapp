"use client";

import PopularGames from "@/components/game/GamesPopular";
import GamesAnticipated from "@/components/game/GamesAnticipated";
import RecentGames from "@/components/game/GamesRecent";

export default function Home() {
  return (
    <div className="space-y-20">
      <PopularGames />
      <GamesAnticipated />
      <RecentGames />
    </div>
  );
}
