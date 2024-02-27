import { Button } from "@/components/ui/button";
import React from "react";
import { SubmitButton } from "./SubmitButton";
import Link from "next/link";

export const CreationBottomBar = () => {
  return (
    <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
      <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Button variant="secondary" size="lg">
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButton />
      </div>
    </div>
  );
};
