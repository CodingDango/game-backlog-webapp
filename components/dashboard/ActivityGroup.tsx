import { UserActivity } from "@/types/types";
import { ActivityListItem } from "@/components/dashboard/ActivityListItem";

interface ActivityGroupProps {
  label: string;
  activities: UserActivity[];
}

export function ActivityGroup({ label, activities }: ActivityGroupProps) {
  if (activities.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <span className="text-muted-foreground text-xl sm:text-2xl font-medium capitalize">
        {label}
      </span>
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <ActivityListItem
            key={`activity-item-${activity.action_type}-${activity.id}`}
            activity={activity}
            isLast={idx === activities.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
