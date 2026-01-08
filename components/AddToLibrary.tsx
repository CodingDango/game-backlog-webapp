import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useGameMutation } from "@/hooks/useGameMutations";
import { useState } from "react";
import { UserGame } from "@/lib/types";
import { Spinner } from "./ui/spinner";

import LibraryTrigger from "./LibraryTrigger";
import GameForm from "./GameForm";

interface Props {
  userGame: UserGame | null | undefined;
  title: string;
  rawgId: number;
  isLoading: boolean;
}

export default function AddToLibrary({ userGame, title, rawgId, isLoading }: Props) {
  const { handleAddGame } = useGameMutation();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <Button size="lg" disabled className="w-full flex justify-center">
        <Spinner />
      </Button>
    );
  }
  const currentCategory = userGame?.category;
  const currentRating = userGame?.user_rating ?? 0;
  const isNew = !userGame?.category;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        <LibraryTrigger gameCategory={currentCategory}/>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        {isOpen && (
          <GameForm 
            title={title}
            defaultCategory={'uncategorized'}
            defaultRating={currentRating}
            isNewEntry={isNew}
            onSave={(cat, rate) => {
              handleAddGame(rawgId, cat, rate);
              setIsOpen(false); // Close modal on save
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}