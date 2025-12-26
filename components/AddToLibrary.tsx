import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MyRadioGroup } from "./MyRadioGroup";
import { CATEGORIES } from "@/lib/constants";

import RatingSelector from "./Rating";
import { use, useEffect, useState } from "react";
import { Category, HydratedGame, UserGame } from "@/lib/types";
import { useGameMutation } from "@/hooks/useGameMutations";
import { Skeleton } from "./ui/skeleton";
import { Spinner } from "./ui/spinner";

interface Props {
  userGame: UserGame | undefined;
  title: string;
  rawgId: number;
}

export default function AddToLibrary({ userGame, title, rawgId }: Props) {
  const { handleAddGame, handleModifyCategory, handleRemoveGame } =
    useGameMutation();
  const [category, setCategory] = useState<Category>(userGame?.category || "uncategorized");
  const [rating, setRating] = useState<number>(userGame?.user_rating || 0);

  // TODO: fix this into one return statement, ternary operator didnt was wasting my time with errors.
  if (!userGame) {
    return (
      <Button size={"lg"} disabled className="w-full flex justify-center">
        <Spinner />
      </Button>
    );
  } else {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"lg"} className="w-full flex justify-start">
            <Plus /> Add to library
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] flex flex-col gap-8">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="text-muted-foreground">Status</div>
            <MyRadioGroup
              options={CATEGORIES}
              value={category}
              onValueChange={(val: string) => setCategory(val as Category)}
            />
          </div>

          <div className="space-y-3">
            <div className="text-muted-foreground">Rating</div>
            <RatingSelector value={rating} onValueChange={setRating} />
          </div>

          <DialogFooter>
            <Button
              className="w-full"
              variant={"default"}
              onClick={() => alert("adding to library")}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
