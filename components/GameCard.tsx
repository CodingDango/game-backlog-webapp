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

  debugger;

  return (
    <div>
      <div className="relative flex flex-col gap-2 pb-2">
        <Link
          className="absolute inset-0 rounded-md cursor-pointer z-10"
          href={`/games/${hydratedGame.rawg_game.slug}`}
        ></Link>
        <div className="flex-1 relative aspect-9/16 max-h-[300px]">
          {rawgGame.background_image ? (
            <Image
              src={`${rawgGame.background_image}`}
              fill
              className="object-cover rounded-md"
              alt={`Picture of game ${rawgGame.name}`}
            />
          ) : (
            <div className="w-full rounded-t-md object-cover grid place-items-center">
              No image found
            </div>
          )}
        </div>

        <span className="line-clamp-2 text-lg ">{rawgGame.name}</span>
      </div>
    </div>
  );
}
