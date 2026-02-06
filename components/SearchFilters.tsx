import { useMemo, useState } from "react";
import { Genre } from "@/types/types";
import { Button } from "./ui/button";

import AppDropdown from "./AppDropdown";
import GenresDialog from "./GenresDialog";


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
  
  return (
    <div className="flex justify-between gap-6">
      <div className="flex flex-col gap-6 max-w-[400px]">
        <div className="flex gap-4">
          <Button variant={"outline"}>Platforms</Button>
          <GenresDialog {...{ activeGenres, setActiveGenres }} />
          <Button variant={"outline"}>Apply</Button>
          <Button variant={"outline"}>Reset</Button>
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
