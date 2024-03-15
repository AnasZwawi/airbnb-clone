import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ShieldAlert } from "lucide-react";
import React from "react";

interface HostInfoProps {
  profilePicture?: string | null; // profilePicture can be string or undefined
  hostName?: string;
}

export const HostInfo: React.FC<HostInfoProps> = ({ profilePicture, hostName }) => {
  return (
    <section className="bg-muted-foreground md:bg-white p-8 md:p-y-8 md:px-0">
      <h2 className="text-2xl font-semibold text-black pb-4">Meet your Host</h2>
      <div className="flex flex-col rounded-2xl bg-muted-foreground p-0 md:p-8 w-full items-center md:flex-row gap-x-0 md:gap-x-8 gap-y-7">
        <div className="bg-white flex flex-col items-center w-[320px] h-fit p-4 rounded-2xl shadow-[0px_7px_25px_5px_#00000024]">
          <img
            src={
              profilePicture ??
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Profile image"
            className="w-28 h-28 rounded-full mb-2"
          />
          <h3 className="text-center text-[23px] font-semibold text-black">{hostName}</h3>
          <p className="text-center text-sm font-semibold text-black tracking-tighter">
            Host
          </p>
        </div>

        <div className="w-[65%]">
          <h4 className="mb-6 text-black font-semibold text-lg tracking-tighter">
            Host details
          </h4>
          <p className="p-0 m-0 flex gap-x-1 items-center">
            <Check className="w-4 h-4 text-zinc-800" />
            <span className="text-md text-zinc-800">
              confirmed email address
            </span>
          </p>
          <p className="p-0 m-0 flex items-center gap-x-1">
            <Check className="w-4 h-4 text-zinc-800" />
            <span className="text-md text-zinc-800 ">
              confirmed phone number
            </span>
          </p>
          <Button className="my-6 font-semibold text-lg tracking-tight px-6 py-5 rounded-md bg-zinc-800 text-white">
            Contact Host
          </Button>
          <Separator className="w-full bg-zinc-300" />
          <div className="mt-4 flex gap-x-1 items-center">
            <ShieldAlert className="text-primary w-3 h-3" />
            <p className="text-[13px] text-zinc-700">
              To protect your payment, never transfer money or communicate
              outside of the Tuniloge website.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
