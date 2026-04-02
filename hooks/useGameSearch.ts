import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useGameSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("p")) || 1;
  const genres = searchParams.get("genres") || "";
  const platforms = searchParams.get("platforms") || "";
  const genresArr = genres.length > 0 ? genres.split(",") : [];
  const platformsArr = platforms.length > 0 ? platforms.split(",") : [];

  const [ordering, setOrdering] = useState(
    searchParams.get("ordering") ?? "-added",
  );

  const [activeFilters, setActiveFilters] = useState({
    genres: new Set<string>(genresArr),
    platforms: new Set<string>(platformsArr),
  });

  const createPageUrl = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("p", newPage.toString());
      return `/search?${params.toString()}`;
    },
    [searchParams],
  );

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

  return {
    searchParams,
    router,
    query,
    page,
    genresArr,
    platformsArr,
    ordering,
    setOrdering,
    activeFilters,
    setActiveFilters,
    createPageUrl,
    onApply
  };
}
