import { RawgGameDetails } from "@/types/types";
import { formatDate } from "@/lib/utils";
import { Card } from "../ui/card";
import CommaSeparatedList from "../common/TextList";
import Link from "next/link";

export default function GameDetails({ game }: { game: RawgGameDetails }) {
  const genres = game.genres;
  const releaseDateFormatted = formatDate(game.released);
  const developers = game.developers;
  const publishers = game.publishers;

  return (
    <Card className="flex flex-col gap-4">
      <span className="text-muted-foreground font-semibold">Details</span>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-sm">
          <span className="text-muted-foreground">Genre:</span>
          <CommaSeparatedList
            items={game.genres.map((genre) => genre.name)}
            itemClass="underline"
            parentCallbackOverride={(_, idx, children) => (
              <Link href={`/games/genres/${genres[idx].slug}`}>{children}</Link>
            )}
          />
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-muted-foreground">Release Date:</span>
          <span>{releaseDateFormatted}</span>
        </div>

        <div className="flex gap-2 text-sm">
          <span className="text-muted-foreground">Developers:</span>
          <CommaSeparatedList items={developers.map(dev => dev.name)} />
        </div>

        <div className="flex gap-2 text-sm">
          <span className="text-muted-foreground">Publishers:</span>
          <CommaSeparatedList items={publishers.map(pub => pub.name)} />
        </div>
      </div>
    </Card>
  );
}
