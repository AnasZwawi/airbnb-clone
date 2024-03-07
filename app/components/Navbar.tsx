'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DesktipLogo from "@/public/tuniloge.png";
import MobileLogo from "@/public/tuniloge.png";
import { UserNav } from "./UserNav";
import { SearchComponent } from "./SearchComponent";
import { usePathname} from "next/navigation";

import { cn } from "@/lib/utils";

export const Navbar = ({ params }: { params: { id: string } }) => {
  
  const pathname = usePathname();
  const path = `/home/${params.id}`
 /*  {pathname == path ? '"w-[85%]" : "container"}
  `flex items-center justify-between mx-auto px-5 lg:px-10 py-3  ` */
  return (
    <nav className="w-full flex flex-col sm:block border-b sticky top-0 bg-white bg-opacity-90 backdrop-blur-md z-50">
      <div className={cn("flex items-center justify-between mx-auto px-5 lg:px-10 py-3",
      `${pathname == path ? "w-[85%]" : "container"}`)}>
        <Link href={"/"}>
          <Image
            src={DesktipLogo}
            className="w-32 hidden lg:block"
            alt="desktop logo"
          />
          <Image
            src={MobileLogo}
            className="w-[150px] block lg:hidden"
            alt="mobile logo"
          />
        </Link>

        <div className="hidden sm:block">
          <SearchComponent />
        </div>

        <UserNav />
      </div>
      <div className="block sm:hidden w-full mx-auto relative bottom-3">
        <SearchComponent />
      </div>
    </nav>
  );
};
