import { ScrollArea } from "./ui/scroll-area";

import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export default function GameTags({ tags }: { tags: string[] }) {
  return (
    <ScrollArea className="max-h-48 overflow-hidden flex flex-col gap-4 border border-accent rounded-md pb-2">
      <Card className="border-0">
        <div className="text-muted-foreground font-semibold">Tags</div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, key) => (
            <Badge key={key} variant={"secondary"}>
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </ScrollArea>
  );
}
