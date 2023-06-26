import React, { useState, useEffect } from "react";
import leaf from "../../../images/home/Leaf.png";
import svgSearch from "../../../images/home/SearchBarIcon.svg";
import calendarSvg from "../../../images/home/Calendar.svg";
import grayDropDown from "../../../images/Login/GrayDropdown.png";
import DatePickerComponent from "../../../UI/DatePicker";

const Holistic = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="p-5 bg-[#E2F6F3]">
      <div className="bg-[#E2F6F3]">
        <div className="pt-44 mb-24 space-y-2">
          <h1 className="flex font-poppinRegular justify-center space-x-6 font-medium tracking-widest text-[#0C0B0B] sm:text-[2.5rem]">
            <p>HOLISTIC</p>
            <div className="flex items-center justify-center">
              <div className="relative">
                <p>M</p>
                <img className="absolute top-2 h-[40px]" alt="" src={leaf} />
              </div>
              <p>EDICINE</p>
            </div>
            <p>CONNECTING</p>
          </h1>

          <h1 className="flex font-poppinItalic justify-center space-x-6 tracking-widest font-[300] text-[#0C0B0B] sm:text-[2.2rem]">
            Mind. Body. Soul
          </h1>
        </div>
        <div className="mb-10 bg-white px-5 rounded-full mx-auto max-w-[1120px]">
          <div className="flex flex-row items-center gap-5 justify-between">
            <div className="flex flex-row justify-between items-center flex-1 gap-[20px]">
              <h1 className="ml-5">Location</h1>
              <img src={grayDropDown} alt="dropdown" className="h-3 w-3" />
            </div>
            <div className="h-[50px] border-l" />
            <div className="flex flex-row justify-between items-center flex-1 gap-[20px]">
              <h1 className="ml-5">Speciality</h1>
              <img src={grayDropDown} alt="dropdown" className="h-3 w-3" />
            </div>
            <div className="h-[50px]  border" />
            <div className="flex flex-row items-center justify-between flex-1 gap-5">
              <div className="flex flex-row items-center justify-between gap-[20px]">
                <img
                  src={calendarSvg}
                  alt=""
                  className="w-6 h-6 cursor-pointer"
                />
                <p>{selectedDate ? selectedDate.toDateString() : "Today"}</p>
                {showDatePicker && (
                  <DatePickerComponent onDateChange={handleDateChange} />
                )}
              </div>
              <img src={grayDropDown} alt="dropdown" className="h-3 w-3" />
            </div>
            <div>
              <img
                src={svgSearch}
                alt=""
                className="w-20 h-16 cursor-pointer"
                onClick={toggleCalendar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holistic;
