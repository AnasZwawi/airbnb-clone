import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
//userId: string, homeId: string

export async function GET(request: NextRequest) {
  noStore();
  const userId = request.nextUrl.searchParams.get("userId") as string;
  const homeId = request.nextUrl.searchParams.get("homeId") as string;
  console.log(userId, homeId)
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
  return NextResponse.json({ data });
}
