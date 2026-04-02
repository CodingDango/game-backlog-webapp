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
      gameName,
    }: {
      rawgId: number;
      category?: Category;
      rating?: number;
      gameName: string;
    }) => addGameToLibrary(rawgId, category, rating, gameName),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["userGames"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: ({
      rawgId,
      gameName,
    }: {
      rawgId: number;
      gameName: string;
    }) => removeGameFromLibrary(rawgId, gameName),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["userGames"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      rawgId,
      newCategory,
      newRating,
      gameName,
      fromCategory,
      fromRating
    }: {
      rawgId: number;
      newCategory: Category;
      newRating: number;
      gameName: string;
      fromCategory?: Category;
      fromRating?: number
    }) => updateGameInLibrary(rawgId, newCategory, newRating, gameName, fromCategory, fromRating),
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
