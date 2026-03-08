import { Card } from "../ui/card";
import { RawgGame, RawgGameDetails } from "@/types/types";
import { Progress } from "../ui/progress";

interface Props {
  metacriticScore?: number
}

export default function GameMetacriticRating({ metacriticScore = 0}: Props) {
  return (
    <Card className="h-13 px-4">
      <div className="flex justify-between items-center h-full">
        <span className="font-semibold">Metacritic</span>

        <div className="relative w-full max-w-32 h-4">
          <Progress
            value={metacriticScore}
            max={100}
            className="w-full h-full"
          />
          <span className="text-xs absolute inset-0 flex justify-center items-center text-primary-foreground font-semibold">
            {metacriticScore ? (
              `${metacriticScore}%`
            ) : (
              <span className="text-secondary-foreground">N/A</span>
            )}
          </span>
        </div>
      </div>
    </Card>
  );
}
