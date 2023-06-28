import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const customInput = (
    <input
      style={{ outline: "none", border: "none", width: "100px", color: "gray" }}
      value={startDate.toDateString()}
      readOnly
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
