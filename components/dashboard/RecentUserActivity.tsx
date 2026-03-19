import { CirclePlus, Edit, LucideIcon, Plus, Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardTitle } from "../ui/card";
import { UserAction, UserActivity } from "@/types/types";
import { formatTimestamp } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { ReactNode } from "react";

export default function RecentUserActivity({
  activityList = [],
}: {
  activityList?: UserActivity[];
}) {
  console.log(activityList);

  return (
    <Card className="h-full px-0!">
      <CardTitle className="px-4 lg:px-6">Recent Activity</CardTitle>
      <ScrollArea className="h-full overflow-hidden px-4 lg:px-6">
        <div className="flex flex-col gap-y-6">
          {activityList.map((activity, idx) => {
            const isLast = idx == activityList.length - 1;

            return (
              <div className="flex gap-3" key={`activity-icon-${activity.action_type}-${idx}`}>
                <ActionIcon
                  actionType={activity.action_type}
                  includeConnector={!isLast}
                />
                <ActivityInfo
                  activity={activity}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}

function ActivityInfo({ activity }: { activity: UserActivity }) {
  // index 0 is prefix, index 1 is suffix
  const map: Record<UserAction, (title: ReactNode) => ReactNode> = {
    added: (title) => <span>Added {title} to library</span>,
    category_changed: (title) => (
      <span>
        Changed {title} to{" "}
        <span className="font-medium text-primary capitalize">
          {activity.to_category}.
        </span>
      </span>
    ),
    removed: (title) => <span>Removed {title} from library</span>,
  };

  const gameName = (
    <span className="text-primary font-medium">{activity.game_name}</span>
  );

  return (
    <div>
      <Badge className="text-sm font-normal" variant={"secondary"}>
        {formatTimestamp(activity.created_at)}
      </Badge>
      <div className="text-muted-foreground line-clamp-3 text-sm">
        {map[activity.action_type](gameName)}
      </div>
    </div>
  );
}

interface ActionIconProps {
  actionType: UserAction;
  includeConnector?: boolean;
}

function ActionIcon({ actionType, includeConnector = false }: ActionIconProps) {
  const iconMap: Record<UserAction, LucideIcon> = {
    added: Plus,
    category_changed: Edit,
    removed: Trash,
  };

  const Icon = iconMap[actionType];

  return (
    <div className="relative">
      <div className="relative z-1 bg-secondary rounded-full w-10 h-10 flex items-center justify-center">
        <Icon className="size-4" />
      </div>
      {includeConnector && (
        <div className="absolute left-1/2  w-2 h-full bg-border transform -translate-x-1/2" />
      )}
    </div>
  );
}
