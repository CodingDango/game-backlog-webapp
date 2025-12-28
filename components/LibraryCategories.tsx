import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { CATEGORIES } from "@/lib/constants";
import { LibraryCategory } from "@/lib/types";

const OPTIONS: LibraryCategory[] = ["all games", ...CATEGORIES];

interface Props {
  value: LibraryCategory;
  onValueChange: (value: LibraryCategory) => void;
}

export function LibraryCategories({ value, onValueChange }: Props) {
  return (
    <RadioGroup
      defaultValue={value}
      className="flex gap-8"
      onValueChange={(val: string) => onValueChange(val as LibraryCategory)}
    >
      {OPTIONS.map((category, idx) => (
        <Label
          key={`category-${idx}`}
          className="flex items-center gap-3 capitalize cursor-pointer"
        >
          <RadioGroupItem value={category} id={`category-${idx}`} className="cursor-pointer"/>
          {category}
        </Label>
      ))}
    </RadioGroup>
  );
}
