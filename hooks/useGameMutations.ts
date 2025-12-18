import { toast } from "sonner";

import type { Category, HydratedGame, RawgGame } from "@/lib/types";

import { useQueryClient } from "@tanstack/react-query";

import {
  addGameToLibrary,
  modifyUserGameCategory,
  removeGameFromLibrary,
} from "@/lib/actions";

export function useGameMutation() {
  const queryClient = useQueryClient();

  const handleAddGame = async (rawgGame: RawgGame) => {
    const { success, error } = await addGameToLibrary(rawgGame.id);

    if (!success) {
      toast.error(`Could not add game to library: ${error}`);
    } else {
      toast.success(`Successfully added ${rawgGame.name} to the library`);
    }

    queryClient.invalidateQueries({ queryKey: ["userGames"] });
  };

  const handleRemoveGame = async (hydratedGame: HydratedGame) => {
    const { rawg_game: rawgGame } = hydratedGame;
    const { success, error } = await removeGameFromLibrary(rawgGame.id);

    if (!success) {
      toast.error(`Could not remove game from library: ${error}`);
    } else {
      toast.success(`Successfully removed ${rawgGame.name} from library`);
    }

    queryClient.invalidateQueries({ queryKey: ["userGames"] });
  };

  const handleModifyCategory = async (hydratedGame: HydratedGame, newCategory: Category) => {
    const { rawg_game: rawgGame, user_game: userGame} = hydratedGame;

    if (!userGame) {
      toast.error('Cannot change category if not in library ');
      return;
    }

    const { success, error } = await modifyUserGameCategory(
      userGame.id,
      newCategory
    );

    if (!success) {
      toast.error(`Could not change games category: ${error}`);
    } else {
      toast.success(`Successfully changed category for ${rawgGame.name}`);
    }

    queryClient.invalidateQueries({ queryKey: ["userGames"] });
  };

  return { handleAddGame, handleModifyCategory, handleRemoveGame };
}
