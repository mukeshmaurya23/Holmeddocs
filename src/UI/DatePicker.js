import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./DatePicker.css";
import "react-datepicker/dist/react-datepicker.css";
const DatePickerComponent = ({ handleChange, startDate }) => {
  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      inline
      required
      minDate={new Date()}
      customInput={
        <input
          style={{ outline: "none", border: "none", color: "gray" }}
          value={startDate.toDateString()}
          readOnly
          className="w-40 h-10 border-2 border-gray-300 rounded-md"
        />
      }
    />
  );
};

export default DatePickerComponent;
