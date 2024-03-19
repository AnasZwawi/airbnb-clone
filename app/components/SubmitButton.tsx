"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import React, { ReactNode, useState } from "react";
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

interface AddToFavoriteButtonProps {
  classn?: string;
  children?: ReactNode; // Make children optional
}

export const AddToFavoriteButton: React.FC<AddToFavoriteButtonProps> = ({
  classn = "w-6 h-6",
  children
}) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button className="bg-opacity-0 flex hover:bg-stone-100 py-1 px-2" disabled>
          <Loader2 className={`${classn} animate-spin text-primary`} />
          {children}
        </button>
      ) : (
        <button className="bg-opacity-0 flex hover:bg-stone-100 py-1 px-2" type="submit">
          <Heart className={classn} color="#FFF" fill="#48484895" />
          {children}
        </button>
      )}
    </>
  );
};

interface DeleteFromFavoriteButtonProps {
  classn?: string;
  children?: ReactNode; // Define children prop
}

export const DeleteFromFavoriteButton: React.FC<DeleteFromFavoriteButtonProps> = ({
  classn = "w-6 h-6",
  children
}) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button className="bg-opacity-0 flex hover:bg-stone-100 py-1 px-2" disabled>
          <Loader2 className={`${classn} animate-spin text-primary`} />
          {children}
        </button>
      ) : (
        <button type="submit" className="bg-opacity-0 flex hover:bg-stone-100 py-1 px-2">
          <Heart className={classn} color="#FFF" fill="#d41c4b" />
          {children}
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
