import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
//userId: string, homeId: string

export async function GET(request: NextRequest) {
/*   noStore(); */
  const homeId = request.nextUrl.searchParams.get("homeId") as string;
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
  return NextResponse.json({ data });
}
