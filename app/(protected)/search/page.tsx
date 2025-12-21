"use client";

import { useRawgGames } from "@/hooks/useGames";
import { useSearchParams } from "next/navigation";
import { useLibraryMap } from "@/hooks/useGames";
import { useAuth } from "@/components/AuthProvider";
import { useMemo } from "react";
import type { HydratedGame } from "@/lib/types";

import GameGrid from "@/components/GameGrid";
import LoadMore from "@/components/LoadMore";

export default function SearchPage() {
  const { session } = useAuth();
  const { userLibrary } = useLibraryMap(session);

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    games: rawgGames,
    isFetchingNextPage,
    fetchNextPage,
  } = useRawgGames({
    search: query,
  });

  const hydratedGames: HydratedGame[] = useMemo(() => {
    const hydrated = rawgGames.map((rawgGame) => ({
      rawg_game: rawgGame,
      user_game: userLibrary.get(rawgGame.id),
    }));

    return hydrated;
  }, [userLibrary, rawgGames]);

  return (
    <div className="space-y-12">
      <h2 className="text-4xl">Results</h2>
      <GameGrid hydratedGames={hydratedGames} />
      <div className="flex justify-center">
        <LoadMore {...{ fetchNextPage, isFetchingNextPage }} />
      </div>
    </div>
  );
}
