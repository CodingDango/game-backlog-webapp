import type { Category, HydratedGame, RawgGame } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addGameToLibrary,
  removeGameFromLibrary,
  updateGameInLibrary,
} from "@/services/libraryService";

export function useGameMutation() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: ({
      rawgId,
      category,
      rating,
      game_name,
    }: {
      rawgId: number;
      category?: Category;
      rating?: number;
      game_name: string;
    }) => addGameToLibrary(rawgId, category, rating, game_name),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["userGames"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: ({
      rawgId,
      game_name,
    }: {
      rawgId: number;
      game_name: string;
    }) => removeGameFromLibrary(rawgId, game_name),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["userGames"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      rawgId,
      newCategory,
      newRating,
      game_name
    }: {
      rawgId: number;
      newCategory: Category;
      newRating: number;
      game_name: string;
    }) => updateGameInLibrary(rawgId, newCategory, newRating, game_name),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["userGames"] });
    },
  });

  return {
    addMutation,
    removeMutation,
    updateMutation,
  };
}
