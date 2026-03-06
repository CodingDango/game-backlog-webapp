import { formatDate } from "@/lib/utils";
import { AppImage } from "../common/AppImage";
import { RawgGame } from "@/types/types";

import Link from "next/link";
import GameCardAltSkeleton from "./GameCardAltSkeleton";

export default function GameCardAlt({
  game,
  isLoading = false,
}: {
  game: RawgGame | null;
  isLoading: boolean;
}) {
  if (isLoading || !game) return <GameCardAltSkeleton />;

  return (
    <div className="grid grid-cols-[auto_1fr] rounded-xl gap-6 relative">
      <div className="relative h-40 w-32">
        <div className="absolute inset-0">
          <AppImage src={game.background_image} alt="image of game" fill />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">{game.name}</h2>
        <div className="text-muted-foreground ">
          {formatDate(game.released)}
        </div>
      </div>

      <Link className="absolute inset-0 " href={`/games/${game.slug}`}></Link>
    </div>
  );
}
