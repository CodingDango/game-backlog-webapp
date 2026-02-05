"use client";

import { useRawgGames } from "@/hooks/useGames";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import GameGrid from "@/components/GameGrid";
import AppPagination from "@/components/AppPagination";
import SearchFilters from "@/components/SearchFilters";

const pageSize = 20;
const pagesToShow = 5;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("p")) || 1;

  const createPageUrl = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("p", newPage.toString());
      return `/search?${params.toString()}`;
    },
    [searchParams],
  );

  const {
    games: rawgGames,
    isLoading,
    gamesCount,
  } = useRawgGames({
    search: query,
    ordering: "-added",
    page,
    page_size: 20,
  });

  const { pages, previousLink, nextLink, showEndEllipsis } = useMemo(() => {
    if (!gamesCount) return {};

    const totalPages = Math.ceil(gamesCount / pageSize);
    const halfWindow = Math.floor(pagesToShow / 2);

    let startPage = page - halfWindow;
    let endPage = page + halfWindow;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(pagesToShow, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - pagesToShow + 1);
    }

    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push({ link: createPageUrl(i), pageNumber: i });
    }

    return {
      pages,
      previousLink: page > 1 ? createPageUrl(page - 1) : undefined,
      nextLink: page < totalPages ? createPageUrl(page + 1) : undefined,
      showEndEllipsis: endPage < totalPages,
    };
  }, [gamesCount, page, createPageUrl]);

  return (
    <div className="flex flex-col gap-16">
      <h2 className="text-4xl font-semibold">
        Results for &quot;{query}&quot;
      </h2>

      <SearchFilters/>

      <GameGrid rawgGames={rawgGames} isLoading={isLoading} length={20}/>
      <AppPagination
        activePageNumber={page}
        {...{ pages, previousLink, nextLink, showEndEllipsis }}
      />
    </div>
  );
}
