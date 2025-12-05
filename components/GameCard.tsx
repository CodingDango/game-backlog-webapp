import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Game } from "@/lib/types";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";
import { getMetascoreColor } from "@/lib/utils";
import { addGameToLibrary, removeGameFromLibrary } from "@/lib/actions";
import { toast } from "sonner";

interface Props {
  game: Game;
  isInUserLibrary: boolean;
}

export default function GameCard({ game, isInUserLibrary }: Props) {
  const handleAddGame = async () => {
    const { success, error } = await addGameToLibrary(game.id, "uncategorized");

    if (!success) {
      toast.error(`Could not add game to library: ${error}`);
    } else {
      toast.success(`Successfully added ${game.name} to the library`);
    }
  };

  const handleRemoveGame = async () => {
    const { success, error } = await removeGameFromLibrary(game.id);

    if (!success) {
      toast.error(`Could not remove game from library: ${error}`);
    } else {
      toast.success(`Successfully removed ${game.name} from library`);
    }
  };

  const metascoreColors = getMetascoreColor(game.metacritic);
  const actionButton = isInUserLibrary ? (
    <Button size={"icon-sm"} variant={"destructive"} onClick={handleRemoveGame}>
      <X />
    </Button>
  ) : (
    <Button size={"icon-sm"} variant={"secondary"} onClick={handleAddGame}>
      <Plus />
    </Button>
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
