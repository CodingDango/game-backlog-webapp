import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "./ui/spinner";
import { ApiResponse } from "@/types/types";

import SearchInput from "./SearchInput";

interface DialogFilterProps<T> {
  filterName: string;
  activeSlugs: Set<string>; // slugs
  setActiveSlugs: Dispatch<SetStateAction<Set<string>>>;
  queryFn: () => Promise<ApiResponse<T>>;
  queryKey: string[];
  getSlug: (item: T) => string;
  getName: (item: T) => string;
}

export default function DialogFilter<T>({
  filterName,
  activeSlugs,
  setActiveSlugs,
  queryFn,
  queryKey,
  getSlug,
  getName
}: DialogFilterProps<T>) {
  const [query, setQuery] = useState("");

  const { data: items, isLoading: itemsLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const result = await queryFn();

      if (!result.success) {
        toast.error(result.error);
        return null;
      }

      return result.results;
    },
  });

  const itemsToDisplay = useMemo(() => {
    if (!items) return [];

    if (!query || !query.length) return items;

    const queryLower = query.trim().toLowerCase();

    return items.filter((item) => getName(item).toLowerCase().includes(queryLower));
  }, [query, items, getName]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex gap-2 capitalize">
          {filterName} <Badge variant="secondary">{activeSlugs.size}</Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="capitalize">Filter {filterName}</DialogTitle>
        </DialogHeader>

        <SearchInput
          placeholder={`Search ${filterName}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {itemsLoading ? (
          <div className="flex-1 justify-center items-center flex">
            <Spinner className="size-6" />
          </div>
        ) : (
          <ScrollArea className="h-48 overflow-hidden flex flex-col">
            <div className="flex flex-col gap-3">
              {itemsToDisplay &&
                itemsToDisplay.map((item) => {
                  const isSelected = activeSlugs.has(getSlug(item));

                  return (
                    <Label
                      key={`${getSlug(item)}`}
                      className="flex gap-2 items-center cursor-pointer"
                    >
                      <Checkbox
                        value={getSlug(item)}
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          setActiveSlugs((prev) => {
                            const next = new Set(prev);

                            if (checked) {
                              next.add(getSlug(item));
                            } else {
                              next.delete(getSlug(item));
                            }

                            return next;
                          });
                        }}
                      />
                      <span>{getName(item)}</span>
                    </Label>
                  );
                })}

              {!itemsToDisplay.length && (
                <span className="text-muted-foreground">No {filterName} found.</span>
              )}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}