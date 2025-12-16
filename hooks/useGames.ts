import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getRawgGameList } from "@/lib/actions";
import { useMemo } from "react";
import { toast } from "sonner";
import { keyByMap } from "@/lib/utils";
import { UserGame } from "@/lib/types";
import { getUserGames } from "@/lib/actions";

export function useRawgGames() {
  const query = useInfiniteQuery({
    queryKey: ["rawgGames"],
    queryFn: ({ pageParam = 1 }) => getRawgGameList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.success || !lastPage.next) return undefined;

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

export function useUserLibrary(session: any) {
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
    ...query
  };
}
