import { ScrollArea } from "../ui/scroll-area";

import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Tag } from "@/types/types";
import { Frown } from "lucide-react";

export default function GameTags({ tags }: { tags: Tag[] }) {
  return (
    <Card className="w-full h-full px-0!">
      <div className="text-muted-foreground font-semibold px-4 lg:px-6">Tags</div>
      <ScrollArea className="h-full overflow-hidden flex flex-col gap-4 px-4 lg:px-6">
        {!tags.length ? (
          <span className="text-muted-foreground flex gap-4">
            No tags provided <Frown />
          </span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map(({ id, name }, key) => (
              <Badge key={`key-${id}`} variant={"secondary"}>
                {name}
              </Badge>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
