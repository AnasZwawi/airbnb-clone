import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const UserNav = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="hover:shadow-md rounded-full border p-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            src={
              user?.picture ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="h-8 w-8 rounded-full hidden lg:block"
            alt="user image"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <DropdownMenuItem>
              <form className="w-full">
                <button type="submit" className="w-full text-left">
                  Airbnb your Home
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <Link href='/my-homes' className="w-full">
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/favorites' className="w-full">
                My Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/reservations' className="w-full">
                My Reservations
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <LogoutLink className="w-full"> Log out </LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className="w-full"> Register </RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className="w-full"> Login </LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
