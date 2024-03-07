"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  compressing = false,
}: {
  compressing?: boolean;
}) => {
  const { pending } = useFormStatus();
  return (
    <div>
      {(pending || compressing) ? (
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

export function AddToFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          className=""
          disabled
          variant={"outline"}
          size="icon"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size="icon"
          className=""
          type="submit"
        >
          <Heart className="w-4 h-4" color="#dc2626" fill="#dc2626"/>
        </Button>
      )}
    </>
  );
}

export function DeleteFromFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          className=""
          disabled
          variant={"outline"}
          size="icon"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size="icon"
          type="submit"
        >
          <Heart
            className="w-4 h-4 text-primary"
            color="#dc2626"
            fill="#dc2626"
          />
        </Button>
      )}
    </>
  );
}

export function ReservationSubmit() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Please wait...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Make a Reservation!
        </Button>
      )}
    </>
  );
}
