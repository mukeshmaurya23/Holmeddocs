import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const customInput = (
    <input
      style={{ outline: "none", border: "none", color: "gray" }}
      value={startDate.toDateString()}
      readOnly
      className="ml-0 md:ml-[5px] xsm:ml-0 xs:ml-0"
    />
  );
  return (
    <DatePicker
      selected={startDate}
      customInput={customInput}
      onChange={(date) => setStartDate(date)}
    />
  );
};

export default DatePickerComponent;
