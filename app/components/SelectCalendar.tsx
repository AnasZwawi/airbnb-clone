"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";
import { eachDayOfInterval } from "date-fns";

export const SelectCalendar = ({
  reservations,
  selectedDateRange,
  onDateRangeChange,
}: {
  selectedDateRange: { startDate: Date; endDate: Date; key: string }[];
  onDateRangeChange: (newDateRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  }) => void;
  reservations: { startDate: Date; endDate: Date }[] | undefined;
}) => {
  

  let disabledDates : Date[] = [];
  reservations?.forEach((reservation)=>{
    const dateRange = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate)
    })

    disabledDates = [...disabledDates, ...dateRange];
  })

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={selectedDateRange[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={selectedDateRange[0].endDate.toISOString()}
      />
      <DateRange
        months={2}
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#000"]}
        color="blue"
        ranges={selectedDateRange}
        onChange={(item) => onDateRangeChange([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
    </>
  );
};
