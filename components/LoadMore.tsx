import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import type { UseInfiniteQueryResult } from "@tanstack/react-query";

interface LoadMoreProps {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export default function LoadMore({
  fetchNextPage,
  isFetchingNextPage,
}: LoadMoreProps) {
  return (
    <Button
      variant={'outline'}
      className="cursor-pointer"
      disabled={isFetchingNextPage || undefined}
      onClick={() => {
        fetchNextPage();
      }}
    >
      {isFetchingNextPage && <Spinner />}
      Load More
    </Button>
  );
}
