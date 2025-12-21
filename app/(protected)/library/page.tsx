"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getHydratedUserLibrary } from "@/lib/actions";
import { Spinner } from "@/components/ui/spinner";
import GameGrid from "@/components/GameGrid";
import { Input } from "@/components/ui/input";
import { Category, LibraryCategory } from "@/lib/types";
import { LibraryCategories } from "@/components/LibraryCategories";
import { useMemo, useState } from "react";
import { useHydratedLibrary } from "@/hooks/useGames";

export default function UserLibrary() {
  const { data: hydratedLibrary, isLoading } = useHydratedLibrary();
  const [category, setCategory] = useState<LibraryCategory>("all games");

  const games = useMemo(() => {
    if (!hydratedLibrary?.length) return [];

    const filtered = hydratedLibrary.filter(
      (game) =>
        category === "all games"
        || game.user_game?.category === (category as Category) 
    );

    filtered.sort(
      (a, b) =>
        new Date(b.user_game?.created_at || "").getTime() -
        new Date(a.user_game?.created_at || "").getTime()
    );

    return filtered;
  }, [hydratedLibrary, category]);

  return (
    <div className="w-full flex flex-col gap-12">
      <h1 className="text-4xl font-medium">Your Library</h1>

      <LibraryCategories value={category} onValueChange={setCategory} />

      {isLoading ? <Spinner /> : <GameGrid hydratedGames={games || []} />}
    </div>
  );
}
