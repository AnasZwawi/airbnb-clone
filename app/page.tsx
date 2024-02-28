import { ListingCard } from "./components/ListingCard";
import { MapFilterItems } from "./components/MapFilterItems";
import prisma from "./lib/db";

async function getData() {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
    },
  });
  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <div>
        {data.map((item) => (
          <ListingCard
            key={item.id}
            imagePath={item.photo as string}
            description={item.description as string}
            price={item.price as number}
            location={item.country as string}
          />
        ))}
      </div>
    </div>
  );
}
