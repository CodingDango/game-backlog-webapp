"use client";

import {
  ActionIcon,
  ActivityInfo,
} from "@/components/dashboard/RecentUserActivity";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { fetchUserActivity } from "@/services/userService";
import { UserActivity } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
        const to = (from + ACTIVITY_PAGE_SIZE - 1);

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

  const levels = [
    "Today",
    "Yesterday",
    "Last Week",
    "Last Month",
    "Last Year",
    "Long time Ago",
  ];

  const userActivity = (data?.pages.flatMap(page => page) || []) as UserActivity[];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-semibold">
        {profile?.username ?? "User's"}&apos;s Activity
      </h1>
      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>Get next</Button>
      <div className="space-y-6">
        {levels.map((level) => (
          <div key={level} className="flex flex-col gap-4">
            <span className="text-muted-foreground text-xl sm:text-2xl font-medium capitalize">
              {level}
            </span>
            <div className="space-y-4">
              {userActivity.length &&
                userActivity.map((activity, idx) => {
                  const isLast = idx == userActivity.length - 1;

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
        ))}
      </div>
    </div>
  );
}
