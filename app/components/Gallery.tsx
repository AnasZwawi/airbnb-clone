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

type GalleryProps = {
  photos: string[] | undefined;
  showGallery: (value: boolean) => void;
};

export const Gallery: React.FC<GalleryProps> = ({ photos, showGallery }) => {
  return (
    <>
      <div className="relative bg-black bg-opacity-90 backdrop-blur-md w-full h-[100vh]">
        <button
          className="w-7 h-7 flex z-50 rounded-full items-center justify-center bg-white bg-opacity-80 hover:bg-opacity-100 absolute top-4 right-3"
          onClick={() => showGallery(false)}
        >
          <X className="w-4 h-4" fill="#1f1f1f" />
        </button>
        <div className="fixed left-0 top-0 z-[49] bg-black bg-opacity-90 backdrop-blur-md w-full h-[85vh] overflow-y-hidden flex justify-center items-center overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent className="w-full flex items-center">
              {photos?.map((photo: string, index: number) => (
                <CarouselItem
                  key={index}
                  className="max-h-[95vh] flex justify-center mx-auto"
                >
                  <div className="">
                    <Image
                      alt="Image of Home"
                      src={`https://jxvqpjydezilbytxarzd.supabase.co/storage/v1/object/public/images/${photo}`}
                      className="min-w-[100%] max-h-[100%] ml-2 object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-3 z-50 top-[50%] -translate-y-[50%]" />
            <CarouselNext className="absolute right-3 z-50 top-[50%] -translate-y-[50%]" />
          </Carousel>
        </div>
      </div>
    </>
  );
};
