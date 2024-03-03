import { Suspense } from "react";
import { ListingCard } from "./components/ListingCard";
import { MapFilterItems } from "./components/MapFilterItems";
import prisma from "./lib/db";
import { SkeletonCard } from "./components/SkeletonCard";
import { NoItem } from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData({
  searchParams,
  userId,
}: {
  searchParams: {
    filter: string;
    country?: string;
    bathroom?: string;
    room?: string;
    guest?: string;
  };
  userId?: string | undefined;
}) {
  if (searchParams.guest && searchParams.room && searchParams.bathroom) {
    const data = await prisma.home.findMany({
      where: {
        addedCategory: true,
        addedDescription: true,
        addedLocation: true,
        category: searchParams.filter ?? undefined,
        country: searchParams.country ?? undefined,
      },
      select: {
        photo: true,
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
  } else {
    const data = await prisma.home.findMany({
      where: {
        addedCategory: true,
        addedDescription: true,
        addedLocation: true,
        category: searchParams.filter ?? undefined,
        country: searchParams.country ?? undefined,
        guests: searchParams.guest ?? undefined,
        bedrooms: searchParams.room ?? undefined,
        bathrooms: searchParams.bathroom ?? undefined,
      },
      select: {
        photo: true,
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
}

export default async function Home({
  searchParams,
}: {
  searchParams: {
    filter: string;
    country?: string;
    bathroom?: string;
    room?: string;
    guest?: string;
  };
}) {
  const data = await getData({ searchParams: searchParams });

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams: {
    filter: string;
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
              imagePath={item.photo as string}
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
