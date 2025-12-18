import { Category } from "@/lib/types";
import { HydratedGame } from "@/lib/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { Check, ChevronDown, Plus } from "lucide-react";
import { useGameMutation } from "@/hooks/useGameMutations";
import { CATEGORIES } from "@/lib/constants";

interface Props {
  hydratedGame: HydratedGame;
}

export default function GameCardAction({ hydratedGame }: Props) {
  const { handleAddGame, handleModifyCategory, handleRemoveGame } =
    useGameMutation();
  const { user_game: userGame, rawg_game: rawgGame } = hydratedGame;

  return (
    <>
      {!userGame ? (
        <Button
          size={"icon-sm"}
          variant={"secondary"}
          onClick={() => handleAddGame(rawgGame)}
        >
          <Plus />
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon-sm"} variant={"secondary"}>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Choose Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CATEGORIES.map((category, idx) => (
              <DropdownMenuItem
                key={`${category}-${idx}`}
                className="flex justify-between capitalize"
                onClick={() => handleModifyCategory(hydratedGame, category)}
              >
                {category}
                {userGame.category === category && <Check />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              variant="destructive"
              onClick={() => handleRemoveGame(hydratedGame)}
            >
              Remove From Library
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
