"use client";

import { ActivityGroup } from "@/components/dashboard/ActivityGroup";
import { useProfile } from "@/hooks/useProfile";
import { groupActivitiesByDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useOnInView } from 'react-intersection-observer';

import AppButton from "@/components/common/AppButton";
import useInfiniteActivity from "@/hooks/useInfiniteActivity";

const ACTIVITY_PAGE_SIZE = 30;

export default function ActivityPage() {
  const { username } = useParams<{ username: string }>();
  const { profile } = useProfile({ username });
  const { userActivity, fetchNextPage, hasNextPage, isFetching } = useInfiniteActivity({ userId: profile?.id, pageSize: ACTIVITY_PAGE_SIZE});
  const groupedActivities = useMemo(() => groupActivitiesByDate(userActivity), [userActivity]);

  const fetchInViewRef = useOnInView(
    (inView) => {
      if (inView && !isFetching && hasNextPage) {
        fetchNextPage();
      } 
    },
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-semibold">
        {profile?.username ?? "User's"}&apos;s Activity
      </h1>


      <div className="space-y-6">
        {Object.entries(groupedActivities).map(([label, activities]) => (
          <ActivityGroup key={label} label={label} activities={activities} />
        ))}
      </div>

      <AppButton
        ref={fetchInViewRef}
        isLoading={isFetching}       
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >Get next</AppButton>
    </div>
  );
}