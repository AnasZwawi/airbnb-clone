import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
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
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    const formData = new FormData();
    formData.append("userId", userId as string);
    formData.append("pathName", pathName);
    formData.append("homeId", homeId);
    deleteListing(formData); // Call the deleteListing function with FormData
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
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
          <>
            <div className="z-10 absolute top-4 left-4">
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <input type="hidden" name="homeId" value={homeId} />
                <button type="submit">
                  <XCircle className="h-8 w-8 p-1 bg-white text-stone-900 rounded-md" />
                </button>
              </form>
            </div>
            {showConfirmation && (
              <AlertDialog>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this listing?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this listing.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDelete}>
                      Confitm Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
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
