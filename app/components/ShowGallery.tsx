"use client";
import { Images } from "lucide-react";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Gallery } from "./Gallery";

export const ShowGallery = ({ photos }: { photos: string[] | undefined }) => {
  const [gallery, showGallery] = useState(false);
  if (!photos || photos.length === 0) {
    return <div>No photos available</div>;
  }

  return (
    <>
      {gallery && <Gallery photos={photos} showGallery={showGallery} />}
      <div
        className={`relative flex flex-col md:flex-row gap-y-2 lg:gap-2 rounded-xl h-[550px] md:h-[450px] overflow-hidden`}
      >
        <div
          className="relative w:full lg:w-1/2 h-full cursor-pointer"
          onClick={() => {
            showGallery(true);
          }}
        >
          <Image
            alt="Image of Home"
            src={`https://jxvqpjydezilbytxarzd.supabase.co/storage/v1/object/public/images/${photos[0]}`}
            fill
            className="h-full object-cover w-full"
          />
          <div className="absolute top-0 left-0 w-full h-full z-20 hover:bg-black hover:bg-opacity-20 " />
        </div>
        <div className="w:full lg:w-1/2 h-full grid grid-cols-2 grid-rows-2 row-auto gap-2">
          {photos.slice(1, 5).map((photo: string, index: number) => (
            <div
              key={index}
              onClick={() => {
                showGallery(true);
              }}
              className="relative w-full h-full cursor-pointer"
            >
              <Image
                alt="Image of Home"
                src={`https://jxvqpjydezilbytxarzd.supabase.co/storage/v1/object/public/images/${photo}`}
                className="h-full object-cover w-full"
              />
              <div className="absolute top-0 left-0 w-full h-full z-20 hover:bg-black hover:bg-opacity-20 " />
            </div>
          ))}
        </div>
        <div
          className="absolute cursor-pointer right-5 bottom-5 z-30 flex items-center gap-x-[6px] px-3 py-1 bg-white border border-1 border-black rounded-md transition-all duration-150 hover:shadow-md hover:scale-105"
          onClick={() => {
            showGallery(true);
          }}
        >
          <Images className="w-4 h-4"/>
          <p className="font-semibold">Show all photos</p>
        </div>
      </div>
    </>
  );
};
