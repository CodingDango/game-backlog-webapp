"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string;
  onValueChange: (val: string) => void;
  items: DropdownItem[];
}

interface DropdownItem {
  value: string;
  text: string;
}

export default function AppDropdown({ value, onValueChange, items }: Props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen} open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-between w-50 px-6">
          <span>Sort by {value}</span>
          <ChevronDown
            className={cn(
              "transition-all duration-300",
              isOpen && "rotate-180",
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-50" align="end">
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {items.map(({ value, text }, idx) => (
            <DropdownMenuRadioItem key={`${value}-${idx}`} value={value}>
              {text}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
