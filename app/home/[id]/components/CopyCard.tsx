"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Copy, Dot, Share, X } from "lucide-react";
import Image from "next/image";

interface CopyCardProps {
  photo?: string | null;
  bedrooms?: string | null;
  bathrooms?: string | null;
  guests?: string | null;
  title?: string | null;
}

export const CopyCard = ({
  photo,
  bedrooms,
  bathrooms,
  guests,
  title,
}: CopyCardProps) => {
  const handleCopy = () => {
    const url = window.location.href;

    const tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert("Link copied to clipboard!");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex items-center gap-x-[2px]">
          <Share className="h-4 w-4 text-stone-700" />
          <p className="font-semibold text-md tracking-tighter underline decoration-1">
            Share
          </p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-stone-900 text-2xl mt-6 mb-1">
            Share this place
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex gap-x-7 items-start my-4">
              <Image
                alt="Image of Home"
                src={`https://jxvqpjydezilbytxarzd.supabase.co/storage/v1/object/public/images/${photo}`}
                className="w-[90px] h-[90px] object-cover rounded-xl"
              />

              <div className="flex flex-col items-start">
                <p className="text-lg text-stone-900 tracking-tight">{title}</p>
                <p className="text-sm text-stone-700 flex">
                  {guests} guests
                  <Dot />
                  {bedrooms} bedrooms
                  <Dot />
                  {bathrooms} baths
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="absolute top-3 left-4 border-none bg-none hover:bg-transparent p-0">
            <X className="hover:bg-stone-200 p-1 rounded-full" />
          </AlertDialogCancel>
          <AlertDialogAction className="w-full flex items-center ml-0 m-0 gap-x-2 bg-white border-[1px] border-stone-700 rounded-xl hover:bg-stone-100 text-stone-900">
            <div className="flex items-center" onClick={handleCopy}>
              <Copy />
              <p className="font-semibold text-stone-900">Copy Link</p>
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
