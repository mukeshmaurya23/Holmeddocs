import React, { useState, useEffect } from "react";
import leaf from "../../../images/home/Leaf.png";
import svgSearch from "../../../images/home/SearchBarIcon.svg";
import calendarSvg from "../../../images/home/Calendar.svg";
import grayDropDown from "../../../images/Login/GrayDropdown.png";
import DatePickerComponent from "../../../UI/DatePicker";
import { LocSpec } from "../../../constant";
import Accordion from "../../../util/Accordian";
import useFetch from "../../../hooks/useFetch";
const Holistic = () => {
  const { data: LocSpecd } = useFetch("/patient/master/state");
  const { data: specialistData } = useFetch("/patient/master/speciality");
  console.log(LocSpecd?.data?.result);
  console.log(specialistData?.data?.result);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="p-5 bg-[#E2F6F3]  md:h-[calc(100vh_-_7rem)] ">
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
        <div className=" mb-10 bg-white pl-3 md:px-5 rounded md:rounded-full mx-auto md:max-w-[927px] lg:max-w-[1000px]">
          <div className="flex flex-col md:flex-row justify-evenly">
            <Accordion
              items={LocSpec}
              items3={specialistData?.data?.result}
              items2={LocSpecd?.data?.result}
              //items2={LocSpecd?.data?.result}
              showBorder={false}
              image={grayDropDown}
              className="text-gray-600"
            />

            {/* <div className="flex flex-row justify-between items-center flex-1 gap-[20px]">
              <h1 className="ml-5">Speciality</h1>
              <img src={grayDropDown} alt="dropdown" className="h-3 w-3" />
            </div> */}
            <div className="flex items-center mt-1 justify-between py-4 md:py-0 ">
              <div className="flex ml-0 md:ml-5">
                <img
                  onClick={toggleCalendar}
                  src={calendarSvg}
                  alt=""
                  className="w-6 h-6 cursor-pointer mr-5"
                />
                {selectedDate &&
                  selectedDate.toDateString() !== new Date().toDateString() && (
                    <p>{selectedDate.toDateString()}</p>
                  )}
                {showDatePicker && (
                  <DatePickerComponent onDateChange={handleDateChange} />
                )}
              </div>

              <img
                src={grayDropDown}
                alt="dropdown"
                className="h-3 w-3 ml-auto mr-[60px]"
              />
              <div className="hidden md:block">
                <img
                  src={svgSearch}
                  alt=""
                  className="w-20 h-16  cursor-pointer "
                />
              </div>
            </div>
          </div>
          <div className="md:hidden pb-6 pt-3 pr-6">
            <button className="bg-gray-600 text-white w-full py-2 rounded">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holistic;
