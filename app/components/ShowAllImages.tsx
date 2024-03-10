'use client'
import { Images } from "lucide-react";
import React, { useState } from "react";
import { Gallery } from "./Gallery";

export const ShowAllImages = () => {
  const [gallery, showGallery] = useState(false);
  return (
    <div className="flex items-center gap-x-1 px-2 py-1 bg-white border border-1 rounded-md transition-all duration-150 hover:shadow-md hover:scale-105" onClick={()=>{showGallery(true)}}>
      <Images />
      <p>Show all photos</p>
      {gallery && <Gallery/>}
    </div>
  );
};
