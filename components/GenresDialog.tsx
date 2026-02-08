import { Dispatch, SetStateAction } from "react";
import { getGenres } from "@/services/rawgServices";
import { Genre } from "@/types/types";
import { Filter } from "./SearchFilters";

import DialogFilter from "./DialogFilter";

interface GenresDialogProps {
  genres: Set<string>; // slugs
  setActiveFilters: Dispatch<SetStateAction<Record<Filter, Set<string>>>>;
}

export default function GenresFilterDialog({
  genres,
  setActiveFilters,
}: GenresDialogProps) {
  return (
    <DialogFilter
      filterName="genres"
      activeSlugs={genres}
      setActiveFilters={setActiveFilters}
      queryFn={getGenres}
      queryKey={["genres"]}
      getSlug={(item: Genre) => item.slug}
      getName={(item: Genre) => item.name}
      getId={(item: Genre) => item.id.toString()}
    />
  );
}
