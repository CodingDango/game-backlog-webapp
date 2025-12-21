import { HydratedGame } from "@/lib/types";
import GameCard from "./GameCard";

interface Props {
  hydratedGames: HydratedGame[];
}

export default function GameGrid({ hydratedGames }: Props) {
  return (
    <div className="w-full grid grid-cols-4 gap-8">
      {hydratedGames.map((hydrated) => (
        <GameCard
          key={hydrated.rawg_game.id}
          hydratedGame={hydrated}
        />
      ))}
    </div>
  );
}
