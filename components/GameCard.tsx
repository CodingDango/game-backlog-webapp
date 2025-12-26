import { Card, CardContent } from "@/components/ui/card";

import type { HydratedGame } from "@/lib/types";
import { Badge } from "./ui/badge";
import { getMetascoreColor } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

import GameCardAction from "./GameCardAction";
import Image from "next/image";
import Link from "next/link";

interface Props {
  hydratedGame: HydratedGame;
}

export default function GameCard({ hydratedGame }: Props) {
  const { rawg_game: rawgGame } = hydratedGame;
  const metascoreColors = getMetascoreColor(rawgGame.metacritic);

  // TODO: Figure out how to make card more consistent. when game name is more than 2 lines, it ruins the layout and makes the image smaller. i want all images to be the same size across different cards. hmmm..... rawg-io's implementation is different. they embrace the inconsistent layout? rawg io seems to use a grid of 3 columns, then the child being 3 flex boxes acting as the columns. interesting.

  debugger

  return (
    <Card className="p-0 pb-6 pt-0 border-0 relative group">
      <Link
        className="absolute inset-0 rounded-xl cursor-pointer z-10"
        href={`/games/${hydratedGame.rawg_game.slug}`}
      ></Link>

      <CardContent className="h-full p-0 flex flex-col gap-4">
        <div className="flex-1 relative aspect-video">
          {rawgGame.background_image ? (
            <Image
              src={`${rawgGame.background_image}`}
              fill
              className="object-cover rounded-t-xl"
              alt={`Picture of game ${rawgGame.name}`}
            />
          ) : (
            <div className="w-full h-full rounded-t-xl object-cover grid place-items-center">
              No image found
            </div>
          )}
        </div>

        <div className="px-4 space-y-2">
          {/* TODO: Add platforms available  */}
          {rawgGame.metacritic ? (
            <Badge
              className={`rounded-sm bg-transparent ${metascoreColors.borderCol} ${metascoreColors.textCol}`}
            >
              {rawgGame.metacritic}
            </Badge>
          ) : (
            <Badge className="rounded-sm" variant={"outline"}>
              ?
            </Badge>
          )}
          {/* could be card title, not sure. */}
          <span className="line-clamp-2 text-xl">{rawgGame.name}</span>
          
          <div className="relative z-20">
            <GameCardAction hydratedGame={hydratedGame}/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
