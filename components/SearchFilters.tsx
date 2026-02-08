import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

import AppDropdown from "./AppDropdown";
import GenresFilterDialog from "./GenresDialog";
import PlatformFilterDialog from "./PlatformFilterDialog";

// TODO: Add date filters using shadcn calendar component
// TODO: add better ordering. like alphabetical, reversed alphhabetical, rating, etc. there is too many!

export type Filter = "genres" | "platforms";

interface SearchFiltersProps {
  activeFilters: Record<Filter, Set<string>>;
  setActiveFilters: Dispatch<SetStateAction<Record<Filter, Set<string>>>>;
  onApply: () => void;
}

export default function SearchFilters({
  activeFilters,
  setActiveFilters,
  onApply
}: SearchFiltersProps) {
  const orderingFields = ["relevance", "release date", "name"];

  const orderingDropdownItems = orderingFields.map((field) => ({
    value: field,
    text: field,
  }));

  const [filters, setFilters] = useState({
    ordering: "relevance",
  });

  const { platforms, genres } = activeFilters;

  return (
    <div className="flex justify-between gap-6">
      <div className="flex flex-col gap-6 max-w-[400px]">
        <div className="flex gap-4">
          <PlatformFilterDialog {...{ platforms, setActiveFilters }} />
          <GenresFilterDialog {...{ genres, setActiveFilters }} />
          <Button onClick={onApply} >
            Apply Filters
          </Button>
          <Button variant={"secondary"} size="icon">
            <RefreshCcw />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-muted-foreground">Sort by:</span>
        <AppDropdown
        widthClass="w-40"
          items={orderingDropdownItems}
          value={filters.ordering}
          onValueChange={(val: string) =>
            setFilters((prev) => ({ ...prev, ordering: val }))
          }
        />
      </div>
    </div>
  );
}
