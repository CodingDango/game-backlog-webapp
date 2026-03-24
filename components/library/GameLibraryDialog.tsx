import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useGameMutation } from "@/hooks/useGameMutations";
import { useState, useEffect } from "react";
import { Category, UserGame } from "@/types/types";
import { Spinner } from "../ui/spinner";
import { ConfirmationBox } from "../dialogs/ConfirmationBox";

import LibraryTrigger from "./LibraryTrigger";
import GameForm from "../game/GameForm";

interface Props {
  userGame: UserGame | null | undefined;
  title: string;
  rawgId: number;
  isSessionLoading: boolean;
}

export default function GameLibraryDialog({
  userGame,
  title,
  rawgId,
  isSessionLoading,
}: Props) {
  const { addMutation, removeMutation, updateMutation } = useGameMutation();

  const [view, setView] = useState<"form" | "confirm">("form");
  const [isOpen, setIsOpen] = useState(false);

  const isNew = !userGame?.category;
  const isPending = addMutation.isPending || updateMutation.isPending;

  const onSave = async (category: Category, rating: number) => {
    if (isNew) {
      await handleAdd(category, rating);
      setIsOpen(false);
    } else {
      await handleUpdate(category, rating);
    }
  };

  const handleAdd = async (category: Category, rating: number) => {
    const res = await addMutation.mutateAsync({
      rawgId,
      category: category,
      rating: rating,
      game_name: title,
    });

    if (!res.success) {
      toast.error(`Could not add game to library: ${res.error}`);
    } else {
      toast.success(`Successfully added ${title || "game"} to the library`);
    }
  };

  const handleUpdate = async (newCategory: Category, newRating: number) => {
    const res = await updateMutation.mutateAsync({
      rawgId,
      newCategory,
      newRating,
      game_name: title,
    });

    if (!res.success) {
      toast.error("Could not update game in library.");
    } else {
      toast.success("Successfully updated game.");
    }
  };

  const onRemove = async () => {
    const res = await removeMutation.mutateAsync({ rawgId, game_name: title });

    if (!res.success) {
      toast.error("Could not remove game from library");
    } else {
      toast.success("Successfully removed game from library");
    }

    setIsOpen(false);
  };

  if (isSessionLoading) {
    return (
      <Button disabled className="w-full flex justify-center">
        <Spinner />
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        <LibraryTrigger gameCategory={userGame?.category} />
      </DialogTrigger>

      <DialogContent
        className={view === "form" ? "sm:max-w-[500px]" : "sm:max-w-[450px]"}
      >
        {view === "form" && (
          <GameForm
            title={title}
            defaultCategory={userGame?.category ?? "uncategorized"}
            defaultRating={userGame?.user_rating ?? 0}
            isNewEntry={!userGame?.category}
            onSave={onSave}
            onRemove={() => setView("confirm")}
            isPending={isPending}
          />
        )}

        {view === "confirm" && (
          <ConfirmationBox
            onAccept={onRemove}
            onCancel={() => setView("form")}
            title="Remove Confirmation"
            description={`Are you sure you want to remove ${title} from your library?`}
            buttonText="Remove"
            isLoading={removeMutation.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
