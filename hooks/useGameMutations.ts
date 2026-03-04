import type { Category, HydratedGame, RawgGame } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";

import {
  addGameToLibrary,
  removeGameFromLibrary,
} from "@/services/libraryService";

export function useGameMutation() {
  const queryClient = useQueryClient();

  const handleAddGame = async (
    rawgId: number,
    category?: Category,
    rating?: number,
  ) => {
    const res = await addGameToLibrary(rawgId, category, rating);
    queryClient.invalidateQueries({ queryKey: ["userGames"] });

    return res;
  };

  const handleRemoveGame = async (rawgId: number) => {
    const res = await removeGameFromLibrary(rawgId);
    queryClient.invalidateQueries({ queryKey: ["userGames"] });

    return res;
  };

  return { handleAddGame, handleRemoveGame };
}
