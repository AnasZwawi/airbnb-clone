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
import { CheckCircle, Copy, Dot, Share, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

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
  const copylink = (e: any) => {
    navigator.clipboard.writeText(window.location.toString());
    toast("Event has been created", {
      unstyled: true,
      icon: <CheckCircle className="w-6 h-6 text-green-500"/>,
      classNames: {
        toast: "bg-black p-3 text-white rounded-lg",
        title: "text-white text-md"
      },
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex items-center gap-x-[4px] hover:bg-stone-100 py-1 px-2 rounded-md">
          <Share className="h-4 w-4 text-stone-700 mr-[2px]" />
          <p className="font-semibold text-sm tracking-tighter underline decoration-1">
            Share
          </p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-stone-900 text-2xl mt-8 mb-1">
            Share this place
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex gap-x-5 items-start my-4">
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
            <X className="hover:bg-stone-200 p-1 rounded-full w-8 h-8" />
          </AlertDialogCancel>
          <AlertDialogAction className="w-full flex items-center ml-0 m-0 gap-x-2 bg-white border-[1px] border-stone-700 rounded-xl hover:bg-stone-100 text-stone-900 relative right-2">
            <div className="flex items-center gap-x-2" onClick={copylink}>
              <Copy className="w-4 h-4" />
              <p className="font-semibold text-[16px] text-stone-900">
                Copy Link
              </p>
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
