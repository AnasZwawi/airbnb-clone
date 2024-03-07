import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="w-[85%] lg:w-[75%] mx-auto mt-10">
      <div className="flex flex-col lg:flex-row justify-between gap-y-4 lg:items-center mb-5">
        <Skeleton className="h-8 w-3/4 lg:w-1/3" />
        <Skeleton className="h-8 w-3/4 lg:w-1/3" />
      </div>
      <div className="flex gap-2 h-[550px] md:h-[450px]">
        <Skeleton className="w:full lg:w-1/2 h-full" />
        <div className="flex gap-2 w:full lg:w-1/2 h-full">
          <div className="flex gap-2">
            <Skeleton className="w-full h-full mt-5" />
            <Skeleton className="w-full h-full mt-5" />
          </div>
          <div className="flex gap-2 w:full lg:w-1/2 h-full">
            <Skeleton className="w-full h-full mt-5" />
            <Skeleton className="w-full h-full mt-5" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between gap-x-24">
        <div className="w-2/3">
          <Skeleton className="h-4 w-1/3 mt-3" />
        </div>
        <div className="w-1/3">
          <Skeleton className="w-full h-72" />
        </div>
      </div>
    </div>
  );
};

export default loading;
