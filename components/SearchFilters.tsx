import { useMemo, useState } from "react";
import { RefreshCcw } from 'lucide-react';
import { Button } from "./ui/button";

import AppDropdown from "./AppDropdown";
import GenresFilterDialog from "./GenresDialog";
import PlatformFilterDialog from "./PlatformFilterDialog";


// TODO: Add date filters using shadcn calendar component
// TODO: add better ordering. like alphabetical, reversed alphhabetical, rating, etc. there is too many!

export default function SearchFilters() {
  const orderingFields = ["relevance", "release date", "name"];

  const orderingDropdownItems = orderingFields.map((field) => ({
    value: field,
    text: field,
  }));

  const [filters, setFilters] = useState({
    ordering: "relevance",
  });

  const [activeGenres, setActiveGenres] = useState<Set<string>>(new Set<string>([]));
  const [activePlatforms, setActivePlatforms] = useState<Set<string>>(new Set<string>([]));
  
  return (
    <div className="flex justify-between gap-6">
      <div className="flex flex-col gap-6 max-w-[400px]">
        <div className="flex gap-4">
          <PlatformFilterDialog {...{activePlatforms, setActivePlatforms}}/>
          <GenresFilterDialog {...{activeGenres, setActiveGenres}}/>
          <Button>Apply</Button>
          <Button variant={'secondary'} size='icon'>
            <RefreshCcw/>
          </Button>
        </div>
      </div>

      <div>
        <AppDropdown
          value={filters.ordering}
          onValueChange={(val: string) =>
            setFilters((prev) => ({ ...prev, ordering: val }))
          }
          items={orderingDropdownItems}
        />
      </div>
    </div>
  );
}
