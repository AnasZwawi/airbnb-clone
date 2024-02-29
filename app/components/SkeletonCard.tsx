import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard(){
  return (
    <div className="felx flex-col space-y-3">
      <Skeleton className="max-h-[320px] md:h-[26vw] lg:h-[20vw] sm:h-[40vw] h-[55vw]"/>
      <div className="space-y-2 flex flex-col">
        <Skeleton className="h-4 w-full"/>
        <Skeleton className="h-4 w-3/4"/>
        <Skeleton className="h-4 w-1/2"/>
      </div>
    </div>  
  )
}