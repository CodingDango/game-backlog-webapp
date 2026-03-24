import { Skeleton } from "../ui/skeleton";

export default function ActivitySkeleton({ maxWidthClass = 'max-w-88'}: { maxWidthClass?: string }) {
  return (
    <div className={`flex gap-3 items-center ${maxWidthClass}`}>
      <Skeleton className="w-10 h-10 rounded-full"/>
      <Skeleton className={`flex-1 rounded-md h-10`}/>
    </div>
  )
}
