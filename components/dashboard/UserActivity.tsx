import { Edit } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardTitle } from "../ui/card";
import { UserAction } from "@/types/types";

export default function UserActivity() {
  return (
    <Card className='h-full'>
      <CardTitle>Recent Activity</CardTitle>
      <div className="grid grid-cols-[40px_1fr] gap-x-3 gap-y-4">
        <ActionIcon includeConnector/>
        <ActionInfo />

        <ActionIcon includeConnector/>
        <ActionInfo />

        <ActionIcon/>
        <ActionInfo />

      </div>
    </Card>
  );
}

function ActionInfo({ action }: { action?: UserAction }) {
  return (
    <div>
      <Badge className="text-sm font-normal" variant={"secondary"}>
        January 15, 2024
      </Badge>
      <div className="text-muted-foreground">
        Added <span className="text-primary">Dispatch</span> to library.
      </div>
    </div>
  );
}

interface ActionIconProps {
  action?: UserAction;
  includeConnector?: boolean;
}

function ActionIcon({ action, includeConnector = false }: ActionIconProps) {
  return (
    <div className="relative">
      <div className="relative z-1 bg-secondary rounded-full w-10 h-10 flex items-center justify-center">
        <Edit className="size-4" />
      </div>
        {includeConnector && (
          <div className="absolute left-1/2  top-[54%] w-2 h-13 bg-border transform -translate-x-1/2" />
        )}
    </div>
  );
}
