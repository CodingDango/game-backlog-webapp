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
    }: {
      rawgId: number;
      category?: Category;
      rating?: number;
    }) => addGameToLibrary(rawgId, category, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (rawgId: number) => removeGameFromLibrary(rawgId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      rawgId,
      newCategory,
      newRating,
    }: {
      rawgId: number;
      newCategory: Category;
      newRating: number;
    }) => updateGameInLibrary(rawgId, newCategory, newRating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
    },
  });

  return {
    handleAddGame: addMutation.mutateAsync,
    handleRemoveGame: removeMutation.mutateAsync,
    handleUpdateGame: updateMutation.mutateAsync,
  };
}
