"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "@/app/components/Counter";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "./SubmitButton";

export const SearchComponent = () => {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();
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
  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          Next
        </Button>
      );
    } else if (step === 2) {
      return <SubmitButton compressing={false}/>;
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="shadow-[0_2px_5px_0px_rgba(0,0,0,0.1)] transition-shadow duration-200 hover:shadow-md mx-5 rounded-full py-[7px] px-3 border flex justify-between items-center cursor-pointer">
            <div className="flex h-full divide-x font-medium text-sm sm:text-[16px] text-gray-700">
              <p className="px-2 sm:px-4">Anywhere</p>
              <p className="px-2 sm:px-4">Any Week</p>
              <p className="px-2 sm:px-4">Any Guests</p>
            </div>

            <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
          </div>
        </DialogTrigger>
        <DialogContent className="rounded-lg sm:max-w-[425px]">
          <form className="gap-4 flex flex-col">
            <input type="hidden" name="country" value={locationValue} />
            {step === 1 ? (
              <>
                <DialogHeader>
                  <DialogTitle>Select a Place</DialogTitle>
                  <DialogDescription>Please choose a place</DialogDescription>
                </DialogHeader>
                <Select
                  required
                  onValueChange={(value) => setLocationValue(value)}
                  value={locationValue}
                >
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
                <HomeMap locationValue={locationValue} />
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Select all the info you need</DialogTitle>
                  <DialogDescription>
                    You can choose whatever you need
                  </DialogDescription>
                </DialogHeader>
                <Card>
                  <CardHeader className="flex flex-col gap-y-5">
                    <div className="flex flex-col lg:flex-row gap-y-3 items-start justify-between">
                      <div className="flex flex-col">
                        <h3 className="underline font-semibold text-lg">
                          Guests
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          How many guests do you want?
                        </p>
                      </div>
                      <Counter name="guest" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-y-3 items-start justify-between">
                      <div className="flex flex-col">
                        <h3 className="underline font-semibold text-lg">
                          Rooms
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          How many rooms do you have?
                        </p>
                      </div>
                      <Counter name="room" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-y-3 items-start justify-between">
                      <div className="flex flex-col">
                        <h3 className="underline font-semibold text-lg">
                          Bathrooms
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          How many bathrooms do you have?
                        </p>
                      </div>
                      <Counter name="bathroom" />
                    </div>
                  </CardHeader>
                </Card>
              </>
            )}
            <DialogFooter>
              <SubmitButtonLocal />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
