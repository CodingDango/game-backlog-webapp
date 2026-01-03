import { Card } from "./ui/card";
import { RawgGame, RawgGameDetails } from "@/lib/types";
import { Progress } from "./ui/progress";

interface Props {
  game: RawgGame | RawgGameDetails;
}

export default function MetacriticRating({ game }: Props) {
  const metacriticScore = game.metacritic ?? 0;

  return (
    <Card className="h-13 px-4">
      <div className="flex justify-between items-center h-full">
        <span className="font-medium">Metacritic</span>

        <div className="relative w-full max-w-32 h-4">
          <Progress
            value={metacriticScore}
            max={100}
            className="w-full h-full"
          />
          <span className="text-sm absolute inset-0 flex justify-center items-center text-primary-foreground font-medium">
            {metacriticScore ? `${metacriticScore}%` : "N/A"}
          </span>
        </div>
      </div>
    </Card>
  );
}
