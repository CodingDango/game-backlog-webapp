"use client";

import { Category, LibraryCategory } from "@/types/types";
import { useMemo, useState } from "react";
import { useHydratedLibrary } from "@/hooks/useGames";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import LibraryCategories from "@/components/library/LibraryCategories";
import GameGrid from "@/components/game/GameGrid";
import AppDropdown from "@/components/common/AppDropdown";
import SearchInput from "@/components/search/SearchInput";

type SortFilter = "newest" | "oldest" | "title-asc" | "title-desc";

export default function UserLibrary() {
  const { data: hydratedLibrary, isLoading } = useHydratedLibrary();
  const [category, setCategory] = useState<LibraryCategory>("all games");
  const [sort, setSort] = useState<SortFilter>("newest");
  const [title, setTitle] = useState("");

  const games = useMemo(() => {
    if (!hydratedLibrary?.length) return [];

    let filtered = hydratedLibrary.filter(
      (game) =>
        category === "all games" ||
        game.user_game?.category === (category as Category),
    );

    const titleLower = title.toLowerCase();

    filtered = filtered.filter((game) =>
      game.rawg_game.slug.includes(titleLower),
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
  }, [hydratedLibrary, category, sort, title]);

  const sortDropdownItems = [
    { text: "newest added", value: "newest" },
    { text: "oldest added", value: "oldest" },
    { text: "title (asc)", value: "title-asc" },
    { text: "title (desc)", value: "title-desc" },
  ];

  return (
    <div className="w-full flex flex-col gap-12">
      <h1 className="text-3xl sm:text-4xl font-semibold">Your Library</h1>

      <div className="flex flex-col sm:flex-row justify-between gap-6 sm:items-center">
        <div className="flex-1 flex gap-4">
          <div className="max-w-80 w-full">
            <SearchInput
              placeholder="Filter games by title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <Filter />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="flex flex-col gap-4 max-w-44"
            >
              <PopoverHeader>
                <PopoverTitle>
                  Filter by categories
                </PopoverTitle>
              </PopoverHeader>
              <LibraryCategories value={category} onValueChange={setCategory} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex gap-3 items-center">
          <span className="text-muted-foreground">Sort by:</span>
          <AppDropdown
            value={sort}
            onValueChange={(val: string) => setSort(val as SortFilter)}
            items={sortDropdownItems}
          />
        </div>
      </div>

      {hydratedLibrary?.length == 0 && !isLoading ? (
        <span>Your library is empty. You should add some games!</span>
      ) : (
        <GameGrid isLoading={isLoading} rawgGames={games} length={15} />
      )}
    </div>
  );
}
