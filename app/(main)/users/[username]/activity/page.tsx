"use client";

import {
  ActionIcon,
  ActivityInfo,
} from "@/components/dashboard/RecentUserActivity";
import { useActivity } from "@/hooks/useActivity";
import { useProfile } from "@/hooks/useProfile";
import { useParams } from "next/navigation";

export default function ActivityPage() {
  const { username } = useParams<{ username: string }>();
  const { profile, isLoadingProfile } = useProfile({ username });
  const { userActivity, isLoadingActivity } = useActivity({
    userId: profile?.id,
  });

  const levels = [
    "Today",
    "Yesterday",
    "Last Week",
    "Last Month",
    "Last Year",
    "Long time Ago",
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-semibold">Activity</h1>
      <div className="space-y-6">
        {levels.map((level) => (
          <div key={level} className="flex flex-col gap-4">
            <span className="text-muted-foreground text-xl sm:text-2xl font-medium capitalize">
              {level}
            </span>
            <div className="space-y-4">
              {userActivity &&
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
