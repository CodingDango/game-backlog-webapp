"use client";

import { useRawgGames } from "@/hooks/useGames";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import GameGrid from "@/components/GameGrid";
import AppPagination from "@/components/AppPagination";
import SearchFilters from "@/components/SearchFilters";

const pageSize = 20;
const pagesToShow = 5;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("p")) || 1;
  const genres = searchParams.get("genres") || "";
  const platforms = searchParams.get("platforms") || "";

  const genresArr = genres.length > 0 ? genres.split(",") : [];
  const platformsArr = platforms.length > 0 ? platforms.split(",") : [];

  const [ordering, setOrdering] = useState(searchParams.get('ordering') ?? '-released');

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
    page,
    page_size: 20,
    genres: genresArr.length > 0 ? genresArr : undefined,
    platforms: platformsArr.length > 0 ? platformsArr : undefined,
    ordering
  });

  const [activeFilters, setActiveFilters] = useState({
    genres: new Set<string>(genresArr),
    platforms: new Set<string>(platformsArr),
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

  const queryParams = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    const { genres, platforms } = activeFilters;

    if (genres.size > 0) {
      params.set("genres", Array.from(genres).join(","));
    } else {
      params.delete("genres");
    }

    if (platforms.size > 0) {
      params.set("platforms", Array.from(platforms).join(","));
    } else {
      params.delete("platforms");
    }

    params.set("ordering", ordering);

    return params.toString();
  }, [searchParams, activeFilters, ordering]);

  const onApply = useCallback(() => {
    router.push(`/search?${queryParams}`);
  }, [queryParams, router]);

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
