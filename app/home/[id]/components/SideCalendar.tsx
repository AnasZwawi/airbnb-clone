"use client"
import React, { useState } from "react";
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await createReservation(formData);
    } catch (error) {
      setError(`Minimum ${minRange} nights required.`);
    }
  };

  return (
    <>
      {error && (
        <div className="w-full h-[100vh] z-49 fixed top-0 left-0 flex justify-center items-center">
          <div className="z-50 relative w-[350px] h-fit bg-white rounded-lg border border-gray-300 shadow-xl ">
            <X className="absolute top-3 right-3 bg-gray-700" />
            <div className="w-full">
              <p className="text-lg text-center font-semibold">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="sticky top-[90px] flex flex-col h-fit items-center px-4 py-6 border border-gray-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
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
          <ReservationSubmit />
        ) : (
          <Button className="w-full h-10">
            <Link href={"/api/auth/login"}>
              <p className="font-medium text-[17px] py-3">Make a Reservation!</p>
            </Link>
          </Button>
        )}
      </form>
    </>
  );
};
