import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import HomeId from "./page";



export default async function RootLayout({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <HomeId user={user} params={params}/>
  );
}
