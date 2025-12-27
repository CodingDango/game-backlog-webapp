import { MyRadioGroup } from "./MyRadioGroup";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "./ui/button";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { FormEvent, useState } from "react";
import { Category } from "@/lib/types";

import RatingSelector from "./Rating";

interface GameFormProps {
  title: string;
  defaultCategory: Category;
  defaultRating: number;
  isNewEntry: boolean;
  onSave: (cat: Category, rate: number) => void;
}
export default function GameForm({
  title,
  defaultCategory,
  defaultRating,
  isNewEntry,
  onSave,
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

      <Button type="submit" className="w-full" variant={"default"}>
        {isNewEntry ? "Add to Library" : "Save Changes"}
      </Button>
    </form>
  );
}
