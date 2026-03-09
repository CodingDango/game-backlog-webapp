import { Dispatch, SetStateAction, useState } from "react";
import { RefreshCcw, Sliders } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import AppDropdown, { DropdownItem } from "../common/AppDropdown";
import GenresFilterDialog from "../dialogs/GenresDialog";
import PlatformFilterDialog from "../dialogs/PlatformFilterDialog";

// TODO: Add date filters using shadcn calendar component
// TODO: add better ordering. like alphabetical, reversed alphhabetical, rating, etc. there is too many!

export type Filter = "genres" | "platforms";

interface SearchFiltersProps {
  activeFilters: Record<Filter, Set<string>>;
  setActiveFilters: Dispatch<SetStateAction<Record<Filter, Set<string>>>>;
  ordering: string;
  setOrdering: Dispatch<SetStateAction<string>>;
  onApply: () => void;
}

export default function SearchFilters({
  activeFilters,
  setActiveFilters,
  ordering,
  setOrdering,
  onApply,
}: SearchFiltersProps) {
  const orderingItems: DropdownItem[] = [
    { text: "popular", value: "-added" },
    { text: "newest", value: "-released" },
    { text: "oldest", value: "released" },
    { text: "name", value: "name" },
  ];

  const { platforms, genres } = activeFilters;
  const onReset = () => {
    setActiveFilters({
      genres: new Set(),
      platforms: new Set(),
    });
  };

  return (
    <div className="flex flex-wrap justify-between gap-6">
      <div className="flex flex-col gap-6 max-w-[400px]">
        <div className="flex gap-4 flex-wrap sm:flex-nowrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"}>
                Filters <Sliders />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="flex flex-col gap-4 max-w-56"
            >
              <PopoverHeader>
                <PopoverTitle className="text-muted-foreground">
                  Search Filters
                </PopoverTitle>
              </PopoverHeader>
              <PlatformFilterDialog {...{ platforms, setActiveFilters }} />
              <GenresFilterDialog {...{ genres, setActiveFilters }} />
              <div className="grid grid-cols-[1fr_auto] gap-4">
              <Button onClick={onApply}>Apply Filters</Button>
              <Button variant={"secondary"} size="icon" onClick={onReset}>
                <RefreshCcw />
              </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-muted-foreground">Sort by:</span>
        <AppDropdown
          widthClass="w-40"
          items={orderingItems}
          value={ordering}
          onValueChange={(val: string) => {
            setOrdering(val);
            setTimeout(onApply, 300);
          }}
        />
      </div>
    </div>
  );
}
