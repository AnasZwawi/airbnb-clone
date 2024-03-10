"use server"
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";


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

export const useHomeData = async({ params }: { params: { id: string } }) => {


  // fetching the user id from kinde auth
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const homeData = await getHome(user?.id as string, params.id);
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  let startTime = data?.createdAT.getTime() ?? new Date().getTime();
  let endTime = new Date().getTime();


  return {user, homeData, data, country, startTime, endTime}
}