import { ScrollArea } from "../ui/scroll-area";

import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Tag } from "@/types/types";
import { Frown } from "lucide-react";

export default function GameTags({ tags }: { tags: Tag[] }) {
  return (
    <ScrollArea className="h-full max-h-48 overflow-hidden flex flex-col gap-4 border border-accent rounded-md pb-2">
      <Card className="border-0">
        <div className="text-muted-foreground font-semibold">Tags</div>
        {!tags.length ? (
          <span className="text-muted-foreground flex gap-4">No tags provided <Frown/></span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map(({ id, name }, key) => (
              <Badge key={`key-${id}`} variant={"secondary"}>
                {name}
              </Badge>
            ))}
          </div>
        )}
      </Card>
    </ScrollArea>
  );
}
