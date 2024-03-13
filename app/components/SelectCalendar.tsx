"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";
import { eachDayOfInterval } from "date-fns";
import { addDays } from "date-fns";

export const SelectCalendar = ({
  reservations,
  price,
}: {
  price: number | null | undefined;
  reservations: { startDate: Date; endDate: Date }[] | undefined;
}) => {
  
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  reservations?.forEach((reservation) => {
    const endDate = addDays(new Date(reservation.startDate), 3);
    const dateRange = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: endDate,
    });

    disabledDates = [...disabledDates, ...dateRange];
  });

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        months={2}
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#000"]}
        color="blue"
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
      <div className="w-full flex justify-between">
        <div className="underline">
          ${price} x{" "}
          {Math.round(
            (((state[0].endDate.getTime() as number) -
              state[0].startDate.getTime()) as number) /
              (1000 * 3600 * 24)
          )}{" "}
          nights
        </div>
        <p>
          $
          {price && price !== null ? (
            price * (1 +
            Math.round(
              (((state[0].endDate.getTime() as number) -
                state[0].startDate.getTime()) as number) /
                (1000 * 3600 * 24)
            ))
          ) : (
            ""
          )}
        </p>
      </div>
    </>
  );
};
