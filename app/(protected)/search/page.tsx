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

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    games: rawgGames,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  } = useRawgGames({
    search: query,
  });
  return (
    <div className="flex flex-col gap-16">
      <h2 className="text-4xl">Results for &quot;{query}&quot;</h2>
      <GameGrid rawgGames={rawgGames} isLoading={isLoading} />
      <div className="flex justify-center">
        <LoadMore {...{ fetchNextPage, isFetchingNextPage }} />
      </div>
    </div>
  );
}
