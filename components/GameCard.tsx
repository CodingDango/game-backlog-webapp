import { Skeleton } from "./ui/skeleton";
import { AppImage } from "./AppImage";
import { FaSadTear } from "react-icons/fa";
import { RawgGame } from "@/types/types";

import Link from "next/link";

interface Props {
  rawgGame?: RawgGame;
  isLoading?: boolean;
}

export default function GameCard({ rawgGame, isLoading = false }: Props) {
  // TODO: Figure out how to make card more consistent. when game name is more than 2 lines, it ruins the layout and makes the image smaller. i want all images to be the same size across different cards. hmmm..... rawg-io's implementation is different. they embrace the inconsistent layout? rawg io seems to use a grid of 3 columns, then the child being 3 flex boxes acting as the columns. interesting.

  return (
    <div>
      <div className="relative flex flex-col gap-2 pb-2">
        {rawgGame && (
          <Link
            className="absolute inset-0 rounded-md cursor-pointer z-10"
            href={`/games/${rawgGame.slug}`}
          ></Link>
        )}
        <div className="flex-1 aspect-9/16 max-h-[300px]">
          {rawgGame && rawgGame.background_image && (
            <AppImage
              src={`${rawgGame.background_image}`}
              fill
              alt={`Picture of game ${rawgGame.name}`}
            />
          )}

          {!isLoading && rawgGame && !rawgGame.background_image && (
            <div className="w-full rounded-md object-cover grid place-items-center bg-accent text-muted-foreground">
              <FaSadTear />
            </div>
          )}

          {isLoading && (
            <Skeleton className="w-full h-full object-cover rounded-md" />
          )}
        </div>

        {isLoading ? (
          <Skeleton className="w-32 h-6"></Skeleton>
        ) : (
          <span className="line-clamp-2 font-semibold">
            {rawgGame?.name || ""}
          </span>
        )}
      </div>
    </div>
  );
}
