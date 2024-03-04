"use client";
import React, { useCallback } from "react";
import { categoryItems } from "../lib/categoryItems";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { create } from "domain";
import { cn } from "@/lib/utils";

export const MapFilterItems = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="md:container px-5 flex sticky w-[100%] z-40 bg-white bg-opacity-90 shadow-sm backdrop-blur-md top-[134px] sm:top-[90px] pb-3 pt-3 gap-x-10 left-0 overflow-x-scroll no-scrollbar">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={pathname + "?" + createQueryString("filter", item.name)}
          className={cn(
            search == item.name
              ? "border-b-2 border-black pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col hover:opacity-100 mx-auto gap-x-3 items-center transition-opacity"
          )}
        >
          <div className="relative w-6 h-7">
            <Image
              src={item.imageUrl}
              width={24}
              height={24}
              alt="Category Image"
            />
          </div>
          <p className="text-xs font-semibold">{item.title}</p>
        </Link>
      ))}
    </div>
  );
};
