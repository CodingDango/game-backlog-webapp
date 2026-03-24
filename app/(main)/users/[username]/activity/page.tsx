"use client";

import { ActivityGroup } from "@/components/dashboard/ActivityGroup";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { groupActivitiesByDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useOnInView } from 'react-intersection-observer';

import useInfiniteActivity from "@/hooks/useInfiniteActivity";

const ACTIVITY_PAGE_SIZE = 2;

export default function ActivityPage() {
  const { username } = useParams<{ username: string }>();
  const { profile } = useProfile({ username });
  const { userActivity, fetchNextPage, hasNextPage, isFetching } = useInfiniteActivity({ userId: profile?.id});
  const groupedActivities = useMemo(() => groupActivitiesByDate(userActivity), [userActivity]);

  const inViewRef = useOnInView(
  (inView, entry) => {
    if (inView) {
      // Do something with the element that came into view
      console.log("Element is in view", entry.target);
    } else {
      console.log("Element left view", entry.target);
    }
  },
  options // Optional IntersectionObserver options
);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-semibold">
        {profile?.username ?? "User's"}&apos;s Activity
      </h1>

      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >Get next</Button>

      <div className="space-y-6">
        {Object.entries(groupedActivities).map(([label, activities]) => (
          <ActivityGroup key={label} label={label} activities={activities} />
        ))}
      </div>
    </div>
  );
}