"use client";

import { Spinner } from "@/components/ui/spinner";
import { Category, LibraryCategory } from "@/types/types";
import { LibraryCategories } from "@/components/LibraryCategories";
import { useMemo, useState } from "react";
import { useHydratedLibrary } from "@/hooks/useGames";

import GameGrid from "@/components/GameGrid";
import AppDropdown from "@/components/AppDropdown";

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
        game.user_game?.category === (category as Category),
    );

    if (sort === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.user_game?.created_at || "").getTime() -
          new Date(a.user_game?.created_at || "").getTime(),
      );
    } else if (sort === "oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.user_game?.created_at || "").getTime() -
          new Date(b.user_game?.created_at || "").getTime(),
      );
    } else if (sort === "title-asc") {
      filtered.sort((a, b) => a.rawg_game.name.localeCompare(b.rawg_game.name));
    } else if (sort === "title-desc") {
      filtered.sort((a, b) => b.rawg_game.name.localeCompare(a.rawg_game.name));
    }

    return filtered.map((game) => game.rawg_game);
  }, [hydratedLibrary, category, sort]);

  const sortDropdownItems = [
    { text: "newest", value: "newest" },
    { text: "oldest", value: "oldest" },
    { text: "title (asc)", value: "title-asc" },
    { text: "title (desc)", value: "title-desc" },
  ];

  return (
    <div className="w-full flex flex-col gap-12">
      <h1 className="text-4xl font-semibold">Your Library</h1>

      <div className="flex justify-between gap-8 items-center">
        <LibraryCategories value={category} onValueChange={setCategory} />
        <AppDropdown
          value={sort}
          onValueChange={(val: string) => setSort(val as SortFilter)}
          items={sortDropdownItems}
        />
      </div>

      <GameGrid isLoading={isLoading} rawgGames={games}/>
    </div>  
  );
}
