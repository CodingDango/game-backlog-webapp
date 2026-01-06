"use client";

import { useRawgGames } from "@/hooks/useGames";

import GameGrid from "@/components/GameGrid";
import LoadMore from "@/components/LoadMore";

export default function Home() {
  const {
    games: rawgGames,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useRawgGames();

  return (
    <div className="space-y-16">
      <h2 className="text-4xl font-medium">Games List</h2>

      <GameGrid rawgGames={rawgGames} isLoading={isLoading}/>

      <div className="flex justify-center">
        <LoadMore {...{ fetchNextPage, isFetchingNextPage }} />
      </div>
    </div>
  );
}
