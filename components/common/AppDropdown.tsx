"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

interface Props {
  value: string;
  onValueChange: (val: string) => void;
  items: DropdownItem[];
  text?: string;
  widthClass?: string;
}

export interface DropdownItem {
  value: string;
  text: string;
}

const DEFAULT_WIDTH = "w-50";

export default function AppDropdown({
  value,
  onValueChange,
  items,
  text,
  widthClass,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const activeItem = useMemo(
    () => items.find((item) => item.value == value),
    [value, items],
  );

  return (
    <DropdownMenu onOpenChange={setOpen} open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex justify-between px-6",
            widthClass || DEFAULT_WIDTH,
          )}
        >
          <span>
            {text} <span className="capitalize">{activeItem?.text}</span>
          </span>
          <ChevronDown
            className={cn(
              "transition-all duration-300",
              isOpen && "rotate-180",
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(widthClass || DEFAULT_WIDTH)}
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
            {items.map(({ value, text }, idx) => (
              <DropdownMenuRadioItem
                className="capitalize"
                key={`${value}-${idx}`}
                value={value}
              >
                {text}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
