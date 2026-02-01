import { Skeleton } from "./ui/skeleton";

export default function GameCardSkeleton() {
  return (
    <div>
      <div className="relative flex flex-col gap-2 pb-2">
        <div className="flex-1 aspect-9/16 max-h-[300px]">
          <Skeleton className="w-full h-full object-cover rounded-md" />
        </div>
        <Skeleton className="w-32 h-6"></Skeleton>
      </div>
    </div>
  );
}
