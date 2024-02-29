import { File } from "lucide-react";
import React from "react";

export const NoItem = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50 mt-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <File className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-xl font-semibold mt-6">
        Sorry no listings found for this category...
      </h2>
      <p className="mt-1 text-center text-sm leading-6 text-muted-foreground">
        Please check an other category or create your own listing!
      </p>
    </div>
  );
};
