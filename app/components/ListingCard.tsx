import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButton";
import { addToFavorite, deleteFromFavorite } from "../actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string
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
  pathName
}: iAppProps) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  //Just some function to show flag as png
  const flagemojiToPNG = (flag: string) => {
    var countryCode = Array.from(flag, (codeUnit: any) =>
      codeUnit.codePointAt()
    )
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  return (
    <div className="flex flex-col">
      <div className="relative max-h-[320px] md:h-[26vw] lg:h-[20vw] sm:h-[40vw] h-[55vw]">
        <Image
          src={`https://jxvqpjydezilbytxarzd.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="image of house"
          fill
          className="rounded-lg h-full object-cover mb-3"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={deleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId}/>
                <input type="hidden" name="userId" value={userId}/>
                <input type="hidden" name="pathName" value={pathName}/>
                <DeleteFromFavoriteButton/>
              </form>
            ):(
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId}/>
                <input type="hidden" name="userId" value={userId}/>
                <input type="hidden" name="pathName" value={pathName}/>
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href="/">
        <h3 className="pt-2 font-medium flex gap-x-2 items-center">
          <p>
            {flagemojiToPNG(country?.flag as string)}
          </p>
          {country?.label} /{" "}
          {country?.region}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>

        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span>/Night
        </p>
      </Link>
    </div>
  );
};
