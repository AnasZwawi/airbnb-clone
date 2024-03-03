"use client";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from "react-date-range"
import { useState } from 'react';


export const SelectCalendar = () => {
  const [state , setState] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  }])
  return (
    <DateRange
      date={new Date()}
      showDateDisplay= {false}
      rangeColors={["#FF5A5F"]}
      ranges={state}
      onChange={(item) => setState([item.selection] as any)}
      minDate={new Date()}
      direction='vertical'
    />
  )
}
