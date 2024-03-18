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
import { redirect } from "next/navigation";
import { ShowGallery } from "@/app/components/ShowGallery";
import { SideCalendar } from "./components/SideCalendar";
import { HostInfo } from "./components/HostInfo";

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
          email: true,
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
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  let startTime = data?.createdAT.getTime() ?? new Date().getTime();
  let endTime = new Date().getTime();
  const minRange = 2;

  return (
    <div className="w-[85%] max-w-[1320px] lg:w-[75%] mx-auto mt-5">
      <div className="flex flex-col lg:flex-row justify-between gap-y-0 lg:items-center mb-4">
        <h1 className="font-semibold text-black text-[32px] tracking-tight lg:text-2xl">
          {data?.title}
        </h1>
        <div className="flex items-center relative left-[-8px] lg:left-0">
          <>
            {user && user.id && (
              <>
                {(homeData?.Favorite.length as number) > 0 ? (
                  <>
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
                      <DeleteFromFavoriteButton classn="w-6 h-6 relative top-[1px] left-[3px]" />
                    </form>
                    <p className="font-semibold text-md tracking-tighter underline">
                      Unsave
                    </p>
                  </>
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
                      <AddToFavoriteButton classn="h-6 w-6 relative top-[1px] left-[3px]" />
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
      <ShowGallery photos={data?.photos} />

      <div className="flex flex-col gap-y-8 lg:flex-row justify-between gap-x-6 mt-10">
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
            {startTime !== undefined ? (
              Math.round(
                (((endTime as number) - startTime) as number) /
                  (1000 * 3600 * 24)
              ) < 3 ? (
                <div className="flex gap-x-1  ">
                  <Star fill="black" className="w-4 h-4" /> <p>New</p>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </p>

          <Separator className="my-7 " />
          <div className="flex items-center">
            <img
              src={
                data?.User?.profileImage ??
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="User Profile image"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-3 lg:ml-5 leading-snug">
              <h3 className="font-semibold tracking-tighter text-[16px] text-black">
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
        <SideCalendar
          price={data?.price}
          id={params.id}
          userId={user?.id}
          reservations={data?.Reservation}
          minRange={minRange}
        />
      </div>
      <Separator className="my-7"/>
      <HostInfo houseThumbnail = {data?.photos[0]} housePrice = {data?.price} houseTitle = {data?.title} houseCountry = {country?.label} profilePicture = {data?.User?.profileImage} hostName = {data?.User?.firstname} email = {data?.User?.email}/>
    </div>
  );
}

export default HomeId;
