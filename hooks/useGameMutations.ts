import type { Category, HydratedGame, RawgGame } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addGameToLibrary,
  removeGameFromLibrary,
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
      category?: any;
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

  return {
    handleAddGame: addMutation.mutateAsync,
    handleRemoveGame: removeMutation.mutateAsync,
  };
}
