import { RawgGame } from "@/types/types";
import GameCard from "./GameCard";

interface Props {
  rawgGames: RawgGame[];
  isLoading?: boolean;
  length?: number;
}

export default function GameGrid({ rawgGames, isLoading = false, length = 15}: Props) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
      {isLoading ? (
        Array.from({ length }).map((_, index) => (
          <GameCard key={index} isLoading={true}/>
        ))
      ) : (
        rawgGames.map((game) => (
          <GameCard
            key={game.id}
            rawgGame={game}
          />
        ))
      )}

      {!isLoading && !rawgGames.length && (
        <span>No games found..</span>
      )}
    </div>
  );
}
