import { Dispatch, SetStateAction } from "react";
import { getGenres } from "@/services/rawgServices";
import { Genre } from "@/types/types";

import DialogFilter from "./DialogFilter";

interface GenresDialogProps {
  activeGenres: Set<string>; // slugs
  setActiveGenres: Dispatch<SetStateAction<Set<string>>>;
}

export default function GenresFilterDialog({
  activeGenres,
  setActiveGenres,
}: GenresDialogProps) {
  return (
    <DialogFilter
      filterName='genres'
      activeSlugs={activeGenres}
      setActiveSlugs={setActiveGenres}
      queryFn={getGenres}
      queryKey={['genres']}
      getSlug={(item: Genre) => item.slug}
      getName={(item: Genre) => item.name}
    />
  )
}
