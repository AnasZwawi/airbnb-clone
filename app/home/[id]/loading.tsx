import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="w-[85%] lg:w-[75%] mx-auto mt-10">
      <div className="flex flex-col lg:flex-row justify-between gap-y-4 lg:items-center mb-5">
        <Skeleton className="h-8 w-3/4 lg:w-1/3" />
        <Skeleton className="h-8 w-3/4 lg:w-1/3" />
      </div>

      <Skeleton className="w-full h-[350px] lg:h-[550px] mt-5" />

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
