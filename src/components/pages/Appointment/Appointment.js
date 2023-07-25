import React, { useState, useEffect } from "react";
import { COMPLETED_DUMMY_DATA, SCHEDULE_DUMMY_DATA } from "../../../constant";
import Button from "../../../util/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../../store/apiSlice";
import useFetch from "../../../hooks/useFetch";
import noAppointment from "../../../images/noappointments1.png";
import noAppointmentCalendar from "../../../images/noappointment.png";
import loadingGif from "../../../images/icons/Loader.gif";
import checkMark from "../../../images/profile/Checkmark.png";
import ListCalendar from "../../../images/profile/ListCalender.png";
import doctorImage from "../../../images/Login/Login.jpg";
const Appointment = () => {
  //Api calls
  const dispatch = useDispatch();
  const {
    data: appointmentData,
    error,
    status,
  } = useSelector((state) => state.api);
  useEffect(() => {
    dispatch(fetchData("/patient/appointments"));
  }, [dispatch]);
  const appointmentDataResult = appointmentData?.data?.result[0]?.id;

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
        <div className="flex overflow-hidden overflow-y-auto">
          <div className=" w-full md:w-[25%] bg-appointmentColor">
            <div className="flex items-center justify-start p-4 border-b border-gray-400">
              <h1 className="text-md text-[#9597A6] font-sansLight mr-auto ">
                My Appointments
              </h1>
              <div className="flex ">
                {/* <div className="w-7 h-6 bg-appointmentColor  rounded mr-2 cursor-pointer">
                <i
                  class="fa fa-bars py-1 px-2"
                  aria-hidden="true"
                  onClick={toggleSidebar}
                ></i>
              </div>
              <div className="w-8 h-8  rounded">
                <i class="fa fa-film" aria-hidden="true"></i>
              </div> */}
                <img
                  src={ListCalendar}
                  className="w-18 h-10 cursor-pointer"
                  onClick={toggleSidebar}
                />
              </div>
            </div>

            <div className="hidden md:block lg:block h-[calc(100vh_-_4rem)] ">
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
                            onClick={() => handleCardClick(data.id)}
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

            {!initialMobileState ? (
              <div className="block md:hidden lg:hidden">
                {isSidebarOpen ? (
                  <>
                    <div className="border-t border-b p-4 border-gray-300 flex justify-between items-center">
                      <p className="text-gray-500 text-xs tracking-wider">
                        SCHEDULED SERVICES
                      </p>

                      <i
                        className={`${
                          isSidebarOpenForSchedule
                            ? "fa fa-angle-up"
                            : "fa fa-angle-down"
                        } cursor-pointer`}
                        aria-hidden="true"
                        onClick={() =>
                          setIsSidebarOpenForSchedule(!isSidebarOpenForSchedule)
                        }
                      ></i>
                    </div>
                    {/*  {currentIndex} */}

                    {isSidebarOpenForSchedule && (
                      <>
                        {SCHEDULE_DUMMY_DATA.map((data, index) => (
                          <div
                            className={`flex flex-col border-b p-5 border-gray-300 
                          ${flag && currentIndex === index ? "bg-white" : ""}
                         
                    
                      
                      `}
                            key={data.id}
                            onClick={(event) =>
                              handleCardClick(index) ||
                              toggleMobileSidebar() ||
                              handleBgWhiteCard(event)
                            }
                            style={{ cursor: "pointer" }}
                            tabIndex="0"
                            onKeyDown={() => handleCardClick(index)}
                            onKeyUp={() => handleCardClick(index)}
                            role="button"
                          >
                            <p className="text-black text-lg">{data.date}</p>
                            <p className="text-gray-500 text-sm">{data.tag1}</p>
                            <p className="text-gray-500 text-sm">{data.tag2}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ) : null}
              </div>
            ) : (
              <div className=" lg:hidden md:hidden flex-1 bg-white">
                <div className="flex flex-col border-b lg:p-5 border-gray-300 ">
                  {currentIndex < SCHEDULE_DUMMY_DATA.length ? (
                    <>
                      <div className="border-b border-gray-400">
                        <div className="flex justify-between m-2">
                          <p className="text-gray-400 mt-5  font-semibold text-lg">
                            #OTET201834
                          </p>
                          <div className="mt-2">
                            <div onClick={toggleMobileSidebar}>
                              <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78w2nrJfQnf64ZxatMjX-TabSpz3rQpPQqxBDqLOnZNXi4zX4Q6FfNKDSfAYEK5Kz1w&usqp=CAU"
                                className="h-5 mb-4 w-10/12"
                              />
                            </div>
                            <p className="text-gray-500 text-sm">
                              <i
                                class="fa fa-snowflake-o mr-2"
                                aria-hidden="true"
                              ></i>

                              {SCHEDULE_DUMMY_DATA[currentIndex].tag1}
                            </p>
                            <p className="text-gray-500 text-sm">
                              <i
                                class="fa fa-spinner mr-2"
                                aria-hidden="true"
                              ></i>

                              {SCHEDULE_DUMMY_DATA[currentIndex].tag2}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center">
                            <img
                              src={SCHEDULE_DUMMY_DATA[currentIndex].image}
                              className="h-16 w-16 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col ">
                            <p class="text-md text-gray-800 font-semibold ml-5">
                              Services For
                            </p>
                            <p className="text-black text-md w-[10rem] pl-5">
                              {SCHEDULE_DUMMY_DATA[currentIndex].dogName}
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-300 flex items-center px-9 py-2 rounded">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                          <Button className="ml-2">Edit</Button>
                        </div>
                      </div>

                      <div className="flex justify-between mx-3  mb-4 ">
                        <div class=" flex  text-center items-center border mt-8  ">
                          <div class="border-r p-4 ">
                            <i
                              class="fa fa-snowflake-o text-center"
                              aria-hidden="true"
                            ></i>

                            <p>Female</p>
                          </div>
                          <div class=" border-r p-4">
                            <p className="text-center">8</p>
                            <p>Years Old</p>
                          </div>
                          <div class=" border-r p-4">
                            <i class="fa fa-handshake-o" aria-hidden="true"></i>

                            <p>Spayed</p>
                          </div>
                          <div class=" p-4">
                            <p>50-100</p>
                            <p>Pounds</p>
                          </div>
                        </div>
                      </div>
                      <div class="border-b w-full"></div>
                      <div className="m-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center">
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <p className="text-black text-md w-[10rem] pl-5">
                            {SCHEDULE_DUMMY_DATA[currentIndex].address}
                          </p>
                        </div>
                        <div className="bg-gray-300 flex items-center px-9 py-2 rounded">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                          <Button className="ml-2">Edit</Button>
                        </div>
                      </div>
                      <div class="border-b w-full"></div>
                      <div className="m-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center">
                            <i class="fa fa-quote-right" aria-hidden="true"></i>
                          </div>
                          <p className="text-black text-md w-[10rem] pl-5">
                            {SCHEDULE_DUMMY_DATA[currentIndex].text}
                          </p>
                        </div>
                        <div className="bg-gray-300 flex items-center px-9 py-2 rounded">
                          <i class="fa fa-comment" aria-hidden="true"></i>

                          <Button className="ml-2">Chat</Button>
                        </div>
                      </div>
                      <div class="border-b w-full"></div>
                      <div className="m-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center">
                            <i class="fa fa-user" aria-hidden="true"></i>
                          </div>

                          <div className="flex flex-col ml-6">
                            <p className="text-black text-md">Your Sitter</p>
                            <p className="text-black text-md font-semibold ">
                              {SCHEDULE_DUMMY_DATA[currentIndex].sitterName}
                            </p>
                            <p className="text-black text-md">
                              {SCHEDULE_DUMMY_DATA[currentIndex].rating}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-300 flex items-center px-6 py-2 rounded">
                          <i class="fa fa-star" aria-hidden="true"></i>

                          <Button className="ml-2">Reviews</Button>
                        </div>
                      </div>
                      <div class="border-b w-full"></div>
                      <div className="  mx-2 my-2 flex justify-center items-center">
                        <div className="bg-gray-300 flex items-center px-4  m-2 rounded">
                          <i class="fa fa-repeat" aria-hidden="true"></i>

                          <Button className="ml-2">Repeat Service</Button>
                        </div>
                        <div className="bg-gray-300 flex items-center px-4  m-2 rounded">
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                          <Button className="ml-2">Edit Service</Button>
                        </div>
                        <div className="bg-gray-300 flex items-center px-4   m-2  rounded">
                          <i class="fa fa-times" aria-hidden="true"></i>

                          <Button className="ml-2">Cancel Service</Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>null</>
                  )}
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
                      <div>
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
                              <p class="text-md text-gray-800 font-semibold ml-5">
                                {item.doctor_name}
                              </p>
                              <p className="text-[#9597A6] text-sm w-1/2 pl-5">
                                {item.clinic_address}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div class="border-b w-full"></div>
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
                              {new Date(
                                item.appointment_date
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}{" "}
                              {item.appointment_time}
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
                                class="h-60 w-full mt-5"
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
