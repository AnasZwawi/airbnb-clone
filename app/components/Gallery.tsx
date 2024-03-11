import React from "react";
import "@/app/globals.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { X } from "lucide-react";

export const Gallery = ({ photos }: { photos: string[] | undefined }) => {
  return (
    <div className="fixed left-0 top-0 z-50 bg-black bg-opacity-90 backdrop-blur-md w-full h-[100vh] overflow-y-hidden flex justify-center items-center overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent className="w-full flex items-center ml-3 gap-x-12">
          {photos?.map((photo: string, index: number) => (
            <CarouselItem key={index} className="w-[98vw] flex justify-center pr-2">
              <div className="w-[100%]">
                <Image
                  alt="Image of Home"
                  src={`https://jxvqpjydezilbytxarzd.supabase.co/storage/v1/object/public/images/${photo}`}
                  className="w-[100%]"
                />
              </div> 
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-3 z-50 top-[50%] -translate-y-[50%]"/>
        <CarouselNext className="absolute right-3 z-50 top-[50%] -translate-y-[50%]"/>
        <button className="w-9 h-9 flex items-center justify-center bg-white bg-opacity-80 hover:bg-opacity-100 absolute top-10 right-10">
          <X className="w-6 h-6" fill="black"/>
        </button>
      </Carousel>
    </div>
  );
};
