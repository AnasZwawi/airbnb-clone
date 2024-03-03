import React from "react";
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
import { createReservation } from "@/app/actions";
import { ReservationSubmit } from "@/app/components/SubmitButton";
import { unstable_noStore as noStore } from 'next/cache'

async function getData(homeId: string) {
  noStore()
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
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
        },
      },
      Reservation: {
        where: {
          homeId: homeId
        }
      }
    },
  });

  return data;
}

async function HomeId({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);

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

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  // fetching the user id from kinde auth
  const {getUser} = getKindeServerSession();
  const user = await getUser()

  return (
    <div className="w-[85%] lg:w-[75%] mx-auto mt-10">
      <div className="flex flex-col lg:flex-row justify-between gap-y-4 lg:items-center mb-5">
        <h1 className="font-medium text-3xl lg:text-2xl">{data?.title}</h1>
        <div className="flex items-center">
          <img
            src={
              data?.User?.profileImage ??
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Profile image"
            className="w-11 h-11 rounded-full"
          />
          <div className="flex flex-col ml-2 lg:ml-4">
            <h3 className="font-medium">Hosted by {data?.User?.firstname}</h3>
            <p className="text-sm text-muted-foreground">
              Hosted since{" "}
              {formatter.format(
                Date.parse(data?.createdAT as unknown as string)
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-[350px] lg:h-[550px]">
        <Image
          alt="Image of Home"
          src={`https://jxvqpjydezilbytxarzd.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>
      <div className="flex flex-col gap-y-8 lg:flex-row justify-between gap-x-2 mt-8">
        <div className="w-full lg:w-2/3">
          <h3 className="font-medium text-xl flex items-center gap-x-2">
            <p>{flagemojiToPNG(country?.flag as string)}</p> {country?.label}
          </h3>

          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            {data?.bathrooms} Bathrooms
          </div>

          <Separator className="my-7" />

          <CategoryShowcase categoryName={data?.category as string} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>
        <form action={createReservation} className="flex flex-col items-center">
          <input
            type="hidden"
            name="userId"
            value={user?.id}
          />
          <input
            type="hidden"
            name="homeId"
            value={params.id}
          />
          <SelectCalendar reservations={data?.Reservation} />

          {user?.id ? (
            <ReservationSubmit/>
          ):(
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
