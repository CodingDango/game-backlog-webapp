"use client";

import { Spinner } from "@/components/ui/spinner";
import GameGrid from "@/components/GameGrid";
import { Category, LibraryCategory } from "@/lib/types";
import { LibraryCategories } from "@/components/LibraryCategories";
import { useMemo, useState } from "react";
import { useHydratedLibrary } from "@/hooks/useGames";
import { SortLibrary } from "@/components/SortLibrary";

type SortFilter = "newest" | "oldest" | "title-asc" | "title-desc";

export default function UserLibrary() {
  const { data: hydratedLibrary, isLoading } = useHydratedLibrary();

  const [category, setCategory] = useState<LibraryCategory>("all games");
  const [sort, setSort] = useState<SortFilter>("newest");


  const games = useMemo(() => {
    if (!hydratedLibrary?.length) return [];

    const filtered = hydratedLibrary.filter(
      (game) =>
        category === "all games" ||
        game.user_game?.category === (category as Category)
    );

    if (sort === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.user_game?.created_at || "").getTime() -
          new Date(a.user_game?.created_at || "").getTime()
      );
    } else if (sort === "oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.user_game?.created_at || "").getTime() -
          new Date(b.user_game?.created_at || "").getTime()
      );
    } else if (sort === "title-asc") {
      filtered.sort((a, b) => a.rawg_game.name.localeCompare(b.rawg_game.name));
    } else if (sort === "title-desc") {
      filtered.sort((a, b) => b.rawg_game.name.localeCompare(a.rawg_game.name));
    }

    return filtered;
  }, [hydratedLibrary, category, sort]);

  return (
    <div className="w-full flex flex-col gap-12">
      <h1 className="text-4xl font-medium">Your Library</h1>

      <div className="flex justify-between gap-8 items-center">
        <LibraryCategories value={category} onValueChange={setCategory} />
        <SortLibrary
          value={sort}
          onValueChange={(val: string) => setSort(val as SortFilter)}
        />
      </div>

      {isLoading ? <Spinner /> : <GameGrid hydratedGames={games || []} />}
    </div>
  );
}
