import {
  ArrowRight,
  CircleX,
  Edit,
  LucideIcon,
  Plus,
  Star,
  Trash,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardTitle } from "../ui/card";
import { UserAction, UserActivity } from "@/types/types";
import { cn, formatActivityTimestamp } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ActivityListItem } from "./ActivityListItem";

export default function RecentUserActivity({
  userActivity = [],
  username,
}: {
  userActivity?: UserActivity[];
  username: string;
}) {
  return (
    <Card className="h-full px-0!">
      <CardTitle className="px-4 lg:px-6 flex justify-between">
        Recent Activity
      </CardTitle>
      <ScrollArea className="h-full overflow-hidden px-4 lg:px-6">
        {userActivity.length ? (
          <div className="flex flex-col gap-y-4">
            {userActivity.map((activity, idx) => (
              <ActivityListItem 
                key={`activity-icon-${activity.action_type}-${activity.id}`}
                activity={activity} 
                isLast={idx == userActivity.length - 1}
                textClass="text-sm"
              />
            ))}

            <Link href={`/users/${username}/activity`} className="w-full">
              <Button variant={"secondary"} asChild>
                <div className="w-full">
                  See more <ArrowRight />
                </div>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-2">
            <CircleX className="mt-1 size-6 text-muted-foreground" />
            <span className="text-muted-foreground">
              User has no recorded actions
            </span>
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}

export function ActivityInfo({
  activity,
  textClass,
  timeFormat = formatActivityTimestamp,

}: {
  activity: UserActivity;
  textClass?: string;
  timeFormat?: (timestamp: string) => string;
}) {
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
    rating_changed: (title) => (
      <span>
        Rated {title} to{" "}
        <span className="font-medium text-primary capitalize">
          {activity.to_rating} stars.
        </span>
      </span>
    ),
  };

  const gameName = (
    <span className="text-primary font-medium">{activity.game_name}</span>
  );

  return (
    <div>
      <Badge className="text-sm font-normal" variant={"secondary"}>
        {timeFormat(activity.created_at)}
      </Badge>
      <div className={cn("line-clamp-3 text-muted-foreground", textClass)}>
        {map[activity.action_type](gameName)}
      </div>
    </div>
  );
}

interface ActionIconProps {
  actionType: UserAction;
  includeConnector?: boolean;
}

export function ActionIcon({
  actionType,
  includeConnector = false,
}: ActionIconProps) {
  const iconMap: Record<UserAction, LucideIcon> = {
    added: Plus,
    category_changed: Edit,
    removed: Trash,
    rating_changed: Star
  };

  const Icon = iconMap[actionType];

  return (
    <div className="relative">
      <div className="relative z-1 bg-secondary rounded-full w-10 h-10 flex items-center justify-center">
        <Icon className="size-5" />
      </div>
      {includeConnector && (
        <div className="absolute left-1/2  w-1 h-full bg-border transform -translate-x-1/2" />
      )}
    </div>
  );
}
