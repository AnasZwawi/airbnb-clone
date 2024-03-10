import { useEffect, useState } from 'react';
import prisma from '@/app/lib/db';
import { useCountries } from '@/app/lib/getCountries';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { unstable_noStore as noStore } from 'next/cache';

export const useHomeData = ({ id }: { id: string }) => {
  const [homeData, setHomeData] = useState<any>(null);
  const [userData, setUserData] = useState<any>({
    user: null,
    data: null,
    country: null,
    startTime: null,
    endTime: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        const data = await getData(id);
        // Include useCountries here
        
        const startTime = data?.createdAT ? new Date(data.createdAT).getTime() : new Date().getTime();
        const endTime = new Date().getTime();
  
        setUserData({ user, data, startTime, endTime });
        setHomeData(await getHome(user?.id as string, id));
      } catch (error) {
        console.error("Error fetching home data:", error);
        throw error; // Rethrow the error to handle it outside of the hook
      }
    }
    fetchData();
  }, [id]);

  return { ...userData, homeData };
};

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
