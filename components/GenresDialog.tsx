import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";

import { Checkbox } from "./ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import SearchInput from "./SearchInput";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/services/rawgServices";
import { Spinner } from "./ui/spinner";

interface GenresDialogProps {
  activeGenres: Set<string>; // slugs
  setActiveGenres: Dispatch<SetStateAction<Set<string>>>;
}

export default function GenresDialog({
  activeGenres,
  setActiveGenres,
}: GenresDialogProps) {
  const [query, setQuery] = useState("");

  const { data: genres, isLoading: genresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const result = await getGenres();

      if (!result.success) {
        toast.error(result.error);
        return null;
      }

      return result.results;
    },
  });

  const genresToDisplay = useMemo(() => {
    if (!genres) return [];

    if (!query || !query.length) return genres;

    const queryLower = query.trim().toLowerCase();

    return genres.filter((genre) =>
      genre.name.toLowerCase().includes(queryLower),
    );
  }, [query, genres]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className='flex gap-2'>Genres <Badge variant='secondary'>{activeGenres.size}</Badge></Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle>Select Genres</DialogTitle>
        </DialogHeader>

        <SearchInput
          placeholder="Search a genre"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {genresLoading ? (
          <div className="flex-1 justify-center items-center flex">
            <Spinner className="size-6" />
          </div>
        ) : (
          <ScrollArea className="h-48 overflow-hidden flex flex-col">
            <div className="flex flex-col gap-3">
              {genresToDisplay &&
                genresToDisplay.map((genre, idx) => {
                  const isSelected = activeGenres.has(genre.slug);

                  return (
                    <Label
                      key={`genre-${idx}`}
                      className="flex gap-2 items-center cursor-pointer"
                    >
                      <Checkbox
                        value={genre.slug}
                        checked={isSelected}
                        onCheckedChange={checked => {
                          setActiveGenres((prev) => {
                            const next = new Set(prev);

                            if (checked) {
                              next.add(genre.slug);
                            } else {
                              next.delete(genre.slug);
                            }

                            return next;
                          });
                        }}
                      />
                      <span>{genre.name}</span>
                    </Label>
                  );
                })}

              {!genresToDisplay.length && (
                <span className="text-muted-foreground">No genres found.</span>
              )}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
