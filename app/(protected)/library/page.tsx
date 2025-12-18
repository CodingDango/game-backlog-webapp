"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getHydratedUserLibrary } from "@/lib/actions";
import { Spinner } from "@/components/ui/spinner";
import GameGrid from "@/components/GameGrid";

export default function UserLibrary() {
  const {
    data: hydratedUserLibrary,
    isLoading: isLoadingUserGames,
    isError: isErrorUserGames,
    error: errorUserGames,
  } = useQuery({
    queryKey: ["userGames", "hydratedUserLibrary"],
    queryFn: async () => {
      const hydratedLibraryRes = await getHydratedUserLibrary();

      if (!hydratedLibraryRes.success) {
        toast.error(hydratedLibraryRes.error);
        return [];
      }

      return hydratedLibraryRes.results;
    },
  });

  return (
    <div className="w-full flex flex-col gap-8">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-medium">Your Library</h1>
      </header>

      {isLoadingUserGames ? (
        <Spinner />
      ) : (
        <GameGrid hydratedGames={hydratedUserLibrary || []} />
      )}
    </div>
  );
}
