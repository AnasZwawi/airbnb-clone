"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCountries } from "@/app/lib/getCountries";
import Map from "@/app/components/Map";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { createLocation } from "@/app/actions";

const Address = ({ params }: { params: { id: string } }) => {
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = useState("");

  const flagemojiToPNG = (flag: string) => {
    var countryCode = Array.from(flag, (codeUnit: any) =>
      codeUnit.codePointAt()
    )
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });

  return (
    <>
      <div className="w-[80%] mx-auto lg:w-3/5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your home located?
        </h2>
      </div>

      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
        <div className="w-[80%] mx-auto lg:w-3/5 mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <div className="flex flex-row gap-x-2">
                        <p>{flagemojiToPNG(item.flag)}</p>
                        <p className="text-md font-medium">{item.label}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={locationValue} />
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
};

export default Address;
