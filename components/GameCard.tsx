import { Skeleton } from "./ui/skeleton";
import { AppImage } from "./AppImage";
import { RawgGame } from "@/types/types";

import Link from "next/link";
import NotFoundCard from "./NotFoundCard";

interface Props {
  rawgGame?: RawgGame;
  isLoading?: boolean;
}

export default function GameCard({ rawgGame, isLoading = false }: Props) {
  // TODO: Figure out how to make card more consistent. when game name is more than 2 lines, it ruins the layout and makes the image smaller. i want all images to be the same size across different cards. hmmm..... rawg-io's implementation is different. they embrace the inconsistent layout? rawg io seems to use a grid of 3 columns, then the child being 3 flex boxes acting as the columns. interesting.

  if (isLoading)
    return (
      <div>
        <div className="relative flex flex-col gap-2 pb-2">
          <div className="flex-1 aspect-9/16 max-h-[300px]">
            <Skeleton className="w-full h-full object-cover rounded-md" />
          </div>
          <Skeleton className="w-32 h-6"></Skeleton>
        </div>
      </div>
    );

  return (
    <div>
      <div className="relative flex flex-col gap-2 pb-2">
        <Link
          className="absolute inset-0 rounded-md cursor-pointer z-10"
          href={`/games/${rawgGame!.slug}`}
        ></Link>

        <div className="flex-1 aspect-9/16 max-h-[300px]">
          {rawgGame && rawgGame.background_image?.length ? (
            <AppImage
              src={`${rawgGame.background_image}`}
              fill
              alt={`Picture of game ${rawgGame.name}`}
            />
          ) : (
            <NotFoundCard />
          )}
        </div>

        <span className="line-clamp-2 font-semibold">
          {rawgGame?.name || ""}
        </span>
      </div>
    </div>
  );
}
