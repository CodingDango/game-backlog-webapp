import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "./ui/badge";
import { Category, RawgGame, UserGame } from "@/lib/types";
import { Button } from "./ui/button";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import { getMetascoreColor } from "@/lib/utils";
import { addGameToLibrary, modifyUserGameCategory, removeGameFromLibrary } from "@/lib/actions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

interface Props {
  game: RawgGame;
  userGame: UserGame | undefined;
}

export default function GameCard({ game, userGame }: Props) {
  const queryClient = useQueryClient();

  const handleAddGame = async () => {
    const { success, error } = await addGameToLibrary(game.id, "uncategorized");

    if (!success) {
      toast.error(`Could not add game to library: ${error}`);
    } else {
      toast.success(`Successfully added ${game.name} to the library`);
    }

    queryClient.invalidateQueries({ queryKey: ['userGames']})
  };

  const handleRemoveGame = async () => {
    const { success, error } = await removeGameFromLibrary(game.id);

    if (!success) {
      toast.error(`Could not remove game from library: ${error}`);
    } else {
      toast.success(`Successfully removed ${game.name} from library`);
    }

    queryClient.invalidateQueries({ queryKey: ['userGames']})
  };

  const handleModifyCategory = async (newCategory: Category) => {
    if (!userGame) return;

    const { success, error } = await modifyUserGameCategory(userGame.id, newCategory);

    if (!success) {
      toast.error(`Could not change games category: ${error}`);
    } else {
      toast.success(`Successfully changed category for ${game.name}`);
    }

    queryClient.invalidateQueries({ queryKey: ['userGames']})
  }

  const metascoreColors = getMetascoreColor(game.metacritic);
  const actionButton = !userGame ? (
    <Button size={"icon-sm"} variant={"secondary"} onClick={handleAddGame}>
      <Plus />
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon-sm'} className="bg-green-600 text-primary hover:text-secondary hover:bg-primary">
          <ChevronDown/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuLabel>Choose Category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between" onClick={() => handleModifyCategory('uncategorized')}>Uncategorized {userGame.category === 'uncategorized' && <Check/>}</DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between" onClick={() => handleModifyCategory('playing')}>Playing {userGame.category === 'playing' && <Check/>}</DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between" onClick={() => handleModifyCategory('played')}>Played {userGame.category === 'played' && <Check/>}</DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between" onClick={() => handleModifyCategory('unplayed')}>Not Played {userGame.category === 'unplayed'  && <Check/>}</DropdownMenuItem>
        <DropdownMenuItem variant='destructive' onClick={handleRemoveGame}>Remove From Library</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <Card className="pt-0 border-0">
      <div className="relative aspect-video">
        <Image
          src={`${game.background_image}`}
          fill
          className="object-cover rounded-t-lg"
          alt={`Picture of game ${game.name}`}
        />
      </div>
      <CardHeader className="h-full flex-1 px-4">
        <Badge
          className={`rounded-sm bg-transparent ${metascoreColors.borderCol} ${metascoreColors.textCol}`}
        >
          {game.metacritic}
        </Badge>
        <CardTitle className="line-clamp-2 text-xl">{game.name}</CardTitle>
        {actionButton}
      </CardHeader>
    </Card>
  );
}
