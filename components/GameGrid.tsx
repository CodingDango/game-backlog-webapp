import { RawgGame } from "@/types/types";
import GameCard from "./GameCard";

interface Props {
  rawgGames: RawgGame[];
  isLoading?: boolean;
}

export default function GameGrid({ rawgGames, isLoading = false}: Props) {
  return (
    <div className="w-full grid grid-cols-5 gap-8">
      {isLoading ? (
        Array.from({ length: 15 }).map((_, index) => (
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
