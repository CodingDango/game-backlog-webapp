import { Dispatch, SetStateAction } from "react";
import { getGenres, getPlatforms } from "@/services/rawgServices";
import { Genre, Platform } from "@/types/types";

import DialogFilter from "./DialogFilter";

interface PlatformFilterDialog {
  activePlatforms: Set<string>; // slugs
  setActivePlatforms: Dispatch<SetStateAction<Set<string>>>;
}

export default function PlatformFilterDialog({
  activePlatforms,
  setActivePlatforms,
}: PlatformFilterDialog) {
  return (
    <DialogFilter
      filterName='platforms'
      activeSlugs={activePlatforms}
      setActiveSlugs={setActivePlatforms}
      queryFn={getPlatforms}
      queryKey={['platforms']}
      getSlug={(item: Platform) => item.slug}
      getName={(item: Platform) => item.name}
    />
  )
}
