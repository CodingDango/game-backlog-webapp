"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string;
  onValueChange: (val: string) => void;
};

export function SortLibrary({
  value,
  onValueChange
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-between w-50 px-6">
          <span>Sort by {value}</span>
          <ChevronDown/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align='end'>
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value="newest">Sort by newest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Sort by oldest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="title-asc">Sort by title (asc)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="title-desc">Sort by title (desc)</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
