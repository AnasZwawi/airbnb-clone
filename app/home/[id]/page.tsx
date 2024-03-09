import React, { useState } from "react";
import prisma from "@/app/lib/db";
import Image from "next/image";
import { useCountries } from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  addToFavorite,
  createReservation,
  deleteFromFavorite,
} from "@/app/actions";
import {
  AddToFavoriteButton,
  DeleteFromFavoriteButton,
  ReservationSubmit,
} from "@/app/components/SubmitButton";
import { unstable_noStore as noStore } from "next/cache";
import { Dot, Images, Star } from "lucide-react";

import { Gallery } from "@/app/components/Gallery";

async function getHome(userId: string, homeId: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      id: true,
      country: true,
      photos: true,
      description: true,
      price: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
  });
  return data;
}

async function getData(homeId: string) {
  noStore();

  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      Favorite: true,
      photos: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      country: true,
      title: true,
      category: true,
      price: true,
      createdAT: true,
      User: {
        select: {
          profileImage: true,
          firstname: true,
          id: true,
        },
      },
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
    },
  });

  return data;
}

async function HomeId({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);

  //Just some function to show flag as png

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  // fetching the user id from kinde auth
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const homeData = await getHome(user?.id as string, params.id);

  let startTime = data?.createdAT.getTime() ?? new Date().getTime();
  let endTime = new Date().getTime();

  function renderGallery(){
    return <Gallery/>
  }

  return (
    <div className="w-[85%] max-w-[1320px] lg:w-[75%] mx-auto mt-5">
      <div className="flex flex-col lg:flex-row justify-between gap-y-4 lg:items-center mb-4">
        <h1 className="font-semibold text-black text-[32px] tracking-tight lg:text-2xl">
          {data?.title}
        </h1>
        <div className="flex items-center">
          <>
            {user && user.id && (
              <>
                {(homeData?.Favorite.length as number) > 0 ? (
                  <form action={deleteFromFavorite}>
                    <input
                      type="hidden"
                      name="favoriteId"
                      value={homeData?.Favorite[0].id as string}
                    />
                    <input
                      type="hidden"
                      name="userId"
                      value={user.id as string}
                    />
                    <input
                      type="hidden"
                      name="pathName"
                      value={("/home/" + params.id) as string}
                    />
                    <DeleteFromFavoriteButton classn="w-5 h-5" />
                  </form>
                ) : (
                  <>
                    <form action={addToFavorite}>
                      <input
                        type="hidden"
                        name="homeId"
                        value={params.id as string}
                      />
                      <input type="hidden" name="userId" value={user.id} />
                      <input
                        type="hidden"
                        name="pathName"
                        value={"/home/" + params.id}
                      />
                      <AddToFavoriteButton classn="h-5 w-5 relative top-1 left-1" />
                    </form>
                    <p className="font-semibold text-md tracking-tighter underline">
                      Save
                    </p>
                  </>
                )}
              </>
            )}
          </>
        </div>
      </div>
      <div className="relative flex flex-col md:flex-row gap-y-2 lg:gap-2 overflow-hidden rounded-xl h-[550px] md:h-[450px]">
        <div className="relative w:full lg:w-1/2 h-full cursor-pointer">
          <Image
            alt="Image of Home"
            src={`https://jxvqpjydezilbytxarzd.supabase.co/storage/v1/object/public/images/${data?.photos[0]}`}
            fill
            className="h-full object-cover w-full"
          />
          <div className="absolute top-0 left-0 w-full h-full z-20 hover:bg-black hover:bg-opacity-20 " />
        </div>
        <div className="w:full lg:w-1/2 h-full grid grid-cols-2 grid-rows-2 row-auto gap-2">
          {data?.photos.slice(1, 5).map((photo: string, index: number) => (
            <div key={index} className="relative w-full h-full cursor-pointer">
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
          className="absolute cursor-pointer right-5 bottom-5 z-40 flex items-center gap-x-1 px-2 py-1 bg-white border border-1 rounded-md transition-all duration-150 hover:shadow-md hover:scale-105"
          onClick={renderGallery}
        >
          <Images />
          <p>Show all photos</p>
        </div>
      </div>

      <div className="flex flex-col gap-y-8 lg:flex-row justify-between gap-x-2 mt-6">
        <div className="w-full lg:w-2/3 leading-none">
          <h3 className="font-semibold text-black text-2xl tracking-tighter flex items-center gap-x-2">
            {country?.label}
          </h3>

          <div className="w-full flex font-medium text-sm sm:mx-0 items-center">
            <p className="">{data?.guests} Guests</p>
            <Dot />
            <p className="">{data?.bedrooms} Bedrooms</p>
            <Dot />
            <p className="">{data?.bathrooms} Bathrooms</p>
          </div>
          <p className="mt-1 font-semibold flex items-center gap-x-1">
            <Star fill="black" className="w-4 h-4" />
            {startTime !== undefined
              ? Math.round(
                  (((endTime as number) - startTime) as number) /
                    (1000 * 3600 * 24)
                ) < 20
                ? "New"
                : ""
              : ""}
          </p>

          <Separator className="my-7 " />
          <div className="flex items-center">
            <img
              src={
                data?.User?.profileImage ??
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="User Profile image"
              className="w-8 h-8 md:w-11 md:h-11 rounded-full"
            />
            <div className="flex flex-col ml-2 lg:ml-3 leading-snug">
              <h3 className="font-medium text-[15px]">
                Hosted by {data?.User?.firstname}
              </h3>
              <p className="text-[13px] text-gray-800">
                Hosted since{" "}
                {formatter.format(
                  Date.parse(data?.createdAT as unknown as string)
                )}
              </p>
            </div>
          </div>
          <Separator className="my-7" />
          <CategoryShowcase categoryName={data?.category as string} />

          <Separator className="my-7 " />

          <p className="text-gray-800">{data?.description}</p>

          <Separator className="my-7" />

          <h2 className="font-semibold text-black text-2xl tracking-tighter py-4">
            Where you’ll be
          </h2>

          <HomeMap locationValue={country?.value as string} />
        </div>
        <form action={createReservation} className="flex flex-col items-center">
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="homeId" value={params.id} />
          <SelectCalendar reservations={data?.Reservation} />

          {user?.id ? (
            <ReservationSubmit />
          ) : (
            <Button className="w-full">
              <Link href={"/api/auth/login"}>Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default HomeId;
