import {
  ActionIcon,
  ActivityInfo,
} from "@/components/dashboard/RecentUserActivity";
import { UserActivity } from "@/types/types";

interface ActivityListItemProps {
  activity: UserActivity;
  isLast: boolean;
}

export function ActivityListItem({ activity, isLast }: ActivityListItemProps) {
  return (
    <div
      className="flex gap-3"
    >
      <ActionIcon
        actionType={activity.action_type}
        includeConnector={!isLast}
      />
      <ActivityInfo activity={activity} />
    </div>
  );
}
