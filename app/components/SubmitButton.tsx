"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  compressing = false,
}: {
  compressing?: boolean;
}) => {
  const { pending } = useFormStatus();
  return (
    <div>
      {pending || compressing ? (
        <Button type="submit" disabled size="lg">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button size="lg" type="submit">
          Next
        </Button>
      )}
    </div>
  );
};

interface P {
  classn?: string;
}

export const AddToFavoriteButton: React.FC<P> = ({ classn = "w-6 h-6" }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button className="bg-opacity-0 p-2" disabled>
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </button>
      ) : (
        <button className="bg-opacity-0 p-2" type="submit">
          <Heart className={classn} color="#FFF" fill="#00000075" />
        </button>
      )}
    </>
  );
};

export const DeleteFromFavoriteButton = ({ classn = "w-6 h-6" }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button className="bg-opacity-0 p-2" disabled>
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </button>
      ) : (
        <button type="submit" className="bg-opacity-0 p-2">
          <Heart className={classn} color="#FFF" fill="#dc2626" />
        </button>
      )}
    </>
  );
};

export function ReservationSubmit({ isPending }: { isPending: boolean }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending || isPending ? (
        <Button className="w-full h-13 font-[500] text-[16px] py-3" disabled>
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          Please wait...
        </Button>
      ) : (
        <Button
          className="w-full h-13 font-[500] text-[16px] py-3"
          type="submit"
        >
          Make a Reservation!
        </Button>
      )}
    </>
  );
}
