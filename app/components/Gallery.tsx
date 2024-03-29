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
import { type CarouselApi } from "@/components/ui/carousel"

type GalleryProps = {
  photos: string[] | undefined;
  showGallery: (value: boolean) => void;
};

export const Gallery: React.FC<GalleryProps> = ({ photos, showGallery }) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <div className="fixed left-0 top-0 z-50 bg-black bg-opacity-90 backdrop-blur-md w-full h-[100vh] overflow-y-hidden flex justify-center items-center overflow-hidden">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="w-full flex items-center">
          {photos?.map((photo: string, index: number) => (
            <CarouselItem key={index} className="max-h-[95vh] flex justify-center mx-auto">
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
        <CarouselPrevious className="absolute left-3 z-50 top-[50%] -translate-y-[50%]"/>
        <CarouselNext className="absolute right-3 z-50 top-[50%] -translate-y-[50%]"/>
        <div className="fixed top-4 z-[45] left-0 w-full flex items-center justify-center text-lg font-semibold text-gray-200 tracking-widest">
            {current}/{count}
        </div>
        <button className="w-7 h-7 flex z-50 rounded-full items-center justify-center bg-white bg-opacity-80 hover:bg-opacity-100 fixed top-4 right-4" onClick={()=>showGallery(false)}>
          <X className="w-4 h-4" fill="#1f1f1f"/>
        </button>
      </Carousel>
    </div>
  );
};
