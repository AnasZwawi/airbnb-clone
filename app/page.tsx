import { Suspense } from "react";
import { ListingCard } from "./components/ListingCard";
import { MapFilterItems } from "./components/MapFilterItems";
import prisma from "./lib/db";
import { SkeletonCard } from "./components/SkeletonCard";
import { NoItem } from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData({
  searchParams,
  userId,
}: {
  searchParams: {
    filter?: string;
    country?: string;
    bathroom?: string;
    room?: string;
    guest?: string;
  };
  userId?: string | undefined;
}) {
  noStore();
  
  const hasOnlyCountry = searchParams.country && 
                        searchParams.guest === "0" && 
                        searchParams.room === "0" && 
                        searchParams.bathroom === "0";
  
  const whereClause: any = {
    addedCategory: true,
    addedDescription: true,
    addedLocation: true,
    category: searchParams.filter ?? undefined,
    country: searchParams.country ?? undefined,
  };

  if (!hasOnlyCountry) {
    whereClause.guests = searchParams.guest ?? undefined;
    whereClause.bedrooms = searchParams.room ?? undefined;
    whereClause.bathrooms = searchParams.bathroom ?? undefined;
  }

  const data = await prisma.home.findMany({
    where: whereClause,
    select: {
      photos: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return data;
}


export default async function Home({
  searchParams,
}: {
  searchParams: {
    filter?: string;
    country?: string;
    bathroom?: string;
    room?: string;
    guest?: string;
  };
}) {
  const data = await getData({ searchParams: searchParams });

  return (
    <>
      <MapFilterItems />

      <div className="container mx-auto px-5 lg:px-10">
        <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams: {
    filter?: string;
    country?: string;
    bathroom?: string;
    room?: string;
    guest?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });
  return (
    <>
      {data.length === 0 ? (
        <NoItem
          title="Sorry no listings found for this category..."
          description="Please check an other category or create your own listing!
        "
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photos[0] as string}
              description={item.description as string}
              price={item.price as number}
              location={item.country as string}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
