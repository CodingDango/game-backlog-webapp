"use client";

import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { useRawgGames, useUserLibrary } from "@/hooks/useGames";
import { useMemo } from "react";
import { HydratedGame } from "@/lib/types";

import GameGrid from "@/components/GameGrid";

export default function Home() {
  const { session } = useAuth();

  const {
    games: rawgGames,
    isFetchingNextPage,
    fetchNextPage,
  } = useRawgGames();

  const { userLibrary } = useUserLibrary(session);
  
  const hydratedGames: HydratedGame[] = useMemo(() => {
    const hydrated = rawgGames.map(rawgGame => ({
        rawg_game: rawgGame,
        user_game: userLibrary.get(rawgGame.id)
    }));

    return hydrated;

  }, [userLibrary, rawgGames]);

  return (
    <div className="w-full flex flex-col gap-8">
      <header className="w-full flex flex-col gap-6">
        <h2 className="text-2xl font-medium">Games List</h2>
      </header>

      <Input
        className="px-4 py-6 rounded-xl"
        placeholder="Search games by title"
      />

      <GameGrid hydratedGames={hydratedGames}/>

      <div className="flex justify-center">
        {/* where  do i get the isLoading? not from rawgGames.. okay i cant think of a solution  */}
        <Button
          variant={"secondary"}
          size={"lg"}
          className="cursor-pointer"
          disabled={isFetchingNextPage || undefined}
          onClick={() => {
            fetchNextPage();
          }}
        >
          {isFetchingNextPage && <Spinner />}
          Load More
        </Button>
      </div>
    </div>
  );
}
