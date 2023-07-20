import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Input from "../../../util/Input";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../util/Label";
import greenArrowDown from "../../../images/GreenArrowDown.png";
import Button from "../../../util/Button";
import greenArrowLeft from "../../../images/GreenArrowLeft.png";
import greenArrowRight from "../../../images/GreenArrowRight.png";
import TimeFormatter from "../../../util/TimeFormatter";
import { book_appointment_DoctorData } from "../../../store/apiSlice";
const BookAppointmentStep1 = ({ handleNextStep }) => {
  const location = useLocation();

  const {
    bookAppointmentDoctorData,
    bookAppointmentDoctorDataStatus,
    bookAppointmentDoctorDataError,
  } = useSelector((state) => state.api);
  console.log(bookAppointmentDoctorData, "bookAppointmentDoctorData");
  const bookDoctorAppointmentDispatch = useDispatch();

  useEffect(() => {
    bookDoctorAppointmentDispatch(
      book_appointment_DoctorData(location?.state?.doctor?.[0]?.id)
    );
  }, [bookDoctorAppointmentDispatch]);
  const [selectedDate, setSelectedDate] = useState(null);
  // const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const handleDateSelection = (date, timeSlots) => {
    setSelectedDate(date);
    //setAvailableTimeSlots(timeSlots);
  };

  const [isActive, setIsActive] = useState(false);
  const toggleButtonHandler = () => {
    setIsActive(!isActive);
  };

  const [isActiveAppointmentType, setIsActiveAppointmentType] = useState(false);
  const toggleButtonHandlerAppointmentType = () => {
    setIsActiveAppointmentType(!isActiveAppointmentType);
  };

  const DateComp = ({ timeSlotDate }) => {
    const date = new Date(timeSlotDate);
    const day = date?.getDate();
    const month = date?.toLocaleString("en-US", { month: "short" });

    return (
      <>
        <div className="flex flex-col gap-2">
          <h3 className="font-sansRegular text-[14px]">{day}</h3>
          <h3 className="text-[14px]">{month}</h3>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center mt-[6rem] items-center py-10">
        <h1 className="text-[1.6rem] font-sansBold text-center mt-4 mb-3 tracking-[3px]">
          Book Appointment
        </h1>
        <p className="text-center text-md text-gray-500">
          Fill out the below details and select the date and time to quickly
          book an appointment.
        </p>
      </div>
      <div className="flex flex-col flex-wrap max-w-[600px] mx-auto py-3">
        {location?.state?.doctor?.map((item) => {
          return (
            <>
              <div className="flex">
                <img
                  src="https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clini_1258-88108.jpg?w=2000"
                  alt="doctor"
                  className="w-[100px] h-auto rounded-xl"
                />
                <div className="flex flex-col px-5">
                  <h2 className="text-2xl   text-[1.2rem] font-Henriette font-semibold tracking-[2px]">
                    {item?.doctor_name} {item?.id}
                  </h2>
                  <p className="text-[.86rem] text-[#292F33] py-1 font-sansRegular">
                    {item?.medical_speciality} , {item?.country}
                  </p>
                  <p className="text-[.76rem] text-[#292F33] py-1 font-sansRegular">
                    Doctor of Medicine ({item?.education?.[0]})
                  </p>
                </div>
              </div>
              <div className="flex flex-col py-6">
                <Label className="text-[#757993] font-sansRegular text-[13px] mb-1">
                  Select your Insurance
                </Label>
                <div className="relative border border-verifiCation rounded-sm w-full py-[7px] flex justify-between items-center">
                  <Input
                    type="text"
                    placeholder="Select your Insurance"
                    className="relative outline-none rounded-md px-3 py-2 text-[.9rem]  text-[#636677] font-sansRegular"
                  />

                  <img
                    src={greenArrowDown}
                    alt=""
                    className={`w-3 h-3 mr-2 cursor-pointer   `}
                  />
                </div>
                <Label className="text-[#757993] font-sansRegular text-[13px] mb-1 mt-8">
                  What’s the reason for your visit?
                </Label>
                <div className="relative border border-verifiCation rounded-sm w-full py-[7px] flex justify-between items-center">
                  <Input
                    type="text"
                    placeholder="Select condition"
                    className="relative outline-none rounded-md px-3 py-2 text-[.9rem]  text-[#636677]  font-sansRegular"
                  />

                  <img
                    src={greenArrowDown}
                    alt=""
                    className={`w-3 h-3 mr-2 cursor-pointer   `}
                  />
                </div>
                <Label className="text-[#757993] font-sansRegular text-[13px] mb-1 mt-8">
                  Have you visited before?
                </Label>
                <div className="border border-verifiCation w-full py-2 rounded-sm flex justify-evenly ">
                  <Button
                    onClick={toggleButtonHandler}
                    className={`${
                      !isActive ? "bg-[#008282] " : ""
                    } py-1 px-[8.2rem]  ${
                      isActive ? "text-black" : "text-white"
                    } text-[.9rem] tracking-[2px] font-sansRegular`}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={toggleButtonHandler}
                    className={`${
                      isActive ? "bg-[#008282] " : ""
                    } py-1 px-[8.2rem] ${
                      isActive ? "text-white" : "text-black"
                    } text-[.9rem] tracking-[2px] font-sansRegular`}
                  >
                    No
                  </Button>
                </div>
                <Label className="text-[#757993] font-sansRegular text-[13px] mb-1 mt-4">
                  Type of Visit
                </Label>
                <div className="border border-verifiCation w-full py-2 rounded-sm flex justify-evenly ">
                  <Button
                    onClick={toggleButtonHandlerAppointmentType}
                    className={`${
                      !isActiveAppointmentType ? "bg-[#008282] " : ""
                    } py-1 px-[7rem]   ${
                      isActiveAppointmentType ? "text-black" : "text-white"
                    } text-[.9rem] tracking-[2px] font-sansRegular`}
                  >
                    InPerson
                  </Button>
                  <Button
                    onClick={toggleButtonHandlerAppointmentType}
                    className={`${
                      isActiveAppointmentType ? "bg-[#008282] " : ""
                    } py-1 px-[7rem] ${
                      isActiveAppointmentType ? "text-white" : "text-black"
                    } text-[.9rem] tracking-[2px] font-sansRegular`}
                  >
                    Virtual
                  </Button>
                </div>

                <Label className="text-[#757993] font-sansRegular text-[13px] mb-1 mt-4">
                  Clinic address
                </Label>
                <div className="relative border border-verifiCation rounded-sm w-full py-[7px] flex justify-between items-center">
                  <Input
                    type="text"
                    placeholder="Select condition"
                    value={item?.country?.[0]}
                    className="relative outline-none rounded-md px-3 py-2 text-[.9rem]  text-[#757993]  font-sansRegular"
                  />

                  <img
                    src={greenArrowDown}
                    alt=""
                    className={`w-3 h-3 mr-2 cursor-pointer   `}
                  />
                </div>
                <Label className="text-[#757993] font-sansRegular text-[13px] mb-1 mt-4">
                  Select date time availability
                </Label>

                <div className="flex flex-row flex-wrap gap-4 items-center  py-3 cursor-pointer">
                  <div className="w-[3rem] h-[2.3rem] outline-verifiCation border border-verifiCation rounded-sm flex justify-center items-center">
                    <img src={greenArrowLeft} alt="" className="w-2 h-auto " />
                  </div>
                  {/* {item?.time_slots?.InPerson?.map((timeSlot, index) => (
                    <div
                      key={index}
                      className="bg-[#F2FCFE]"
                      onClick={() => {
                        setAppointmentTime(timeSlot);
                      }}
                    >
                      <p className="px-3 text-[14px]">
                        {timeSlot?.day?.slice(0, 3)}
                      </p>
                      <p className="px-3">
                        <DateComp timeSlotDate={timeSlot?.date} />
                      </p>
                    </div>
                  ))} */}
                  {item?.time_slots?.InPerson?.map((timeSlot, index) => (
                    <div
                      key={index}
                      className={`${
                        location.state.date === timeSlot.date
                          ? "bg-verifiCation border-verifiCation text-white rounded-md"
                          : "cursor-not-allowed disabled:opacity-50 "
                      }`}
                      onClick={() => {
                        location.state.date === timeSlot.date &&
                          handleDateSelection(timeSlot?.date, timeSlot.value);
                      }}
                    >
                      <p className="px-3 text-[14px]">
                        {timeSlot?.day?.slice(0, 3)}
                      </p>
                      <p className="px-3">
                        <DateComp timeSlotDate={timeSlot?.date} />
                      </p>
                    </div>
                  ))}
                  <div className="w-[3rem] h-[2.3rem] outline-verifiCation border border-verifiCation rounded-sm flex justify-center items-center">
                    <img src={greenArrowRight} alt="" className="w-2 h-auto " />
                  </div>
                </div>
                <p>{selectedDate}</p>
                <ul className="flex flex-row flex-wrap gap-4 items-center py-7 cursor-pointer">
                  {item?.time_slots?.InPerson?.map((timeSlot, index) =>
                    timeSlot?.value?.map((timeSlot, index) => (
                      <li
                        key={index}
                        className={` ${
                          location.state.time === timeSlot.to
                            ? "bg-verifiCation text-white"
                            : ""
                        } font-sansRegular py-2 px-5 text-[13px] bg-[#F2FCFE]   rounded-md`}
                      >
                        <TimeFormatter time={timeSlot?.to} />
                      </li>
                    ))
                  )}
                </ul>

                <div className="flex mt-8">
                  <Input
                    type="checkbox"
                    name="checkbox"
                    className="rounded border-none outline-verifiCation  accent-verifiCation transition-all delay-200"
                  />

                  <Label
                    htmlFor="terms"
                    className="font-sansRegular font-semibold ml-2 text-[0.8rem] text-[#292F33]"
                  >
                    I Certify that the information provided by me is accurate
                    for insurance and payment.
                  </Label>
                </div>

                <div className="flex items-center justify-center mt-8">
                  <Button
                    className="bg-verifiCation text-white text-[15px] font-semibold rounded-full w-[15rem] h-[2.5rem] "
                    onClick={handleNextStep}
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default BookAppointmentStep1;
