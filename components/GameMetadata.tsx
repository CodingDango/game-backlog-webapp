import { RawgGameDetails } from "@/types/types";
import CommaSeparatedList from "./TextList";
import { formatDate } from "@/utils/utils";
import { Card } from "./ui/card";

export default function GameMetadata({ game }: { game: RawgGameDetails }) {
  return (
    <Card className="flex flex-col gap-4">
      <span className="text-muted-foreground font-semibold">Details</span>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-sm">
          <span className="text-muted-foreground">Genre:</span>
          <CommaSeparatedList
            items={game.genres.map((genre) => genre.name)}
            itemClass="underline"
          />
        </div>

        <div className="flex gap-2 text-sm">
          <span className="text-muted-foreground">Developers:</span>
          <CommaSeparatedList items={game.developers.map((dev) => dev.name)} />
        </div>

        <div className="flex gap-2 text-sm">
          <span className="text-muted-foreground">Publishers:</span>
          <CommaSeparatedList items={game.publishers.map((dev) => dev.name)} />
        </div>

        <div className="flex gap-2 text-sm">
          <span className="text-muted-foreground">Release Date:</span>
          <span>{formatDate(game.released)}</span>
        </div>
      </div>
    </Card>
  );
}
