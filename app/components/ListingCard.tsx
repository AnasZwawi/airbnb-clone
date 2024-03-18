import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButton";
import { addToFavorite, deleteFromFavorite, deleteListing } from "../actions";
import { Button } from "@/components/ui/button";
import { MessageCircleX, XCircle } from "lucide-react";
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

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
  deleteList?: boolean;
}

export const ListingCard = ({
  imagePath,
  description,
  location,
  price,
  userId,
  isInFavoriteList,
  favoriteId,
  homeId,
  pathName,
  deleteList: deleteOption = false,
}: iAppProps) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col">
      <div className="relative max-h-[320px] md:h-[26vw] lg:h-[20vw] sm:h-[40vw] h-[55vw]">
        <Image
          src={`https://jxvqpjydezilbytxarzd.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="image of house"
          fill
          className="rounded-xl h-full object-cover mb-3"
        />
        {deleteOption && (
          <AlertDialog>
            <AlertDialogTrigger>
              <XCircle
                fill="#48484895"
                className="z-10 absolute top-[14px] left-3 h-7 w-7 text-white rounded-md"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your listing.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <form action={deleteListing}>
                    <input type="hidden" name="userId" value={userId} />
                    <input type="hidden" name="pathName" value={pathName} />
                    <input type="hidden" name="homeId" value={homeId} />
                    <button type="submit">Delete</button>
                  </form>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={deleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`}>
        <h3 className="pt-2 font-semibold flex text-[14px]">
          {country?.label}
        </h3>

        <p className="text-gray-700 text-sm line-clamp-2 text-[14px]">
          {description}
        </p>

        <p className="pt-[6px] text-black text-[15px] font-m tracking-tighter">
          <span className="font-semibold">${price}</span> per night
        </p>
      </Link>
    </div>
  );
};
