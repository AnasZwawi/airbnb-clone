import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButton";
import { addToFavorite, deleteFromFavorite, deleteListing } from "../actions";
import { Button } from "@/components/ui/button";
import { MessageCircleX, XCircle } from "lucide-react";

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
          <div className="z-10 absolute top-2 left-2">
            <form action={deleteListing}>
              <input type="hidden" name="userId" value={userId} />
              <input type="hidden" name="pathName" value={pathName} />
              <input type="hidden" name="homeId" value={homeId} />
              <button type="submit">
                <XCircle className="h-6 w-6 p-1 bg-white text-stone-900 rounded-md" />
              </button>
            </form>
          </div>
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
