import Image from "next/image";
import Link from "next/link";
import React from "react";
import DesktipLogo from "@/public/airbnb-desktop.png";
import MobileLogo from "@/public/airbnb-mobile.webp";
import { UserNav } from "./UserNav";

export const Navbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href={"/"}>
          <Image
            src={DesktipLogo}
            className="w-32 hidden lg:block"
            alt="desktop logo"
          />
          <Image
            src={MobileLogo}
            className="w-12 block lg:hidden"
            alt="mobile logo"
          />
        </Link>
        <div className="rounded-full border px-5 py-2">
          <h1>Hello from the search</h1>
        </div>
        <UserNav/>
      </div>
    </nav>
  );
};
