import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getHydratedUserLibrary } from "@/services/libraryService";
import { getGames } from "@/services/rawgServices";
import { useMemo } from "react";
import { toast } from "sonner";
import { keyByMap } from "@/lib/utils";
import { GetGamesParams, UserGame } from "@/types/types";
import { getUserGames } from "@/services/libraryService";
import { useAuth } from "@/components/AuthProvider";

export function useRawgGames({
  page = 1,
  search,
  ids,
  genres,
  ordering,
  platforms,
}: GetGamesParams = {}) {
  const query = useQuery({
    queryKey: ["rawgGames", search, ids, genres, page, ordering, platforms],
    queryFn: async () => {
      const result = await getGames({
        page,
        search,
        ids,
        genres,
        ordering,
        platforms,
      });

      if (!result.success) {
        toast.error("Could't fetch games");
        return null;
      }

      return result;
    },
  });

  const gamesCount = query.data?.count ?? 0;

  return {
    games: query.data?.results || [],
    gamesCount,
    ...query,
  };
}

export function useLibraryMap(session: any) {
  const query = useQuery({
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

  const userGames = query?.data || [];

  const userLibrary = useMemo(() => {
    if (!userGames || !userGames.length) {
      return new Map<number, UserGame>();
    }

    return keyByMap(userGames, "rawg_id") as Map<number, UserGame>;
  }, [userGames]);

  return {
    userLibrary,
    ...query,
  };
}

export function useHydratedLibrary() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const query = useQuery({
    enabled: !!userId,
    queryKey: ["userGames", "hydratedUserLibrary"],
    queryFn: async () => {
      const res = await getHydratedUserLibrary();

      if (!res.success) {
        toast.error(res.error);
        throw new Error(res.error);
      }

      return res.results;
    },
  });

  return query;
}
