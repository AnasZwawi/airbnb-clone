"use client";
import React, { useState } from "react";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createReservation } from "@/app/actions";
import { ReservationSubmit } from "@/app/components/SubmitButton";

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
  return (
    <form
      action={createReservation}
      className="sticky top-[90px] flex flex-col h-fit items-center px-4 py-6 border border-gray-200 rounded-xl shadow-[0_3px_8px_20px_rgba(0,0,0,0.1)]"
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
  );
};
