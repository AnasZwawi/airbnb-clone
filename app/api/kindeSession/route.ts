import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();

  const {getUser} = getKindeServerSession();
  const user = await getUser();


  return NextResponse.json({user});
}