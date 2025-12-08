"use client";

import { hydrate, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getHydratedUserLibrary, getRawgGames, getUserGames } from "@/lib/actions";
import { Spinner } from "@/components/ui/spinner";
import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserLibrary() {
  const {
    data: hydratedUserLibrary,
    isLoading: isLoadingUserGames,
    isError: isErrorUserGames,
    error: errorUserGames,
  } = useQuery({
    queryKey: ["userGames", 'hydratedUserLibrary'],
    queryFn: async () => {
      const hydratedLibraryRes = await getHydratedUserLibrary();

      if (!hydratedLibraryRes.success) {
        toast.error(hydratedLibraryRes.error);
        return [];
      }

      return hydratedLibraryRes.results;
    },
  });

  return (
    <div className="w-full max-w-5xl flex flex-col gap-8">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-medium">Your Library</h1>
        <Button asChild variant={"secondary"}>
          <Link href={"/"}>Home</Link>
        </Button>
      </header>

      <div className="w-full grid grid-cols-3 gap-6">
        {isLoadingUserGames ? (
          <Spinner />
        ) : (
          hydratedUserLibrary?.map(userGame => (
            <GameCard key={userGame.id} game={userGame.rawg_game!} userGame={userGame} />
          ))
        )}
      </div>
    </div>
  );
}
