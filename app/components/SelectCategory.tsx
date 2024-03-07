"use client";
import React, { useState } from "react";
import { categoryItems } from "../lib/categoryItems";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 mt-10 w-[80%] lg:w-3/5 mx-auto mb-36">
      <input type="hidden" name="category" value={selectedCategory as string} />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            onClick={() => {
              setSelectedCategory(item.name);
            }}
            className={selectedCategory === item.name ? "animate-[ping_0.4s_ease-in-out] border-2 border-primary" : ""}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={32}
                width={32}
                className="w-8 h-8 mx-auto mb-1"
              />
              <h3 className="font-medium text-center">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};
