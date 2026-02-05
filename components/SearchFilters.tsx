import { useState } from "react";
import AppDropdown from "./AppDropdown";
import { Button } from "./ui/button";

// TODO: Add date filters using shadcn calendar component
// TODO: add better ordering. like alphabetical, reversed alphhabetical, rating, etc. there is too many!


export default function SearchFilters() {
  const orderingFields = [
    "relevance",
    "release date",
    "name",
  ];
  const orderingDropdownItems = orderingFields.map((field) => ({
    value: field,
    text: field,
  }));

  const [filters, setFilters] = useState({
    ordering: "",
  });

  return (
    <div className="flex justify-between gap-6">
      <div className="flex gap-4">
        <Button variant={'outline'}>Platforms</Button>
        <Button variant={'outline'}>Genres</Button>
        <Button variant={'outline'}>Reset</Button>
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
