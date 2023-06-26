import React, { useState, useEffect } from "react";
import { COMPLETED_DUMMY_DATA, SCHEDULE_DUMMY_DATA } from "../../../constant";
import Button from "../../../util/Button";
import ListCalendar from "../../../images/profile/ListCalender.png";
const Appointment = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCardClick = (index) => {
    setCurrentIndex(index);
    console.log(index);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarOpenForSchedule, setIsSidebarOpenForSchedule] =
    useState(true);

  const [isSidebarOpenForCompleted, setIsSidebarOpenForCompleted] =
    useState(true);
  const toggleSidebar = () => {
    console.log("toggle");
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [initialMobileState, setInitialMobileState] = useState(false);
  const [flag, setFlag] = useState(false);

  const toggleMobileSidebar = (index) => {
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

  //Api calls

  const [appointmentData, setAppointmentData] = useState([]);
  useEffect(() => {
    const getAppointmentData = async () => {
      const response = await fetch(
        "http://skyonliners.com/demo/holmeddoc/patient/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9za3lvbmxpbmVycy5jb21cL2RlbW9cL2hvbG1lZGRvY1wvcGF0aWVudFwvbG9naW4iLCJpYXQiOjE2ODc0MTU4NDksImV4cCI6MTcwMzE0MDY0OSwibmJmIjoxNjg3NDE1ODQ5LCJqdGkiOiJDeXhXR1RjbmdPMWRlbkxlIiwic3ViIjoxMSwicHJ2IjoiNzUyODk1NjcxMGQxYzc1YjY3MTMwZDRlNGM1YzBlZTlhMGFlYjYxNCJ9.eGAP4bloWIKS08hanR4Pa5BZnzx9XOZCZkLMJIqUZAw",
              "device-id": 14,
              platform: "web",
            },
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setAppointmentData(data);
    };
    getAppointmentData();
  }, []);
  console.log(appointmentData, "appointmentData");
  return (
    <>
      <div className="flex overflow-hidden overflow-y-auto">
        <div className=" w-full md:w-1/3 bg-appointmentColor">
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

          <div className="hidden md:block lg:block">
            {isSidebarOpen ? (
              <>
                {/*  {currentIndex} */}

                {isSidebarOpenForSchedule && (
                  <>
                    {SCHEDULE_DUMMY_DATA.map((data, index) => (
                      <div
                        className={`flex flex-col border-b p-5 border-gray-300 ${
                          currentIndex === index ? "bg-white" : ""
                        }
                    
                      
                      `}
                        key={data.id}
                        onClick={() =>
                          handleCardClick(index) || toggleMobileSidebar()
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

                  <div className="border-b  p-4 border-gray-300 flex justify-between items-center ">
                    <p className="text-gray-500 text-xs tracking-wider">
                      COMPLETED SERVICES
                    </p>
                    <i
                      className={`${
                        isSidebarOpenForCompleted
                          ? "fa fa-angle-up"
                          : "fa fa-angle-down"
                      } cursor-pointer`}
                      aria-hidden="true"
                      onClick={() =>
                        setIsSidebarOpenForCompleted(!isSidebarOpenForCompleted)
                      }
                    ></i>
                  </div>
                  <div>
                    {isSidebarOpenForCompleted && (
                      <>
                        {COMPLETED_DUMMY_DATA.map((data, index) => (
                          <>
                            <div
                              className={`flex flex-col border-b p-5 border-gray-300 ${
                                currentIndex ===
                                index + SCHEDULE_DUMMY_DATA.length
                                  ? "bg-white"
                                  : ""
                              }`}
                              key={data.id}
                              onClick={() =>
                                handleCardClick(
                                  index + SCHEDULE_DUMMY_DATA.length
                                ) || toggleMobileSidebar()
                              }
                              style={{ cursor: "pointer" }}
                              tabIndex="0"
                              onKeyDown={() =>
                                handleCardClick(
                                  index + SCHEDULE_DUMMY_DATA.length
                                )
                              }
                              onKeyUp={() =>
                                handleCardClick(
                                  index + SCHEDULE_DUMMY_DATA.length
                                )
                              }
                              role="button"
                            >
                              <div className="flex flex-row justify-between">
                                <div>
                                  <p className="text-black text-lg">
                                    {data.date}
                                  </p>
                                  <p className="text-gray-500 text-sm">
                                    {data.tag1}
                                  </p>
                                  <p className="text-gray-500 text-sm">
                                    {data.tag2}
                                  </p>
                                </div>
                                <div className="flex flex-row">
                                  <img
                                    src={data.image}
                                    className="w-20 h-20 rounded"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </>
                    )}
                  </div>
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
                          {SCHEDULE_DUMMY_DATA[currentIndex].date}
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
                  <>
                    {/*This is Completed section for page */}
                    <div class="border-b border-gray-400">
                      <div class="flex justify-between m-2">
                        <p class="text-lg font-semibold text-gray-400">
                          {
                            COMPLETED_DUMMY_DATA[
                              currentIndex - SCHEDULE_DUMMY_DATA.length
                            ].date
                          }
                        </p>
                        <div>
                          <div onClick={toggleMobileSidebar}>
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78w2nrJfQnf64ZxatMjX-TabSpz3rQpPQqxBDqLOnZNXi4zX4Q6FfNKDSfAYEK5Kz1w&usqp=CAU"
                              className="h-5 mb-4 w-10/12"
                            />
                          </div>
                          <p class="text-sm text-gray-500">
                            {
                              COMPLETED_DUMMY_DATA[
                                currentIndex - SCHEDULE_DUMMY_DATA.length
                              ].tag1
                            }
                          </p>
                          <p class="text-sm text-gray-500">
                            {
                              COMPLETED_DUMMY_DATA[
                                currentIndex - SCHEDULE_DUMMY_DATA.length
                              ].tag2
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center justify-between p-5">
                      <div class="flex items-center">
                        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                          <i class="fa fa-quote-right" aria-hidden="true"></i>
                        </div>
                        <div class="flex flex-col">
                          <p class="text-md ml-5  w-[10rem] text-gray-400">
                            {
                              COMPLETED_DUMMY_DATA[
                                currentIndex - SCHEDULE_DUMMY_DATA.length
                              ].text
                            }
                          </p>
                          <div className="bg-gray-200  w-[7rem] px-3 py-2 rounded ml-4 mt-1">
                            <i class="fa fa-comment" aria-hidden="true"></i>

                            <Button className="ml-2">Chat</Button>
                          </div>
                          <p class="text-md w-[10rem] pl-5 text-black"></p>
                        </div>
                      </div>
                      <div class="flex  rounded ">
                        <div class="relative">
                          <img
                            src={
                              COMPLETED_DUMMY_DATA[
                                currentIndex - SCHEDULE_DUMMY_DATA.length
                              ].image
                            }
                            alt="Image"
                            class="w-24 h-24 rounded"
                          />
                          <i
                            class="fa fa-search-plus absolute bottom-0 right-0 m-1 text-black bg-white rounded-full p-2"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>

                    <div class="border-b border-gray-400"></div>

                    <div className="p-5 ">
                      <p className="mb-2">
                        Arrival Time{" "}
                        <span className="font-semibold text-black">
                          {
                            COMPLETED_DUMMY_DATA[
                              currentIndex - SCHEDULE_DUMMY_DATA.length
                            ].arrivalTime
                          }
                        </span>{" "}
                        and Departure{" "}
                        <span className="font-semibold text-black">
                          {
                            COMPLETED_DUMMY_DATA[
                              currentIndex - SCHEDULE_DUMMY_DATA.length
                            ].departureTime
                          }
                        </span>
                      </p>
                      <div class="flex flex-col justify-around">
                        <iframe
                          class="h-64"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15080.731037074034!2d72.87535869905422!3d19.099636713754155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8773cb2f051%3A0x40576ac944236b34!2sSaki%20Naka%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1686410711545!5m2!1sen!2sin"
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="flex flex-col mt-3">
                          <div className="flex px-3 py-3 mb-2 border">
                            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                              <i class="fa fa-compass" aria-hidden="true"></i>
                            </div>
                            <p class="text-md text-black ml-2 mt-2">2 miles</p>
                          </div>
                          <div className="flex px-3 py-2 mb-2 border">
                            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                              <i
                                class="fa fa-map-marker"
                                aria-hidden="true"
                              ></i>
                            </div>
                            <p class="text-md text-black ml-2 mt-2">30 mins</p>
                          </div>
                          <div className="flex px-3 py-2 border mb-2">
                            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                              <i class="fa fa-spinner" aria-hidden="true"></i>
                            </div>
                            <p class="text-md text-black ml-2 mt-2">1 poop</p>
                          </div>
                          <div className="flex px-3 py-2 border mb-2">
                            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                              <i
                                class="fa fa-dot-circle-o"
                                aria-hidden="true"
                              ></i>
                            </div>
                            <p class="text-md text-black ml-2 mt-2">2 pees</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-4 border-b border-gray-400"></div>
                    <div class="flex items-center justify-between p-5">
                      <div class="flex items-center">
                        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                          <i class="fa fa-user" aria-hidden="true"></i>
                        </div>

                        <div class="ml-4 flex flex-col">
                          <p class="text-md text-black">Your Sitter</p>
                          <p class="text-md font-semibold text-black">
                            {
                              COMPLETED_DUMMY_DATA[
                                currentIndex - SCHEDULE_DUMMY_DATA.length
                              ].sitterName
                            }
                          </p>
                          <p class="text-md text-black">
                            {
                              COMPLETED_DUMMY_DATA[
                                currentIndex - SCHEDULE_DUMMY_DATA.length
                              ].rating
                            }
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center rounded bg-gray-300 px-6 py-2">
                        <i class="fa fa-star" aria-hidden="true"></i>

                        <Button className="ml-2">Reviews</Button>
                      </div>
                    </div>
                    <div class="border-b border-gray-400"></div>
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
                )}
              </div>
            </div>
          )}
        </div>
        {/*  This is Desktop0.3*/}
        <div className=" hidden md:block flex-1 bg-white">
          <div className="flex flex-col border-b p-5 border-gray-300 ">
            {currentIndex < SCHEDULE_DUMMY_DATA.length ? (
              <>
                <div>
                  <div className="border-b border-gray-400">
                    <div className="flex justify-between">
                      <p className="text-gray-400 font-semibold text-lg">
                        {SCHEDULE_DUMMY_DATA[currentIndex].date}
                      </p>
                      <div>
                        <p className="text-gray-500 text-sm">
                          <i
                            class="fa fa-snowflake-o mr-2"
                            aria-hidden="true"
                          ></i>

                          {SCHEDULE_DUMMY_DATA[currentIndex].tag1}
                        </p>
                        <p className="text-gray-500 text-sm">
                          <i class="fa fa-spinner mr-2" aria-hidden="true"></i>

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
                        <p className="text-black text-md w-[14rem] pl-5">
                          {SCHEDULE_DUMMY_DATA[currentIndex].dogName}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-300 flex items-center px-9 py-2 rounded">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                      <Button className="ml-2">Edit</Button>
                    </div>
                  </div>

                  <div className="flex justify-between  ml-7 mb-4 ">
                    <div class=" flex  text-center items-center border mt-8  ">
                      <div class="px-7 border-r p-4 ">
                        <i
                          class="fa fa-snowflake-o text-center"
                          aria-hidden="true"
                        ></i>

                        <p>Female</p>
                      </div>
                      <div class="px-5 border-r p-4">
                        <p className="text-center">8</p>
                        <p>Years Old</p>
                      </div>
                      <div class="px-5 border-r p-4">
                        <i class="fa fa-handshake-o" aria-hidden="true"></i>

                        <p>Spayed</p>
                      </div>
                      <div class="px-5  p-4">
                        <p>50-100</p>
                        <p>Pounds</p>
                      </div>
                    </div>
                  </div>
                  <div class="border-b w-full"></div>
                  <div className="p-5 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                      </div>
                      <p className="text-black text-md w-[14rem] pl-5">
                        {SCHEDULE_DUMMY_DATA[currentIndex].address}
                      </p>
                    </div>
                    <div className="bg-gray-300 flex items-center px-9 py-2 rounded">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                      <Button className="ml-2">Edit</Button>
                    </div>
                  </div>
                  <div class="border-b w-full"></div>
                  <div className="p-5 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <i class="fa fa-quote-right" aria-hidden="true"></i>
                      </div>
                      <p className="text-black text-md w-[14rem] pl-5">
                        {SCHEDULE_DUMMY_DATA[currentIndex].text}
                      </p>
                    </div>
                    <div className="bg-gray-300 flex items-center px-9 py-2 rounded">
                      <i class="fa fa-comment" aria-hidden="true"></i>

                      <Button className="ml-2">Chat</Button>
                    </div>
                  </div>
                  <div class="border-b w-full"></div>
                  <div className="p-5 flex justify-between items-center">
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
                  <div className="  m-[2rem] flex justify-center items-center">
                    <div className="bg-gray-300 flex items-center px-6 py-2 m-4 rounded">
                      <i class="fa fa-repeat" aria-hidden="true"></i>

                      <Button className="ml-2">Repeat Service</Button>
                    </div>
                    <div className="bg-gray-300 flex items-center px-6 py-2  m-4 rounded">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                      <Button className="ml-2">Edit Service</Button>
                    </div>
                    <div className="bg-gray-300 flex items-center px-6 py-2  m-4  rounded">
                      <i class="fa fa-times" aria-hidden="true"></i>

                      <Button className="ml-2">Cancel Service</Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div class="border-b border-gray-400">
                  <div class="flex justify-between">
                    <p class="text-lg font-semibold text-gray-400">
                      {
                        COMPLETED_DUMMY_DATA[
                          currentIndex - SCHEDULE_DUMMY_DATA.length
                        ].date
                      }
                    </p>
                    <div>
                      <p class="text-sm text-gray-500">
                        {
                          COMPLETED_DUMMY_DATA[
                            currentIndex - SCHEDULE_DUMMY_DATA.length
                          ].tag1
                        }
                      </p>
                      <p class="text-sm text-gray-500">
                        {
                          COMPLETED_DUMMY_DATA[
                            currentIndex - SCHEDULE_DUMMY_DATA.length
                          ].tag2
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between p-5">
                  <div class="flex items-center">
                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                      <i class="fa fa-quote-right" aria-hidden="true"></i>
                    </div>
                    <div class="flex flex-col">
                      <p class="text-md ml-5  w-[12rem] text-gray-400">
                        {
                          COMPLETED_DUMMY_DATA[
                            currentIndex - SCHEDULE_DUMMY_DATA.length
                          ].text
                        }
                      </p>
                      <div className="bg-gray-200  w-[7rem] px-3 py-2 rounded ml-4 mt-1">
                        <i class="fa fa-comment" aria-hidden="true"></i>

                        <Button className="ml-2">Chat</Button>
                      </div>
                      <p class="text-md w-[14rem] pl-5 text-black"></p>
                    </div>
                  </div>
                  <div class="flex items-center rounded px-9 py-2">
                    <div class="relative">
                      <img
                        src={
                          COMPLETED_DUMMY_DATA[
                            currentIndex - SCHEDULE_DUMMY_DATA.length
                          ].image
                        }
                        alt="Image"
                        class="w-24 h-24 rounded"
                      />
                      <i
                        class="fa fa-search-plus absolute bottom-0 right-0 m-1 text-black bg-white rounded-full p-2"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>

                <div class="border-b border-gray-400"></div>

                <div className="p-5">
                  <p>
                    Arrival Time{" "}
                    <span className="font-semibold text-black">
                      {
                        COMPLETED_DUMMY_DATA[
                          currentIndex - SCHEDULE_DUMMY_DATA.length
                        ].arrivalTime
                      }
                    </span>{" "}
                    and Departure{" "}
                    <span className="font-semibold text-black">
                      {
                        COMPLETED_DUMMY_DATA[
                          currentIndex - SCHEDULE_DUMMY_DATA.length
                        ].departureTime
                      }
                    </span>
                  </p>
                  <div class="flex justify-around m-5">
                    <iframe
                      class="w-96 h-64"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15080.731037074034!2d72.87535869905422!3d19.099636713754155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8773cb2f051%3A0x40576ac944236b34!2sSaki%20Naka%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1686410711545!5m2!1sen!2sin"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="flex flex-col ">
                      <div className="flex px-3 py-3 mb-2 border">
                        <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                          <i class="fa fa-compass" aria-hidden="true"></i>
                        </div>
                        <p class="text-md text-black ml-2 mt-2">2 miles</p>
                      </div>
                      <div className="flex px-3 py-2 mb-2 border">
                        <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                          <i class="fa fa-map-marker" aria-hidden="true"></i>
                        </div>
                        <p class="text-md text-black ml-2 mt-2">30 mins</p>
                      </div>
                      <div className="flex px-3 py-2 border mb-2">
                        <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                          <i class="fa fa-spinner" aria-hidden="true"></i>
                        </div>
                        <p class="text-md text-black ml-2 mt-2">1 poop</p>
                      </div>
                      <div className="flex px-3 py-2 border mb-2">
                        <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                          <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
                        </div>
                        <p class="text-md text-black ml-2 mt-2">2 pees</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 border-b border-gray-400"></div>
                <div class="flex items-center justify-between p-5">
                  <div class="flex items-center">
                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </div>

                    <div class="ml-6 flex flex-col">
                      <p class="text-md text-black">Your Sitter</p>
                      <p class="text-md font-semibold text-black">
                        {
                          COMPLETED_DUMMY_DATA[
                            currentIndex - SCHEDULE_DUMMY_DATA.length
                          ].sitterName
                        }
                      </p>
                      <p class="text-md text-black">
                        {
                          COMPLETED_DUMMY_DATA[
                            currentIndex - SCHEDULE_DUMMY_DATA.length
                          ].rating
                        }
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center rounded bg-gray-300 px-6 py-2">
                    <i class="fa fa-star" aria-hidden="true"></i>

                    <Button className="ml-2">Reviews</Button>
                  </div>
                </div>
                <div class="border-b border-gray-400"></div>
                <div class="m-[2rem] flex justify-center items-center">
                  <div class="m-4 flex items-center rounded bg-gray-300 px-6 py-2">
                    <i class="fa fa-repeat" aria-hidden="true"></i>

                    <Button className="ml-2">Repeat Service</Button>
                  </div>
                  <div class="m-4 flex items-center rounded bg-gray-300 px-6 py-2">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                    <Button className="ml-2">Edit Service</Button>
                  </div>
                  <div class="m-4 flex items-center rounded bg-gray-300 px-6 py-2">
                    <i class="fa fa-times" aria-hidden="true"></i>

                    <Button className="ml-2">Cancel Service</Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/*this is for mobile */}
      {/* {initialMobileState && (
      
      )} */}
    </>
  );
};

export default Appointment;
