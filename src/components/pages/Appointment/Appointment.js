import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import noAppointment from "../../../images/noappointments1.png";
import noAppointmentCalendar from "../../../images/noappointment.png";
import loadingGif from "../../../images/icons/Loader.gif";
import checkMark from "../../../images/profile/Checkmark.png";
import ListCalendar from "../../../images/profile/ListCalender.png";
import doctorImage from "../../../images/Login/Login.jpg";
import TimeFormatter from "../../../util/TimeFormatter";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../../UI/Spinner";
import hamburger from "../../../images/icons/Hamburger.png";
import { toggleMenu } from "../../../store/mobileAppSlice";
import MobileResposiveToogle from "../../../util/MobileResposiveToogle";
const Appointment = () => {
  //Api calls

  const {
    data: appointmentData,
    error,
    status,
  } = useSelector((state) => state.api);

  console.log(appointmentData.data.result, "appointmentData");

  const appointmentDataResult = appointmentData?.data?.result[0]?.id;
  const [hasMore, setHasMore] = useState(true);
  console.log(appointmentDataResult, "appointmentDataResult");

  const [currentIndex, setCurrentIndex] = useState(
    appointmentDataResult || null
  );
  console.log(currentIndex, "currentIndex");
  const handleCardClick = (id) => {
    setCurrentIndex(id);
    console.log(id, "im id from handleCardClick");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarOpenForSchedule, setIsSidebarOpenForSchedule] =
    useState(true);

  const toggleSidebar = () => {
    console.log("toggle");
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [initialMobileState, setInitialMobileState] = useState(false);
  const [flag, setFlag] = useState(false);

  const toggleMobileSidebar = () => {
    // setInitialMobileState((prevState) => {
    //   return {
    //     ...prevState,
    //     [index]: !prevState[index],
    //   };
    // });
    setInitialMobileState(!initialMobileState);
  };
  const isMenuOpen = useSelector((state) => state.mobileApp.isMenuOpen);

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const handleBgWhiteCard = (event) => {
    const element = event.target;
    setFlag(true);
    element.classList.add("bg-white");
    console.log(element);
  };

  //const { data: appointmentData } = useFetch("/patient/appointments");
  //console.log(appointmentData, "appointmentData");
  //console.log(appointmentData, "appointmentData");

  console.log(appointmentData?.data?.result[currentIndex], "im current index");
  return (
    <>
      {isMenuOpen && <MobileResposiveToogle />}
      {status === "loading" ? (
        <div className="flex justify-center  ">
          <img src={loadingGif} alt="" />
        </div>
      ) : appointmentData?.data?.result?.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-[10rem] relative cursor-pointer">
          <img
            src={noAppointmentCalendar}
            alt=""
            className="w-[15%] h-auto absolute top-0 left-[35%]"
          />
          <img
            src={noAppointment}
            alt=""
            className="w-1/3 rounded-xl items-center  h-auto"
          />
          <p className="text-center text-gray-400 text-md font-sansBold mt-5">
            Sorry ! You have no appointments
          </p>
        </div>
      ) : (
        <div className="flex  h-[100vh] ">
          <div className=" w-full md:w-[25%] bg-appointmentColor">
            <div className="flex items-center justify-start p-4 border-b border-gray-400">
              <h1 className="text-md text-[#9597A6] font-sansLight mr-auto ">
                My Appointments
              </h1>
              <div className="flex ">
                <img
                  src={hamburger}
                  className="w-[25px] h-[25px] cursor-pointer block md:hidden"
                  onClick={toggleMenuHandler}
                />
              </div>
            </div>

            <div
              className="hidden md:block lg:block h-[calc(100vh_-_4rem)] overflow-y-auto "
              id="appointmentScrollHide"
            >
              {isSidebarOpen ? (
                <>
                  {/*  {currentIndex} */}

                  {isSidebarOpenForSchedule && (
                    <InfiniteScroll
                      dataLength={appointmentData?.data?.result?.length}
                      loader={<Spinner />}
                    >
                      <>
                        {appointmentData?.data?.result?.map((data, index) => {
                          return (
                            <div
                              className={`flex flex-col border-b p-5  border-gray-300  ${
                                currentIndex === data.id ? "bg-white" : ""
                              }
              
                
                `}
                              key={data.id}
                              onClick={() => handleCardClick(data.id)}
                              style={{ cursor: "pointer" }}
                              role="button"
                            >
                              <p className="text-[#292F33] font-sansSemibold text-[15px]">
                                {data?.doctor_name}
                                {/* Alexander O. Babazadeh */}
                              </p>
                              <p className="text-[#9597A6] font-sansLight text-xs py-1">
                                {/* {data.tag1} */}
                                Scheduled for:{" "}
                                {data?.appointment_date || "Thurs, Feb 18th"}
                              </p>
                              <p className="text-[#292F33] text-sm py-1">
                                {/* {data.tag2} */}
                                {data?.medical_condition}
                              </p>
                            </div>
                          );
                        })}
                      </>
                    </InfiniteScroll>
                  )}
                </>
              ) : null}
            </div>

            {!initialMobileState ? (
              <div className="block md:hidden lg:hidden">
                {isSidebarOpen ? (
                  <>
                    {/*  {currentIndex} */}

                    {isSidebarOpenForSchedule && (
                      <>
                        {appointmentData?.data?.result?.map((data, index) => {
                          return (
                            <div
                              className={`flex flex-col border-b p-5  border-gray-300  ${
                                currentIndex === data.id ? "bg-white" : ""
                              }
              
                
                `}
                              key={data.id}
                              onClick={() =>
                                handleCardClick(data.id) ||
                                toggleMobileSidebar()
                              }
                              // onClick={() =>
                              //   handleCardClick(data.id) || toggleMobileSidebar()
                              // }
                              style={{ cursor: "pointer" }}
                              role="button"
                            >
                              <p className="text-[#292F33] font-sansSemibold text-[15px]">
                                {data?.doctor_name}
                                {/* Alexander O. Babazadeh */}
                              </p>
                              <p className="text-[#9597A6] font-sansLight text-xs py-1">
                                {/* {data.tag1} */}
                                Scheduled for:{" "}
                                {data?.appointment_date || "Thurs, Feb 18th"}
                              </p>
                              <p className="text-[#292F33] text-sm py-1">
                                {/* {data.tag2} */}
                                {data?.medical_condition}
                              </p>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                ) : null}
              </div>
            ) : (
              <div className=" block md:hidden flex-1 bg-white">
                <div className="flex flex-col border-b lg:p-5 border-gray-300 ">
                  {appointmentData?.data?.result?.map((item) => {
                    if (item.id === currentIndex) {
                      return (
                        <>
                          <div key={item.id}>
                            <div className="py-[5px]">
                              <div className="flex justify-between border-b py-[13.7px] border-gray-400">
                                <p className="text-[#292F33] px-5 font-semibold text-md">
                                  {/* {SCHEDULE_DUMMY_DATA[currentIndex].date} */}
                                  {/* {console.log(
                              appointmentData?.data?.result[currentIndex]
                                .appointment_number
                            )} */}
                                  #{item.appointment_number}
                                </p>

                                <div className="mr-9">
                                  <p className="text-[#9597A6] text-sm ">
                                    Appointment booked on
                                  </p>
                                  <p className="text-[#9597A6] text-sm ">
                                    {new Date(
                                      item.booked_on
                                    ).toLocaleDateString("en-US", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </p>
                                  <div
                                    onClick={toggleMobileSidebar}
                                    className="mt-2 cursor-pointer"
                                  >
                                    <img
                                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78w2nrJfQnf64ZxatMjX-TabSpz3rQpPQqxBDqLOnZNXi4zX4Q6FfNKDSfAYEK5Kz1w&usqp=CAU"
                                      className="h-5 mb-4  object-contain "
                                      style={{
                                        mixBlendMode: "hard-light",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="p-9 flex  ">
                              <div className="flex flex-col ">
                                <img
                                  src={doctorImage}
                                  className="h-auto w-full rounded-md object-cover"
                                />

                                <div className="flex flex-col py-2 ">
                                  <p className="text-md text-gray-800 font-semibold ">
                                    {item.doctor_name}
                                  </p>
                                  <p className="text-[#9597A6] text-sm  ">
                                    {item.clinic_address}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-b w-full"></div>
                            <div className="px-3 py-2 flex flex-col  ">
                              <div className="flex-col mt-7">
                                <p className="text-[#9597A6] text-xs  pl-5">
                                  What’s the reason for your visit?
                                </p>
                                <p className="text-[#292F33] text-sm py-4 font-sansRegular pl-5">
                                  {item.medical_condition}
                                </p>
                                <p className="text-[#9597A6] text-xs  pl-5">
                                  Insurance Details
                                </p>
                                <p className="text-[#292F33] text-sm py-4 font-sansRegular pl-5">
                                  {item.insurance}
                                </p>
                                <p className="text-[#9597A6] text-xs  pl-5">
                                  Type of Visit
                                </p>
                                <p className="text-[#292F33] text-sm py-4 font-sansRegular pl-5">
                                  {item.visit_type}
                                </p>
                                <p className="text-[#9597A6] text-xs  pl-5">
                                  Schedule
                                </p>
                                <p className="text-[#292F33] text-sm py-4 font-sansRegular pl-5">
                                  <TimeFormatter time={item.appointment_time} />
                                </p>
                              </div>
                              <div className=" px-2">
                                <div className="flex gap-2">
                                  <img
                                    src={checkMark}
                                    alt="checkMark"
                                    className="w-7 h-auto"
                                  />
                                  <h2 className="text-black text-md font-semibold">
                                    Appointment Confirmed
                                  </h2>
                                </div>
                                <div className="mt-3 px-2">
                                  <p className="text-[#9597A6] text-sm ">
                                    Address
                                  </p>
                                  <p className="text-[#292F33] text-sm py-3 font-semibold tracking-tighter">
                                    {/* {
                                appointmentData?.data?.result[currentIndex]
                                  .clinic_address
                              } */}
                                    {item.clinic_address}
                                  </p>

                                  <p className="text-[#292F33] text-sm py-3 font-semibold tracking-tighter">
                                    Location Not Available
                                  </p>
                                  {/* <iframe
                                className="h-60 w-full mt-5"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15080.731037074034!2d72.87535869905422!3d19.099636713754155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8773cb2f051%3A0x40576ac944236b34!2sSaki%20Naka%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1686410711545!5m2!1sen!2sin"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                              ></iframe> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
          {/*  This is Desktop0.3*/}

          <div className=" hidden md:block flex-1 bg-white">
            <div className="flex flex-col ">
              {appointmentData?.data?.result?.map((item) => {
                if (item.id === currentIndex) {
                  return (
                    <>
                      <div key={item.id}>
                        <div className="py-[5px]">
                          <div className="flex justify-between border-b py-[13.7px] border-gray-400">
                            <p className="text-[#292F33] px-5 font-semibold text-md">
                              {/* {SCHEDULE_DUMMY_DATA[currentIndex].date} */}
                              {/* {console.log(
                              appointmentData?.data?.result[currentIndex]
                                .appointment_number
                            )} */}
                              #{item.appointment_number}
                            </p>
                            <div className="mr-9">
                              <p className="text-[#9597A6] text-sm ">
                                Appointment booked on
                              </p>
                              <p className="text-[#9597A6] text-sm ">
                                {new Date(item.booked_on).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-9 flex  ">
                          <div className="flex items-center">
                            <img
                              src={doctorImage}
                              className="h-auto w-1/6 rounded-md object-cover"
                            />

                            <div className="flex flex-col ">
                              <p className="text-md text-gray-800 font-semibold ml-5">
                                {item.doctor_name}
                              </p>
                              <p className="text-[#9597A6] text-sm w-1/2 pl-5">
                                {item.clinic_address}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-b w-full"></div>
                        <div className="px-7 py-2 flex  ">
                          <div className="flex-col mt-7">
                            <p className="text-[#9597A6] text-xs  pl-5">
                              What’s the reason for your visit?
                            </p>
                            <p className="text-[#292F33] text-sm py-4 font-sansRegular pl-5">
                              {item.medical_condition}
                            </p>
                            <p className="text-[#9597A6] text-xs  pl-5">
                              Insurance Details
                            </p>
                            <p className="text-[#292F33] text-sm py-4 font-sansRegular pl-5">
                              {item.insurance}
                            </p>
                            <p className="text-[#9597A6] text-xs  pl-5">
                              Type of Visit
                            </p>
                            <p className="text-[#292F33] text-sm py-4 font-sansRegular pl-5">
                              {item.visit_type}
                            </p>
                            <p className="text-[#9597A6] text-xs  pl-5">
                              Schedule
                            </p>
                            <p className="text-[#292F33] text-sm py-4 font-sansRegular pl-5">
                              <TimeFormatter time={item.appointment_time} />
                            </p>
                          </div>
                          <div className=" flex-1 pl-[9rem] space-y-6 ">
                            <div className="flex gap-2">
                              <img
                                src={checkMark}
                                alt="checkMark"
                                className="w-7 h-auto"
                              />
                              <h2 className="text-black text-md font-semibold">
                                Appointment Confirmed
                              </h2>
                            </div>
                            <div>
                              <p className="text-[#9597A6] text-sm">Address</p>
                              <p className="text-[#292F33] text-sm py-3 font-semibold tracking-tighter">
                                {/* {
                                appointmentData?.data?.result[currentIndex]
                                  .clinic_address
                              } */}
                                {item.clinic_address}
                              </p>

                              <p className="text-[#292F33] text-sm py-3 font-semibold tracking-tighter">
                                Location Not Available
                              </p>
                              {/* <iframe
                                className="h-60 w-full mt-5"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15080.731037074034!2d72.87535869905422!3d19.099636713754155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8773cb2f051%3A0x40576ac944236b34!2sSaki%20Naka%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1686410711545!5m2!1sen!2sin"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                              ></iframe> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
      {/*this is for mobile */}
      {/* {initialMobileState && (
      
      )} */}
    </>
  );
};

export default Appointment;
