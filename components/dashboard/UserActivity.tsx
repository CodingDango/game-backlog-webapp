import { Edit } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardTitle } from "../ui/card";

export default function UserActivity() {
  return (
    <Card>
      <CardTitle>Recent Activity</CardTitle>
      <div className="flex flex-col gap-6">
        <div className="flex gap-3">
          <div className="bg-secondary rounded-full w-14 h-12 flex items-center justify-center">
            <Edit />
          </div>
          <div>
            <Badge className="text-sm font-normal" variant={"secondary"}>
              January 15, 2024
            </Badge>
            <div className="text-muted-foreground">
              Added <span className="text-primary">Dispatch</span> to library.
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-secondary rounded-full w-14 h-12 flex items-center justify-center">
            <Edit />
          </div>
          <div>
            <Badge className="text-sm font-normal" variant={"secondary"}>
              January 15, 2024
            </Badge>
            <div className="text-muted-foreground">
              Added <span className="text-primary">Dispatch</span> to library.
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-secondary rounded-full w-14 h-12 flex items-center justify-center">
            <Edit />
          </div>
          <div>
            <Badge className="text-sm font-normal" variant={"secondary"}>
              January 15, 2024
            </Badge>
            <div className="text-muted-foreground">
              Added <span className="text-primary">Dispatch</span> to library.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
