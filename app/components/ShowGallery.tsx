"use client"
import { Images } from "lucide-react";
import React from "react";
import { useState } from "react";


export const ShowGallery = () => {
  const [gallery, showGallery] = useState(false)
  return (
    <>
      <div className="absolute cursor-pointer right-5 bottom-5 z-40 flex items-center gap-x-1 px-2 py-1 bg-white border border-1 rounded-md transition-all duration-150 hover:shadow-md hover:scale-105" onClick={()=>{showGallery(true)}}>
      <Images />
      <p>Show all photos</p>
    </div>
    {gallery && <div className="absolute w-[100vw] h-[100vh] top-0 left-0 z-50 bg-white"></div>}
    
    </>
  );
};
