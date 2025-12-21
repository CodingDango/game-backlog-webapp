import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getHydratedUserLibrary, getRawgGameList } from "@/lib/actions";
import { useMemo } from "react";
import { toast } from "sonner";
import { keyByMap } from "@/lib/utils";
import { UserGame } from "@/lib/types";
import { getUserGames } from "@/lib/actions";
import { useAuth } from "@/components/AuthProvider";

interface GetGamesParams {
  page?: number;
  search?: string;
  ids?: number[];
}

export function useRawgGames({ page = 1, search, ids }: GetGamesParams = {}) {
  const query = useInfiniteQuery({
    queryKey: ["rawgGames", search, ids],
    initialPageParam: page,
    queryFn: ({ pageParam = 1 }) => getRawgGameList(pageParam, search, ids),
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.success || !lastPage.next) return undefined;

      debugger;

      const urlStr = lastPage.next;
      const url = new URL(urlStr);
      const nextPage = url.searchParams.get("page");

      return nextPage ? parseInt(nextPage) : undefined;
    },
  });

  const games = useMemo(() => {
    return (
      query.data?.pages.flatMap((page) => (page.success ? page.results : [])) ??
      []
    );
  }, [query.data]);

  return {
    games,
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
