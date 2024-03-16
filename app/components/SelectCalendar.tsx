
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
"use client";

import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { eachDayOfInterval, addDays } from 'date-fns';
import { Button } from '@/components/ui/button';

export const SelectCalendar = ({
  reservations,
  price,
  minRange,
}: {
  minRange: number;
  price: number | null | undefined;
  reservations: { startDate: Date; endDate: Date }[] | undefined;
}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(), // Default start date is current date
      endDate: addDays(new Date(), minRange), // Default end date is minRange days after current date
      key: 'selection',
    },
  ]);
  const [wrongSelection, setWrongSelection] = useState(false);
  const [nextAvailableDate, setNextAvailableDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (reservations && reservations.length > 0) {
      // Find the next available date after the current date
      const currentDate = new Date();
      const nextDate = currentDate;
      while (true) {
        nextDate.setDate(nextDate.getDate() + 1); // Increment to next day
        const isAvailable = !reservations.some(
          (reservation) =>
            nextDate >= reservation.startDate && nextDate <= reservation.endDate
        );
        if (isAvailable) {
          setNextAvailableDate(nextDate);
          break;
        }
      }
    }
  }, [reservations]);

  const handleDateChange = (ranges: any) => {
    const { selection } = ranges;

    // Check if the selected range overlaps with any existing reservations
    const overlap = reservations?.some((reservation) => {
      return (
        (selection.startDate >= reservation.startDate && selection.startDate <= reservation.endDate) ||
        (selection.endDate >= reservation.startDate && selection.endDate <= reservation.endDate) ||
        (selection.startDate <= reservation.startDate && selection.endDate >= reservation.endDate)
      );
    });

    // If there's an overlap, cancel the range picking
    if (overlap) {
      setWrongSelection(true);
      return; // Exit the function early to prevent updating state
    }

    setState([selection]);
  };

  return (
    <>
      {wrongSelection && (
        <div className="w-full bg-black bg-opacity-70 backdrop-blur-md h-[100vh] z-50 fixed top-0 left-0 flex justify-center items-center">
          <div className="z-50 relative w-full md:w-[400px] h-[280px] bg-white rounded-lg border border-gray-300 shadow-lg flex justify-center items-center">
            <Button
              className="absolute bottom-3 right-3 bg-primary rounded-md text-white font-medium text-[16px]"
              onClick={() => {
                setWrongSelection(false);
              }}
            >
              Close
            </Button>
            <div className="w-full">
              <p className="text-lg text-center font-semibold">{wrongSelection}</p>
              <p className="text-gray-600 text-center">
                Please select a different time frame as it overlaps with an existing reservation.
              </p>
            </div>
          </div>
        </div>
      )}
      <input type="hidden" name="startDate" value={state[0].startDate.toISOString()} />
      <input type="hidden" name="endDate" value={state[0].endDate.toISOString()} />
      <input
        type="hidden"
        name="range"
        value={Math.round(((state[0].endDate.getTime() as number) - state[0].startDate.getTime()) as number) / (1000 * 3600 * 24)}
      />
      <DateRange
        months={1}
        date={undefined}
        showDateDisplay={false}
        rangeColors={['#000']}
        color="violet"
        ranges={undefined}
        onChange={handleDateChange}
        minDate={nextAvailableDate} // Set minDate to the next available date
        direction="vertical"
      />
      <div className="w-full flex justify-between mb-3">
        <div className="border-b pb-0 border-gray-400">
          ${price} x{' '}
          {Math.round(
            (((state[0].endDate.getTime() as number) - state[0].startDate.getTime()) as number) /
              (1000 * 3600 * 24)
          )}{' '}
          nights
        </div>
        <p>
          $
          {price && price !== null
            ? price *
              Math.round(
                (((state[0].endDate.getTime() as number) - state[0].startDate.getTime()) as number) /
                  (1000 * 3600 * 24)
              )
            : ''}
        </p>
      </div>
    </>
  );
};
