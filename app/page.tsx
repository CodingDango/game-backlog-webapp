"use client";

import GameCard from "@/components/GameCard";
import { keyByMap } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import {
  getRawgGameList,
  getUserGames,
  RawgGamesResponse,
} from "@/lib/actions";
import { RawgGame, UserGame } from "@/lib/types";
import { toast } from "sonner";
import { useState, useEffect, useMemo } from "react";
import {
  useQueryClient,
  useQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  const { session, signOut } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: rawgGamePages,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    fetchNextPage, // The function to call to get more data
    hasNextPage, // A boolean that's true if there is more data
  } = useInfiniteQuery({
    queryKey: ["rawgGames"],
    queryFn: ({ pageParam = 1 }) => getRawgGameList(pageParam), // The function that fetches the data
    initialPageParam: 1, // The VERY FIRST page number to fetch
    getNextPageParam: (lastPage: RawgGamesResponse) => {
      if (!lastPage || !lastPage.success || !lastPage.next) {
        return undefined;
      }

      const urlStr = lastPage.next;
      const url = new URL(urlStr);
      const nextPage = url.searchParams.get("page");

      if (!nextPage) {
        return 1;
      }

      return parseInt(nextPage);
    },
  });

  const {
    data: userGames,
    isLoading: isLoadingUserGames,
    isError: isErrorUserGames,
    error: errorUserGames,
  } = useQuery({
    enabled: Boolean(session),
    queryKey: ["userGames"],
    queryFn: async () => {
      const userGamesRes = await getUserGames();

      if (userGamesRes.success) {
        return userGamesRes.results;
      } else {
        toast.error(userGamesRes.error);
        return [];
      }
    },
  });

  const userLibrary = useMemo(() => {
    if (!userGames) {
      return new Map<number, UserGame>();
    }

    return keyByMap(userGames, "rawg_id");
  }, [userGames]);

  const rawgGames = useMemo(() => {
    const games: RawgGame[] = [];

    rawgGamePages?.pages.forEach((rawgRes) => {
      if (rawgRes.success) {
        rawgRes.results.forEach((rawgGame) => {
          games.push(rawgGame);
        });
      }
    });

    return games;
  }, [rawgGamePages]);

  return (
    <div className="w-full max-w-5xl flex flex-col gap-8">
      <header className="w-full flex flex-col gap-6">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 flex gap-4">
            <Button asChild variant={"secondary"}>
              <Link href={'/library'}>Library</Link>
            </Button>
          </div>

          <div className="flex gap-4">
            <p className="text-muted-foreground">
              Signed in as {session.user.email}
            </p>
            <Button variant={"destructive"} onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <h1 className="text-2xl font-medium">Games List</h1>
      </header>

      <Input
        className="px-4 py-6 rounded-xl"
        placeholder="Search games by title"
      />

      <div className="w-full grid grid-cols-3 gap-6">
        {rawgGames.map((game) => {
          const userGame = userLibrary.get(game.id);
          return (
            <GameCard
              key={game.id}
              game={game}
              userGame={userGame}
            />
          );
        })}
      </div>

      <div className="flex justify-center">
        {/* where  do i get the isLoading? not from rawgGames.. okay i cant think of a solution  */}
        <Button
          variant={"secondary"}
          size={"lg"}
          className="cursor-pointer"
          disabled={isFetchingNextPage || undefined}
          onClick={() => {
            console.log("Fetching next page");
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
