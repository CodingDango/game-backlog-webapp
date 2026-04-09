"use client";

import { ActivityGroup } from "@/components/dashboard/ActivityGroup";
import { useProfile } from "@/hooks/useProfile";
import { groupActivitiesByDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useOnInView } from "react-intersection-observer";
import { Frown, History } from "lucide-react";

import useInfiniteActivity from "@/hooks/useInfiniteActivity";
import ActivitySkeleton from "@/components/dashboard/ActivitySkeleton";

const ACTIVITY_PAGE_SIZE = 30;
const maxWidthClasses = ["w-64", "w-72", "max-w-80", "max-w-88", "max-w-96"];

export default function ActivityPage() {
  const { username } = useParams<{ username: string }>();
  const { profile } = useProfile({ username });

  const { userActivity, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteActivity({ userId: profile?.id, pageSize: ACTIVITY_PAGE_SIZE });

  const groupedActivities = useMemo(
    () => groupActivitiesByDate(userActivity),
    [userActivity],
  );

  const fetchInViewRef = useOnInView((inView) => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  });

  const isStarting = !profile || isLoading;

  return (
    <div className="space-y-8">
      <div className="flex gap-3 items-center">
        <History />
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {profile?.username ?? "User"}&apos;s Activity
        </h1>
      </div>

      <div className="space-y-6">
        {isStarting &&
          Array.from({ length: 30 }).map((_, idx) => (
            <ActivitySkeleton 
              key={`loading-initial-item-${idx}`} 
              maxWidthClass={maxWidthClasses[idx % maxWidthClasses.length]}
            />
          ))}

        {!userActivity.length && !isStarting && (
          <span className="text-muted-foreground flex gap-3 items-center">
            <Frown />
            <span>User has no recorded history</span>
          </span>
        )}

        {!!userActivity.length &&
          !isStarting &&
          Object.entries(groupedActivities).map(([label, activities]) => (
            <ActivityGroup key={label} label={label} activities={activities} />
          ))}

        {isFetching &&
          !isStarting &&
          Array.from({ length: ACTIVITY_PAGE_SIZE }).map((_, idx) => (
            <ActivitySkeleton
              key={`loading-fetch-item-${idx}`}
              maxWidthClass={maxWidthClasses[idx % maxWidthClasses.length]}
            />
          ))}
      </div>

      {userActivity.length !== 0 && !isStarting && (
        <div ref={fetchInViewRef} className="text-muted-foreground">
          User&apos;s history ends here.
        </div>
      )}
    </div>
  );
}
