import { Dispatch, SetStateAction, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

import AppDropdown, { DropdownItem } from "./AppDropdown";
import GenresFilterDialog from "./GenresDialog";
import PlatformFilterDialog from "./PlatformFilterDialog";
import { useSearchParams } from "next/navigation";

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
    { text: "release date", value: "-released" },
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
    <div className="flex justify-between gap-6">
      <div className="flex flex-col gap-6 max-w-[400px]">
        <div className="flex gap-4">
          <PlatformFilterDialog {...{ platforms, setActiveFilters }} />
          <GenresFilterDialog {...{ genres, setActiveFilters }} />
          <Button onClick={onApply}>Apply Filters</Button>
          <Button variant={"secondary"} size="icon" onClick={onReset}>
            <RefreshCcw />
          </Button>
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
