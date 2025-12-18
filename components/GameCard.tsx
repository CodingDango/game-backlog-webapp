
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { HydratedGame } from "@/lib/types";
import { Badge } from "./ui/badge";
import { getMetascoreColor } from "@/lib/utils";

import GameCardAction from "./GameCardAction";
import Image from "next/image";

interface Props {
  hydratedGame: HydratedGame;
}

export default function GameCard({ hydratedGame }: Props) {
  const { rawg_game: rawgGame } = hydratedGame;
  const metascoreColors = getMetascoreColor(rawgGame.metacritic);
  
  return (
    <Card className="pt-0 border-0">
      <CardContent className="p-0 space-y-4">
        <div className="relative aspect-video">
          <Image
            src={`${rawgGame.background_image}`}
            fill
            className="object-cover rounded-t-lg"
            alt={`Picture of game ${rawgGame.name}`}
          />
        </div>
        <div className="h-full flex-1 px-4 space-y-2">
          {/* TODO: Add platforms available  */}
          {/* TODO: make metacritic badge disappear when there is no metacritic available */}
          {rawgGame.metacritic ? (
            <Badge
              className={`rounded-sm bg-transparent ${metascoreColors.borderCol} ${metascoreColors.textCol}`}
            >{rawgGame.metacritic}</Badge>
          ) : <Badge className="rounded-sm" variant={'outline'}>?</Badge>}
          {/* could be card title, not sure. */}
          <span className="line-clamp-2 text-xl">{rawgGame.name}</span>
          
          <GameCardAction hydratedGame={hydratedGame}/>
        </div>
      </CardContent>
    </Card>
  );
}
