import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const DatePickerComponent = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  console.log("Im from datePicker");
  const handleDateChange = (date) => {
    setStartDate(date);
    onDateChange(date);
  };
  // const customInput = (
  //   <input
  //     style={{ outline: "none", border: "none", color: "gray" }}
  //     value={startDate.toDateString()}
  //     onClick={onToggleCalendar}
  //     onChange={(e) => onDateChange(e.target.value)}
  //     className="ml-0 md:ml-[5px] xsm:ml-0 xs:ml-0"
  //   />
  // );
  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      customInput={
        <input
          style={{ outline: "none", border: "none", color: "gray" }}
          value={startDate.toDateString()}
          readOnly
          className="w-40 h-10 border-2 border-gray-300 rounded-md"
        />
      }
      onCalendarClose={() => console.log("close")}
    />
  );
};

export default DatePickerComponent;
