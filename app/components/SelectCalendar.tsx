 "use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";
import { eachDayOfInterval } from "date-fns";
import { addDays } from "date-fns";
/*
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
    const dateRange = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate)
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
      <div className="w-full flex justify-between mb-3">
        <div className="border-b pb-0 border-gray-400">
          ${price} x{" "}
          {1 + Math.round(
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
 */

/* export const SelectCalendar = ({
  reservations,
  price,
}: {
  price: number | null | undefined;
  reservations: { startDate: Date; endDate: Date }[] | undefined;
}) => {
  
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2), // Set default end date to 7 days after start date
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  reservations?.forEach((reservation) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate)
    });

    disabledDates = [...disabledDates, ...dateRange];
  });

  const handleDateChange = (ranges: any) => {
    const { selection } = ranges;
    if (selection.endDate.getTime() - selection.startDate.getTime() < 2 * 24 * 60 * 60 * 1000) {
      const newEndDate = addDays(selection.startDate, 2);
      setState([{ ...selection, endDate: newEndDate }]);
    } else {
      setState([selection]);
    }
  };

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
        onChange={handleDateChange}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
      <div className="w-full flex justify-between mb-3">
        <div className="border-b pb-0 border-gray-400">
          ${price} x{" "}
          {1 + Math.round(
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
 */

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
      endDate: addDays(new Date(), 2), // Set default end date to 2 days after start date
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  reservations?.forEach((reservation) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate),
    });
    disabledDates = [...disabledDates, ...dateRange];
  });

  const handleDateChange = (ranges: any) => {
    const { selection } = ranges;

    // Check if the selected range overlaps with any existing reservations
    const overlap = reservations?.some((reservation) => {
      return (
        reservation.startDate <= selection.endDate &&
        reservation.endDate >= selection.startDate
      );
    });

    // If there's an overlap, cancel the range picking
    if (overlap) {
      console.log(overlap)
      return;
    }

    setState([selection]);
  };

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
        onChange={handleDateChange}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
      <div className="w-full flex justify-between mb-3">
        <div className="border-b pb-0 border-gray-400">
          ${price} x{" "}
          {1 +
            Math.round(
              (((state[0].endDate.getTime() as number) -
                state[0].startDate.getTime()) as number) /
                (1000 * 3600 * 24)
            )}{" "}
          nights
        </div>
        <p>
          $
          {price && price !== null
            ? price *
              (
                Math.round(
                  (((state[0].endDate.getTime() as number) -
                    state[0].startDate.getTime()) as number) /
                    (1000 * 3600 * 24)
                ))
            : ""}
        </p>
      </div>
    </>
  );
};
