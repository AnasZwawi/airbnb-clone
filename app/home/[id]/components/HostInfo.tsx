"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Check, ShieldAlert } from "lucide-react";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image";

interface HostInfoProps {
  profilePicture?: string | null; // profilePicture can be string or undefined
  hostName?: string;
  email?: string;
  houseThumbnail?: string;
  housePrice?: number | null;
  houseTitle?: string | null;
  houseCountry?: string | null;
}

export const HostInfo: React.FC<HostInfoProps> = ({
  profilePicture,
  hostName,
  email,
  houseThumbnail,
  housePrice,
  houseCountry,
  houseTitle,
}) => {
  const word = hostName;

  return (
    <section className="md:w-full bg-[#f0ecec] rounded-3xl md:bg-white p-6 md:p-y-8 mt-6 md:px-0">
      <h2 className="text-2xl font-semibold text-black pb-5">Meet your Host</h2>
      <div className="flex flex-col rounded-3xl bg-[#f0ecec] p-0 md:p-10 md:px-12 w-full items-center md:flex-row gap-x-0 md:gap-x-14 gap-y-7">
        <div className="bg-white flex flex-col items-center w-[320px] h-fit px-4 py-7 rounded-3xl shadow-[0px_7px_25px_5px_#00000035]">
          <img
            src={
              profilePicture ??
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Profile image"
            className="w-28 h-28 rounded-full mb-2"
          />
          <h3 className="text-center text-[27px] font-bold text-stone-900">
            {word && word.charAt(0).toUpperCase() + word.slice(1)}
          </h3>
          <p className="text-center text-sm font-semibold text-black tracking-tighter">
            Host
          </p>
        </div>

        <div className="w-full md:w-[65%]">
          <h4 className="mb-5 text-black font-semibold text-[17px] tracking-tight">
            Host details
          </h4>
          <p className="p-0 m-0 flex gap-x-1 items-center">
            <Check className="min-w-[11px] min-h-[11px] text-stone-900" />
            <span className="text-md text-stone-900">
              confirmed email address
            </span>
          </p>
          <p className="p-0 m-0 flex items-center gap-x-1">
            <Check className="min-w-[11px] min-h-[11px] text-stone-900" />
            <span className="text-md text-stone-900 ">
              confirmed phone number
            </span>
          </p>
          <Sheet>
            <SheetTrigger>
              <Button className="my-6 mb-7 font-semibold text-[16px] tracking-tight px-[23px] py-[23px] rounded-md bg-zinc-900 text-white hover:bg-zinc-800">
                Contact Host
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[600px] sm:w-[100vw]">
              <SheetHeader>
                <div className="flex flex-col items-start w-full">
                  <div className="flex justify-between items-center w-full my-5">
                    <div>
                      <p className="text-[18px] font-semibold text-stone-950">
                        Contact {hostName}
                      </p>
                      <p className="text-[14px] font-normal text-stone-700">
                        email contact
                      </p>
                    </div>
                    <img
                      src={
                        profilePicture ??
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="User Profile image"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-between my-5 w-full items-center">
                    <div>
                      <p className="text-[15px] text-stone-700">
                        <span className="text-[18px] font-semibold text-stone-950">
                          ${housePrice}
                        </span>{" "}
                        night
                      </p>
                      <p className="text-[14px] text-stone-700">{houseTitle}</p>
                      <p className="text-[12px] text-stone-700">
                        {houseCountry}
                      </p>
                    </div>
                    <img
                      src={
                        houseThumbnail ??
                        "https://cdn0.iconfinder.com/data/icons/real-estate-288/60/house__home__avatar__man__building-512.png"
                      }
                      alt="house image"
                      className="rounded-xl w-32 h-32"
                    />
                  </div>
                  <Separator />
                  <div className="w-full flex flex-col items-start my-5 gap-y-3">
                    <p className="text-[18px] font-semibold text-zinc-950">Contact the host with email</p>
                    <Input type="email" placeholder="Email" />
                    <Textarea placeholder="Type your message here." />
                    <Button>Send Message</Button>
                  </div>
                  <Separator/>
                  <div className="my-3 flex items-center gap-x-2">
                    <AlertCircle className="min-w-3 min-h-3 text-primary"/>
                    <p className="text-[13px] text-stone-700">The Host will reply with an email,please check your email frequently.</p>
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Separator className="w-full bg-stone-300" />
          <div className="mt-4 flex gap-x-1 items-center">
            <ShieldAlert className="text-primary min-w-[11px] min-h-[11px]" />
            <p className="text-[13px] text-stone-700">
              To protect your payment, never transfer money or communicate
              outside of the Tuniloge website.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
