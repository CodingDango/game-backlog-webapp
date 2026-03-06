import { Skeleton } from "../ui/skeleton";
import { AppImage } from "../common/AppImage";
import { RawgGame } from "@/types/types";

import Link from "next/link";
import NotFoundCard from "../common/NotFoundCard";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
  rawgGame?: RawgGame;
  isLoading?: boolean;
}

export default function GameCard({ rawgGame, isLoading = false}: Props) {
  if (isLoading) return  <GameCardSkeleton/>

  return (
    <div className="relative">
        <Link
          className="absolute inset-0 rounded-md cursor-pointer z-10"
          href={`/games/${rawgGame!.slug}`}
        ></Link>
      <div className="relative flex flex-col gap-2 pb-2 justify-center mx-auto">

        <div className="flex-1 aspect-9/16 max-h-[260px]">
          {rawgGame && rawgGame.background_image?.length ? (
            <AppImage
              src={`${rawgGame.background_image}`}
              fill
              alt={`Picture of game ${rawgGame.name}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
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
