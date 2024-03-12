import Image from "next/image";
import Link from "next/link";
import React from "react";
import DesktipLogo from "@/public/tuniloge.png";
import MobileLogo from "@/public/tuniloge.png";
import { UserNav } from "./UserNav";
import { SearchComponent } from "./SearchComponent";

export const Navbar = () => {
  return (
    <nav className="w-full flex flex-col sm:block border-b sticky top-0 bg-white bg-opacity-90 backdrop-blur-md z-40">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-3">
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
      <div className="block sm:hidden w-full mx-auto relative bottom-3 mt-3">
        <SearchComponent />
      </div>
    </nav>
  );
};
