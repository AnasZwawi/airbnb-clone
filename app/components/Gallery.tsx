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

export const Gallery = ({ photos }: { photos: string[] | undefined }) => {
  return (
    <div className="fixed left-0 top-0 z-50 bg-black bg-opacity-90 backdrop-blur-md w-full h-[100vh] overflow-y-hidden flex justify-center items-center overflow-hidden">
      <Carousel>
        <CarouselContent className="w-full h-full flext items-center justify-center">
          {photos?.map((photo: string, index: number) => (
            <CarouselItem key={index} className="w-[100%] h-auto">
              <div className="w-[100%] flex flex-col items-center">
                <Image
                  alt="Image of Home"
                  src={`https://jxvqpjydezilbytxarzd.supabase.co/storage/v1/object/public/images/${photo}`}
                  className="w-[90%]"
                />
              </div> 
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
