import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useGameMutation } from "@/hooks/useGameMutations";
import { useState } from "react";
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

export default function GameLibraryAction({
  userGame,
  title,
  rawgId,
  isSessionLoading,
}: Props) {
  const { handleAddGame, handleRemoveGame, handleUpdateGame } =
    useGameMutation();
  const [view, setView] = useState<"closed" | "form" | "confirm">("closed");
  const [isRemoving, setIsRemoving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isNew = !userGame?.category;

  const onSave = async (category: Category, rating: number) => {
    setIsSaving(true);

    if (isNew) {
      await handleAdd(category, rating);
    } else {
      await handleUpdate(category, rating);
    }

    setIsSaving(false);
  };

  const handleAdd = async (category: Category, rating: number) => {
    const res = await handleAddGame({
      rawgId,
      category: category,
      rating: rating,
    });

    if (!res.success) {
      toast.error(`Could not add game to library: ${res.error}`);
    } else {
      toast.success(`Successfully added ${title || "game"} to the library`);
    }
  };

  const handleUpdate = async (newCategory: Category, newRating: number) => {
    debugger;
    const res = await handleUpdateGame({ rawgId, newCategory, newRating });

    if (!res.success) {
      toast.error("Could not update game in library.");
    } else {
      toast.success("Successfully updated game.");
    }
  };

  const onRemove = async () => {
    setIsRemoving(true);
    const res = await handleRemoveGame(rawgId);

    if (!res.success) {
      toast.error("Could not remove game from library");
    } else {
      toast.success("Successfully removed game from library");
    }

    setIsRemoving(false);
  };

  if (isSessionLoading) {
    return (
      <Button disabled className="w-full flex justify-center">
        <Spinner />
      </Button>
    );
  }

  return (
    <Dialog
      open={view !== "closed"}
      onOpenChange={(isOpen) => setView(isOpen ? "form" : "closed")}
    >
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
            isLoading={isSaving}
          />
        )}

        {view === "confirm" && (
          <ConfirmationBox
            onAccept={onRemove}
            onCancel={() => setView("form")}
            title="Remove Confirmation"
            description={`Are you sure you want to remove ${title} from your library?`}
            buttonText="Remove"
            isLoading={isRemoving}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
