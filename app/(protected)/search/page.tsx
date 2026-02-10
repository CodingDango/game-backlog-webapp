"use client";

import { useRawgGames } from "@/hooks/useGames";
import { useGameSearch } from "@/hooks/useGameSearch";
import { usePagination } from "@/hooks/usePagination";

import GameGrid from "@/components/GameGrid";
import AppPagination from "@/components/AppPagination";
import SearchFilters from "@/components/SearchFilters";

const gamesPerPage = 20;
const pageWindowSize = 5;

export default function SearchPage() {
  const {
    query,
    page,
    genresArr,
    platformsArr,
    ordering,
    setOrdering,
    activeFilters,
    setActiveFilters,
    createPageUrl,
    onApply,
  } = useGameSearch();

  const {
    games: rawgGames,
    isLoading,
    gamesCount,
  } = useRawgGames({
    search: query,
    page,
    page_size: 20,
    genres: genresArr.length > 0 ? genresArr : undefined,
    platforms: platformsArr.length > 0 ? platformsArr : undefined,
    ordering,
  });

  const { pages, previousLink, nextLink, showEndEllipsis } = usePagination({
    gamesCount,
    page,
    createPageUrl,
    gamesPerPage,
    pageWindowSize,
  });

  return (
    <div className="flex flex-col gap-16">
      <h2 className="text-4xl font-semibold">
        Results for &quot;{query}&quot;
      </h2>

      <SearchFilters
        {...{ activeFilters, setActiveFilters, ordering, setOrdering, onApply }}
      />

      <GameGrid rawgGames={rawgGames} isLoading={isLoading} length={20} />

      <AppPagination
        activePageNumber={page}
        {...{ pages, previousLink, nextLink, showEndEllipsis }}
      />
    </div>
  );
}
