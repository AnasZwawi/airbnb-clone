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
    <section className="bg-zinc-200 md:bg-white p-8 md:p-y-8 rounded-xl mt-6 md:px-0">
      <h2 className="text-2xl font-semibold text-black pb-4">Meet your Host</h2>
      <div className="flex flex-col rounded-2xl bg-zinc-200 p-0 md:p-8 w-full items-center md:flex-row gap-x-0 md:gap-x-8 gap-y-7">
        <div className="bg-white flex flex-col items-center w-[320px] h-fit px-4 py-7 rounded-2xl shadow-[0px_7px_25px_5px_#00000024]">
          <img
            src={
              profilePicture ??
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Profile image"
            className="w-28 h-28 rounded-full mb-2"
          />
          <h3 className="text-center text-[23px] font-semibold text-zinc-900">{hostName}</h3>
          <p className="text-center text-sm font-semibold text-black tracking-tighter">
            Host
          </p>
        </div>

        <div className="w-full md:w-[65%]">
          <h4 className="mb-5 text-black font-semibold text-lg tracking-tighter">
            Host details
          </h4>
          <p className="p-0 m-0 flex gap-x-1 items-center">
            <Check className="min-w-5 min-h-5 text-zinc-900" />
            <span className="text-md text-zinc-900">
              confirmed email address
            </span>
          </p>
          <p className="p-0 m-0 flex items-center gap-x-1">
            <Check className="min-w-5 min-h-5 text-zinc-900" />
            <span className="text-md text-zinc-900 ">
              confirmed phone number
            </span>
          </p>
          <Button className="my-6 mb-7 font-semibold text-[16px] tracking-tight px-7 py-8 rounded-md bg-zinc-900 text-white">
            Contact Host
          </Button>
          <Separator className="w-full bg-zinc-300" />
          <div className="mt-4 flex gap-x-1 items-center">
            <ShieldAlert className="text-primary min-w-5 min-h-5" />
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
