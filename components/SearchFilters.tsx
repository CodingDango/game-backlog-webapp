import { useState } from "react";
import AppDropdown from "./AppDropdown";

export default function SearchFilters() {
  const orderingFields = [
    "name",
    "released",
    "added",
    "created",
    "updated",
    "rating",
    "metacritic",
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
