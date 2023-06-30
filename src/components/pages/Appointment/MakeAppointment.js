import React, { useState } from "react";
import {} from "react-router-dom";
import Input from "../../../util/Input";
import greenArrowDown from "../../../images/GreenArrowDown.png";
import greenArrowUp from "../../../images/home/WhiteDropdown.png";
import calendar from "../../../images/home/Calendar.svg";
import Button from "../../../util/Button";
import DatePickerComponent from "../../../UI/DatePicker";
const MakeAppointment = () => {
  console.log("pathname", window.location.pathname);
  const [isActive, setIsActive] = useState(false);
  const toggleButtonHandler = () => {
    setIsActive(!isActive);
  };
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
    <>
      <div class="flex justify-center   ">
        <div class="w-[370px] h-[220px] xs:w-[500px] xs:h-[250px] sm:w-[580px] sm:h-[300px] md:w-[580px] md:h-[300px] bg-[#0082822B] rounded-b-full  relative   ">
          <div className=" bg-white shadow-2xl  absolute w-[300px] xs:w-[340px] sm:w-[390px] h-fit pb-10   bottom-0 top-10  left-0 mx-auto right-0 ">
            <div className="px-7 py-4 sm:px-7 sm:py-4 ">
              <h2 className=" text-[#292F33] text-[1.1rem]  font-sansBold tracking-[1px] pt-4">
                Book Top Doctors Appointment
              </h2>
              <p className=" text-gray-400 text-[0.7rem]  font-sansRegular tracking-tight  pt-2">
                Thinking to consult a doctor this week? Use Holmeddoc to find
                the best doctors near you ..
              </p>
              <div className="border border-verifiCation w-full py-2 mt-4 flex justify-between items-center">
                <Input
                  type="text"
                  placeholder="City,Zip Code"
                  className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
                />
                <img
                  src={greenArrowDown}
                  alt=""
                  className="w-3 h-3 mr-2 cursor-pointer"
                />
              </div>
              <div className="border border-verifiCation w-full py-2 mt-8 flex justify-between items-center">
                <Input
                  type="text"
                  placeholder="Specialty, Condition, Doctor..."
                  className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
                />
                <img
                  src={greenArrowDown}
                  alt=""
                  className="w-3 h-3 mr-2 cursor-pointer"
                />
              </div>
              <div className="border border-verifiCation w-full py-2 mt-8 flex justify-between items-center">
                <Input
                  type="text"
                  placeholder="Reason for visit"
                  className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
                />
                <img
                  src={greenArrowDown}
                  alt=""
                  className="w-3 h-3 mr-2 cursor-pointer"
                />
              </div>
              <div className="border border-verifiCation w-full py-2 mt-8 flex justify-between items-center">
                {/* <Input
                  type="Today"
                  placeholder="Today"
                  className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
                /> */}
                {selectedDate &&
                  selectedDate.toDateString() !== new Date().toDateString() && (
                    <p>{selectedDate.toDateString()}</p>
                  )}
                {showDatePicker && (
                  <DatePickerComponent onDateChange={handleDateChange} />
                )}
                <img
                  src={calendar}
                  alt=""
                  className="w-4 h-4 mr-2 cursor-pointer"
                />
              </div>
              <div className="border border-verifiCation w-full py-[6px] mt-8 flex justify-between items-center px-3">
                <Button
                  onClick={toggleButtonHandler}
                  className={`${
                    !isActive ? "bg-[#008282] " : ""
                  } py-1 px-3  sm:px-10 ${
                    isActive ? "text-black" : "text-white"
                  } text-[.9rem] tracking-[2px] font-sansRegular`}
                >
                  InPerson
                </Button>
                <Button
                  onClick={toggleButtonHandler}
                  className={`${
                    isActive ? "bg-[#008282] " : ""
                  } py-1 px-3 sm:px-10 ${
                    isActive ? "text-white" : "text-black"
                  } text-[.9rem] tracking-[2px] font-sansRegular`}
                >
                  Virtual
                </Button>
              </div>
              <div className="flex justify-center items-center ">
                <Button className="bg-[#008282] py-2 px-10 mt-10 rounded-full text-white text-[.9rem] tracking-[2px] font-sansRegular">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeAppointment;
