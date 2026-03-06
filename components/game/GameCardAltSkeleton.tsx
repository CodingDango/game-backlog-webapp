import { Skeleton } from "../ui/skeleton";

export default function GameCardAltSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr] rounded-xl gap-6">
      <Skeleton className="h-40 w-32" />

      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}
