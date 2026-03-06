import { Dispatch, SetStateAction } from "react";
import { getPlatforms } from "@/services/rawgServices";
import { Filter } from "../search/SearchFilters";

import DialogFilter from "./DialogFilter";

interface PlatformFilterDialog {
  platforms: Set<string>; // slugs
  setActiveFilters: Dispatch<SetStateAction<Record<Filter, Set<string>>>>;  
}

export default function PlatformFilterDialog({
  platforms,
  setActiveFilters,
}: PlatformFilterDialog) {
  return (
    <DialogFilter
      filterName='platforms'
      activeSlugs={platforms}
      setActiveFilters={setActiveFilters}
      queryFn={getPlatforms}
      queryKey={['platforms']}
      getSlug={(item) => item.slug}
      getName={(item) => item.name}
      getId={(item) => item.id.toString()}
    />
  )
} 
