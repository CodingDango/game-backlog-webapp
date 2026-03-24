"use client";

import {
  ActionIcon,
  ActivityInfo,
} from "@/components/dashboard/RecentUserActivity";

import {
  isToday,
  isYesterday,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { fetchUserActivity } from "@/services/userService";
import { UserActivity } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const ACTIVITY_PAGE_SIZE = 2;

export default function ActivityPage() {
  const { username } = useParams<{ username: string }>();
  const { profile, isLoadingProfile } = useProfile({ username });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      enabled: !!profile?.id,
      queryKey: ["user", profile?.id, "activity"],
      initialPageParam: 0,
      queryFn: async ({ pageParam = 0 }) => {
        const from = (pageParam ?? 0) * ACTIVITY_PAGE_SIZE;
        const to = from + ACTIVITY_PAGE_SIZE - 1;

        const response = await fetchUserActivity({
          userId: profile?.id,
          rangeFrom: from,
          rangeTo: to,
        });

        return response;
      },

      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || lastPage.length < ACTIVITY_PAGE_SIZE) return undefined;
        return allPages.length;
      },
    });

  const userActivity = useMemo<UserActivity[]>(() => {
    return data?.pages.flatMap((page) => page) || [];
  }, [data?.pages]);

  const groups: Record<string, UserActivity[]> = useMemo(() => {
    const idk: Record<string, UserActivity[]> = {
      today: [],
      yesterday: [],
      "this week": [],
      "this month": [],
      "this year": [],
      "long time ago": [],
    };

    for (const activity of userActivity) {
      const now = new Date();
      const date = new Date(activity.created_at);
      const daysDiff = differenceInDays(now, date);
      const monthsDiff = differenceInMonths(now, date);
      const yearsDiff = differenceInYears(now, date);

      const getKey = () => {
        if (isToday(date)) return "today";
        if (isYesterday(date)) return "yesterday";
        if (daysDiff > 1 && daysDiff < 7) return "this week";
        if (monthsDiff < 1) return "this month";
        if (yearsDiff < 1) return "this year";

        return "long time ago";
      };

      idk[getKey()].push(activity);
    }

    return idk;
  }, [userActivity]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-semibold">
        {profile?.username ?? "User's"}&apos;s Activity
      </h1>
      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Get next
      </Button>
      <div className="space-y-6">
        {Object.entries(groups).map(([label, activities]) =>
          activities.length > 0 ? (
            <div key={label} className="flex flex-col gap-4">
              <span className="text-muted-foreground text-xl sm:text-2xl font-medium capitalize">
                {label}
              </span>
              <div className="space-y-4">
                {activities.map((activity, idx) => {
                  const isLast = idx === activities.length - 1;
                  return (
                    <div
                      className="flex gap-3"
                      key={`activity-icon-${activity.action_type}-${idx}`}
                    >
                      <ActionIcon
                        actionType={activity.action_type}
                        includeConnector={!isLast}
                      />
                      <ActivityInfo activity={activity} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
