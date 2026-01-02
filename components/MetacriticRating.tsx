import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { RawgGame, RawgGameDetails } from "@/lib/types";

interface Props {
  game: RawgGame | RawgGameDetails;
}

export default function MetacriticRating({ game }: Props) {
  return (
    <Card className="h-14 p-0">
      <div className="flex justify-between items-center h-full">
        <span className="pl-4">Metacritic</span>

        <Badge className="h-full text-base rounded-r-md rounded-l-none bg-muted text-primary px-4">
          {game.metacritic ? `${game.metacritic}%` : "N/A"}
        </Badge>
      </div>
    </Card>
  );
}
