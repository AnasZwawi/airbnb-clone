import { File, FileQuestion } from "lucide-react";
import React from "react";

interface IappProps {
  title: string,
  description: string
}

export const NoItem = ({description, title}: IappProps) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50 mt-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-xl font-semibold mt-6">
        {title}
      </h2>
      <p className="mt-1 text-center text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
