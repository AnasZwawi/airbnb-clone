"use client";
import React, { useState,useTransition } from "react";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createReservation } from "@/app/actions";
import { ReservationSubmit } from "@/app/components/SubmitButton";
import { X } from "lucide-react";

export const SideCalendar = ({
  price,
  id,
  userId,
  minRange,
  reservations,
}: {
  price: number | null | undefined;
  id: string;
  userId: string | undefined;
  minRange: number;
  reservations: { startDate: Date; endDate: Date }[] | undefined;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    startTransition(async()=>{
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
  
      try {
        await createReservation(formData);
      } catch (error) {
        setError(`Minimum ${minRange} nights required.`);
      }
    })
    
  };

  return (
    <>
      {error && (
        <div className="w-full bg-black bg-opacity-70 backdrop-blur-md h-[100vh] z-50 fixed top-0 left-0 flex justify-center items-center">
          <div className="z-50 relative w-full md:w-[400px] h-[280px] bg-white rounded-lg border border-gray-300 shadow-lg flex justify-center items-center">
            <Button className="absolute bottom-3 right-3 bg-primary rounded-md text-white font-medium text-[16px]" onClick={()=>{setError(null)}}>Close</Button>
            <div className="w-full">
              <p className="text-lg text-center font-semibold">{error}</p>
              <p className="text-gray-600 text-center">
                Please choose more than {minRange} nights...
              </p>
            </div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="sticky top-[90px] flex flex-col h-fit items-center px-5 py-6 border border-gray-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
      >
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="homeId" value={id} />

        <div className="w-full flex justify-between items-center">
          <div className="text-left">
            <span className="font-bold text-[20px]">${price} </span>
            <span>per night</span>
          </div>
          <p className="text-sm">(minimum {2} nights)</p>
        </div>

        <SelectCalendar
          reservations={reservations}
          price={price}
          minRange={minRange}
        />

        {userId ? (
          <ReservationSubmit isPending={isPending}/>
        ) : (
          <Button className="w-full h-10">
            <Link href={"/api/auth/login"}>
              <p className="font-medium text-[17px] py-3">
                Make a Reservation!
              </p>
            </Link>
          </Button>
        )}
      </form>
    </>
  );
};
