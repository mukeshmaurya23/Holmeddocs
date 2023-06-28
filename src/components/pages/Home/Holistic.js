import React, { useState, useEffect } from "react";
import leaf from "../../../images/home/Leaf.png";
import svgSearch from "../../../images/home/SearchBarIcon.svg";
import calendarSvg from "../../../images/home/Calendar.svg";
import grayDropDown from "../../../images/home/BlackDropdown.png";
import DatePickerComponent from "../../../UI/DatePicker";
import { LocSpec } from "../../../constant";
import Accordion from "../../../util/Accordian";
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
        <div className="md:pt-44 sm:pt-28 xs:pt-28 xsm:pt-16 mb-24 space-y-2">
          <h1 className="flex font-poppinRegular justify-center sm:space-x-6 xs:space-x-4 xsm:space-x-3 md:text-[2.5rem]  font-medium tracking-widest text-[#0C0B0B] sm:text-[2rem] xs:text-[1.8rem] xsm:text-[1.1rem] ">
            <span>HOLISTIC</span>
            <div className="flex items-center justify-center">
              <div className="relative">
                <p>M</p>
                <img
                  className="absolute md:top-2 md:h-[40px] sm:top-[.30rem] sm:h-[35px] xs:top-[.20rem] xs:h-[25px] xsm:h-[18px] xsm:top-[.12rem] xsm:font-sansBold"
                  alt=""
                  src={leaf}
                />
              </div>
              <p>EDICINE</p>
            </div>
            <p>CONNECTING</p>
          </h1>

          <h1 className="flex sm:text-[1.6rem] font-poppinItalic justify-center space-x-6 tracking-widest font-[300] text-[#0C0B0B] md:text-[2.2rem] xsm:text-[0.8rem]">
            Mind. Body. Soul
          </h1>
        </div>
        <div className="hidden md:block mb-10 bg-white px-5 rounded-full mx-auto md:max-w-[1000px] w-full">
          <div className="flex ">
            <Accordion items={LocSpec} showBorder={false} />

            {/* <div className="flex flex-row justify-between items-center flex-1 gap-[20px]">
              <h1 className="ml-5">Speciality</h1>
              <img src={grayDropDown} alt="dropdown" className="h-3 w-3" />
            </div> */}
            <div className="flex gap-5 items-center justify-between">
              <img
                src={calendarSvg}
                alt=""
                className="w-6 h-6 cursor-pointer"
              />
              <p>{selectedDate ? selectedDate.toDateString() : "Today"}</p>
              {showDatePicker && (
                <DatePickerComponent onDateChange={handleDateChange} />
              )}

              <img src={grayDropDown} alt="dropdown" className="h-3 w-3" />

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
