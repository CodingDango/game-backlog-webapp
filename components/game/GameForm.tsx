import { AppRadioGroup } from "../common/AppRadioGroup";
import { CATEGORIES } from "@/constants/gameConstants";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { FormEvent, useState } from "react";
import { Category } from "@/types/types";

import RatingSelector from "../common/Rating";
import { Check, CirclePlus, Plus, Trash } from "lucide-react";
import AppButton from "../common/AppButton";

interface GameFormProps {
  title: string;
  defaultCategory: Category;
  defaultRating: number;
  isNewEntry: boolean;
  onSave: (cat: Category, rate: number) => void;
  onRemove: () => void;
  isAdding?: boolean;
  isSavingChanges?: boolean;
}
export default function GameForm({
  title,
  defaultCategory,
  defaultRating,
  isNewEntry,
  isAdding = false,
  isSavingChanges = false,
  onSave,
  onRemove,
}: GameFormProps) {
  const [category, setCategory] = useState<Category>(defaultCategory);
  const [rating, setRating] = useState<number>(defaultRating);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(category, rating);
  };

  return (
    <form className="space-y-8" onSubmit={handleOnSubmit}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      <div className="space-y-3">
        <div className="text-muted-foreground">Status</div>
        <AppRadioGroup
          options={CATEGORIES}
          value={category}
          onValueChange={(val: string) => setCategory(val as Category)}
        />
      </div>

      <div className="space-y-3">
        <div className="text-muted-foreground">Rating</div>
        <RatingSelector value={rating} onValueChange={setRating} />
      </div>

      <div className="space-y-3">
        {isNewEntry ? (
          <AppButton type="submit" className="w-full" icon={<Plus /> } isLoading={isAdding} loadingText="Adding to library">
            Add to library
          </AppButton>
        ) : (
          <AppButton type="submit" className="w-full" icon={<Check /> } isLoading={isSavingChanges} loadingText="Saving">
            Save Changes
          </AppButton>
        )}
        
        {!isNewEntry && (
          <Button
            type="button"
            className="w-full"
            variant={"secondary"}
            onClick={onRemove}  
          >
            <Trash /> Remove from Library
          </Button>
        )}
      </div>
    </form>
  );
}
