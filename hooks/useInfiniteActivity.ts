import { useMemo } from "react";
import { fetchUserActivity } from "@/services/userService";
import { UserActivity } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  isToday,
  isYesterday,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

interface InfiniteActivityProps {
  userId?: string;
  pageSize?: number;
}

export default function useInfiniteActivity({
  userId,
  pageSize = 20,
}: InfiniteActivityProps) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    enabled: !!userId,
    queryKey: ["user", userId, "activity"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const from = (pageParam ?? 0) * pageSize;
      const to = from + pageSize - 1;

      const response = await fetchUserActivity({
        userId: userId,
        rangeFrom: from,
        rangeTo: to,
      });

      return response;
    },

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < pageSize) return undefined;
      return allPages.length;
    },
  });

  const userActivity = useMemo<UserActivity[]>(() => {
    return data?.pages.flatMap((page) => page) || [];
  }, [data?.pages]);

  return { userActivity, fetchNextPage, hasNextPage, isFetching};
}
