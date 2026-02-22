"use client";

import AppPagination from "@/components/AppPagination";
import GameGrid from "@/components/GameGrid";
import { useRawgGames } from "@/hooks/useGames";
import { usePagination } from "@/hooks/usePagination";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function GameGenresPage() {
  const searchParams = useSearchParams();
  const { genre } = useParams<{ genre: string }>();
  const page = +(searchParams.get("p") || "1");

  const { games, isLoading, gamesCount } = useRawgGames({
    page,
    page_size: 20,
    genres: [genre],
    ordering: "-added",
  });

  const createPageUrl = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("p", newPage.toString());
      return `/games/genres/${genre}?${params.toString()}`;
    },
    [genre, searchParams],
  );

  const { pages, previousLink, nextLink, showEndEllipsis } = usePagination({
    gamesCount,
    page,
    createPageUrl,
    gamesPerPage: 20,
  });

  return (
    <div className="flex flex-col gap-16">
      <h2 className="text-4xl font-semibold capitalize">{genre} Games</h2>
      <GameGrid rawgGames={games} isLoading={isLoading} length={20} />
      <AppPagination
        activePageNumber={page}
        {...{ pages, previousLink, nextLink, showEndEllipsis }}
      />
    </div>
  );
}
