import { Skeleton } from "./ui/skeleton";

interface SkeletonProps {
  imageSkeletonCLass?: string;
  textSkeletonClass?: string;
}

export default function GameCardSkeleton({ imageSkeletonCLass, textSkeletonClass }: SkeletonProps) {
  return (
    <div>
      <div className="relative flex flex-col gap-2 pb-2">
          <Skeleton className={`w-full h-full rounded-md flex-1 aspect-9/16 max-h-[260px] ${imageSkeletonCLass}`}/>
        <Skeleton className={`w-32 h-6 ${textSkeletonClass}`}/>
      </div>
    </div>
  );
}
