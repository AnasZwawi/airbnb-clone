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
    <div className="sticky z-40 border-b shadow-md bg-white bg-opacity-90 backdrop-blur-md top-[117px] sm:top-[76px]">
      <div className="md:container flex w-[100%] z-40 gap-x-10 overflow-x-scroll no-scrollbar px-6">
        {categoryItems.map((item) => (
          <Link
            key={item.id}
            href={pathname + "?" + createQueryString("filter", item.name)}
            className={cn(
              search == item.name
                ? "border-b-2 border-slate-600  flex-shrink-0"
                : "opacity-70 flex-shrink-0",
              "flex flex-col  hover:opacity-100 mx-auto py-3 gap-x-3 items-center transition-opacity"
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
    </div>
  );
};
