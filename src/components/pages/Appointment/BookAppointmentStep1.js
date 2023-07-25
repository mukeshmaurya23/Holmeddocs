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
import { useRef } from "react";
import customAxios from "../../../axios/custom";
import { enqueueSnackbar } from "notistack";
const BookAppointmentStep1 = ({ handleNextStep }) => {
  const location = useLocation();
  const [isDropDownInsurance, setIsDropDownInsurance] = useState(false);
  const [isDropdownCondition, setIsDropdownCondition] = useState(false);

  const [selectedItemList, setSelectedItemList] = useState({
    insurance: "",
    conditions: "",
  });

  const handleSelectedItem = (item, type) => {
    setSelectedItemList({ ...selectedItemList, [type]: item });
  };
  console.log(selectedItemList, "selectedItemList");
  const { bookAppointmentDoctorData, bookAppointmentDoctorDataStatus } =
    useSelector((state) => state.api);
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
  const insuranceRef = useRef(null);
  const conditionRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      if (insuranceRef?.current?.contains(e.target)) {
        setIsDropDownInsurance(true);
      } else {
        setIsDropDownInsurance(false);
      }
      if (conditionRef?.current?.contains(e.target)) {
        setIsDropdownCondition(true);
      } else {
        setIsDropdownCondition(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

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

  if (bookAppointmentDoctorDataStatus === "loading") {
    return <div className="text-center">loading</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      doctor_id: location?.state?.doctor?.[0]?.id,
      insurance_id: selectedItemList.insurance.id,
      medical_condition: selectedItemList.conditions.id,
      visit_type: !isActiveAppointmentType ? "InPerson" : "Virtual",

      appointment_date: location.state.date,
      time_slot_id: location.state.timeSlotId,
    };

    console.log(data, "data");

    try {
      const response = await customAxios.post(
        "/patient/save_appointment",
        data
      );
      console.log(response, "response");
      enqueueSnackbar(response?.data?.message, {
        variant: response?.data?.success ? "success" : "error",
        autoHideDuration: 1000,
      });
      if (response.status === 200) {
        if (response?.data?.success === 1) {
          handleNextStep(response);
        }
      }
    } catch (err) {
      console.log(err);
    }
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
                  <h2 className="text-2xl   text-[1.2rem] font-sansBold font-semibold tracking-[2px]">
                    {item?.doctor_name}
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
                <div
                  ref={insuranceRef}
                  className=" relative border border-verifiCation rounded-sm w-full py-[7px] flex justify-between items-center"
                >
                  <Input
                    type="text"
                    value={selectedItemList.insurance.insurance_company_name}
                    placeholder="Select your Insurance"
                    className="relative outline-none rounded-md px-3 py-2 text-[.9rem]  text-[#636677] font-sansRegular"
                  />
                  <img
                    src={greenArrowDown}
                    alt=""
                    className={`w-3 h-3 mr-2 cursor-pointer ${
                      isDropDownInsurance ? "rotate-180" : ""
                    }  `}
                  />
                  <ul className="absolute top-[3.7rem] 2xl:top-[5rem] p-2 bg-white w-[103%] -right-1 z-10 rounded-lg max-h-[30vh] overflow-y-auto">
                    {isDropDownInsurance &&
                      bookAppointmentDoctorData?.insurance?.map((item) => (
                        <li
                          key={item.id}
                          onClick={() =>
                            handleSelectedItem(
                              {
                                id: item.id,
                                insurance_company_name:
                                  item.insurance_company_name,
                              },
                              "insurance"
                            )
                          }
                          className="cursor-pointer px-5 font-sansRegular font-semibold text-[13px] py-1"
                        >
                          {item?.insurance_company_name}
                        </li>
                      ))}
                  </ul>
                </div>
                <Label className="text-[#757993] font-sansRegular text-[13px] mb-1 mt-8">
                  What’s the reason for your visit?
                </Label>
                <div
                  ref={conditionRef}
                  className="relative border border-verifiCation rounded-sm w-full py-[7px] flex justify-between items-center"
                >
                  <Input
                    type="text"
                    placeholder="Select condition"
                    value={selectedItemList.conditions.medical_condition_name}
                    className="relative outline-none rounded-md px-3 py-2 text-[.9rem]  text-[#636677]  font-sansRegular"
                  />

                  <img
                    src={greenArrowDown}
                    alt=""
                    className={`w-3 h-3 mr-2 cursor-pointer ${
                      isDropdownCondition ? "rotate-180" : ""
                    }  `}
                  />
                  <ul className="absolute top-[3.7rem] 2xl:top-[5rem] p-2 bg-white w-[103%] -right-1 z-10 rounded-lg max-h-[30vh] overflow-y-auto">
                    {isDropdownCondition &&
                      bookAppointmentDoctorData?.conditions?.map((item) => (
                        <li
                          key={item.id}
                          onClick={() =>
                            handleSelectedItem(
                              {
                                id: item.id,
                                medical_condition_name:
                                  item.medical_condition_name,
                              },
                              "conditions"
                            )
                          }
                          className="cursor-pointer px-5 font-sansRegular font-semibold text-[13px] py-1"
                        >
                          {item?.medical_condition_name}
                        </li>
                      ))}
                  </ul>
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
                    placeholder="address"
                    value={bookAppointmentDoctorData?.clinic_address?.map(
                      (item) => item.address
                    )}
                    style={{
                      width: "-webkit-fill-available",
                    }}
                    className="relative outline-none  rounded-md px-3 py-2 text-[.9rem]  text-[#757993]  font-sansRegular"
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
                    type="submit"
                    className="bg-verifiCation text-white text-[15px] font-semibold rounded-full w-[15rem] h-[2.5rem] "
                    onClick={handleSubmit} //handleNextStep
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
